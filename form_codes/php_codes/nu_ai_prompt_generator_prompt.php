include_once 'nuai.php';

// Fetch and decode parameters
$paramsJson = nuGetProperty('nuaipromptgenerator_prompt_params');
if (empty($paramsJson)) {
    return; // nothing to do
}

$params = nuDecode($paramsJson);
$copy = $params['copy'] ?? false;

$outputString = nuAIPromptBuildPromptInformation($params);

// Embed safely into JavaScript via JSON encoding
$jsOutput = json_encode($outputString, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);

$js = <<<JS
(function() {
     const text = $jsOutput;
     nuGeneratorExecuted(text, $copy); 
})();
JS;

nuJavaScriptCallback($js);
