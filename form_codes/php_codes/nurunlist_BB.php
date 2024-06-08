$select =

"
    SELECT * FROM (
    	 	 SELECT
    	 	 	 	 `zzzzsys_form`.`zzzzsys_form_id` AS `zzzzsys_debug_id`,
    	 	 	 	 'Form' AS `run`,
    	 	 	 	 `zzzzsys_form`.`sfo_code` AS `code`,
    	 	 	 	 `zzzzsys_form`.`sfo_description` AS `description`
    	 	 FROM
    	 	 	 	 `zzzzsys_form`
    	 	 UNION
    	 	 SELECT
    	 	 	 	 `zzzzsys_report`.`zzzzsys_report_id` AS `zzzzsys_debug_id`,
    	 	 	 	 'Report' AS `run`,
    	 	 	 	 `zzzzsys_report`.`sre_code` AS `code`,
    	 	 	 	 `zzzzsys_report`.`sre_description` AS `description`
    	 	 FROM
    	 	 	 	 `zzzzsys_report`
    	 	 UNION
    	 	 SELECT
    	 	 	 	 `zzzzsys_php`.`zzzzsys_php_id` AS `zzzzsys_debug_id`,
    	 	 	 	 'Procedure' AS `run`,
    	 	 	 	 `zzzzsys_php`.`sph_code` AS `code`,
    	 	 	 	 `zzzzsys_php`.`sph_description` AS `description`
    	 	 FROM
    	 	 	 	 `zzzzsys_php`
    	 	 WHERE
    	 	 	 	 (`zzzzsys_php`.`sph_system` <> 1)
    ) AS combined
    ORDER BY
	 	 `code`
";

nuCreateTableFromSelect('#TABLE_ID#', $select);