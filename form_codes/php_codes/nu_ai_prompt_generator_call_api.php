include_once 'nuai.php';

// 1. Fetch the raw JSON params
$paramsJson = nuGetProperty('nuaipromptgenerator_params');
if (empty($paramsJson)) {
    return; // nothing to do
}

// 2. Decode
$params       = nuDecode($paramsJson);
$procedure    = $params['procedure_type'] ?? null;
$buttonId     = $params['buttonId']       ?? null;

// 3. Dispatch based on procedure_type
switch ($procedure) {
    case 'response':
        $response     = nuAIPromptGetResponse($params);
        $callbackName = 'nuGeneratorResponseExecuted';
        break;

    case 'tag':
        $response     = nuAIPromptGetTagsFromPrompt($params);
        $callbackName = 'nuGeneratorExecutedTags';
        break;

    // --- add new cases here ---
    // case 'something_else':
    //     $response     = nuAIPromptDoSomethingElse($params);
    //     $callbackName = 'nuGeneratorSomethingElseExecuted';
    //     break;

    default:
        // unknown procedure — return or fire a generic error callback
        $errorMsg = json_encode("Unknown procedure: {$procedure}");
        nuJavaScriptCallback("(function(){ console.error({$errorMsg}); })();");
        return;
}

// 4. Determine error vs. success
$isError = ! empty($response['error']);
$payload = $isError
    ? $response['message']
    : $response['result'];

// 5. JSON-encode for JS
$buttonJs = json_encode($buttonId, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
$dataJs   = json_encode($payload,  JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);

// 6. Build & fire the callback
$js = sprintf(
    "(function(){%s(%s, %s, %s);})();",
    $callbackName,
    $buttonJs,
    $dataJs,
    $isError ? 'false' : 'true'
);

nuJavaScriptCallback($js);
