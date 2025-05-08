$r = nuLookupRecord();

if (isset($r->zzzzsys_report_data_id)) {
    $tt	= nuTTList($r->zzzzsys_report_data_id, 'nublank');				    //-- Field list from Temp table
    
    nuSetFormValue('fieldlist', json_encode($tt));
}
