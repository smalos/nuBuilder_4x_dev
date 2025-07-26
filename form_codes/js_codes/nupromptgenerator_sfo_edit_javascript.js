if (nuIsNewRecord()) {
    
    if (nuIsPopup()) {
      nuGeneratorGetParentInfo();
    }

    nuSetValue('pge_instruction', 
      `Generate code snippets and explanations following nuBuilder conventions. ` +
      `Use the information below when relevant to the prompt. ` +
      `This context is provided to help understand requirements for generating code snippets and answering questions.\n`
    );
    
    nuHasNotBeenEdited();
} else {
   nuGeneratorRun(false);
}

nuGeneratorOnLoad();

function nuGeneratorOnLoad() {
  
    if (Array.isArray(nuFORM.breadcrumbs) && nuFORM.breadcrumbs.length === 1) {
        nuAddActionButton("PromptGeneratorBrowse", "<i class='fa-fw fa-regular fa-rectangle-list'></i>", 'nuGeneratorOpenBrowse()', nuTranslate('Open Browse Form'));
    }
    
    nuAddActionButton('RunAIPromptGenerator', nuTranslate('Copy'), 'nuGeneratorRun()', nuTranslate('Copy to Clipboard'),'fa fa-copy');
    nuAddActionButton('RunAIPromptGeneratorResponse', nuTranslate('Ask AI')+ '&thinsp;&thinsp;&thinsp;', 'nuAIPromptGetResponse(this)', nuTranslate('Send prompt to AI and output response'),'fa  fa-wand-magic-sparkles');
    
    nuSelectRemoveEmpty('pge_language');
    nuSelectRemoveEmpty('pge_scope');
    nuSelectRemoveEmpty('pge_tag');
    nuSelectRemoveEmpty('pge_table');

    $('#pge_prompt').css('z-index', 100);

}

function nuGeneratorCheckMandatory() {

    const prompt = nuGetValue('pge_prompt').trim();

    if (prompt.length < 10) {
        nuMessage(nuTranslate('The prompt must be at least 10 characters long. Please enter a more detailed prompt to continue.'));
        return false;
    }

    return true;

}


function nuGeneratorExec(button, procedureName, paramName, params, requireMandatory = true) {
    
    if (requireMandatory && !nuGeneratorCheckMandatory()) {
        return;
    }
    
    if (button) {
        nuButtonLoading(button.id, true, 15);
        params.buttonId = button.id; 
    }

    nuRunPHPHiddenWithParams(procedureName, paramName, params);

}

function nuGeneratorRunGetTags(button) {

    if (!nuGeneratorCheckMandatory()) return;

    nuGeneratorExec(button,
        'nu_ai_prompt_generator_call_api',
        'nuaipromptgenerator_params', {
            prompt: nuGetValue('pge_prompt'),
            tags: JSON.stringify(nuSelectToArray('pge_tag','text', false)),
            procedure_type: 'tag'
        }, true
    );
}

function nuGeneratorRun(copy = true) {
 
    if (copy && !nuGeneratorCheckMandatory()) return;
    
    nuGeneratorExec(null,
        'nu_ai_prompt_generator_prompt',
        'nuaipromptgenerator_prompt_params', {
            tables: JSON.stringify(nuSelectToArray('pge_table')),
            languages: JSON.stringify(nuSelectToArray('pge_language')),
            scopes: JSON.stringify(nuSelectToArray('pge_scope')),
            tags: JSON.stringify(nuSelectToArray('pge_tag')),
            copy: copy
        }, false
    );
}

function nuAIGeneratorGetFullPrompt() {
	return nuGetValue('pge_instruction') + "\n\n" + "## User Input/Question:\n\n"+ nuGetValue('pge_prompt') + "\n\n" + nuGetValue('pge_prompt_extra')
}

function nuAIPromptGetResponse(button) {

    if (!nuGeneratorCheckMandatory()) return;

    nuGeneratorExec(button,
        'nu_ai_prompt_generator_call_api',
        'nuaipromptgenerator_params', {
            prompt: nuAIGeneratorGetFullPrompt(),
            procedure_type: 'response'
        }
    );
}

function nuGeneratorOpenBrowse() {

    if (nuFormsUnsaved() !== 0) {
        if (!confirm(nuTranslate('Leave this form without saving?'))) {
            return;
        }

    }

    nuForm(nuFormId(), '', '', '', '1');

}

function nuGeneratorNormaliseNewlines(str) {
    return str.replace(/\\r?\\n/g, String.fromCharCode(10));
}

function nuGeneratorExecuted(text, copy) {

    const normalized = nuGeneratorNormaliseNewlines(text);
    nuSetValue('pge_prompt_extra', normalized);

    if (copy) {
        nuCopyToClipboard(nuAIGeneratorGetFullPrompt());
    }

}

function nuGeneratorExecutedTags(id, arr, result) {

    nuButtonLoading(id, false);
        
    if (!result) {
        nuMessage(arr);
        return;
    }    
        
    function hasCommonElement(a, b) {
      return a.some(item => b.includes(item));
    }

    function getOptionValuesByText(selectId, textsToMatch) {
        const selectElement = document.getElementById(selectId);
        if (!selectElement || !selectElement.options || !Array.isArray(textsToMatch)) {
            return [];
        }
    
        const normalizedTexts = textsToMatch.map(t => t.trim().toLowerCase());
        const matchingValues = [];
    
        for (let option of selectElement.options) {
            const optionText = option.text.trim().toLowerCase();
            if (normalizedTexts.includes(optionText)) {
                matchingValues.push(option.value);
            }
        }
    
        return matchingValues;
    }

    
    const allTags = nuSelectToArray('pge_tag','text', false);
    const selectedTags = nuSelectToArray('pge_tag','text', true);

    if (!hasCommonElement(arr, allTags)) {
        nuMessage(arr);       
        return;
    }

    const textsToMatch = selectedTags.concat(arr);
    nuSetValue('pge_tag', getOptionValuesByText('pge_tag', textsToMatch));

}

function nuGeneratorResponseExecuted(id, text, result) {

    nuButtonLoading(id, false);
        
    if (!result) {
        nuMessage(text);
        return;
    }    

    nuSetValue('pge_output', text);
    nuSelectTabById('nu6835cb1661ba10b'); // Select "API Response" Tab
}

function nuGeneratorGetParentInfo() {

    const formId = parent.nuFormId();
    if (!nuSERVERRESPONSE) return;

    nuSetFocus(pge_prompt);

    // 1) Table
    const table = parent.nuSERVERRESPONSE.table;
    if (table && table !== '' && table !== 'zzzzsys_php' && table !== 'nupromptgenerator') {
        nuSetValue('pge_table', table);
    }

    // 2) Suffix-based PHP scopes
    const recordId = parent.nuRecordId();
    const suffix = recordId.slice(-2).toLowerCase();
    const phpSuffixes = ['bb', 'be', 'as', 'bs', 'bd'];
    if (phpSuffixes.includes(suffix)) {
        nuSetValue('pge_language', 'nuphp');
        nuSetValue('pge_scope', `nuphp_${suffix}`);
        return; // done
    }

    // 3) Per‐form (and per‐tab) config
    const config = {

        nupromptgenerator:  {
            tag: "nuaiprompt_generator"
        },
        
        nuitem: {
            tag: "nuitems"
        },      
        
        nuuser: {
            tag: "nuusers"
        },
        
        nuaccess: {
            tag: "nuuser_access"
        },
        
        nufflaunch: {
            language: 'numysql',
            scope: 'nufast_form_builder'
        },
        
        nuprocedure: {
            language: 'nuphp',
            scope: 'nuphp_procedure'
        },
        
        nufile: {
            tag: "nufiles"
        },        

        nutranslate: {
            tag: "nutranslations"
        },        

        nucloner: {
            tag: "nucloner"
        },    
        
        nucsvtransfer: {
            tag: "nucsv_transfer"
        },    
        
        nuFormat: {
            tag: "nuformat_builder"
        },    
        
        nuobject: {
            tabMap: {
                'nu5bad6cb36974818': { // Display
                    language: 'numysql'
                }, 
                'nu5bad6cb369a6ee3': {  // Select
                    language: 'numysql'
                }
            },
            tag: 'nuobjects'
        },

        nuform: {
            tabMap: {
                'nu5bad6cb37026348': {
                    language: ['javascript', 'jquery'],
                    scope: 'nuform_custom_code'
                },
                'nu5bad6cb36757b92': {
                    language: 'numysql'
                }
            },
            tag: 'nuforms'
        },

        nusetup: {
            tabMap: {
                'nu61ce913f08336db': {
                    language: 'nucss'
                },
                'nu5bad6cb36e9143a': {
                    language: ['nujavascript', 'nujquery'],
                    scope: 'nusetup_header'
                }
            },
            tag: 'nusetup'
        }
    };

    const formCfg = config[formId];
    if (!formCfg) return;

    // If it's a simple form‐level setting...
    if (formCfg.language) {
        nuSetValue('pge_language', formCfg.language);
    }
    if (formCfg.scope) {
        nuSetValue('pge_scope', formCfg.scope);
    }
    if (formCfg.tag) {
        nuSetValue('pge_tag', formCfg.tag);
    }

    // If it’s a tab-based setting, look up the tab
    if (formCfg.tabMap) {
        const tabId = parent.nuSelectedTabId();
        const tabCfg = formCfg.tabMap[tabId];
        if (tabCfg) {
            nuSetValue('pge_language', tabCfg.language);
            if (tabCfg.scope) {
                nuSetValue('pge_scope', tabCfg.scope);
            }
        }
    }

}


function nuGeneratorPasteCodeFromTextArea(insert = true) {

  let parentTextAreaId = parent.nuGetProperty('js');

  if (parentTextAreaId) {

    let text = parent.nuGetSelectedText(parentTextAreaId);

    if (text === '') {
      text = parent.nuGetValue(parentTextAreaId);
    }

    if (text !== '') { 
      if (insert) nuInsertTextAtCaret('pge_prompt', text);
      return true;
    }
  }

 return false;

}

nuShow('btn_insert_parent_code', nuGeneratorPasteCodeFromTextArea(false));