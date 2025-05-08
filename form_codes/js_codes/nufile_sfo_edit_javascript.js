nuFilesDisplayFile($('#sfi_json').val());
nuSetToolTip('sfi_file_input', nuTranslate('Max. 300Kb'));

function nuBeforeSave() {

    const file = $('#sfi_file').val();

    if (file !== '') {

        $('#sfi_json')
        .val(file)
        .change();

    }

    return true;

}

function nuFilesDisplayFile(json) {
    nuEmbedObject(json, 'view_image', -1, -1);
    nuShow('view_image', json !== '');
}

function nuOnFileLoaded(e, id, json) {
    nuFilesDisplayFile(json);
}