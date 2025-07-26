function nuSessionDeleteRow(pk) {

    if (confirm(nuTranslate("Terminate Session?"))) {
        nuSetProperty('nu_browse_delete_row_form_id', nuFormId());
        nuSetProperty('nu_browse_delete_row_record_id', pk);

        nuRunPHPHidden("nu_browse_delete_row");
    }

}

function nuAfterDeleteRow() {
    nuSearchAction();
}

function nuSessionCreateDeleteButton(target, pk) {
    const btn = $('<button type="button" class="delete-session-button" value="✖">✖</button>');
    $(target).html(btn).attr('title', nuTranslate('Terminate Session'))

    btn.css('margin-left', '10px');

    btn.on('click', function() {
        nuSessionDeleteRow(pk);
    });
}



function nuSessioCreateDeleteButtons(column) {

    $("[data-nu-column='" + column + "']").each(function(index) {
        const pk = $(this).attr('data-nu-primary-key');
        if (pk) {
            nuSessionCreateDeleteButton(this, pk);
        }
    })

}


$('[data-nu-column="5"]').each(function () {
    const cellValue = $(this).text().trim();
    const rowNum = $(this).attr("data-nu-row");
    if (cellValue === nuSERVERRESPONSE.session_id) {
        const rowSelector = $("div[id^='nucell_" + rowNum);
        rowSelector.css("background-color", '#e9fce9');
    }
});

nuSessioCreateDeleteButtons(0); // 1st column