require('../nuconfig.php');

nuSetJSONDataAll('REFRESH_CACHE','1');

$js = "

nuGetBreadcrumb();

function nuMsgCacheRefreshed() {
   nuMessage(nuTranslate('Information'), nuTranslate('Cache Refreshed'));
}
setTimeout(nuMsgCacheRefreshed, 1000); 

";

nuJavaScriptCallback($js);

