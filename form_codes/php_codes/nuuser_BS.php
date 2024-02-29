$newPassword = '#new_password#';
$checkPassword = '#check_password#';
$passwordsMatch = $newPassword === $checkPassword;
$newRecord = nuHasNoRecordID();
$email = '#sus_email#';
$sendWelcomeEmail = '#user_send_welcome_email#' == '1';

$err = "";
if ($newRecord && (empty($newPassword) || empty($checkPassword))) {
    $err = nuTranslate("Both password fields must be filled in.");
}

if (!$passwordsMatch) {
    $err = nuTranslate("The passwords do not match.");
}

if ($sendWelcomeEmail) {

    if (!nuIsValidEmail($email)) {
        $err .= '<br>' . nuTranslate("Invalid email address.");
    }

    if (!$newRecord && (empty($newPassword) || empty($checkPassword))) {
        $err .= '<br>' . nuTranslate("Password required to send welcome email.");
    }

}

if (!empty($err)) {
    nuDisplayError($err);
}