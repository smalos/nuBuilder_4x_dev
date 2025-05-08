$select = "
SELECT 
    zf.*, 
    CASE 
        WHEN zf.sfi_group = 'nubuilder' THEN 0
        ELSE IFNULL(obj.counter, 0)
    END AS counter
FROM 
    zzzzsys_file zf
LEFT JOIN (
    SELECT 
        sob_image_zzzzsys_file_id AS zzzzsys_file_id,
        COUNT(*) AS counter
    FROM 
        zzzzsys_object
    WHERE 
        sob_image_zzzzsys_file_id IS NOT NULL
    GROUP BY 
        sob_image_zzzzsys_file_id
) obj ON zf.zzzzsys_file_id = obj.zzzzsys_file_id
ORDER BY 
    sfi_code

";


nuCreateTableFromSelect('#TABLE_ID#', $select);