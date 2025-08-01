$allowedTypes = [
    // Documents
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/rtf',

    // Spreadsheets
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',

    // Presentations
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',

    // Text / Code
    'text/plain',
    'text/csv',
    'application/json',
    'application/xml',
    'text/xml',
    'application/javascript',
    'text/html',
    'text/css',

    // Archives
    'application/zip',
    'application/x-rar-compressed',
    'application/x-7z-compressed',

    // Images
    'image/png',
    'image/jpeg',
    'image/svg+xml',
    
    // Media
    'audio/mpeg',
    'video/mp4'
];

// Maximum file size
$maxFileSize = 5 * 1024 * 1024; // (5 MB)

// Target directory
$targetDirectory = $_SERVER['DOCUMENT_ROOT'] . '/';
// $targetDirectory = '../uploads/';

// Ensure the directory exists
if (!is_dir($targetDirectory)) {
    mkdir($targetDirectory, 0755, true);
}

try {

    // Sanitize file name
    $fileName = nuSanitizeFilename(basename($_FILES['file']['name']));

    // Check file size
    if ($_FILES['file']['size'] > $maxFileSize) {
        throw new Exception('Exceeded file size limit');
    }

    // Check file type
    $finfo = new finfo(FILEINFO_MIME_TYPE);
    if (!in_array($finfo->file($_FILES['file']['tmp_name']), $allowedTypes)) {
        throw new Exception('Invalid file type');
    }

    // Build target file path
    $targetFile = $targetDirectory . $fileName;

    if (move_uploaded_file($_FILES['file']['tmp_name'], $targetFile)) {
        $data = ['url' => $targetFile,
            'file' => $fileName,
            'message' => 'The file ' . $fileName . ' has been uploaded.'];
        http_response_code(201);
        $result = json_encode($data);
    } else {
        throw new Exception(nuTranslate('Unable to move the uploaded file to its final location:') . $targetFile);
    }

} catch(\Throwable $th) {

    $result = nuSetUploadError('Sorry, there was an error uploading your file.');

}