$(function() { 
    nuAddBrowseTitleSelect(2, getState()); 
    $("select[id^='nuBrowseTitle']").parent().off("touchstart");
});