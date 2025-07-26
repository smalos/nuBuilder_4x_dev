$getDistinctUserColumnQuery = function($column) {

    $sqlWhereExpired = "(
        (('#nu5fe0352637b2e4f_filter#' LIKE '#%' OR '#nu5fe0352637b2e4f_filter#' = '') AND (sus_expires_on > NOW() OR sus_expires_on IS NULL)) OR
        ('#nu5fe0352637b2e4f_filter#' = 'Expired' AND sus_expires_on < NOW())
    ) ";

    return "
        SELECT DISTINCT IFNULL(`$column`, '') AS col
        FROM `zzzzsys_user`
        WHERE IFNULL(`$column`, '') <> ''
        AND $sqlWhereExpired
        ORDER BY col
    ";

};

$sqlPosition = function() use ($getDistinctUserColumnQuery) {
    return $getDistinctUserColumnQuery('sus_position');
};

$sqlTeam = function() use ($getDistinctUserColumnQuery) {
    return $getDistinctUserColumnQuery('sus_team');
};

$sqlDepartment = function() use ($getDistinctUserColumnQuery) {
    $x = $getDistinctUserColumnQuery('sus_department');
    return $x;
};

$sqlLanguage = function() use ($getDistinctUserColumnQuery) {
    return $getDistinctUserColumnQuery('sus_language');
};

$sqlAccessLevel = function() {

    $sqlWhereExpired = "(
        (('#nu5fe0352637b2e4f_filter#' LIKE '#%' OR '#nu5fe0352637b2e4f_filter#' = '') AND (sus_expires_on > NOW() OR sus_expires_on IS NULL)) OR
        ('#nu5fe0352637b2e4f_filter#' = 'Expired' AND sus_expires_on < NOW()))";

    $sql = "SELECT DISTINCT CONCAT(sal_code, ' : ', sal_description) AS display
        FROM `zzzzsys_user`
        INNER JOIN zzzzsys_access ON zzzzsys_access_id = sus_zzzzsys_access_id
        WHERE $sqlWhereExpired
        ORDER BY CONCAT(sal_code, ' : ', sal_description)";

    return $sql;

};

$position = nuEncodeQueryRowResults($sqlPosition(), [], ['']);
$team = nuEncodeQueryRowResults($sqlTeam(), [], ['']);
$department = nuEncodeQueryRowResults($sqlDepartment(), [], ['']);
$language = nuEncodeQueryRowResults($sqlLanguage(), [], ['']);
$accessLevel = nuEncodeQueryRowResults($sqlAccessLevel(), [], ['']);

$filterJS = "
    function nuUserFilterGetData(data) {
        return JSON.parse(atob(data));
    }
    function nuUserFilterGetPosition() {
        return nuUserFilterGetData('$position');
    }
    function nuUserFilterGetTeam() {
        return nuUserFilterGetData('$team');
    }

    function nuUserFilterGetDepartment() {
        return nuUserFilterGetData('$department');
    }
    function nuUserFilterGetLanguage() {
        return nuUserFilterGetData('$language');
    }

    function nuUserFilterGetAccessLevel() {
        return nuUserFilterGetData('$accessLevel');
    }
";


$addCode = $_SESSION['nubuilder_session_data']['USER_CODE_LABEL'] ?? '';

$addCodeJS = "

    if ('$addCode' !== '') {
        $('#nusort_5').html('$addCode')
    };

";

nuAddJavaScript($filterJS . $addCodeJS);