

function deleteUnwantedSubfolders($path) {
    // Allowed folder names
    $allowedFolders = ["zh_CN", "vi", "tr", "sk", "ru", "ro", "pt_BR", "pt", "pl", "nl", "ja", "it", "hy", "fr", "es", "el", "de", "da", "cs", "ca", "ar"];
    
    // Ensure path is a directory
    if (!is_dir($path)) {
        return false;
    }
    
    // Scan directory
    $folders = scandir($path);
    
    foreach ($folders as $folder) {
        if ($folder === '.' || $folder === '..') {
            continue;
        }
        
        $fullPath = $path . DIRECTORY_SEPARATOR . $folder;
        
        // Check if it's a directory and not in the allowed list
        if (is_dir($fullPath) && !in_array($folder, $allowedFolders)) {
            deleteFolderRecursively($fullPath);
        }
    }
}

function deleteFolderRecursively($folderPath) {
    if (!is_dir($folderPath)) {
        return;
    }
    
    $files = array_diff(scandir($folderPath), ['.', '..']);
    
    foreach ($files as $file) {
        $filePath = $folderPath . DIRECTORY_SEPARATOR . $file;
        if (is_dir($filePath)) {
            deleteFolderRecursively($filePath);
        } else {
            unlink($filePath);
        }
    }
    
    rmdir($folderPath);
}

// Usage
deleteUnwantedSubfolders(__DIR__ . '/libs/nudb/locale');
