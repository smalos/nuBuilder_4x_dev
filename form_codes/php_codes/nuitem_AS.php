// Don't store itm_created_on and itm_updated_on for nu-records:

// Get the current record ID
$recordID = '#RECORD_ID#';

// Check if it starts with 'nu'
if (strpos($recordID, 'nu') === 0) {
    
    // Prepare the SQL update
    $sql = "
        UPDATE zzzzsys_item 
        SET itm_created_on = NULL, 
            itm_updated_on = NULL 
        WHERE zzzzsys_item_id = ?
    ";

    // Execute the query with parameter binding

    nuRunQuery($sql, [$recordID]);
}
