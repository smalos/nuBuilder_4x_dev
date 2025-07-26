$denied = $GLOBALS['nuSetup']->set_denied == 1;

$condition = $denied
    ? "(zzzzsys_item_id NOT LIKE 'nu%')"
    : "1=1";

$sql = "
    SELECT
        zzzzsys_item_id,
        itm_value,
        itm_description,
        itm_category,
        itm_object_id,
        itm_tag,
        itm_language,
        sob_all_id,
        sfo_code,
        itm_active,
        itm_created_on,
        itm_updated_on,
        itm_sort_order,
        sob_all_zzzzsys_form_id
    FROM
        zzzzsys_item
    LEFT JOIN zzzzsys_object ON zzzzsys_object_id = itm_object_id
    LEFT JOIN zzzzsys_form ON zzzzsys_form_id = zzzzsys_object.sob_all_zzzzsys_form_id
    WHERE
        $condition
    ORDER BY
        sfo_code ASC,
        sob_all_id ASC,
        itm_value ASC
";


nuCreateTableFromSelect('#TABLE_ID#', $sql);