$('#nuTab0').hide();


nuAddActionButton('nuRunPHPHidden', nuTranslate('Save'), 'nuRunPHPHidden("NUCHANGEPASSWORD", 0)');


var changePW = nuGetValue('display_change_required');

if (changePW) {
   nuSetValue('display_change_required',nuTranslate(changePW)); 
} else {
   nuHide('display_change_required');
}