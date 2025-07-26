$getDistinctColumnQuery = function(string $column): string {
    return "
        SELECT
          DISTINCT TRIM({$column}) AS trimmed_col
        FROM
          zzzzsys_email_template
          LEFT JOIN zzzzsys_form
            ON zzzzsys_form_id = emt_form_id
        WHERE
          IFNULL({$column}, '') <> ''
        ORDER BY
          trimmed_col
    ";
};

$sqlGroup = function() use ($getDistinctColumnQuery): string {
    return $getDistinctColumnQuery('emt_group');
};
$sqlCategory = function() use ($getDistinctColumnQuery): string {
    return $getDistinctColumnQuery('emt_category');
};

$group    = nuEncodeQueryRowResults($sqlGroup(),    [], ['']);
$category = nuEncodeQueryRowResults($sqlCategory(), [], ['']);

$filterJS = <<<JS
function nuEmailTemplateFilterGetData(data) {
    return JSON.parse(atob(data));
}
function nuEmailTemplateFilterGetGroup() {
    return nuEmailTemplateFilterGetData('$group');
}
function nuEmailTemplateFilterGetCategory() {
    return nuEmailTemplateFilterGetData('$category');
}
JS;

nuAddJavaScript($filterJS);
