nuHide('label_not_title');
nuSetPlaceholder('not_title', nuTranslate('Title'));

nuHide('label_not_zzzzsys_note_category_id');
nuSetPlaceholder('not_zzzzsys_note_category_idcode', nuTranslate('Category'));

function nuNotesHandleEnterKey() {

    $('.ql-editor').trigger("focus");

    let tinyB = tinyMCE.get('not_content_container').getBody();
    if (tinyB !== null) tinyB.focus();


}

$('#not_title').nuOnEnterKey(nuNotesHandleEnterKey, true);