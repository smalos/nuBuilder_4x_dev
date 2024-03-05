$select = "SELECT zzzzsys_form_id AS theid FROM zzzzsys_form WHERE ";
$denied = $GLOBALS['nuSetup']->set_denied == 1;
$where = $denied ? "zzzzsys_form_id NOT LIKE 'nu%' OR zzzzsys_form_id = 'nuuserhome'" : "1";

nuCreateTableFromSelect('#TABLE_ID#', $select.$where);