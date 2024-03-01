nuLabelOnTop(['emt_form_id']);
activeObj = $('#emt_body');

$('#emt_avail_fields').nuLabelOnTop();
selectSingle('emt_avail_fields');

if (isTemplate() && !nuDevMode()) {
    nuDisableAllObjects();
    nuMessage("Unable to save templates. Please clone them to create a new copy and save the cloned version instead.", 2500);
}

setPreviewText();

function selectSingle(f) {
  const $selectElement = $('#' + f);
  $selectElement.prop('size', 5);
  $selectElement.prop('multiple', false);
}

function addSelectedField() {
    const selObjectId = nuGetValue('emt_avail_fields', 'text');
    const selObjectLabel = nuGetValue('emt_avail_fields');
    if (selObjectId !== '') {
        const activeObjectId = getActiveObjectId();
        const isBody = activeObjectId == 'emt_body';
        const label = isBody ? '<b>' + selObjectLabel + ': </b>': '';
        nuInsertAtCaret(activeObjectId, label + "#" + selObjectId + "#" + (isBody ? '\n': ''));
        $('#' + activeObjectId).change();
    }
}


function wrapText(elementID, openTag, closeTag) {
    const textArea = $('#' + elementID);
    const len = textArea.val().length;
    const start = textArea[0].selectionStart;
    const end = textArea[0].selectionEnd;
    if (start !== end) {
        var selectedText = textArea.val().substring(start, end);
        var replacement = openTag + selectedText + closeTag;
        textArea.val(textArea.val().substring(0, start) + replacement + textArea.val().substring(end, len)).change();
    }
}

function getActiveObjectId() {
    return activeObj.attr('id');
}

function formatText(tag) {
    wrapText(getActiveObjectId(), '<' + tag + '>', '</' + tag + '>');
}

function formatText2(tag) {
    wrapText(getActiveObjectId(), tag, tag);
}

function setPreviewText() {
    $('#textAreaPreviewDiv').html($('#emt_body').val().replace(/\n/g, '<br />'));
}


function isTemplate() {
    let code = emt_code.value;
    return $('#emt_group').val() == 'nubuilder' && code.nuEndsWith('Template', true);
}


function nuOnClone() {

    const code = emt_code.value;

    if (isTemplate()) {
        nuSetValue('emt_code', code.substring(0, code.length-8));
        nuSetValue('emt_group', '');
        nuEnableAllObjects();
    }

}