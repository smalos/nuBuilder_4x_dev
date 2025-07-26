$DEV_MODE = '#DEV_MODE#' == '1';
if ($DEV_MODE) {
     if (nuSetupHasNonNuPrefixes()) {
         return;
     }
}

function nuSetupHasNonNuPrefixes() {

    $select = "
        SELECT 'zzzzsys_browse', `zzzzsys_browse_id` FROM `zzzzsys_browse` WHERE `zzzzsys_browse_id` NOT LIKE 'nu%' UNION ALL
        SELECT 'zzzzsys_cloner', `zzzzsys_cloner_id` FROM `zzzzsys_cloner` WHERE `zzzzsys_cloner_id` NOT LIKE 'nu%' UNION ALL
        SELECT 'zzzzsys_code_snippet', `zzzzsys_code_snippet_id` FROM `zzzzsys_code_snippet` WHERE `zzzzsys_code_snippet_id` NOT LIKE 'nu%' UNION ALL
        SELECT 'zzzzsys_config', `zzzzsys_config_id` FROM `zzzzsys_config` WHERE `zzzzsys_config_id` NOT LIKE 'nu%' UNION ALL
        SELECT 'zzzzsys_debug', `zzzzsys_debug_id` FROM `zzzzsys_debug` WHERE `zzzzsys_debug_id` NOT LIKE 'nu%' UNION ALL
        SELECT 'zzzzsys_email_log', `zzzzsys_email_log_id` FROM `zzzzsys_email_log` WHERE `zzzzsys_email_log_id` NOT LIKE 'nu%' UNION ALL
        SELECT 'zzzzsys_email_template', `zzzzsys_email_template_id` FROM `zzzzsys_email_template` WHERE `zzzzsys_email_template_id` NOT LIKE 'nu%' UNION ALL
        SELECT 'zzzzsys_event', `zzzzsys_event_id` FROM `zzzzsys_event` WHERE `zzzzsys_event_id` NOT LIKE 'nu%' UNION ALL
        SELECT 'zzzzsys_file', `zzzzsys_file_id` FROM `zzzzsys_file` WHERE `zzzzsys_file_id` NOT LIKE 'nu%' UNION ALL
        SELECT 'zzzzsys_form', `zzzzsys_form_id` FROM `zzzzsys_form` WHERE `zzzzsys_form_id` NOT LIKE 'nu%' UNION ALL
        SELECT 'zzzzsys_format', `zzzzsys_format_id` FROM `zzzzsys_format` WHERE `zzzzsys_format_id` NOT LIKE 'nu%' UNION ALL
        SELECT 'zzzzsys_info', `zzzzsys_info_id` FROM `zzzzsys_info` WHERE `zzzzsys_info_id` NOT LIKE 'nu%' UNION ALL
        SELECT 'zzzzsys_note', `zzzzsys_note_id` FROM `zzzzsys_note` WHERE `zzzzsys_note_id` NOT LIKE 'nu%' UNION ALL
        SELECT 'zzzzsys_note_category', `zzzzsys_note_category_id` FROM `zzzzsys_note_category` WHERE `zzzzsys_note_category_id` NOT LIKE 'nu%' UNION ALL
        SELECT 'zzzzsys_object', `zzzzsys_object_id` FROM `zzzzsys_object` WHERE `zzzzsys_object_id` NOT LIKE 'nu%' UNION ALL
        SELECT 'zzzzsys_permission_item', `zzzzsys_permission_item_id` FROM `zzzzsys_permission_item` WHERE `zzzzsys_permission_item_id` NOT LIKE 'nu%' UNION ALL
        SELECT 'zzzzsys_php', `zzzzsys_php_id` FROM `zzzzsys_php` WHERE `zzzzsys_php_id` NOT LIKE 'nu%' UNION ALL
        SELECT 'zzzzsys_report', `zzzzsys_report_id` FROM `zzzzsys_report` WHERE `zzzzsys_report_id` NOT LIKE 'nu%' UNION ALL
        SELECT 'zzzzsys_select', `zzzzsys_select_id` FROM `zzzzsys_select` WHERE `zzzzsys_select_id` NOT LIKE 'nu%' UNION ALL
        SELECT 'zzzzsys_select_clause', `zzzzsys_select_clause_id` FROM `zzzzsys_select_clause` WHERE `zzzzsys_select_clause_id` NOT LIKE 'nu%' UNION ALL
        SELECT 'zzzzsys_tab', `zzzzsys_tab_id` FROM `zzzzsys_tab` WHERE `zzzzsys_tab_id` NOT LIKE 'nu%' UNION ALL
        SELECT 'zzzzsys_translate', `zzzzsys_translate_id` FROM `zzzzsys_translate` WHERE `zzzzsys_translate_id` NOT LIKE 'nu%' UNION ALL
        SELECT 'zzzzsys_user_permission', `zzzzsys_user_permission_id` FROM `zzzzsys_user_permission` WHERE `zzzzsys_user_permission_id` NOT LIKE 'nu%' UNION ALL
        SELECT 'sob_all_zzzzsys_tab_id', `sob_all_zzzzsys_tab_id` FROM `zzzzsys_object` WHERE `sob_all_zzzzsys_tab_id` NOT LIKE 'nu%' UNION ALL
        SELECT 'sob_all_zzzzsys_form_id', `sob_all_zzzzsys_form_id` FROM `zzzzsys_object` WHERE `sob_all_zzzzsys_form_id` NOT LIKE 'nu%' UNION ALL
        SELECT 'sob_run_zzzzsys_form_id', `sob_run_zzzzsys_form_id` FROM `zzzzsys_object` WHERE `sob_run_zzzzsys_form_id` NOT LIKE 'nu%' AND IFNULL(sob_run_zzzzsys_form_id, '') != '' UNION ALL
        SELECT 'sob_lookup_zzzzsys_form_id', `sob_lookup_zzzzsys_form_id` FROM `zzzzsys_object` WHERE `sob_lookup_zzzzsys_form_id` NOT LIKE 'nu%' AND IFNULL(sob_lookup_zzzzsys_form_id, '') != ''  UNION ALL
        SELECT 'sob_subform_zzzzsys_form_id', `sob_subform_zzzzsys_form_id` FROM `zzzzsys_object` WHERE `sob_subform_zzzzsys_form_id` NOT LIKE 'nu%' AND IFNULL(sob_subform_zzzzsys_form_id, '') != '' ;
    ";
    
    $stmt = nuRunQuery($select);

    if (db_num_rows($stmt) > 0) {
        $msg = 'Rows with no nu-prefixes found:<br>';
        while($row = db_fetch_row($stmt)){
             $msg .= $row[0]."->".$row[1]."<br>";
        }
    
        nuDisplayError($msg);
        false;
    }
    
    return true;

}

function nuConfigValueToTable($line, $setting, $oldValue) {

    $parts = explode("=", $line);

    $newValue = $parts[1];
    $newValue = str_replace('"', "", $newValue);
    $newValue = str_replace("'", "", $newValue);

    $partsValue = explode(";", $newValue);
    $newValue = trim($partsValue[0]);

    $update = $newValue != $oldValue;

    if ($setting == 'nuCalendarStartOfWeek' && strlen($newValue) > 1) {
        $newValue = str_replace("Monday", "1", $newValue);
        $newValue = str_replace("Sunday", "0", $newValue);
    }

    if ($update) nuRunQuery('UPDATE zzzzsys_config SET cfg_value = ? WHERE cfg_setting = ?', [$newValue, $setting]);

    return $update;

}

if ("#configImport#" == '1') {

    // Import config settings form nuconfig.php
    $s = "SELECT cfg_setting, cfg_value AS old_value FROM zzzzsys_config ";
    $t = nuRunQuery($s);
    $config = file(__DIR__ ."/../nuconfig.php");

    while ($r = db_fetch_object($t)) {

        foreach ($config as $line) {
            if (trim($line) !== '' && nuStringContains($r->cfg_setting, $line) == true) {
                nuConfigValueToTable($line, $r->cfg_setting, $r->old_value);
                break;
            }

        }

    }

}