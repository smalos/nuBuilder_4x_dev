nuAddActionButton('Run', 'Run', 'CopyACLRun()');

function CopyACLRun() {


    if (nuGetValue('cpa_form_id') === '' || nuGetValue('cpa_conflict') === '') {
        nuMessage(nuTranslate('Validation Error'), 'Some required fields are missing.');
        return;
    }

    const sourceFormID = nuGetValue('cpa_form_id');
    const destinationFormID = parent.nuRecordId();

    // const deleteAllExisting = nuGetValue('cpa_delete_all'); // Boolean (true/false)
    const skipIfExists = nuGetValue('cpa_delete_all') == '0' // Boolean (true/false)
    const overwriteIfExists = nuGetValue('overwrite_if_exists') == '1' // Boolean (true/false)

    nuHasNotBeenEdited();

    // Send parameters to the PHP procedure
    nuRunPHPHiddenWithParams('nu_get_access_levels_from_form', 'params', {
        source_form_id: sourceFormID,
        destination_form_id: destinationFormID,
        // delete_all_existing: deleteAllExisting ? 1: 0,
        skip_if_exists: skipIfExists ? 1: 0,
        overwrite_if_exists: overwriteIfExists ? 1: 0
    }, true);


}

function nuFormImportACLAfterRun() {
  parent.nuFormImportACLAfterRun();
}


nuSetValue('cpa_conflict','0');