function sqlLanguage() {
    $sql = "SELECT DISTINCT trl_language FROM `zzzzsys_translate` ORDER BY trl_language ";
    return $sql;
}

function getBase64JsonDTString($sql) {
   $result = nuRunQuery($sql);
   $a = [];
   $a[] = '';
   while ($row = db_fetch_row($result)) {
     $a[] = $row;
   }
   return base64_encode(json_encode( $a ));
}

$language = getBase64JsonDTString(sqlLanguage());

$js = "

   function nuTranslationFilterGetLanguage() {
      return JSON.parse(atob('$language'));
   }
 
";

nuAddJavaScript($js);
