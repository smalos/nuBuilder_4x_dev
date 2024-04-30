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