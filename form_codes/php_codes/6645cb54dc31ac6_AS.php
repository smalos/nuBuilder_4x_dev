$changePassword = '#sus_change_password#' == '1';

if ('#check_password#' != '') {

    $userId = "#RECORD_ID#";

    if ($_SESSION['nubuilder_session_data']['USE_MD5_PASSWORD_HASH'] != true) {
        $pw = nuPasswordHash('#check_password#');
    } else {
        $pw = md5('#check_password#');
    }

    nuRunQuery("UPDATE zzzzsys_user SET sus_login_password = '$pw' WHERE zzzzsys_user_id = ?", [$userId]);

    nuSetUserJSONData('PASSWORD_CHANGED_TIME', time(), $userId);

    if ($changePassword) {
        $expirationTime = time() + 3600;
        nuSetUserJSONData('OTP_EXPIRATION_TIME', $expirationTime, $userId);
    }
    

}


function nuUserSavedInfo() {

    return array(
        'change_password' => $changePassword,
        'new_user' => nuHasNewRecordID()
    );

}

if ('#user_send_welcome_email#' == '1') {
    $result = nuRunProcedure('nuSendWelcomeEmail');
    if ($result === false) {
        nuRunProcedure('NUSENDWELCOMEEMAIL_Template');
    }
}