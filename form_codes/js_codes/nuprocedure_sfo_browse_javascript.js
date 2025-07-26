if (parent.nuCurrentProperties().form_id == 'nuaccess') {
    $('#nuBreadcrumb0').html(nuTranslate('Procedures'));
}

nuAddBrowseFilter('nu5bad6cb376bd159').nuSearchablePopup({ items: nuProcedureFilterGetGroup() });

nuAddBrowseFilter('nu6878434013629b5').nuSearchablePopup({ items: nuProcedureFilterGetCategory() });


var dataStatus = [
        ["0", "Draft"],
        ["1", "Active"],
        //    ["2","Disabled"],
        ["3", "Archived"]
    ];

nuAddBrowseFilter('nu6862f0becfb7938').nuSearchablePopup({ // Status
    items: dataStatus
});


nuBrowseStyleStatusColumn(4);
nuBrowseStyleBadge(2); // Group