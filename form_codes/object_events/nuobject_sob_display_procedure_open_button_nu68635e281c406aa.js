const formId = nuGetValue('sob_display_procedure');
if (!formId) {
    nuMessage([nuTranslate('Select a Display Procedure first.')]);
    return;
}
nuForm('nuprocedure', formId, '', '', 2);