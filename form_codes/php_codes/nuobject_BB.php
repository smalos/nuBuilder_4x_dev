$select = "SELECT zzzzsys_object_id AS theid FROM zzzzsys_object WHERE ";
$where = "1";
if ($GLOBALS['nuSetup']->set_denied == 1) {
    $where = "sob_all_zzzzsys_form_id NOT LIKE 'nu%' OR sob_all_zzzzsys_form_id = 'nuuserhome'";
}

nuCreateTableFromSelect('#TABLE_ID#', $select.$where);