$getDistinctColumnQuery = function($column) {
    return "
        SELECT 
          DISTINCT TRIM($column) AS trimmed_col
        FROM 
          zzzzsys_php 
          LEFT JOIN zzzzsys_form ON zzzzsys_form_id = sph_zzzzsys_form_id 
        WHERE 
          IFNULL($column, '') <> ''
          AND (
            (
              sph_system != '1' OR sph_system IS NULL
            ) 
            OR (
              '#DEV_MODE#' = '1' AND LEFT(RIGHT(sph_code, 3), 1) <> '_'
            )
          ) 
        ORDER BY 
          trimmed_col
    ";
};

$sqlGroup = function() use ($getDistinctColumnQuery) {
    return $getDistinctColumnQuery('sph_group');
};

$sqlCategory = function() use ($getDistinctColumnQuery) {
    return $getDistinctColumnQuery('sph_category');
};

$group = nuEncodeQueryRowResults($sqlGroup(), [], ['']);
$category = nuEncodeQueryRowResults($sqlCategory(), [], ['']);

$filterJS = "
    function nuProcedureFilterGetData(data) {
        return JSON.parse(atob(data));
    }
    function nuProcedureFilterGetGroup() {
        return nuProcedureFilterGetData('$group');
    }
    function nuProcedureFilterGetCategory() {
        return nuProcedureFilterGetData('$category');
    }
";

nuAddJavaScript($filterJS);
