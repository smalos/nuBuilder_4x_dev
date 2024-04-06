if (nuFormType() == 'edit') {

    var sc = $('#cot_source_code');
    sc.addClass('js');

    sc.css('padding', '3px 3px 3px 3px')

    // Add ACE event handlers
    sc.on('dblclick', function() {
        nuOpenAce(nuGetSourceLangage(), this.id);
    });

    // Code Snippets form
    nuSetProperty('IS_SETUP_HEADER', 0);
    nuSetProperty('IS_CUSTOM_CODE', 1);

    // Disable nu-records
    if (nuRecordId().startsWith('nu')) {
        nuDisableAllObjects();
        $('#nuSaveButton').hide();
    }

}

function nuOnClone() {
    nuEnableAllObjects();
    $('#nuSaveButton').show();
}


function nuGetSourceLangage() {

    let l = $('#cot_language').val();
    if (l === 'JavaScript') l = 'JS';
    return l === '' ? 'JS': l;

}