$lu = nuLookupRecord();

// run not accessible when using temp tables
// $runType = empty($lu->run) ? '' : substr($lu->run, 0, 1);
// Workaround:
$runType = nuRunType('', $lu->ID);
nuSetFormValue('sob_run_type',  $runType);