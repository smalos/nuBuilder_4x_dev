nuHide('sph_code_snippet_select_lookupcode');

// Code Snippets form
nuSetSnippetFormFilter(0, 0, 0, 1); // PHP Code

nuSetToolTip('title_accphpslp_zzzzsys_access_id','Access levels that can use this procedure');

var recordId = nuRecordId();
var recordIdSuffix = recordId.slice(-2);

window.nuImages = parent.nuImages;

if (nuProcIsTemplate() && !nuDevMode()) {
    nuDisableAllObjects();
    nuMessage("Unable to save templates. Please clone them to create a new copy and save the cloned version instead.", 2500);
}

window.nuHelp = 'Procedures';

if (!recordId.startsWith('nu')) {
    nuSetValue('sph_system', '0');
    nuSetValue('sph_hide', '');
}

if (!nuIsNewRecord()) {
    nuProcUpdateAclCount();
    nuAddActionButton('RunHidden');
} else {
    nuSetValue('sph_demo', true);
}


$('#sph_php')
    .addClass('php')
    .on('dblclick', function() {
        nuOpenAce('PHP', this.id);
    });

$(function() {
    $('#sph_php').scrollTop(window.scrollTop);
});

if (nuGetValue('sph_status') === '') {
  nuSetValue('sph_status','1','value', false);
}

nuHasNotBeenEdited();

function nuProcSetStyles() {
    $('#sph_php')
        .css('padding', '3px 3px 3px 3px')
        .trigger("focus");

}

function nuRunHiddenAction() {

    if (sph_run.value == 'window') {
        nuRunPHP(sph_code.value, '', 0);
    } else {
        nuRunPHPHidden(sph_code.value);
    }

}

function nuProcUpdateAclCount() {

    const l = $("[data-nu-field='slp_zzzzsys_access_id']").length - 2;
    const t = l <= 0 ? '' : ' (' + l + ')';
    $('div[data-nu-tab-id=' + 'nu5fdf7df2d873dd1' + ']').html(nuTranslate('Access Levels') + t);

}

function nuProcIsTemplate() {
    return nuGetValue('sph_template');
}


function nuOnClone() {

    let code = sph_code.value;

    if (nuProcIsTemplate()) {
        code = code == 'nu_send_welcome_email_template' ? 'nu_send_welcome_email' : code.substring(0, code.length - 9);
        nuSetValue('sph_code', code);
        nuSetValue('sph_group', '');
        nuSetValue('sph_template', false);
        nuEnableAllObjects();
    }

    nuHide('nuRunHiddenButton');

}

function nuOnSetSaved(v) {
    nuEnable('nuRunHiddenButton', v);
}

function nuBeforeSave() {

    window.scrollTop = $('#sph_php').scrollTop();
    return true;

}

function nuTabsAccesLevelSetMarker() {
   const mark = nuGetValue('accphp000slp_zzzzsys_access_id') !== '' || nuGetValue('sph_global') === true;
   nuTabSetMarker('nu5fdf7df2d873dd1', mark); 
}

nuTabsAccesLevelSetMarker();
