function nuSelectBrowse(event, element) {
    const primaryKey = $(element).attr('data-nu-primary-key');
    nuForm(nuFormId(), primaryKey, '', '',  nuIsPopup() ? '1': '0');
}