const formId = nuGetValue('sob_select_procedure');
if (!formId) {
    nuMessage([nuTranslate('Select a Select Procedure first.')]);
    return;
}
nuForm('nuprocedure', formId, '', '', 2);