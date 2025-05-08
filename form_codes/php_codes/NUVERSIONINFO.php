$databaseSql = "SELECT CONCAT(@@version_comment, ' ', @@version)";
$nuDbSql = "SELECT inf_details FROM zzzzsys_info WHERE inf_code = ?";
$nuDbVersion = db_fetch_row(nuRunQuery($nuDbSql, ['nuDBVersion']))[0];
$nuFilesVersion = db_fetch_row(nuRunQuery($nuDbSql, ['nuFilesVersion']))[0];

$versionInfo =
'<h2>Version Info</h2><br>' .
'Database: ' . db_fetch_row(nuRunQuery($databaseSql))[0] . '<br>' .
'PHP: ' . phpversion() . '<br>' .
'nuBuilder DB: ' . $nuDbVersion . '<br>' .
'nuBuilder Files: ' . $nuFilesVersion;

$js = "nuMessage('$versionInfo').css('max-width','400px')";
nuJavaScriptCallback($js);