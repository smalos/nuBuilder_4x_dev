if (!nuGlobalAccess()) {
    return;
}

// PHP
$s = "SELECT sph_code, sph_php FROM `zzzzsys_php`";
$t = nuRunQuery($s);

while ($r = db_fetch_object($t)) {
    nuSetupDumpCodeFile('php_codes', $r->sph_code, $r->sph_php, '', "php");
}

// Object events
$s = "
    SELECT
        CONCAT(sfo_code, '_', sob_all_id, '_', zzzzsys_event_id) as id,
        sev_javascript
    FROM
        zzzzsys_object
    JOIN zzzzsys_event ON zzzzsys_event.sev_zzzzsys_object_id = zzzzsys_object.zzzzsys_object_id
    JOIN zzzzsys_tab ON zzzzsys_tab_id = sob_all_zzzzsys_tab_id
    JOIN zzzzsys_form ON zzzzsys_form_id = syt_zzzzsys_form_id
    WHERE
        IFNULL(sev_javascript, '') <> ''
";

$t = nuRunQuery($s);
while ($r = db_fetch_object($t)) {
    nuSetupDumpCodeFile('object_events', $r->id, $r->sev_javascript, '', "js");
}


// Form JS
$s = "SELECT sfo_code, sfo_javascript, sfo_browse_javascript, sfo_edit_javascript FROM `zzzzsys_form`";
$t = nuRunQuery($s);

while ($r = db_fetch_object($t)) {

    nuSetupDumpCodeFile('js_codes', $r->sfo_code, $r->sfo_javascript, 'sfo_javascript', "js");
    nuSetupDumpCodeFile('js_codes', $r->sfo_code, $r->sfo_edit_javascript, 'sfo_edit_javascript', "js");
    nuSetupDumpCodeFile('js_codes', $r->sfo_code, $r->sfo_browse_javascript, 'sfo_browse_javascript', "js");

}


function nuSetupDumpCodeFile($folder, $sfoCode, $code, $postfix, $extension) {
    $postfix = $postfix == '' ? '' : "_" . $postfix;
    $file = $sfoCode . $postfix . "." . $extension;
    $code = $code == NULL ? '' : $code;

    if (strlen($code) > 0) {
        $dir = dirname(__DIR__, 1) . DIRECTORY_SEPARATOR . "form_codes" . DIRECTORY_SEPARATOR . $folder . DIRECTORY_SEPARATOR;

        if (!file_exists($dir)) {
            mkdir($dir, 0777, true);
        }

        $file_path = $dir . $file;
        file_put_contents($file_path, $code);
    }
}