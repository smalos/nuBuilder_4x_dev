/*
$("[data-nu-column='1']").each(function() {
    $(this).addClass('nu_' + this.textContent);
});
*/



function nuFormBrowseStyleBadge(column) {

    function createBadgeHtml(text, objClass) {
        return `
            <span class="text-badge ${objClass}" style="
                border: none;
                border-color: transparent;
                border-radius: 12px;
                padding: 2px 10px;
                box-shadow: none;
                display: inline-block;
                white-space: nowrap;
                line-height: 1.2;
                transition: all 0.2s ease;
                margin-top: 1px;
            ">${text}</span>
        `;
    }

    nuBrowseLoop([column], function (cell) {
        const $cell = $(cell);
        const cellText = $cell.text().trim();
		const objClass = 'nu_' + cellText;
        if (cellText && cellText.length > 0) {
            $cell.html(createBadgeHtml(cellText, objClass));
        }
    });
}

nuFormBrowseStyleBadge(1);


// Adjust Padding-Top for Preview Button
$("[data-nu-column='0']").each(function() {
    $(this).css('padding-top', '2px');
});

nuBrowseStyleStatusColumn(6);
nuBrowseStyleBadge(5); // Group

$(function() {
    if (!nuMainForm()) {
        // Hide Preview
        nuSetBrowseColumnSize(0, 0);
    } else {
        addRowButtons(0);
    }

    $("[data-nu-column='1']").addClass('nuCellColored');


    nuAddBrowseFilter('nu648030319e8fa15').nuSearchablePopup({
        items: nuFormFilterGetGroup()});

    var dataStatus = [
        ["0","Draft"],
        ["1","Active"],
        //    ["2","Disabled"],
        ["3","Archived"]
    ];

    nuAddBrowseFilter('nu682fe38322e7e70').nuSearchablePopup({
        items: dataStatus
    });

    var dataType = 
        ['browseedit','browse','edit','subform'];

    nuAddBrowseFilter('nu5bad6cb3764389f').nuSearchablePopup({
        items: dataType
    });
    
    nuPrintExcludeColumns([0]);


});


function createButton(target, pk, formType) {

    let btn = $("<button id='nuPreviewButton' type='button' data-form-type='" + formType + "' class='nuActionButton'><i class='fa fa-search'></i>&nbsp;</button>");

    $(target).html(btn).attr('title',
        nuTranslate('Preview Form'));
    btn.on('click',
        function(e) {
            e.stopPropagation();
            const ft = $(this).attr("data-form-type");
            const r = ft == 'launch' || ft == 'edit' || ft == 'subform' ? '-1': '';
            nuForm(pk, r, '', '');
        });
}

function addRowButtons(column) {

    $("[data-nu-column='" + column + "']").each(function() {

        var pk = $(this).attr('data-nu-primary-key');
        var r = $(this).attr('data-nu-row');
        var formType = $('#nucell_' + r + '_1').html();

        if (typeof pk !== "undefined") {
            createButton(this, pk, formType);
        }
    })

}