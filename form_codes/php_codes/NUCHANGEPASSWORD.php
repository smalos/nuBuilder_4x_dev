$oldPassword = '#old_password#';
$newPasswordCheck = '#new_password_check#';
$newPassword = '#new_password#';
$session = '#SESSION_ID#';
$userId = "#USER_ID#";



//--

$s = "
    SELECT sss_access
    FROM zzzzsys_session
    WHERE zzzzsys_session_id = ?
";

$t = nuRunQuery($s, [$session]);
$r = db_fetch_object($t);
$j = json_decode($r->sss_access);

//--

$s = "
 SELECT
    sus_login_password,
    sus_change_password
 FROM zzzzsys_user
 WHERE zzzzsys_user_id = ?
";

$t = nuRunQuery($s, [$userId]);
$r = db_fetch_object($t);
$current = $r->sus_login_password;
$changePassword = $r->sus_change_password;

$useMd5 = $_SESSION['nubuilder_session_data']['USE_MD5_PASSWORD_HASH'] == true;

if ($useMd5) {
    $check = md5($oldPassword) == $current;
} else {
    $check = password_verify($oldPassword, $current);
}

if ($check == false) {
    nuDisplayError('<h2>' . nuTranslate('Error') . '</h2>' . nuTranslate('Incorrect Password'));
    return;
}

if ($oldPassword == $newPassword) {

    nuDisplayError('<h2>' . nuTranslate('Error') . '</h2>' . nuTranslate('Your new password cannot be the same as your old password'));
    return;
}

if ($oldPassword === '' || $newPassword === '') {
    nuDisplayError('<h2>' . nuTranslate('Error') . '</h2>' . nuTranslate('The password cannot be left blank'));
    return;
}


//--

$p = nuProcedure('nuCheckPasswordPolicy');

if ($p != '') {

    eval($p);

    if ($check == false) {
        return;
    }

}

//--

if ($newPassword == $newPasswordCheck) {

    $s = "

         UPDATE zzzzsys_user
         SET
            sus_login_password = ?,
            sus_change_password = ?
         WHERE zzzzsys_user_id = ?
    ";

    $pwHash = $useMd5 == true ? md5($newPassword) : nuPasswordHash($newPassword);

    nuRunQuery($s, [$pwHash, '0', $userId]);

    nuSetUserJSONData('PASSWORD_CHANGED_TIME', time(), $userId);
    nuSetUserJSONData('PASSWORD_CHANGED_SOURCE', 'user', $userId);



    if (nuObjKey($_SESSION['nubuilder_session_data'], 'SESSION_CHANGE_PW_STATUS') == 'PENDING') {
        $_SESSION['nubuilder_session_data']['SESSION_CHANGE_PW_STATUS'] = 'CHANGED';
    }

    $js = "
        function nuMsgAfterPasswordChange() {
            if ('$changePassword' == '1') {
                nuLogout();
            }
        }
        nuMessage(nuTranslate('Information'), nuTranslate('Your password has been successfully changed'), 1500, nuMsgAfterPasswordChange);
    ";


} else {
    $msg = nuTranslate('"New Password" must be the same as "Confirm New Password"');
    $js = "nuMessage(nuTranslate('Error'), '$msg');";
}


nuJavaScriptCallback($js);