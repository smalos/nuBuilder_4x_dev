nuSetPlaceholder('sus_code', nuTranslate('(Optional)'));
nuSetToolTip('sus_code', nuTranslate('E.g. Employee Id, Foreign Id etc. Leaving blank will set the "Login Name"'));
nuSetToolTip('sus_language', nuTranslate('Leaving blank will use English'));
if (nuIsNewRecord())  { 
   nuHide('sus_zzzzsys_access_id_open_button');
   var password = nuRandomPassword(nuCharacterArray(false), 12);
   nuSetValue('new_password', password);
   nuSetValue('check_password', password);

}

$('#sus_zzzzsys_access_id_open_button').toggleClass('input_button nuButton nuLookupButton')
nuSelectAddEnglishOption('sus_language');

nuHasNotBeenEdited();

function nuUserTogglePasswordVisibility() {
    $("#new_password").nuTogglePassword();
    $("#check_password").nuTogglePassword();
}

function nuBeforeSave() {

    let code = $('#sus_code');
    if (code.val() === '') {
        code.nuSetValue(nuGetValue('sus_login_name'));
    }

    return true;

}

function nuUserSplitFullName(fullName) {

  const name = fullName.split(' ');
  const person = {};
  
  if (name.length > 1) {
    person.lastName = name.pop();
    person.firstName = name.join(' ');
  } else {
    person.lastName = "";
    person.firstName = fullName;
  }
  
  return person;
 
}

function nuUserSetNameParts(element) {

    if (nuGetValue('sus_name') === '') {
        const firstName = nuGetValue('sus_first_name');
        const lastName = nuGetValue('sus_last_name');
        if (firstName !== '' && lastName !== '') {
        	nuSetValue('sus_name', nuGetValue('sus_first_name') + ' ' + nuGetValue('sus_last_name') );
	}
        return;
    }
    
    const hasStar = element.value === '*';
        
    if (element.id === 'sus_first_name' && !hasStar) return;
    if (element.id === 'sus_last_name'&& !hasStar) return;

    if (!nuIsNewRecord() && !hasStar) return;

    const nameParts = nuUserSplitFullName(nuGetValue('sus_name'));
    nuSetValue('sus_first_name', nameParts.firstName, 'value', false);
    $('#sus_first_name').addClass('nuEdited');
    nuSetValue('sus_last_name', nameParts.lastName, 'value', false);
    $('#sus_last_name').addClass('nuEdited');

}
