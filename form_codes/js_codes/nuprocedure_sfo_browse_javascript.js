if (parent.nuCurrentProperties().form_id == 'nuaccess') {
    $('#nuBreadcrumb0').html(nuTranslate('Procedures'));
}


$(function() {
    nuAddBrowseTitleSelect(2, getGroup());
    $("select[id^='nuBrowseTitle']").parent().off("touchstart");
});