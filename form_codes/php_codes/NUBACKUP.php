// Use the correct namespace
use Ifsnop\Mysqldump\Mysqldump;

// Get the JSON settings passed from JS via the 'params' property
$params = nuGetProperty('NUBACKUP_params');
$settings = $params ? nuDecode($params)['settings'] : [];

// Call backup process using the decoded settings
nuBackupRun($settings);

function nuBackupRun($settings) {

	nuBackupLoadMysqldumpLibrary(__DIR__ . '/libs/mysqldump/Mysqldump.php');

	// Extract values with defaults using null coalescing operator
	$directory = $settings['directory'] ?? '';
	$fileName = $settings['fileName'] ?? '';
	$includeTables = $settings['include-tables'] ?? [];
	$excludeTables = $settings['exclude-tables'] ?? [];
	$includeViews = $settings['include-views'] ?? [];
	$nuRecordsFilter = $settings['nuRecordsFilter'] ?? ''; // nu, user, empty = all (default)
	unset($settings['nuRecordsFilter']);
	
	$nuTableFilter = $settings['nuTableFilter'] ?? ''; // nu, user, empty = all (default)
	unset($settings['nuTableFilter']);

	// Merge default dump settings with any settings passed from JS
	$dumpSettings = nuBackupBuildDumpSettings($settings);

	// Prepare the backup directory and filename
	$backupDirectory = nuBackupDirectory($directory);
	$backupFileName = nuBackupFileName($fileName, $dumpSettings);

	// Set which tables to include/exclude
	nuBackupSetTables($dumpSettings, $includeTables, $excludeTables, $includeViews, $nuTableFilter);

	$dumper = nuBackupCreateDumper($dumpSettings);

	$tableWheres = nuBackupBuildTableWheres($nuRecordsFilter);
	$dumper->setTableWheres($tableWheres);

    $backupDirectory = str_replace(['/', '\\'], DIRECTORY_SEPARATOR, $backupDirectory);
	$dumpFile = $backupDirectory . nuSanitizeFilename($backupFileName);
	nuBackupCreateDirectoryIfNotExists($backupDirectory);

	nuBackupStartDump($dumper, $dumpFile);

	nuBackupCompleteNotification($backupDirectory, $backupFileName);
}

function nuBackupFileExtension($dumpSettings) {
	if (!array_key_exists('compress', $dumpSettings) || $dumpSettings['compress'] === 'None' || $dumpSettings['compress'] === '') {
		return '';
	}
	return '.' . strtolower($dumpSettings['compress']);
}

function nuBackupDirectory($directory) {
	// If directory is provided, use it; otherwise use default path
	return !empty($directory) ? $directory : __DIR__ . '/libs/mysqldump/dumps/';
}

function nuBackupFileName($fileName, $dumpSettings) {
	// If fileName is provided, use it; otherwise generate a default filename
	$extension = nuBackupFileExtension($dumpSettings);

	return !empty($fileName)
		? $fileName . $extension
		: date('Y-m-d_H:i:s') . '_' . uniqid() . '_nuBuilder_backup.sql' . $extension;

}

function nuBackupBuildDumpSettings($settings = []) {

	$defaults = [
		'single-transaction' => false,
		'no-create-info' => false,
		'lock-tables' => false,
		'add-locks' => false,
		'extended-insert' => false,
		'skip-definer' => true,
		'routines' => true,
                'events' => true,
		'compress' => $settings['compress'] ?? 'None' // Mysqldump::NONE
	];

																	   
												
																 
  
  
	return array_merge($defaults, $settings);

}

function nuBackupLoadMysqldumpLibrary($path) {
	try {
		require_once($path);
	} catch (Exception $e) {
		nuDisplayError('require_once failed! Error: ' . $e->getMessage());
	}
}

function nuBackupCreateDumper($dumpSettings) {
	global $nuConfigDBHost,
	$nuConfigDBName,
	$nuConfigDBUser,
	$nuConfigDBPassword,
	$nuConfigDBPort;
	$nuConfigDBPort = $nuConfigDBPort ?? '3306';
	$dsn = "mysql:host={$nuConfigDBHost};dbname={$nuConfigDBName};port={$nuConfigDBPort}";
	return new Ifsnop\Mysqldump\Mysqldump($dsn, $nuConfigDBUser, $nuConfigDBPassword, $dumpSettings);
}

function nuBackupBuildTableWheres($nuRecordsFilter = '') {
	$tableWheres = [
		"zzzzsys_session" => "zzzzsys_session_id not like 's%'"
	];

	if (in_array($nuRecordsFilter, ['user', 'nu'])) {
		$sysTables = nuGetSysTables();
		$conditionFunction = ($nuRecordsFilter === 'user') ? 'nuBackupTableIdNotLikeNu' : 'nuBackupTableIdLikeNu';
		foreach ($sysTables as $tableName) {
		    if ($tableName !== 'zzzzsys_session') {
			    $tableWheres[$tableName] = $conditionFunction($tableName);
		    }
		}
	}

	return $tableWheres;
}

function nuBackupTableIdNotLikeNu($tableName) {
	return "{$tableName}_id not like 'nu%'";
}

function nuBackupTableIdLikeNu($tableName) {
	return "{$tableName}_id like 'nu%'";
}

function nuBackupCreateDirectoryIfNotExists($directory) {
	if (!is_dir($directory)) {
		mkdir($directory, 0755, true);
	}
}

function nuBackupStartDump($dumper, $dumpFile) {
	try {
		$dumper->start($dumpFile);
	} catch (Exception $e) {
		nuDisplayError('Export Error: ' . $e->getMessage());
	}
}

function nuBackupCompleteNotification($backupDirectory, $backupFileName) {
	$encodedPath = base64_encode($backupDirectory . $backupFileName);
	$js = "nuMessage(['<h2>Export completed!</h2><br>SQL Dump saved in ' + atob('$encodedPath')]);";
	nuJavaScriptCallback($js);
}

function nuBackupSetTables(&$dumpSettings, $includeTables, $excludeTables, $includeViews, $nuTableFilter) {

	$dumpSettings["include-tables"] = is_array($includeTables) ? $includeTables : [];
	$dumpSettings["exclude-tables"] = is_array($excludeTables) ? $excludeTables : [];
	$dumpSettings["include-views"] = is_array($includeViews) ? $includeViews : [];

    if ($nuTableFilter === 'nu') {
        $dumpSettings["include-tables"] = array_merge($dumpSettings["include-tables"], nuGetSysTables());
        $dumpSettings["exclude-tables"] = array_merge($dumpSettings["exclude-tables"], nuGetUserTables());
    } else if ($nuTableFilter === 'user') {
        $dumpSettings["exclude-tables"] = array_merge($dumpSettings["exclude-tables"], nuGetSysTables());
        $dumpSettings["include-tables"] = array_merge($dumpSettings["exclude-tables"], nuGetUserTables());
    }

}
