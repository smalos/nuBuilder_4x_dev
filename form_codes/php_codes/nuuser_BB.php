$getDistinctUserColumnQuery = function($column) {

    $sqlWhereExpired = "(
        (('#nuBrowseTitle9_select#' LIKE '#%' OR '#nuBrowseTitle9_select#' = '') AND (sus_expires_on > NOW() OR sus_expires_on IS NULL)) OR
        ('#nuBrowseTitle9_select#' = 'Expired' AND sus_expires_on < NOW())
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
        (('#nuBrowseTitle9_select#' LIKE '#%' OR '#nuBrowseTitle9_select#' = '') AND (sus_expires_on > NOW() OR sus_expires_on IS NULL)) OR
        ('#nuBrowseTitle9_select#' = 'Expired' AND sus_expires_on < NOW()))";

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
    function getData(data) {
        return JSON.parse(atob(data));
    }
    function getPosition() {
        return getData('$position');
    }
    function getTeam() {
        return getData('$team');
    }

    function getDepartment() {
        return getData('$department');
    }
    function getLanguage() {
        return getData('$language');
    }

    function getAccessLevel() {
        return getData('$accessLevel');
    }
";


$addCode = $_SESSION['nubuilder_session_data']['USER_CODE_LABEL'] ?? '';

$addCodeJS = "

    if ('$addCode' !== '') {
        $('#nusort_5').html('$addCode')
    };

";

nuAddJavaScript($filterJS . $addCodeJS);