
function getCSVFiles() {

    $f = [];
    $dir = '../temp/';
    $dh = opendir($dir);
    while (false !== ($fileName = readdir($dh))) {
        $ext = substr($fileName, strrpos($fileName, '.') + 1);
        if (in_array($ext, [
            "txt",
            "csv",
            "tab",
            "asc"
        ])) $f[] = $fileName;
    }
    closedir($dh);
    return $f;
}

$f = getCSVFiles();
$a = [];

$countFiles = count($f);
for ($i = 0;$i < $countFiles;$i++) {

    if ($f[$i][0] != '.') {
        $a[] = "'" . $f[$i] . "'";
    }
}

nuAddJavaScript("console.log('init nuCSVfiles');  var nuCSVfiles = [" . implode(',', $a) . "];");

