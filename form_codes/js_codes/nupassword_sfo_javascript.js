$('#nuTab0').hide();


nuAddActionButton('nuRunPHPHidden', nuTranslate('Save'), 'nuRunPHPHidden("nu_change_password")');


var changePW = nuGetValue('display_change_required');

if (changePW) {
    nuSetValue('display_change_required', nuTranslate(changePW));
} else {
    nuHide('display_change_required');
}