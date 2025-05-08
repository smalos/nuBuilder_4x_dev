if (sre_zzzzsys_php_id.value === '') {
  nuMessage(nuTranslate('No table selected'));
  return;
}
window.open('core/nureportdesigner.php?tt=' + $("#sre_zzzzsys_php_id").val() + '&launch=' + $("#sre_zzzzsys_form_id").val());