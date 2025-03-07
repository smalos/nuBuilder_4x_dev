$option = nuGetProperty('NUSESSIONTERMINATE_OPTION');
if (!$option) {
    nuRunQuery('DELETE FROM `zzzzsys_session`');
} else {
    $sessionID = nuHash()["session_id"];
    nuRunQuery('DELETE FROM `zzzzsys_session` WHERE zzzzsys_session_id <> ?', [$sessionID]);
}