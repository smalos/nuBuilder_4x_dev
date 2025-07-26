$id = nuGetProperty('nu_update_object_id');
$value = nuGetProperty('nu_update_object_value');
$formId = nuGetProperty('nu_update_object_form_id');
$type = nuGetProperty('nu_update_object_type');
$column = nuGetProperty('nu_update_object_column');
$action = nuGetProperty('nu_update_object_action');

if ($action == 'move') {

        $query = "
            UPDATE
                `zzzzsys_object`
            SET
                `sob_all_zzzzsys_tab_id` = ?
            WHERE
                `sob_all_zzzzsys_form_id` = ? AND `sob_all_id` = ?
        ";

        nuRunQuery($query, [$column, $formId, $id]);

        $js = "if (nuIsSaved()) {
    	      nuGetBreadcrumb();
    	   } else {
    		  nuUpdateMessage('refresh_required');
    	}";
    	
    	nuJavaScriptCallback($js);
    	    
        return;
    
}

if ($action == 'delete') {

    $backupSQL = nuBuildInsertSQL(
        'zzzzsys_object',
        '`sob_all_zzzzsys_form_id` = ? AND `sob_all_id` = ?',
        [$formId, $id]
    );

    nuDebug("Object $id Deleted in form $formId", "SQL to restore it:", $backupSQL);

    if ($type == 'tab') {
        // not in use yet

        $query = "
            DELETE FROM `zzzzsys_tab`
            WHERE `zzzzsys_tab_id` = ?
        ";

        nuRunQuery($query, [$id]);

    } else if ($type == 'edit') {

        $query = "
            DELETE FROM `zzzzsys_object`
            WHERE `sob_all_zzzzsys_form_id` = ? AND `sob_all_id` = ?
        ";

        nuRunQuery($query, [$formId, $id]);

    } else {
        // not in use yet

        $query = "
            DELETE FROM `zzzzsys_browse`
            WHERE `sbr_zzzzsys_form_id` = ? AND `sbr_order` = ?
        ";

        nuRunQuery($query, [$formId, $id]);

    }


    $js = "nuHide('$id')";
    nuJavaScriptCallback($js);

    return;

}

if ($type == 'tab') {

    $query = "
            UPDATE `zzzzsys_tab`
            SET $column = ?
            WHERE `zzzzsys_tab_id` = ?
    ";

    nuRunQuery($query, [$value, $id]);

} else if ($type == 'edit') {

    $query = "
        UPDATE `zzzzsys_object`
        SET $column = ?
        WHERE `sob_all_zzzzsys_form_id` = ? AND `sob_all_id` = ?
    ";

    nuRunQuery($query, [$value, $formId, $id]);

} else {

    $query = "
            UPDATE `zzzzsys_browse`
            SET `$column` = ?
            WHERE `sbr_zzzzsys_form_id` = ? AND `sbr_order` = ?
    ";

    nuRunQuery($query, [$value, $formId, $id]);

}

function nuBuildInsertSQL($table, $whereClause, $params) {
    
    $query = "SELECT * FROM `$table` WHERE $whereClause";
    $result = nuRunQuery($query, $params);

    if (db_num_rows($result) === 0) {
        return null;
    }

    $row = db_fetch_array($result);

    $columns = array_keys($row);

    $values = array_map(function ($v) {
        if (is_null($v)) {
            return 'NULL';
        }
        return "'" . addslashes($v) . "'";
    },
        array_values($row));

    $colList = '`' . implode('`, `',
        $columns) . '`';
    $valList = implode(', ',
        $values);

    $insertSQL = "INSERT INTO `$table` ($colList) VALUES ($valList);";
    return $insertSQL;
    
}