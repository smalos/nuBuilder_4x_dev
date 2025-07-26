function getNuRunFileUppyHtmlSourceCombined() {

    $codes = ['nu_upload_file_uppy_code_template',
        'nu_upload_file_uppy_code'];
    foreach ($codes as $code) {
        $source = db_fetch_value(
            'zzzzsys_code_snippet',
            'cot_code',
            $code,
            'cot_source_code'
        );
        if ($source) {
            return $source;
        }
    }

    return false;

}

$source = getNuRunFileUppyHtmlSourceCombined();
if ($source !== false) {
    $source = base64_encode(json_encode($source));
    $js = "let htmlCode = $('#sob_html_code');
        nuSetValue('sob_html_code', htmlCode.val() + JSON.parse(atob('$source'))); ";

    nuJavaScriptCallback($js);
}