function nuGetDisplayValue($formId, $obj) {

    $sql = "SELECT sob_display_sql FROM `zzzzsys_object` WHERE sob_all_zzzzsys_form_id = ? AND sob_all_id = ?";

    $t = nuRunQuery($sql, [$formId, $obj]);

    if (db_num_rows($t) == 1) {
        $r = db_fetch_row($t);
        if ($r != false) {

            $disS = nuReplaceHashVariables($r[0]);
            $disT = nuRunQuery($disS);

            if (db_num_rows($disT) >= 1) {
                $disR = db_fetch_row($disT);
                return $disR[0];
            } else {
                return "";
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
		$js = "nuMessage([nuTranslate('Failed to refresh the Display Object: ') + '$displayId']); ";
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