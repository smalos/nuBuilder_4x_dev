/*
    0|autocomplete|
    1|accesskey|
    2|data-|
    3|maxlength|
    4|placeholder|
    5|spellcheck|
    6|title|
    7|value|
    8|nu-label-position
    9|nu-disable-calendar
*/

nuHide('plh_value_select');
nuHide('plh_attribute_name');
nuHideTabs(0);
nuSelectRemoveEmpty('plh_attribute', '-1');
nuAddActionButton('nuAddAttribute', 'Add', 'addAttribute();');

function nuOnMobileViewComplete() {
  const currentTop = $('#plh_value_text').css('top');
  const currentTopLabel = $('#label_plh_value_text').css('top');
  $('#plh_value_select').css('top', currentTop);
  $('#label_plh_value_select').css('top',  currentTopLabel);
}

if (typeObj().val() !== 'input') {
    nuSelectRemoveOption('plh_attribute', '7').val('');
}

function onAttributeChanged(value) {

    nuShow('plh_value_select', value === '0' || value === '5' || value === '8');
    nuShow('plh_value_text', !(value === '0' || value === '5' || value === '8' || value === '9'));
    nuShow('plh_attribute_name', value === '2');
    
    nuSetValue('plh_value_text','');

    if (value === '0') {
        $("#plh_value_select").empty();
        addSelectOption('0', 'on');
        addSelectOption('1', 'off');
    } else if (value === '5') {
        $("#plh_value_select").empty();
        addSelectOption('0', 'true');
        addSelectOption('1', 'false');
    } else if (value === '4') {
        nuSetPlaceholder('plh_value_text', 'Placeholder text');
    } else if (value === '6') {
        nuSetPlaceholder('plh_value_text', 'Tooltip text');
    } else if (value === '2') {
        nuSetPlaceholder('plh_value_text', 'String value');
        $('#plh_attribute_name').trigger("focus");
    } else if (value === '1') {
        nuSetPlaceholder('plh_value_text', 'Single character');
    } else if (value === '3') {
        nuSetPlaceholder('plh_value_text', 'Number value');
    }  else if (value === '7') {
        nuSetPlaceholder('plh_value_text', 'String');
    }  else if (value === '8') {
        $("#plh_value_select").empty();
        addSelectOption('top', 'top');
    } 

}

function addSelectOption(value, text) {
    $('#plh_value_select').append('<option value="' + value + '">' + text + '</option>');
}

function attributesObj() {
    return $("#sob_input_attribute", window.parent.document);
}

function typeObj() {
    return $("#sob_all_type", window.parent.document);
}


function valueObjText() {
    return $('#plh_value_text').is(":visible") ? nuGetValue('plh_value_text') : nuGetValue('plh_value_select', 'text');
}

function addAttribute() {
    const attributeValue = valueObjText();
    const attributeName = nuGetValue('plh_attribute_name');
    const attributeType = nuGetValue('plh_attribute');
    const attributeText = nuGetValue('plh_attribute', 'text');
    
    if (attributeValue === '' && attributeType != 9) {
        nuMessage(nuTranslate('Error'), nuTranslate("Missing value"));
        return;
    }
    
    if (attributeName === '' && attributeType === '2') {
        nuMessage(nuTranslate('Error'), nuTranslate("Missing name"));
        return;
    }
    
    const attributeObj = attributesObj();
    const attributeKey = attributeText + attributeName;
    const attributeKeyWithEquals = attributeKey + '="';
    
    if (attributeObj.val().includes(attributeKeyWithEquals)) {
        nuMessage(nuTranslate('Error'), nuTranslate("The attribute already exists"));
        return;
    }
    
    let kv = '';
    if (attributeKeyWithEquals.includes('nu-disable-calendar')) {
        kv = 'nu-disable-calendar';
    } else {
        kv = attributeKeyWithEquals + attributeValue + '"';
    }
    
    const currentVal = attributeObj.val();
    if (currentVal === '') {
        attributeObj.val(kv).change();
    } else {
        attributeObj.val(currentVal + ',' + kv).change();
    }
}
