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


function nuTinyMCEOnInit(e, editor, id) {

    if (nuUseMobileView()) {
        $(function() {
            const maxWidth = $('#' + id)?.attr('data-nu-mobile-max-width')?.nuJustNumbers();
            const maxHeight = $('#' + id)?.attr('data-nu-mobile-max-height')?.nuJustNumbers();

            nuTinyMCESetBounds('not_content', 5, 70, maxWidth, maxHeight);
            $('#not_updated_on').css('top', '640px');
            $('#label_not_updated_on').css('top', '620px');
        });
    }

}