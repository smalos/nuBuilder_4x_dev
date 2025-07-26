require_once('nusecurity.php');

$file = nuGetProperty('nu_import_users_file');
$delimiter = nuGetProperty('nu_import_users_delimiter');

nuImportUsersFromCSV("../temp/".$file, $delimiter, "\n");