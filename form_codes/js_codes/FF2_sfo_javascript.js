function nuBeforeSave_org() {

    const subformId = 'your_subform_object_id'; // subform object id
    const lookupObjectId = 'my_lookup_object_id'; //  Id of your lookup object
    const lookupValue = '664c47b3b4529d0'; // Primary key of lookup value to be set

    const firstLookupObj = $('#' + subformId + '000' + lookupObjectId);

    if (firstLookup.val() === '') {
        firstLookup.nuSetValue(lookupValue);
    }

    const numberObjectId = 'my_number_object_id'; //  Id of your input/number object
    const numberValue = '123'; // number value to be set

    const firstNumberObj = $('#' + subformId + '000' + numberObjectId);

    if (firstNumberObj.val() === '') {
        firstNumberObj.nuSetValue(numberValue);
    }

    // Continue Saving
    return true;

}


function nuBeforeSave() {

    const subformId = 'mysubform'; // subform object id
    const lookupObjectId = 'mylookup'; //  Id of your lookup object
    const lookupValue = 'test6505159c7272cf6'; // Primary key of lookup value to be set

    const firstLookupObj = $('#' + subformId + '000' + lookupObjectId);

    if (firstLookupObj.val() === '') {
      //  firstLookupObj.nuSetValue(lookupValue);
		firstLookupObj.val(lookupValue).addClass('nuEdited');
    }

    const numberObjectId = 'myinput'; //  Id of your input/number object
    const numberValue = '123'; // number value to be set

    const firstNumberObj = $('#' + subformId + '000' + numberObjectId);

    if (firstNumberObj.val() === '') {
		firstNumberObj.nuSetValue(numberValue);
    }
	
	$('#' + subformId + '000' + 'nuDelete').nuSetValue(false);

    // Continue Saving
    return true;

}