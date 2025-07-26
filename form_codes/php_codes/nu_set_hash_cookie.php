$name = '#nu_set_hash_cookie_name#';
$value = '#nu_set_hash_cookie_value#';

nuSetProperty($name, $value, true);


$js = "
    if(window.nuOnPropertySet){
        nuOnPropertySet('$name', '$value');
    }
";

nuJavaScriptCallback($js);