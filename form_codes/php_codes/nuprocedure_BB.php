
$getDistinctGroupColumnQuery = function($column) {
    return "
        SELECT 
          DISTINCT TRIM(`$column`) 
        FROM 
          zzzzsys_php 
          LEFT JOIN zzzzsys_form ON zzzzsys_form_id = sph_zzzzsys_form_id 
        WHERE 
          (
            IFNULL(sph_group, '') <> '' 
            AND (
              (
                sph_system != '1' OR sph_system IS NULL
              ) 
              OR (
                '#DEV_MODE#' = '1' AND LEFT(RIGHT(sph_code, 3), 1) <> '_'
              )
            )
          ) 
        ORDER BY 
          `$column`
    ";
};

$sqlGroup = function() use ($getDistinctGroupColumnQuery) {
    return $getDistinctGroupColumnQuery('sph_group');
};

$group = nuEncodeQueryRowResults($sqlGroup(), [], ['']);

$filterJS = "
    function getData(data) {
        return JSON.parse(atob(data));
    }
    function getGroup() {
        return getData('$group');
    }
";

nuAddJavaScript($filterJS);
