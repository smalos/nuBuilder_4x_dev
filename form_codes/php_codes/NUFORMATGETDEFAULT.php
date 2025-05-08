$inputType = nuGetProperty('NUFORMATGETDEFAULT_INPUTTYPE');
$formats = nuGetDefaultFormats();
$default = $formats[$inputType];

$js  = " nuSetDefaultFormat('$default'); ";

nuJavaScriptCallback($js);

