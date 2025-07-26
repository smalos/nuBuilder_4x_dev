function nuGetSelectValues($formId, $selectId) {

    $sql = "
        SELECT
            sob_select_sql
        FROM
            `zzzzsys_object`
        WHERE
            sob_all_zzzzsys_form_id = ? AND sob_all_id = ?
    ";

    $t = nuRunQuery($sql, [$formId, $selectId]);

    $a = [];
    if (db_num_rows($t) == 1) {

        $r = db_fetch_row($t);
        if ($r != false) {
            
            $disS = nuReplaceHashVariables($r[0]);

            $t = nuRunQuery($disS);

            while ($row = db_fetch_row($t)) {
                $a[] = $row;
            }

            return json_encode($a);
        }

    }

    return false;

}

function nuPopulateSelectObject($formId, $selectId, $removeBlank, $prefix) {

    $j = nuGetSelectValues($formId, $selectId);

    $selectId = $prefix.$selectId;

    $cb = "if (window.nuSelectObjectRefreshed) {
    	    nuSelectObjectRefreshed('$formId', '$selectId', nuSelectObjectRefreshedCount);
         }";

    if ($j == false) {
        
        return "var count = -1; ".$cb;
        
    } else {
    	
    return "
    	function nuPopulateSelectObject() {
    	
    		var p = $j;
    
    		$('#$selectId').empty();
    		
    		if ('$removeBlank' == '0' ) {
    		    $('#$selectId').append('<option value=\"\"></option>');
    		}
            
            var count = 0;
    
    		if (p != '') {
    		    var s = nuIsSaved();
    			
    			for (var i = 0; i < p.length; i++) {
    				$('#$selectId').append('<option value=\"' + p[i][0] + '\">' + p[i][1] + '</option>');
    				count ++;
    			}
    			
    			if (s) { nuHasNotBeenEdited(); }
    			
    		}
    		
    		return count;
    	}
    	
    	var nuSelectObjectRefreshedCount = nuPopulateSelectObject();

    ".$cb;
    }

}

function nu_refresh_select_object($selectId, $formIdHk, $removeBlank, $prefixHK) {

    if (!nuHasProperty($formIdHk, $formId, false)) {
        $formId = '#form_id#';
    }

    if (!nuHasProperty($prefixHK, $prefix, false)) {
        $prefix = '';
    }

    $js = nuPopulateSelectObject($formId, $selectId, $removeBlank, $prefix);
    nuJavaScriptCallback($js);

}

nu_refresh_select_object('#nu_refresh_select_object_selectid#', 'nu_refresh_select_object_formid', '#nu_refresh_select_object_removeblank#','nu_refresh_select_object_prefix');