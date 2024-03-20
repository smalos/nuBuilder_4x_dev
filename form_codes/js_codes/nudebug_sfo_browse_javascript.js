$(function() { 
    nuAddBrowseTitleSelect(1, getFlag()); 
    $("select[id^='nuBrowseTitle']").parent().off("touchstart");
});