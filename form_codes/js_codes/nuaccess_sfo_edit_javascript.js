$('#sal_zzzzsys_form_id_open_button').toggleClass('input_button nuButton nuLookupButton');
if (nuIsNewRecord()) nuHide('sal_zzzzsys_form_id_open_button');

nuAccessFormSetButtonIcons();
nuAccessAddSfFilter();

function nuAccessAddSfFilter() {

    let sfFilter = {};
    sfFilter.accform = {
        'slf_zzzzsys_form_id': {
            type: 'search',
            float: 'left',
            placeholder: nuTranslate('Search')}
    };

    nuSubformAddFilter(sfFilter);

}

function nuTabsSetMarker() {
   nuTabSetMarker('nu5bad6cb36af0c58', 'accform000slf_zzzzsys_form_idcode'); // Forms
   nuTabSetMarker('nu5bad6cb36c16b42', 'accphp000slp_zzzzsys_php_idcode'); // Procedures
   nuTabSetMarker('nu5bad6cb36c39fc8', 'accreport000sre_zzzzsys_report_idcode'); // Reports
}

nuTabsSetMarker();
