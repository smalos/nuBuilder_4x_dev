if ('#srm_default#' == 0) return;

$update = "

    UPDATE `zzzzsys_format`
	SET srm_default = 0
    WHERE srm_type = '#srm_type#'
    AND zzzzsys_format_id <> ?

";

nuRunQuery($update, ['#record_id#']);