$select = "
    SELECT
     CONCAT(
     'PROCEDURE:',
     `zzzzsys_php`.`zzzzsys_php_id`
     ) AS `zzzzsys_php_id`,
     `zzzzsys_php`.`sph_code` ,
     `zzzzsys_php`.`sph_description`
    FROM
     `zzzzsys_php`
    WHERE
     (
     (`zzzzsys_php`.`sph_system` <> '1') 
     AND (LOCATE('{TABLE_ID}', `zzzzsys_php`.`sph_php`) > '0') AND (`zzzzsys_php`.`sph_template` <> 1)
     )
     
    UNION
    
    SELECT
     CONCAT(
     'SQL:',
     `zzzzsys_select`.`zzzzsys_select_id`
     ) AS `id`,
     'nuSQL',
     `zzzzsys_select`.`sse_description`
    FROM
     `zzzzsys_select`
    WHERE
     (
     (
     `zzzzsys_select`.`sse_system` IS NULL
     ) OR(`zzzzsys_select`.`sse_system` = '')
     )
     
    UNION
    
    SELECT
     CONCAT(
     'TABLE:',
     `TABLE_NAME`
     ) AS `id`,
     'nuTABLE',
     `TABLE_NAME` 
    FROM 
     `information_schema`.`tables` 
    WHERE 
     `TABLE_SCHEMA` = database()
     AND `TABLE_NAME` NOT LIKE '\\\\_%' ESCAPE '\\\\'
";


$select = str_replace("{TABLE_ID}", '#'.'TABLE_ID'.'#', $select);

$insert = "
INSERT INTO zzzzsys_report_data ( 
 `zzzzsys_report_data_id`,
 `srd_code`,
 `srd_description`)
".$select;


nuRunQuery('DELETE FROM `zzzzsys_report_data`');
nuRunQuery($insert);
