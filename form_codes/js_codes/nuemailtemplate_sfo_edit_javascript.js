nuLabelOnTop(['emt_form_id']);
activeObj = $('#emt_body');

$('#emt_avail_fields').nuLabelOnTop();
nuSelectRemoveMultiple('emt_avail_fields');

if (nuEmailTemplateIsTemplate() && !nuDevMode()) {
    nuDisableAllObjects();
    nuMessage("Unable to save templates. Please clone them to create a new copy and save the cloned version instead.", 2500);
}

nuEmailTemplateSetPreviewText();

function nuEmailTemplateAddSelectedField() {
    const selObjectId = nuGetValue('emt_avail_fields', 'text');
    const selObjectLabel = nuGetValue('emt_avail_fields');
    if (selObjectId !== '') {
        const activeObjectId = nuEmailTemplateGetActiveObjectId();
        const isBody = activeObjectId == 'emt_body';
        const label = isBody ? '<b>' + selObjectLabel + ': </b>': '';
        nuInsertAtCaret(activeObjectId, label + "#" + selObjectId + "#" + (isBody ? '\n': ''));
        $('#' + activeObjectId).trigger('change');
    }
}


function nuEmailTemplateWrapText(elementID, openTag, closeTag) {
    const textArea = $('#' + elementID);
    const len = textArea.val().length;
    const start = textArea[0].selectionStart;
    const end = textArea[0].selectionEnd;
    if (start !== end) {
        var selectedText = textArea.val().substring(start, end);
        var replacement = openTag + selectedText + closeTag;
        textArea.val(textArea.val().substring(0, start) + replacement + textArea.val().substring(end, len)).trigger('change');
    }
}

function nuEmailTemplateGetActiveObjectId() {
    return activeObj.attr('id');
}

function nuEmailTemplateFormatText(tag) {
    nuEmailTemplateWrapText(nuEmailTemplateGetActiveObjectId(), '<' + tag + '>', '</' + tag + '>');
}

function nuEmailTemplateFormatText2(tag) {
    nuEmailTemplateWrapText(nuEmailTemplateGetActiveObjectId(), tag, tag);
}

function nuEmailTemplateSetPreviewText() {
    $('#textAreaPreviewDiv').html($('#emt_body').val().replace(/\n/g, '<br />'));
}


function nuEmailTemplateIsTemplate() {
    return nuGetValue('emt_template');
}

function nuOnClone() {

    const code = emt_code.value;

    if (nuEmailTemplateIsTemplate()) {
        nuSetValue('emt_code', code.substring(0, code.length-8));
        nuSetValue('emt_group', '');
        nuSetValue('emt_template', false);
        nuEnableAllObjects();
    }

}