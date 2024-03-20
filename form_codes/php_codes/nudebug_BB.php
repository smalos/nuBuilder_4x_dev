$getDistinctUserColumnQuery = function($column) {
    return "SELECT DISTINCT `$column` FROM `zzzzsys_debug` WHERE IFNULL(`$column`,'') <> '' ORDER BY `$column`";
};

$sqlSFlag = function() use ($getDistinctUserColumnQuery) {
    return $getDistinctUserColumnQuery('deb_flag');
};


$flag = nuEncodeQueryRowResults($sqlSFlag(), [], ['']);

$filterJS = "
    function getData(data) {
        return JSON.parse(atob(data));
    }

    function getFlag() {
        return getData('$flag');
    }
";



nuAddJavaScript($filterJS);