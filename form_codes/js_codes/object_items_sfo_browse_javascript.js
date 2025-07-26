$(function() {

    const activeFilterId = 'nuBrowseTitle7_select';
    const hasVal = nuGetProperty(activeFilterId);
    nuAddBrowseTitleSelect(7, ["", "✔"], 50, {'text-align': 'center'
    }); // Active
    if (!hasVal) {
        nuSetValue(activeFilterId, '✔', 'value', false);
    }

    $('#' + activeFilterId).parent().off("touchstart");

});