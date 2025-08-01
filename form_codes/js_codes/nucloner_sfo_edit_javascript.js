// DEV
if (!nuDevMode()) {
    nuHideTabById('nu63ed1fef9b6331f');
}

function nuSelectObjectRefreshed(o, f) {

    nuSelectRemoveEmpty();
    if (f == 'clo_tabs') {
        $('select#' + f + ' > option').prop('selected', 'selected');
    }
}

function addRunButton() {
    nuAddActionButton('nuRunCloner', 'Run', 'runCloner()');
    $('#nunuRunPHPHiddenButton').css('background-color', '#117A65');
}

function runCloner() {

    if ($('#clo_form_source').val() === '') {
        nuMessage(nuTranslate('Validation Error'), nuTranslate('Source Form cannot be left blank.'));
        return;
    }

    const tabsLength = $("#clo_tabs option").length;
    if ($('#clo_tabs :selected').length === 0 && tabsLength > 0) {
        nuMessage(nuTranslate('Validation Error'), nuTranslate('Select at least 1 Tab.'));
        return;
    }

    nuSetProperty('cloner_refresh_selectId', '');

    const tabs = nuSelectToArray('clo_tabs', 'index');
    nuSetProperty('cloner_tabs', tabs.length === 0 ? '': JSON.stringify(tabs));

    const subforms = $('#clo_subforms_include').is(':checked');
    const clo_subforms = nuSelectToArray('clo_subforms');
    nuSetProperty('cloner_subforms', subforms === false || clo_subforms.length === 0 ? '0': JSON.stringify(clo_subforms));

    const formsRunIFrame = nuSelectToArray('clo_iframe_forms');
    nuSetProperty('cloner_iframe_forms', nuGetValue('clo_subforms_include') == false || formsRunIFrame.length === 0 ? '0': JSON.stringify(formsRunIFrame));

    const dump = $('#clo_dump').is(':checked');
    nuSetProperty('cloner_dump', dump ? '1': '0');

    const noObjects = $('#clo_objects').is(':checked');
    nuSetProperty('cloner_objects', noObjects ? '0': '1');

    const newPks = $('#clo_new_pks').is(':checked');
    nuSetProperty('cloner_new_pks', newPks ? '1': '0');

    const replaceInto = $('#clo_sql_replace_into').is(':checked');
    nuSetProperty('cloner_replace_into', replaceInto ? '1': '0');

    nuSetProperty('cloner_form_source', $('#clo_form_source').val());
    nuSetProperty('cloner_form_dest', $('#clo_form_dest').val());
    nuSetProperty('cloner_notes', '#clo_notes#');

    dump ? nuRunPHP('nu_cloner', '', 1): nuRunPHPHidden('nu_cloner');

    const tables = nuSelectToArray('clo_tables_include');
    nuSetProperty('nubackup_tables_include', tables.length === 0 ? '': JSON.stringify(tables));

}

function setTitle() {

    if (!nuIsNewRecord()) {
        nuSetTitle($('#clo_form_source').val());
    }

}

function setDefaultValues() {

    if (nuIsNewRecord()) {
        $('#clo_new_pks').prop('checked', true).trigger('change');
        $('#clo_dump').prop('checked', true).trigger('change');
    }

}

function setParentFormId() {

    if (parent.$('#nuModal').length > 0 && $('#clo_form_source').val() === '') {
        nuGetLookupId(window.parent.nuCurrentProperties().form_id, 'clo_form_source', false, false);
    }

}

function cloSubformsChecked() {

    var c = $('#clo_subforms_include').is(':checked');
    c ? nuEnable('clo_subforms'): nuDisable('clo_subforms');
    nuSelectSelectAll('clo_subforms', c);

}

function cloIframeFormsChecked() {

    var c = $('#clo_iframe_forms_include').is(':checked');
    c ? nuEnable('clo_iframe_forms'): nuDisable('clo_iframe_forms');
    nuSelectSelectAll('clo_iframe_forms', c);

}

function selectObjectPopuplated(formId, selectId, count) {

    if (selectId == 'clo_tabs') {
        nuSelectSelectAll('clo_tabs', true);
    }

    var chk;
    if (selectId == 'clo_iframe_forms') {
        chk = $('#clo_iframe_forms_include');
        var c = chk.is(':checked');
        if (c) {
            nuSelectSelectAll('clo_iframe_forms', true);
        }
        count === 0 ? nuDisable('clo_iframe_forms_include'): nuEnable('clo_iframe_forms_include');
        if (count === 0) chk.prop('checked', false).trigger('change');
    }


    if (selectId == 'clo_subforms') {

        chk = $('#clo_subforms_include');
        var s = chk.is(':checked');
        if (s) {
            nuSelectSelectAll('clo_subforms', true);
        }
        count === 0 ? nuDisable('clo_subforms_include'): nuEnable('clo_subforms_include');
        if (count === 0) chk.prop('checked', false).trigger('change');
    }

}



function nuClonerOpenBrowse() {

    if (nuFormsUnsaved() !== 0) {
        if (!confirm(nuTranslate('Leave this form without saving?'))) {
            return;
        }

    }
    nuForm(nuFormId(), '', '', '', '1');

}


function unselectAllOptionsStartingWith(selectId, prefix) {
    $("#" + selectId + " option").each(function() {
        if ($(this).text().startsWith(prefix)) {
            $(this).prop("selected", false);
        }
    });
}

function enableDisableCheckboxes() {
    var v = nuGetValue('clo_dump');
    if (v == '0') {
        nuSetValue('clo_sql_replace_into', 0);
        nuDisable('clo_sql_replace_into');
        nuSetValue('clo_new_pks', 1);
        nuDisable('clo_new_pks');
    } else {
        nuEnable('clo_new_pks');
        nuEnable('clo_sql_replace_into');
    }
}


if (nuIsNewRecord()) {
    $('#clo_tabs').empty();
    $('#clo_subforms').empty();
    $('#clo_iframe_forms').empty();
}

enableDisableCheckboxes();

// clo_dummy required to adjust correct popup width
nuHide('clo_dummy');
nuSelectRemoveEmpty();

$('#clo_subforms').nuLabelOnTop(-18, 25)
$('#clo_iframe_forms').nuLabelOnTop(-18, 25)
nuLabelOnTop(['clo_tabs', 'clo_tables_include', 'clo_tables_exclude']);

$('#label_clo_subforms').prop('for', 'clo_subforms_include');
$('#label_clo_iframe_forms').prop('for', 'clo_iframe_forms_include');

cloSubformsChecked();
cloIframeFormsChecked();

setParentFormId();
setDefaultValues();

addRunButton();
setTitle();


if (Array.isArray(nuFORM.breadcrumbs) && nuFORM.breadcrumbs.length === 1) {
    nuAddActionButton("nuClonerOpenBrowse", "<i class='fa-fw fa-regular fa-rectangle-list'></i>", 'nuClonerOpenBrowse()', nuTranslate('Open Browse Form'));
}

nuHasNotBeenEdited();

