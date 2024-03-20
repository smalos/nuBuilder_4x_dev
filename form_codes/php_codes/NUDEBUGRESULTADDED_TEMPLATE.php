$body = "Debug ID: $nuDebugId <br><br>Debug Message: " . nl2br($nuDebugMsg) . "<br><br>User ID: $nuDebugUserId <br><br>Flag: $nuDebugFlag";

$to = 'your_email_address_here';

$subject = '[nuBuilder] nuDebug Information Added';

nuSendEmail([
    'to' => $to,
    'body' => $body,
    'subject' => $subject
]);
