function nuGetDisplayValue($formId, $id) {
	
    $sql = "SELECT sob_display_sql, sob_display_procedure FROM `zzzzsys_object` WHERE sob_all_zzzzsys_form_id = ? AND sob_all_id = ?";
    $selectObject = nuRunQuery($sql, [$formId, $id]);
	
    if (db_num_rows($selectObject) == 1) {
        $obj = db_fetch_object($selectObject);
        
        if ($obj != false) {
		
            $displayProcedure = $obj->sob_display_procedure;
            
            if (empty($displayProcedure)) {
              
                $disS = nuReplaceHashVariables($obj->sob_display_sql);
                $disT = nuRunQuery($disS);

                if (db_num_rows($disT) >= 1) {
                    $disR = db_fetch_row($disT);
                    return $disR[0];
                } else {
                    return "";
                }
				
            } else {

                $procedureCode = nuProcedure($displayProcedure);
                if ($procedureCode !== '') {
                    return nuEval($displayProcedure, $procedureCode);
                } else {
                    return false;
                }
            }
        }
    }

    return false;
}


function nuRefreshDisplayObject($displayId, $formIdHk, $prefixHK) {

    if (!nuHasProperty($formIdHk, $formId, false)) {
        $formId = '#form_id#';
    }

    if (!nuHasProperty($prefixHK, $prefix, false)) {
        $prefix = '';
    }

	$value = nuGetDisplayValue($formId, $displayId);
	$displayId = $prefix.$displayId;
		
	if ($value === false && $value !== '') {
		$js = "nuMessage(nuTranslate('Error'), nuTranslate('Failed to refresh the Display Object:') + ' $displayId'); ";
	} else {

		$js = " 
		    
		    function nuRefreshDisplayObjectSetNewValue(displayId, value) {
    			let obj = $('#' + displayId);
    			const format = obj.attr('data-nu-format');
    			const formattedValue = nuFORM.addFormatting(value, format);
    			nuSetValue(displayId, formattedValue);
		    }

		    nuRefreshDisplayObjectSetNewValue('$displayId', '$value');
			
			if (window.nuDisplayObjectRefreshed) {
				nuDisplayObjectRefreshed('$displayId', '$formId');
			}
		";
	}
    
    nuJavaScriptCallback($js);

}

nuRefreshDisplayObject('#NUREFRESHDISPLAYOBJECT_displayid#', 'NUREFRESHDISPLAYOBJECT_formid','NUREFRESHDISPLAYOBJECT_prefix');