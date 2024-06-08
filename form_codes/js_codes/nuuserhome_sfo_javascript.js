nuUserHomeCheckNoObjectsOnForm();

function openNuObject() {

    $('#nuMessageDiv').remove();
    nuPopup('nuobject', '-1', window.nuFORM.getCurrent().form_id);

}

function nuUserHomeCheckNoObjectsOnForm() {
    
    if (nuSERVERRESPONSE.objects.length === 0 && window.global_access) {

        const title = nuTranslate('Information');
        const message = nuTranslate('Currently there are no objects on this Form') + '. <a href="javascript:openNuObject();">'+ nuTranslate('Start adding some') + '</a>.';
        nuMessage(title, message);

    }
    
}