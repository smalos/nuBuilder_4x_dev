nuHide('sph_code_snippet_select_lookupcode');

// Code Snippets form
nuSetSnippetFormFilter(0, 0, 0, 1); // PHP Code

var recordId = nuRecordId();
var recordIdSuffix = recordId.slice(-2);

window.nuImages = parent.nuImages;

if (nuPorcIsTemplate() && !nuDevMode()) {
    nuDisableAllObjects();
    nuMessage("Unable to save templates. Please clone them to create a new copy and save the cloned version instead.", 2500);
}


window.nuHelp = 'Procedures';

if (! recordId.startsWith('nu')) {
    nuSetValue('sph_system', '0');
    nuSetValue('sph_hide', '');
}

if (!nuIsNewRecord()) {
    nuProcUpdateAclCount();
    nuAddActionButton('ProcRunProcedure', 'Run', 'nuProcRunProcedure();');
}


$('#sph_php')
.addClass('php')
.on('dblclick', function() {
    nuOpenAce('PHP', this.id);
});

$(function() {
    $('#sph_php').scrollTop(window.scrollTop);
});

nuHasNotBeenEdited();

function nuProcSetStyles() {
    $('#sph_php')
    .css('padding', '3px 3px 3px 3px')
    .trigger("focus");

}

function nuProcRunProcedure() {

    if (sph_run.value == 'window') {
        nuRunPHP(sph_code.value, '', 0);
    } else {
        nuRunPHPHidden(sph_code.value);
    }

}

function nuProcUpdateAclCount() {

    const l = $("[data-nu-field='slp_zzzzsys_access_id']").length -2;
    const t = l <= 0 ? '': ' (' + l + ')';
    $('#nuTab1').html(nuTranslate('Access Level') + t);

}

function nuPorcIsTemplate() {
    return nuGetValue('sph_template');
}


function nuOnClone() {

    let code = sph_code.value;

    if (nuPorcIsTemplate()) {
        code = code == 'NUSENDWELCOMEEMAIL_Template' ? 'nuSendWelcomeEmail': code.substring(0, code.length-9);
        nuSetValue('sph_code', code);
        nuSetValue('sph_group', '');
        nuSetValue('sph_template', false);
        nuEnableAllObjects();
    }

}

function nuOnSetSaved(v) {
    nuEnable('nurunProcedureButton', v);
}

function nuBeforeSave() {

    window.scrollTop = $('#sph_php').scrollTop();
    return true;

}