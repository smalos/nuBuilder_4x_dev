$('#sal_zzzzsys_form_id_open_button').toggleClass('input_button nuButton nuLookupButton');
if (nuIsNewRecord()) nuHide('sal_zzzzsys_form_id_open_button');

nuAccessSetButtonIcons();
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

function nuAccessSetButtonIcons(force) {

    function setInnerHTML(element, icon) {
        element.innerHTML = '<br>&nbsp<span style="padding: 1px 10px 1px 10px;" class="nuActionButton"><i class="' + icon +'"></i></span>';
    }

    if (nuIsMobile() || force === true) {
        setInnerHTML(title_accformslf_add_button, 'fas fa-plus');
        setInnerHTML(title_accformslf_print_button, 'fas fa-print');
        setInnerHTML(title_accformslf_save_button, 'fas fa-save');
        setInnerHTML(title_accformslf_clone_button, 'fas fa-clone');
        setInnerHTML(title_accformslf_delete_button, 'fas fa-trash-alt');
    }

}