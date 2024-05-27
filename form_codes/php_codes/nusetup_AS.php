function nuSetupWriteVersionToFile($dbVersion, $filesVersion) {

    $f = fopen(__DIR__ . '/../version.txt', "w+") or die("Unable to open file!");
    fwrite($f, "nuBuilder Forte 4.5\n\n");
    fwrite($f, "DB Version: "."$dbVersion\n");
    fwrite($f, "Files Version: "."$filesVersion\n\n");
    fwrite($f, "(V.MajorVersion-CurrentDate.BuildNumber)");
    fclose($f);

}


$DEV_MODE = '#DEV_MODE#' == '1';

// Write Version Info

if ($DEV_MODE) {

    nuSetupSetConfigOrder();

    $nuDumpCodes = nuProcedure('NUDUMPFORMCODES');
    eval($nuDumpCodes);

    $nuNewDBV = '#set_db_version_inc#';
    if ($nuNewDBV != '') {
        $qry = "UPDATE zzzzsys_info SET inf_details = ? WHERE  inf_code = 'nuDBVersion'";
        nuRunQuery($qry, [$nuNewDBV]);
        $nuDBV = $nuNewDBV;
    } else {
        $nuDBV = '#set_db_version#';
    }

    $nuNewFilesV = '#set_files_version_inc#';
    if ($nuNewFilesV != '') {
        $qry = "UPDATE zzzzsys_info SET inf_details = ? WHERE  inf_code = 'nuFilesVersion'";
        nuRunQuery($qry, [$nuNewFilesV]);
        $nuFilesV = $nuNewFilesV;
    } else {
        $nuFilesV = '#set_files_version#';
    }

    if ($nuNewFilesV != '' || $nuNewDBV != '') {
        nuSetupWriteVersionToFile($nuDBV, $nuFilesV);
    }

    if ('#set_dev_reset_tables#' == true) {

        $lang = array('["Afrikaans","Arabic","Armenian","Catalan","Chinese","Czech","Danish","Dutch","French","German","Greek","Hindi","Italian","Japanese","Malay","Polish","Portuguese","Romanian","Russian","Spanish","Tamil","Vietnamese"]');
        nuRunQuery('UPDATE zzzzsys_setup SET set_languages_included = ?, set_language = NULL WHERE zzzzsys_setup_id = 1', $lang);

        nuResetEmailSettings();

        $q = "
                DELETE FROM `zzzzsys_user`;
                DELETE FROM `zzzzsys_access`;
                DELETE FROM `zzzzsys_access_form`;
                DELETE FROM `zzzzsys_access_php`;
                DELETE FROM `zzzzsys_access_report`;
                DELETE FROM `zzzzsys_cloner`;
                DELETE FROM `zzzzsys_file` WHERE `sfi_group` <> 'nubuilder';
                DELETE FROM `zzzzsys_format` WHERE `zzzzsys_format_id` NOT LIKE 'nu%';
                DELETE FROM `zzzzsys_note`;
                DELETE FROM `zzzzsys_email_template` WHERE `zzzzsys_email_template_id` NOT LIKE 'nu%';
                DELETE FROM `zzzzsys_note_category`;
                DELETE FROM `zzzzsys_select` WHERE `zzzzsys_select_id` NOT LIKE 'nu%';
                DELETE FROM `zzzzsys_select_clause` WHERE `zzzzsys_select_clause_id` NOT LIKE 'nu%';
                DELETE FROM `zzzzsys_php` WHERE IFNULL(`sph_php`, '') = '';
                DELETE FROM `zzzzsys_translate`;
                DELETE FROM `zzzzsys_permission_item`;
                DELETE FROM `zzzzsys_user_permission`;
                DELETE FROM `zzzzsys_email_log`;
                DELETE FROM `zzzzsys_report_data`;
                UPDATE `zzzzsys_object` SET `sob_input_attribute` = NULL WHERE `sob_input_attribute` = '';
                UPDATE `zzzzsys_form` SET `sfo_browse_javascript` = NULL WHERE TRIM(`sfo_browse_javascript`) = '';
                UPDATE `zzzzsys_form` SET `sfo_javascript` = NULL WHERE TRIM(`sfo_javascript`) = '';
                UPDATE `zzzzsys_tab` SET `syt_access` = NULL WHERE TRIM(`syt_access`) = '';
                UPDATE `zzzzsys_tab` SET `syt_order` = '-1' WHERE `zzzzsys_tab_id` = 'nufastforms';
                DELETE FROM `zzzzsys_debug`;
                DELETE FROM `zzzzsys_session`;
        ";

        nuRunQuery($q);

        nuSetupSetDefaultValues();


    }

}

function nuResetEmailSettings() {

    $update =

    "
        UPDATE `zzzzsys_setup`
        SET
           `set_smtp_username` = '1',
          `set_smtp_password` = '1',
          `set_smtp_host` = '1',
          `set_smtp_from_address` = '1',
          `set_smtp_from_name` = '1',
          `set_smtp_port` = '1',
          `set_smtp_use_authentication` = '1',
          `set_smtp_use_ssl` = '1'
       ";

    nuRunQuery($update);

}

function nuSetupSetDefaultValues() {

    $columns = db_field_names('zzzzsys_object');
    foreach ($columns as $name) {

        if ($name === 'sob_all_label') {
            $newValue = '';
        } else {
            $newValue = null;
        }

        nuRunQuery("UPDATE `zzzzsys_object` SET `$name` = ? WHERE TRIM(IFNULL($name,'')) = '' ", [$newValue]);

    }
    
    
    nuRunQuery("UPDATE `zzzzsys_object` SET sob_all_label = ' ' WHERE `sob_all_type` LIKE 'subform' AND IFNULL(sob_all_label,'') = '' ");

}

function nuImportSelectedLanguageFiles($l) {
    try {
        for ($i = 0; $i < count($l); $i++) {
            if (trim($l[$i]) == '') continue;
            $file = dirname(__FILE__). '/languages/'. $l[$i].'.sql';
            $sql = file_get_contents($file);
            if ($sql) {
                nuRunQuery($sql);
            } else {
                nuDisplayError("Error opening the file: $file");
            }
        }
    }catch (Exception $e) {
        nuDisplayError(nuTranslate('<h2>'.nuTranslate('Error').'</h2><br>Error while importing language files.'));
    }
}

function nuSetupSetConfigOrder() {

    $select = "SELECT zzzzsys_config_id FROM `zzzzsys_config` ORDER BY `zzzzsys_config`.`cfg_order` ASC";
    $stmt = nuRunQuery($select);

    $i = 10;
    while ($row = db_fetch_array($stmt)) {

        $s = "UPDATE `zzzzsys_config` SET cfg_order = ? WHERE `zzzzsys_config_id`  = ?";
        nuRunQuery($s, [$i, $row['zzzzsys_config_id']]);
        $i = $i + 10;

    }

}


// Include/Exclude languages
$t = "#set_languages_included_json#";

if ($t != '-1') {
    // no language change

    nuRunQuery("DELETE FROM zzzzsys_translate WHERE zzzzsys_translate_id LIKE 'nu%'");
    if ($t != '') nuImportSelectedLanguageFiles(json_decode($t));

}

if ('#set_language_current#' != '#set_language#') {
    $_SESSION['nubuilder_session_data']['translation'] = nuGetTranslation('#set_language#');
}

// Check if header textarea changed

if ('#set_header_current#' != '#set_header#') {
    nuDisplayError(nuTranslate('<h2>'.nuTranslate('Information').'</h2><br>You will need to log in again for the changes to take effect.'));
}