$query = "

SELECT
    f.*,
    COUNT(af.slf_zzzzsys_form_id) AS access_levels_count,
    GROUP_CONCAT(a.sal_code ORDER BY a.sal_code SEPARATOR ', ') AS access_levels
FROM
    zzzzsys_form f
LEFT JOIN zzzzsys_access_form af
    ON af.slf_zzzzsys_form_id = f.zzzzsys_form_id
LEFT JOIN zzzzsys_access a
    ON a.zzzzsys_access_id = af.slf_zzzzsys_access_id
WHERE
    f.zzzzsys_form_id NOT LIKE 'nu%'
    AND f.sfo_type != 'subform'
GROUP BY
    f.zzzzsys_form_id
HAVING
    access_levels_count > 0
ORDER BY
    f.sfo_code ";


nuCreateTableFromSelect('#TABLE_ID#', $query);
