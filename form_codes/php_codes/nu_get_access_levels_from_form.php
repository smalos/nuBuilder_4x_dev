$decodedParams = nuGetProperty('params');
if ($decodedParams) {
	$parsedData = nuDecode($decodedParams);

	// Retrieve form IDs
	$sourceFormID = $parsedData['source_form_id'] ?? '';
	$destinationFormID = $parsedData['destination_form_id'] ?? '';

	// Retrieve boolean options (expected as 0 or 1)
	$deleteAllExisting = isset($parsedData['delete_all_existing']) ? (bool) $parsedData['delete_all_existing'] : false;
	$skipIfExists = isset($parsedData['skip_if_exists']) ? (bool) $parsedData['skip_if_exists'] : true;
	$overwriteIfExists = isset($parsedData['overwrite_if_exists']) ? (bool) $parsedData['overwrite_if_exists'] : true;

} 

// nuDebug($sourceFormID, $destinationFormID, $deleteAllExisting, $skipIfExists, $overwriteIfExists);

// Validate mutually exclusive options
if ($skipIfExists && $overwriteIfExists) {
	$js = " nuMessage(\"Error: 'skipIfExists' and 'overwriteIfExists' cannot both be set to true.\");";

	nuJavaScriptCallback($js);  
	return;
}

// If deletion is enabled, remove existing rows with the new form ID
if ($deleteAllExisting) { nuDebug('delete existing');
	$deleteSQL = "DELETE FROM zzzzsys_access_form WHERE slf_zzzzsys_form_id = ?";
	$deleteResult = nuRunQuery($deleteSQL, [$destinationFormID], true);

	// Check if the DELETE was successful
	if ($deleteResult === -1) {
		// Handle the error (optional)
		$error = nuGetLastError();
		nuDebug('Delete failed:', $error);
	}
}

// Prepare the SELECT query to fetch rows with the old form ID
$selectSQL = "
    SELECT
        slf_zzzzsys_access_id,
        slf_add_button,
        slf_save_button,
        slf_delete_button,
        slf_clone_button,
        slf_new_button,
        slf_print_button,
        slf_data_mode,
        slf_form_type,
        slf_json
    FROM
        zzzzsys_access_form
    WHERE
        slf_zzzzsys_form_id = ?
";

// Execute the SELECT query
$stmt = nuRunQuery($selectSQL, [$sourceFormID]);

// Loop through each fetched row
while ($row = db_fetch_object($stmt)) {
	// Check if a matching row exists in the new form
	$checkSQL = "
        SELECT zzzzsys_access_form_id FROM zzzzsys_access_form
        WHERE slf_zzzzsys_form_id = ? AND slf_zzzzsys_access_id = ?
        LIMIT 1
    ";
	$checkStmt = nuRunQuery($checkSQL, [$destinationFormID, $row->slf_zzzzsys_access_id]);
	$existingRow = db_fetch_object($checkStmt);

	if ($existingRow) {
		if ($skipIfExists) {
			// Matching row exists, skip insertion
			continue;
		} elseif ($overwriteIfExists) {
			// Delete the existing matching row
			$deleteMatchSQL = "
                DELETE FROM zzzzsys_access_form
                WHERE zzzzsys_access_form_id = ?
            ";
			$deleteMatchResult = nuRunQuery($deleteMatchSQL, [$existingRow->zzzzsys_access_form_id], true);

			// Check if the DELETE was successful
			if ($deleteMatchResult === -1) {
				// Handle the error (optional)
				$error = nuGetLastError();
				nuDebug('Delete matching row failed:', $error);
				continue; // Skip insertion if deletion fails
			}
		} else {
			// Matching row exists and neither skip nor overwrite is enabled, skip insertion
			continue;
		}
	}

	// Generate a new unique ID for the primary key
	$newID = nuID();

	// Prepare the INSERT query to duplicate the row with the new form ID and new primary key
	$insertSQL = "
        INSERT INTO zzzzsys_access_form (
            zzzzsys_access_form_id,
            slf_zzzzsys_access_id,
            slf_zzzzsys_form_id,
            slf_add_button,
            slf_save_button,
            slf_delete_button,
            slf_clone_button,
            slf_new_button,
            slf_print_button,
            slf_data_mode,
            slf_form_type,
            slf_json
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ";

	// Execute the INSERT query with the new values
	$params = [
		$newID,
		$row->slf_zzzzsys_access_id,
		$destinationFormID,
		$row->slf_add_button,
		$row->slf_save_button,
		$row->slf_delete_button,
		$row->slf_clone_button,
		$row->slf_new_button,
		$row->slf_print_button,
		$row->slf_data_mode,
		$row->slf_form_type,
		$row->slf_json
	];

	$result = nuRunQuery($insertSQL, $params, true);

	// Check if the INSERT was successful
	if ($result === -1) {
		// Handle the error (optional)
		$error = nuGetLastError();
		nuDebug('Insert failed:', $error);
	}
}


$js = " nuFormImportACLAfterRun();";
nuJavaScriptCallback($js); 