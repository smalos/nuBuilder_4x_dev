include_once 'nuai.php';


$result = nuAITestCredentials();

if ($result['success']) {
    // Credentials are good
    echo $result['message'];            // e.g. “Credentials are valid!”
} else {
    // Something went wrong
    // You can log full details if you like:
   // error_log("OpenAI test failed ({$result['http_code']}) Raw response: {$result['raw']}");
    
    // And display a user‐friendly message:
    echo "Error testing credentials: " . $result['message'];
}