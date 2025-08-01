function nuGet2FAProcedure() {
    const d = nuDevMode();
    const p = 'nu_authentication_2fa';
    return d ? p + '_template': p;
}

function nu2FAVerify() {
    nuSetProperty('auth_code_verify', $('#auth_code').val());
    nuSetProperty("nuauthcommand", "verify");
    const p = nuGet2FAProcedure();
    nuRunPHPHidden(p);
}

function nu2FASendToken() {
    nuSetProperty("nuauthcommand", "send");
    const p = nuGet2FAProcedure();
    nuRunPHPHidden(p);
}

function handleEnterKey() {

    $('#auth_code').on('keydown', function(evt) {
        if (evt.key === 'Enter') {
            evt.preventDefault();
            nu2FAVerify();
        }
    });

}

handleEnterKey();
nuHideHolders(0, 2);



// Prevent [DOM] Password field is not contained in a form:
$("#auth_code_verify").wrap("<form id='nuFromVerif' action='#' method='post' onsubmit='return false'>");