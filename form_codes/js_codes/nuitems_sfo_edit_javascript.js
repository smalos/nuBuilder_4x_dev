nuSetValue('itm_active',true,null,false);

if (Array.isArray(nuFORM.breadcrumbs) && nuFORM.breadcrumbs.length >= 2) {
    var previousCrumb = nuFORM.breadcrumbs[nuFORM.breadcrumbs.length - 2];
    var filter = previousCrumb?.filter;

    if (nuIsNewRecord() && filter) {
        nuGetLookupId(filter, 'itm_object_id', false, false);
    }
}



$(function() {

    const ADDITIONAL_FIELDS = [
      'itm_css',
      'itm_icon',
      'itm_language',
      'itm_access_level'
    ];

    function nuTabsAdditionalSetMarker() {
        const mark = ADDITIONAL_FIELDS.some(fieldId => {
            const raw = nuGetValue(fieldId);
            return typeof raw === 'string' && raw.trim() !== '';
        });

        nuTabSetMarker('nu6836ba2403b7939', mark);
    }

    function nuTabsAdditionalSetup() {
        ADDITIONAL_FIELDS.forEach(fieldId => {
            const el = document.getElementById(fieldId);
            if (el) {
                el.addEventListener('change', nuTabsAdditionalSetMarker);
            }
        });

        nuTabsAdditionalSetMarker();
    }


    nuTabsAdditionalSetup();

});
