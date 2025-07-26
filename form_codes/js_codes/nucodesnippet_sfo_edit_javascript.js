var sc = $('#cot_source_code');
sc.addClass('js');

sc.css('padding', '3px 3px 3px 3px')

// Add ACE event handlers
sc.on('dblclick', function() {
    nuOpenAce(nuCodeSnippetGetSourceLangage(), this.id);
});

// Code Snippets form
nuSetProperty('IS_SETUP_HEADER', 0);
nuSetProperty('IS_CUSTOM_CODE', 1);

// Disable nu-records
if (String(nuRecordId()).startsWith('nu') && !nuDevMode()) {
    nuDisableAllObjects();
    $('#nuSaveButton').hide();
}

function nuOnClone() {
    nuEnableAllObjects();
    $('#nuSaveButton').show();
}

function nuCodeSnippetGetSourceLangage() {

    let l = $('#cot_language').val();
    if (l === 'JavaScript') l = 'JS';
    return l === '' ? 'JS' : l;

}

if (nuCodeIsTemplate() && !nuDevMode()) {
    nuDisableAllObjects();
    nuMessage("Unable to save templates. Please clone them to create a new copy and save the cloned version instead.", 2500);
}

function nuCodeIsTemplate() {
    return nuGetValue('cot_template');
}

function nuOnClone() {

    let code = cot_code.value;

    if (nuCodeIsTemplate()) {
        code = code.substring(0, code.length - 9);
        nuSetValue('cot_code', code);
        nuSetValue('cot_group', '');
        nuSetValue('cot_template', false);
        nuEnableAllObjects();
    }

}