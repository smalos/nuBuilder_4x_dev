$getDistinctUserColumnQuery = function($column) {
    return "SELECT DISTINCT `$column` FROM `zzzzsys_email_log` WHERE IFNULL(`$column`,'') <> '' ORDER BY `$column`";
};

$sqlState = function() use ($getDistinctUserColumnQuery) {
    return $getDistinctUserColumnQuery('eml_state');
};


$state = nuEncodeQueryRowResults($sqlState(), [], ['']);

$filterJS = "
    function nuEmailLogFilterGetData(data) {
        return JSON.parse(atob(data));
    }

    function nuEmailLogFilterGetGroup() {
        return nuEmailLogFilterGetData('$state');
    }
";



nuAddJavaScript($filterJS);