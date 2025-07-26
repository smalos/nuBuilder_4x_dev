function nuFormGetPHP($record_id) {
    return db_fetch_value('zzzzsys_php', 'zzzzsys_php_id', $record_id, 'sph_php');
}

$val = nuEncode(nuFormGetPHP('nuuser_BB'));
$js = "nuSetValue('nu-code-textarea-php-bb', nuDecode('$val'));";

nuJavaScriptCallback($js);


nuDebug(nuEncode('1'));