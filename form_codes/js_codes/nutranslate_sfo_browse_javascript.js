
$(function() {
   
    nuAddBrowseTitleSelect(0, getLanguage()); 
    $('#nuBrowseTitle0_select').parent().off("touchstart");
 
    nuAddBrowseTitleSelect(3, ["","✔"], 50);
    $('#nuBrowseTitle3_select').parent().off("touchstart");

});
