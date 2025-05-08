/*
$userSavedInfo = nuUserSavedInfo();

$changePassword = $userSavedInfo["change_password"];
$newUser = $userSavedInfo["new_user"];
*/


// Retrieve the template data (Template code, language, group)
$template = nuGetEmailTemplateData("nuWelcomeEmailTemplate", '', 'nubuilder');
if ($template == false) {
    nuDisplayError('Unknown email template!');
    return;
}

$sendResult = sendEmailFromTemplate($template);
if ($sendResult[0] != true) {
    nuDisplayError($sendResult[1].'<br>'.$sendResult[2]);
}

// Sends an email message using an email template.
function sendEmailFromTemplate($template) {

    $body = str_replace('#'.'NUBUILDER_URL'.'#', nuGetHttpOrigin() , $template['body']);

    $params = array(
        'to' => $template['to'],
        'cc' => $template['cc'],
        'bcc' => $template['bcc'],
        'body' => nl2br($body),
        'subject' => $template['subject']
    );

    // Replace all Hash Cookies
    foreach ($params as $key => $value) {
        $params[$key] = nuReplaceHashVariables($value);
    }

    return nuSendEmail($params);

}