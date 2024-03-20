$password = '$2y$10$WqzRBCCDuPvyyq3Us53kFewUa02vhlT9NhZz5IOITVz3N8ZOSWgIu'; // test

$qry = "
    REPLACE
    INTO `zzzzsys_user`(
        `zzzzsys_user_id`,
        `sus_zzzzsys_access_id`,
        `sus_language`,
        `sus_name`,
        `sus_code`,
        `sus_position`,
        `sus_department`,
        `sus_team`,
        `sus_email`,
        `sus_additional1`,
        `sus_additional2`,
        `sus_login_name`,
        `sus_login_password`,
        `sus_expires_on`,
        `sus_change_password`,
        `sus_accessibility_features`,
        `sus_json`
    )
    VALUES(
        'test65046e167e07b56',
        'test6505159c7272cf6',
        NULL,
        'test',
        'test',
        'pos1',
        'dep1',
        'test',
        NULL,
        'add1',
        'add2',
        'test',
        '$password',
        NULL,
        '0',
        NULL,
        '{\"PASSWORD_CHANGED_TIME\":1694789142}'
    );
    
    REPLACE INTO `zzzzsys_access` (`zzzzsys_access_id`, `sal_code`, `sal_description`, `sal_group`, `sal_zzzzsys_form_id`, `sal_use_2fa`, `sal_json`)
    VALUES ('test6505159c7272cf6', 'test', 'test', 'test', 'nuuserhome', NULL, NULL);
    
    REPLACE INTO `zzzzsys_access_form` (`zzzzsys_access_form_id`, `slf_zzzzsys_access_id`, `slf_zzzzsys_form_id`, `slf_add_button`, `slf_save_button`, `slf_delete_button`, `slf_clone_button`, `slf_new_button`, `slf_print_button`, `slf_data_mode`, `slf_form_type`, `slf_json`)
    VALUES
    ('test6505159c730ed6e', 'test6505159c7272cf6', 'nufile', '1', '1', '0', '1', NULL, '1', NULL, NULL, NULL),
    ('test6505159c72cb67d', 'test6505159c7272cf6', 'nutranslate', '1', '1', '0', '1', NULL, '1', NULL, NULL, NULL)


";

nuRunQuery($qry);