const formId = nuGetValue('sob_run_zzzzsys_form_id');

if (!formId) {
    nuMessage([nuTranslate('Select a Run Item first.')]);
    return;
}

const runType = nuGetValue('sob_run_type');

switch (runType) {
    case 'P':
        nuForm('nuprocedure', formId, '', '', 2);
        break;
    case 'R':
        nuForm('nubuildreport', formId, '', '', 2);
        break;
    default: // 'F' or any other
        nuForm('nuform', formId, '', '', 2);
        break;
}