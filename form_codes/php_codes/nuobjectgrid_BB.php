$select = "SELECT zzzzsys_form_id AS theid FROM zzzzsys_form WHERE ";
$where = "1";
if ($GLOBALS['nuSetup']->set_denied == 1) {
    $where = "zzzzsys_form_id NOT LIKE 'nu%' OR zzzzsys_form_id = 'nuuserhome'";
}

nuCreateTableFromSelect('#TABLE_ID#', $select.$where);