function nuOnSelectTab(tab) {
    if (tab.id == 'nuTab1') {
     //   refreshIframe(tab);
    }
}

function refreshIframeEvents(tab) {

    const attrLoaded = 'nu-iframe-events-loaded';
    $tab = $('#' + tab.id);
    if (! $tab.attr(attrLoaded)) {
        $tab.attr(attrLoaded, '1');
        let fx = $("#iframe_objectevent")[0].contentWindow;
        fx.nuSetProperty('PARENT_FORM_ID', nuRecordId());
        fx.nuGetBreadcrumb();
    }
    
}

function refreshIframeItems(tab) {

    const attrLoaded = 'nu-iframe-events-loaded';
    $tab = $('#' + tab.id);
    if (! $tab.attr(attrLoaded)) {
        $tab.attr(attrLoaded, '1');
        let fx = $("#iframe_items")[0].contentWindow;
        fx.nuSetProperty('PARENT_FORM_ID', nuRecordId());
        fx.nuGetBreadcrumb();
    }
    
}