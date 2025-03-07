function nuSessionDeleteRow(pk) {

    if (confirm(nuTranslate("Terminate Session?"))) {
        nuSetProperty('NUBROWSEDELETEROW_FORM_ID', nuFormId());
        nuSetProperty('NUBROWSEDELETEROW_RECORD_ID', pk);

        nuRunPHPHidden("NUBROWSEDELETEROW");
    }

}

function nuAfterDeleteRow() {
    nuSearchAction();
}

function nuSessionCreateDeleteButton(target, pk) {
    const btn = $('<button type="button" class="nuSaveButtonEdited delete-session-button" value="✖">✖</button>');
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