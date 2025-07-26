// Temp table
$denied = $GLOBALS['nuSetup']->set_denied == 1;

$condition = $denied
? "(zzzzsys_form_id NOT LIKE 'nu%' OR zzzzsys_form_id = 'nuuserhome')"
: "1=1";

$sql = "
    SELECT *
    FROM zzzzsys_form
    WHERE $condition
    ORDER BY sfo_code
";

nuCreateTableFromSelect('#TABLE_ID#', $sql);


// Group Filter
$getDistinctGroupColumnQuery = function($column, $condition) {
    return "
        SELECT
          DISTINCT TRIM(`$column`)  AS trimmed_group
        FROM
          zzzzsys_form
        WHERE
          $condition AND (
            IFNULL(`$column`, '') <> '')
        ORDER BY
          trimmed_group
    ";
};

$sqlGroup = function($condition) use ($getDistinctGroupColumnQuery) {
    return $getDistinctGroupColumnQuery('sfo_group', $condition);
};

$group = nuEncodeQueryRowResults($sqlGroup($condition), [], ['']);

$filterJS = "
    function nuFormFilterGetData(data) {
        return JSON.parse(atob(data));
    }
    function nuFormFilterGetGroup() {
        return nuFormFilterGetData('$group');
    }
";

nuAddJavaScript($filterJS);