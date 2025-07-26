function nuDeleteRowGetFormTableInfo($formId) {

    $sql = "SELECT sfo_table, sfo_primary_key FROM `zzzzsys_form` WHERE `zzzzsys_form_id` = ?";

    $t = nuRunQuery($sql, [$formId]);
    $r = db_fetch_object($t);

    return [$r->sfo_table,
        $r->sfo_primary_key];

}


function nuDeleteRowHasDeletePermission($formId) {

    if (nuGlobalAccess()) {
        return true;
    }

    $sql = "SELECT * FROM zzzzsys_access_form WHERE slf_zzzzsys_access_id = ? AND slf_zzzzsys_form_id = ?";

    $t = nuRunQuery($sql, [$groupId, $formId]);
    $r = db_fetch_object($t);

    return $r->slf_delete_button == 1;
}

function nuDeleteRowDeleteRecord($formId, $recordId) {

    if (nuDeleteRowHasDeletePermission($formId)) {

        $tableInfo = nuDeleteRowGetFormTableInfo($formId);
        $tableName = $tableInfo[0];
        $tablePk = $tableInfo[1];

        $qry = "DELETE FROM `$tableName` WHERE `$tablePk` = ? ";

        nuRunQuery($qry, [$recordId]);

        // The function afterDeleteRow() must be declared in the form's Custom Code
        $j = "nuAfterDeleteRow();";
        nuJavascriptCallback($j);

    } else {
        nuDisplayError(nuTranslate("Delete is disabled for this Access Level"));
    }

}

nuDeleteRowDeleteRecord("#nu_browse_delete_row_form_id#", "#nu_browse_delete_row_record_id#");