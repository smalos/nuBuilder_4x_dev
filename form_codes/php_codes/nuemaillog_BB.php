$getDistinctUserColumnQuery = function($column) {
    return "SELECT DISTINCT `$column` FROM `zzzzsys_email_log` WHERE IFNULL(`$column`,'') <> '' ORDER BY `$column`";
};

$sqlState = function() use ($getDistinctUserColumnQuery) {
    return $getDistinctUserColumnQuery('eml_state');
};


$state = nuEncodeQueryRowResults($sqlState(), [], ['']);

$filterJS = "
    function getData(data) {
        return JSON.parse(atob(data));
    }

    function getState() {
        return getData('$state');
    }
";



nuAddJavaScript($filterJS);