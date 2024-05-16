nuHideHolders(2);

nuAddActionButton('use_password', nuTranslate('Use Password'), 'usePassword();');

function nuPWGenUsePassword() {
   nuHasNotBeenEdited();
   parent.nuSetValue('new_password', pwg_input.value);
   parent.nuSetValue('check_password', pwg_input.value);
   parent.nuClosePopup();
}

// Function to refresh the generated password
function nuPWGenRefreshPassword() {

    const length = parseInt(nuGetValue('pwg_length')) || 15;
    const upperBox = document.getElementById("pwg_uppercase").checked;
    const lowerBox = document.getElementById("pwg_lowercase").checked;
    const numberBox = document.getElementById("pwg_numbers").checked;
    const symbolBox = document.getElementById("pwg_symbols").checked;

    const arr = nuCharacterArray(symbolBox, numberBox, lowerBox, upperBox);
    if (arr.length === 0) {
        nuSetValue("pwg_input", "");
        return;
    }

    const password = nuRandomPassword(arr, length);
    nuSetValue("pwg_input", password);

}

// Initial password generation
$(document).ready(function() {
    $("#pwg_range").attr("max", "50");
    nuSetValue('pwg_range', 15);
    nuPWGenRefreshPassword();
});


// generate new password on slider change
document.querySelector("#pwg_range").oninput = () => {
    document.querySelector("#pwg_length").textContent = document.querySelector(
        "#pwg_length"
    ).value = document.querySelector("#pwg_range").value;
    nuPWGenRefreshPassword();
};

