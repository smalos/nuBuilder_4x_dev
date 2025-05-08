   $("[data-nu-column='1']").each(function() {
        $(this).addClass('nu_' + this.textContent);
    });

    // Adjust Padding-Top for Preview Button
    $("[data-nu-column='0']").each(function() {
        $(this).css('padding-top', '2px');
    });




$(function() {
    if (!nuMainForm()) { // Hide Preview
        nuSetBrowseColumnSize(0, 0);
    } else {
       addRowButtons(0);
    }

    $("[data-nu-column='1']").addClass('nuCellColored');


});


function createButton(target, pk, formType) {

    var btn = $("<button id='nuPreviewButton' type='button' data-form-type='" + formType + "' class='nuActionButton'><i class='fa fa-search'></i>&nbsp;</button>");

    $(target).html(btn).attr('title', nuTranslate('Preview Form'));
    btn.on('click', function(e) {
        e.stopPropagation();
        const ft = $(this).attr("data-form-type");
        const r = ft == 'launch' || ft == 'edit' || ft == 'subform' ? '-1' : '';
        nuForm(pk, r, '', '');
    });
}

function addRowButtons(column) {

    $("[data-nu-column='" + column + "']").each(function(index) {

        var pk = $(this).attr('data-nu-primary-key');
        var r = $(this).attr('data-nu-row');
        var formType = $('#nucell_' + r + '_1').html();

        if (typeof pk !== "undefined") {
            createButton(this, pk, formType);
        }
    })

}


