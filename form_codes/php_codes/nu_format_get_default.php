$inputType = nuGetProperty('nu_format_get_default_input_type');
$formats = nuGetDefaultFormats();
$default = $formats[$inputType];

$js = "nuSetDefaultFormat('$default'); ";

nuJavaScriptCallback($js);