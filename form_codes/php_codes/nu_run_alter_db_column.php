if (nuHash() ['GLOBAL_ACCESS'] == '0') return;

$sql = 'ALTER TABLE `#sob_all_table#` CHANGE `#sob_all_id#` ' . '#sql_query#';
if (preg_match('[DELETE |DROP |INSERT |;]', strtoupper($sql))) {
    $r = - 2;
} else {
    $r = nuRunQuery($sql, [], true);
}

if ($r == 0) {
   nuSetJSONDataAll('REFRESH_CACHE','1');
   $js = "nuMessage(nuTranslate('Information'), nuTranslate('The column has been altered successfully')); parent.nuUpdateMessage('refresh_required');";
} else if ($r == - 1) {
    $js = "nuMessage(nuTranslate('Error'), nuTranslate('An error occured while altering the column'), nuTranslate('Check nuDebug Results for details'));";
} else if ($r == - 2) {
    $js = "nuMessage(nuTranslate('Error'), [nuTranslate('An error occured while altering the column'), nuTranslate('The query contains invalid keywords')]);";

}

nuJavaScriptCallback($js);