nuHideHolders(0,2);
nuHideTabs(0);

$(document).ready(function(){

    if (nuIsMobile()) {
        $('#updateiframe').css('width', window.visualViewport.width + 'px');
    }
});