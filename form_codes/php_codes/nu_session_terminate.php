$option = nuGetProperty('nu_session_terminate_option');
if (!$option) {
    nuRunQuery('DELETE FROM `zzzzsys_session`');
} else {
    $sessionID = nuHash()["session_id"];
    nuRunQuery('DELETE FROM `zzzzsys_session` WHERE zzzzsys_session_id <> ?', [$sessionID]);
}