nuUserHomeCheckNoObjectsOnForm();

function openNuObject() {

    $('#nuMessageDiv').remove();
    nuPopup('nuobject', '-1', window.nuFORM.getCurrent().form_id);

}

function nuUserHomeCheckNoObjectsOnForm() {
    
    if (nuSERVERRESPONSE.objects.length === 0 && window.global_access) {
        const title = nuTranslate('Information');
        const message = `${nuTranslate('There are currently no objects on this form.')}. <a href="javascript:openNuObject();"><br><br>${nuTranslate('Start adding some')}</a>.`;
        const msg = nuMessage(title, message);
        msg.css({'top': '60px', 'max-width': '500px'});
    }
    
}
