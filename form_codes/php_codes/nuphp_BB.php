$select  = "SELECT zzzzsys_php_id AS theid FROM zzzzsys_php WHERE sph_system != '1'";

nuCreateTableFromSelect('#TABLE_ID#', $select);