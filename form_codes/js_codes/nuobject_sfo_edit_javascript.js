if (! nuDevMode()) {
    nuHideTabById('nu61e9964c9bf5e13'); // JSON
}

nuShow('se_items_run', !nuIsNewRecord());
nuShow('sob_items_run', !nuIsNewRecord());

// Code Snippets form
nuSetSnippetFormFilter(0, 0, 1, 0); // SQL

nuHide('sob_code_snippet_display_lookupcode');
nuHide('sob_code_snippet_select_lookupcode');
nuHide('label_zzzzsys_event_sf');
nuHide('label_sob_html_code');
nuShow('sob_run_zzzzsys_form_open_button', sob_run_zzzzsys_form_id.value !== '');
nuShow('sob_lookup_zzzzsys_form_open_button', sob_lookup_zzzzsys_form_id.value !== '');
nuShow('sob_display_procedure_open_button', sob_display_procedure.value !== '');
nuShow('sob_select_procedure_open_button', sob_select_procedure.value !== '');

nuObjectDisplayInputIcon();
nuObjectDisplayAccessCondition();
nuObjectDisplayProcedureChanged();
nuObjectSelectProcedureChanged();

nuDisable('sob_calc_formula');
nuSetToolTip('sob_all_id_create_button', nuTranslate('Add database column'));

window.parentTabs = parent.$('.nuTab');


var tabIdDescLeft = $('#sob_all_zzzzsys_tab_iddescription').nuCSSNumber('left') + 11;
$('#sob_all_zzzzsys_tab_iddescription').css('left', tabIdDescLeft + 'px');

$('#zzzzsys_event_sfsev_javascript').attr('id', 'jsfuntitle');
$('#sob_calc_formula').addClass('nuCalculatorCurrency').css('font-size', '12px');
$('#sob_all_display_condition').addClass('sql');
$('#sob_all_default_value_sql').addClass('sql');
$('#sob_display_sql').addClass('sql');
$('#sob_input_datalist').addClass('sql');
$('#sob_select_sql').addClass('sql');
$('#sob_lookup_javascript').addClass('js');
$('#sob_input_javascript').addClass('js');
$('#sob_html_javascript').addClass('js');
$('#sob_lookup_php').addClass('php');
$('#sob_html_code').addClass('html');
$('#sob_all_style').addClass('css');
$('#sob_input_attribute').addClass('css');
$("[id$='sev_javascript']").addClass('js');
$("#title_zzzzsys_event_sfsev_javascript").removeClass('js');
$('#sob_run_zzzzsys_form_open_button').toggleClass('input_button nuButton nuLookupButton');
$('#sob_lookup_zzzzsys_form_open_button').toggleClass('input_button nuButton nuLookupButton');
$('#sob_subform_zzzzsys_form_open_button').toggleClass('input_button nuButton nuLookupButton');
$('#sob_select_procedure_open_button').toggleClass('input_button nuButton nuLookupButton');
$('#sob_display_procedure_open_button').toggleClass('input_button nuButton nuLookupButton');


$('#sob_all_type_open_button').toggleClass('input_button nuButton nuLookupButton');

nuObjectPreviewIcon('sob_input_icon_preview_html', nuGetValue('sob_input_icon'));


var placeholderText = 'Enter * to display the examples.\n\n' + 
`1. SQL:
   A valid SQL query that returns 2 columns (value, display).
   Example:
     SELECT table_id, description FROM table

   Or using the Items table:
     SELECT itm_value, itm_description 
     FROM zzzzsys_item 
     WHERE itm_object_id = '#OBJECT_ID#' AND itm_active = '1'
     ORDER BY itm_description

2. List:
   A pipe-delimited list.
   - First value: bound value (e.g., 1)
   - Second value: display value (e.g., First)
   Example:
     1|First|
     2|Second|
     3|Third

3. JSON / Array:
   When value and display are the same.
   Example:
     ["value1", "value2", "value3"]
`;

$('#sob_select_sql').prop('placeholder', placeholderText);




placeholderText = `Array of items:
["item 1","item 2","item 3"]

Or:

JSON/Array:
SELECT column_name FROM table_name 

`;

$('#sob_input_datalist').on('focus', function() {
    $(this).prop('placeholder', placeholderText);
}).on('blur', function() {
    $(this).prop('placeholder', '');
});


$('#nuTab9').on('click', function() {
    nuObjectTestChart();
});

nuAttachButtonImage('icon_lujs', 'LUJS');
nuAttachButtonImage('icon_html', 'HTML');
nuAttachButtonImage('ab_event', 'AB', 'nuButtonImageSmall');
// nuAttachButtonImage('di_sql', 'SQL','nuButtonImageSmall');
// nuAttachButtonImage('se_sql', 'SQL','nuButtonImageSmall');

$('#viewflowchart')
.css('padding', '46px 0px 0px 3px')
.css('text-align', 'left')
.css('background-size', '75px');


if ($('#zzzzsys_event_sf000sev_event').val() !== '') {
    $('#nuTab11').css('font-weight', 'bold');
}

nuObjectInputTypeChanged(nuGetValue('sob_input_type'));
nuObjectHideCalcObjects();
nuObjectPopulateHTML();
nuObjectAddDataListToRunId();

$("button[id*='_btn_']").addClass('nuQuickButton').removeClass('input_button nuButton');

var filter = String(window.filter).split('|');

if (filter[0] == 'fromfastform') {

    $('#nuDeleteButton').remove();
    $('#nuCloneButton').remove();
    $('#nuSaveButton').remove();
    $('#sob_all_id').val(filter[1]).addClass('nuHighlight');
    $('#sob_all_label').val(filter[2]).addClass('nuHighlight');

}

nuACEInitDblClickHandlers();

nuHide('sob_input_format');
var sit = nuGetValue('sob_input_type');
nuShow('sob_input_format', sit == 'nuDate' || sit == 'nuNumber');
nuShow('sob_input_javascript', sit == 'nuScroll');

nuObjectColor();
nuGetStartingTab();


if (!nuIsNewRecord()) {

    nuObjectMaximiseParentifDragOptionsBox();
    nuObjectDisplayIncHeightButtons();
    nuObjectShowDataType();

} else {

    nuSetValue('sob_all_top', 0);
    nuSetValue('sob_all_left', 60);
    nuSetValue('sob_all_height', 22);
    nuSetValue('sob_all_width', 100);
    nuSetValue('sob_all_validate', 0);
    nuSetValue('sob_all_access', 0);
    nuSetValue('sob_all_align', 'left');
    nuSetValue('sob_all_cloneable', '1');

    nuHide('sob_all_type_open_button');
    nuHide('sob_all_type_input');
    nuHide('sob_all_id_create_button');

    if (nuIsIframe()) {
        let pTab = nuSelectedTabId(parent);
        if (pTab !== null) {
            nuGetLookupId(pTab, 'sob_all_zzzzsys_tab_id', false);
        } else {
            if (nuGetValue('sob_all_zzzzsys_tab_id') === '' && parent.nuCurrentProperties().form_code == 'nuuserhome') {
                nuGetLookupId('nufastforms', 'sob_all_zzzzsys_tab_id', false);
            }
        }
        $('#sob_all_label').trigger("focus");
        nuSetValue('sob_all_type', 'input');
        nuSetValue('sob_input_type', 'text');
    }

}

nuObjectUpdateLookupDescriptionDatalist();
nuObjectUpdateIdDatalist();
nuObjectRunMethodChanged();
nuHasNotBeenEdited();


function nuObjectMaximiseParentifDragOptionsBox() {

    let db = parent.parent.$('.nuDragOptionsBox');
    if (db.length === 0) return;

    let dd = db.parent(); // nuDragDialog
    let l = parseInt(dd.css('left'), 10);

    if (l == 2) return; // already maximised

    let dt = db.nextAll('.nuDialogTitle').find('#dialogTitleWords');
    if (dt.length !== 0) {
        var e = {
            target: {
                id: "dialogTitleWords"
            }}
        parent.parent.nuResizeWindow(e);
    }

}

function nuObjectColumnDataType(table, id) {

    let s = nuFORM.tableSchema[table];
    let i = -1;
    if (typeof s !== "undefined") {
        i = s.names.indexOf(id.val());
    }

    return i > -1 ? s.types[i]: '';

}

function nuObjectShowDataType() {

    let id = $('#sob_all_id');
    let iDataType = $('#sob_all_id_datatype');

    let table = nuGetValue("sob_all_table");
    let dataType = '';

    if (table !== '' && id.val() !== '') {
        dataType = nuObjectColumnDataType(table, id);

    }

    iDataType.val(dataType);
    nuObjectDisplayCreateButton();
    nuObjectDisplayAlterButton();

}

function nuObjectObjectNoId() {
    return ['word',
        'html',
        'chart',
        'button',
        'run',
        'subform',
        'contentbox'].indexOf(nuGetValue('sob_all_type')) !== -1;
}

function nuObjectDisplayCreateButton() {

    let dataType = nuObjectColumnDataType(nuGetValue("sob_all_table"), $('#sob_all_id'));
    nuShow('sob_all_id_create_button', dataType === '' && nuGetValue('sob_all_id') !== '' && nuGetValue('sob_all_table') !== '' && !nuObjectObjectNoId());

}

function nuObjectDisplayAlterButton() {
   nuShow('sob_all_id_alter_column_button', !nuIsNewRecord() && nuGetValue('sob_all_id_datatype') !== '')
}

function nuObjectDisplayIncHeightButtons() {

    var showButtons = ['html', 'chart',
        'textarea',
        'subform',
        'image',
        'contentbox'].indexOf(nuGetValue('sob_all_type')) !== -1;

    $('[id^=sob_height_btn_set]').nuShow(showButtons);
}


function nuObjectTestChart() {

    let g = nuGetValue('sob_html_chart_type');

    if (g === '' || nuGetValue('sob_all_type') !== 'chart') {
        $('#google_chart').html('');
        return;
    }

    let c = 'ComboChart';
    let t = nuGetValue('sob_html_title');
    let x = nuGetValue('sob_html_vertical_label');
    let y = nuGetValue('sob_html_horizontal_label');
    let l = 'bars';
    let s = false;

    let a = [
        ['Month',
            'Shane',
            'Dave',
            'Adam',
            'Paul',
            'Chris'],
        ['2025',
            100,
            200,
            300,
            400,
            500],
        ['2024',
            165,
            238,
            322,
            498,
            550],
        ['2024',
            165,
            938,
            522,
            998,
            450],
        ['2022',
            135,
            1120,
            599,
            1268,
            288]
    ];

    if (g == 'p') c = 'PieChart';
    if (g == 'l') l = 'lines';
    if (g == 'bh') c = 'BarChart';
    if (g == 'bhs') c = 'BarChart';
    if (g == 'bs') s = true;
    if (g == 'bhs') s = true;

    nuChart('google_chart', c, a, t, x, y, l, s);

}

function nuObjectChartOnReady(i, wrapper) {
    // let wrapper = window["google_chart_wrapper"];
    var options = {
        seriesType: wrapper.m.seriesType,
        chartArea: {
            left: "10%",
            width: "65%"
        }
    };
    wrapper.setOptions(options);
    wrapper.draw();
}

function nuObjectAddDataListToRunId() {

    let arrRecordId = [
        ["     ",
            nuTranslate("Leave blank to open a Browse Form")],
        ["-1",
            nuTranslate("Open a new Record")],
        ["#EXAMPLE_HASH_COOKIE#",
            nuTranslate("Use a Hash Cookie")]
    ];

    nuAddDatalist('sob_run_id', arrRecordId);

    $('#sob_run_id').on('input', function() {
        if ($(this).val() == '     ') {
            $(this).val('').change();
        }

    });

}

function nuObjectColor() {

    $('.nuValidate').removeClass('nuValidate');

    let e = $('#sob_all_type').hasClass('nuEdited');
    let o = [];

    o.run = 1;
    o.display = 2;
    o.select = 3;
    o.lookup = 4;
    o.subform = 5;
    o.image = 6;
    o.input = 7;
    o.html = 8;
    o.chart = 9;
    o.calc = 10;

    $('#sob_all_type').removeClass();

    if (e) {
        //-- keep class if edited
        $('#sob_all_type').addClass('nuEdited');
    }

    $('#sob_all_type').addClass('nu_'+$('#sob_all_type').val());

    $("#sob_all_type > option").each(function() {
        $(this).addClass('nu_'+this.value);
    });

    upObjectSetRelatedTabs(o);

}


function upObjectSetRelatedTabs(o) {

    const selectedVal = $('#sob_all_type').val();
    let t = o[selectedVal];

    $("[id^='nuTab']").removeClass('nuRelatedTab');

    for (let i = 1; i < o.length; i++) {
        $('#nuTab' + i).removeClass('nuRelatedTab');
    }

    $('#nuTab0').addClass('nuRelatedTab');
    $('#nuTab' + t).addClass('nuRelatedTab');
    
    const inputTargetFile = nuGetValue('sob_input_file_target');
    const idHTMLTab = 'nu5bad6cb36a71012';
    $('div[data-nu-tab-id=' + idHTMLTab + ']').toggleClass('nuRelatedTab', (selectedVal === 'input' && inputTargetFile == '1') || selectedVal === 'html');
    
}

function nuObjectDisplayAllTypeInput() {

    let v = nuGetValue('sob_input_type', 'text');
    v = nuGetValue('sob_all_type') == 'input' ? v: '';
    $('#sob_all_type_input').val(v);

}

function nuObjectTypeChanged() {

    nuShow('sob_all_type_open_button', sob_all_type.value !== '');
    nuShow('sob_all_type_input', sob_all_type.value !== '');

    nuObjectColor();
    nuObjectDisplayCreateButton();
    nuObjectDisplayAlterButton();
    nuObjectDisplayIncHeightButtons();
    nuObjectDisplayAllTypeInput();
    nuObjectDisplayInputIcon();

}

function nuObjectDisplayEditNuFormat() {
  const format = sob_input_type.value;
  nuShow('sob_input_nuformat_edit_button', format === 'nuNumber' || format === 'nuDate');

}

function nuObjectInputTypeChanged(t) {

    nuObjectDisplayEditNuFormat();

    nuHide('sob_input_format');
    nuHide('sob_input_count');
    nuHide('sob_input_javascript');
    nuHide('sob_input_datalist');
    nuHide('sob_input_file_target');


    if (t == 'nuScroll') {
        nuShow('sob_input_javascript');
    }

    if (t == 'file') {
        nuShow('sob_input_file_target');

        if (nuGetValue('sob_input_file_target') == '') {
            nuSetValue('sob_input_file_target', '0');
        }

        nuObjectFileUploadScript();
    }

    if (t == 'nuAutoNumber') {

        nuShow('sob_input_count');
        $('#sob_input_javascript').val('').addClass('nuEdited');

    }

    if (t == 'nuDate' || t == 'nuNumber' || t == 'number' || t == 'text' || t == 'email' || t == 'search' || t == 'month') {
        nuShow('sob_input_datalist');
        if ($('#sob_input_datalist').val() == '' && $('#sob_all_id_datatype').val() !== '') {
            //   $('#sob_input_datalist').val("SELECT DISTINCT `" + $("#sob_all_id").val() + "` FROM `" + $('#sob_all_table').val() + "` ORDER BY 1").change();
        }
    }

    if (t == 'nuDate' || t == 'nuNumber') {

        nuShow('sob_input_format');

        $('#sob_input_format').children().each(function(index) {

            $(this).show();

            if ($(this).val()[0] == 'D' && t != 'nuDate') {
                $(this).hide();
            }
            if ($(this).val()[0] == 'N' && t != 'nuNumber') {
                $(this).hide();
            }

        });

       nuSetProperty('nu_format_get_default_input_type', nuGetValue('sob_input_type').slice(2));
       nuRunPHPHidden('nu_format_get_default');

    }

    nuObjectDisplayInputIcon();
    nuObjectDisplayAllTypeInput();

}

function nuSetDefaultFormat(format) {
   if (format !== '' && nuGetValue('sob_input_format') === '') {
       nuSetValue('sob_input_format', format);
   }
}

function nuObjectDisplayInputIcon() {
    nuShow('sob_input_icon',
        sob_input_type.value == 'button' || sob_all_type.value == 'run' || sob_all_type.value == 'word');
}

function nuObjectDisplayAccessCondition() {
    nuShow('sob_all_access_condition',
        sob_all_access.value == '9');
    $('[nu-access-button]').nuShow(sob_all_access.value != '9');
}

function nuObjectHideCalcObjects() {

    var f = $('#sob_all_zzzzsys_form_id').val();

    $('#add_total').children().each(function(index) {


        if ($(this).val() != f) {
            $(this).hide();
        }
        if ($(this).text() == $('#sob_all_id').val()) {
            $(this).hide();
        }

    });

}

function nuObjectInsertOrAppendToCalcFormula(oldValue, newValue) {

    const manualMode = nuGetValue('sob_calc_formula_edit_mode_checkbox');
    if (manualMode) {
        nuInsertAtCaret('sob_calc_formula', newValue);
    } else {
        nuSetValue('sob_calc_formula', oldValue + newValue);
    }

}

function nuObjectAddCalcObject(t) {

    const i = $(t).attr('data-nu-ids');
    const oldValue = $('#sob_calc_formula').val();
    const newValue = "nuTotal('" + i + "')";

    if (i == '') {
        return;
    }

    $('#sob_calc_formula').addClass('nuEdited')

    nuObjectInsertOrAppendToCalcFormula(oldValue, newValue);

    $('#add_total').val('');

    nuHasBeenEdited();

}


function nuObjectAddToFormula(e) {

    const newValue = e.target.innerHTML;
    const oldValue = $('#sob_calc_formula').val();

    if (newValue == 'Clear') {

        $('#sob_calc_formula')
        .val('')
        .addClass('nuEdited');
        return;

    }

    $('#sob_calc_formula').addClass('nuEdited')

    nuObjectInsertOrAppendToCalcFormula(oldValue, newValue);

    nuHasBeenEdited();

}

function nuObjectPopulateHTML() {

    var o = nuCalcObjects();
    var a = [];

    for (var i = 0; i < o.length; i++) {

        var ids = String(o[i].ids);
        var ty = o[i].type;
        var id = String(o[i].ids).split('.');
        var sp = '&nbsp;';

        if (id.length == 1) {
            a.push('<tr><td><div title="' + ty + '" style="overflow:hidden;width:305px;text-align:left;padding:2px" onclick="nuObjectAddCalcObject(this);" class="nuCalculatorButton nu_' + o[i].type + '" data-nu-ids="' + ids + '">' + ids + '</div></td></tr>');
        } else {

            var h = '<span title="subform" class="nu_subform">' + id[0] + '</span>.<span title="' + ty + '" class="nu_input" style="padding:7px 5px 7px 5px">' + id[1] + sp.repeat(200) + '</span>';
            a.push('<tr><td><div style="overflow:hidden;width:305px;text-align:left;padding:2px;height:28px" onclick="nuObjectAddCalcObject(this);" class="nuCalculatorButton nu_subform" data-nu-ids="' + ids + '">' + h + '</div></td></tr>');

        }

    }

    $('#add_total').html('<table>' + a.join('') + '</table>');

}


function nuObjectSetSelectIndex(i, index) {

    $("#" + i).prop("selectedIndex", index).change();

}

function nuObjectSetLookupWidth() {
    var w = $('#sob_lookup_description').val() == $('#sob_lookup_code').val() ? 0: 150;
    var cw = $('#sob_lookup_description_width').val();
    if (cw == 0 || cw == 150 || w == 0) $('#sob_lookup_description_width').val(w).change();
}

function nuObjectSubFormRowsCount(subform, fieldname) {

    var sf = nuSubformObject(subform);
    var col = sf.fields.indexOf(fieldname);
    var c = 0;
    for (var row = 0; row < sf.rows.length; row++) {
        if (sf.deleted[row] == 0 && sf.rows[row][col].trim() != '') c++;
    }

    return c;

}

function nuObjecEnsureAutoNumberEndsWithNumber(str) {
    if (str !== '') {
        nuSetValue('sob_input_count', /\d$/.test(str) ? str: '1');
    }
}

function nuBeforeSave() {

    nuObjectRunMethodChanged();
    nuObjectAdjustProperties();

    nuObjecEnsureAutoNumberEndsWithNumber(sob_input_count.value);
    
    if (!nuObjectIdIsValid(nuGetValue('sob_all_id'))) {
        nuMessage(nuTranslate('Validation Error'), nuTranslate('Invalid ID'));
        return false;
    }

    if ($('#sob_all_type').val() == 'select') {
        $('#sob_select_multiple').addClass('nuEdited');
    }

    $("#sob_all_event").prop('checked', nuObjectSubFormRowsCount('zzzzsys_event_sf', 'sev_event') > 0).trigger('change');

}

function nuObjectAdjustProperties() {

    let type = nuGetValue('sob_all_type');
    let access = nuGetValue('sob_all_access');
    let validation = nuGetValue('sob_all_validate');
    let inputType = nuGetValue('sob_input_type');
    let inputFormat = nuGetValue('sob_input_format');

    if (type !== 'input') {
        if (inputType !== '') nuSetValue('sob_input_type', '');
        if (inputFormat !== '') nuSetValue('sob_input_format', '');
    }

    if (type.containsAny(['word', 'html', 'chart', 'image', 'contentbox', 'contentbox'])) {
        if (validation !== '0') nuSetValue('sob_all_validate', '0'); // validation --> none
        if (access == '1') nuSetValue('sob_all_access', '0'); // readonly --> editable
    }

    if (type === 'word') {
        if (access == '1') nuSetValue('sob_all_access', '0'); // readonly --> editable
        if (validation !== '0') nuSetValue('sob_all_validate', '0'); // validation --> none
        nuSetValue('sob_input_type', '');
        nuSetValue('sob_input_format', '');
    }

    if (type === 'display') {
        if (access == '1') nuSetValue('sob_all_access', '0'); // readonly --> editable
    }

}

function nuObjectRunMethodChanged() {

    var m = nuGetValue('sob_run_method');
    nuEnable('sob_run_target', m == 'b');

    if ($('#sob_run_target').prop("selectedIndex") > 0 && m == 'b') {
        return;
    }

    if (m == 'b' || m == 'i') {
        $('#sob_run_target').prop("selectedIndex", m == 'b' ? 1: 0).change();
    }

}

function nuOnClone() {
    nuHide('sob_all_id_create_button');
}

function nuObjectUpdateIdDatalist() {
    var t = nuFORM.tableSchema[nuGetValue("sob_all_table")];
    nuAddDatalist('sob_all_id', typeof t !== "undefined" ? t.names: []);
}

function nuObjectUpdateLookupDescriptionDatalist() {
    let arr = nuFORM.tableSchema[nuGetValue("sob_lookup_table")]?nuFORM.tableSchema[nuGetValue("sob_lookup_table")].names: [];
    nuAddDatalist('sob_lookup_description', arr);
}

function nuObjectSetJSON() {

    const data = {

        "type": {

            "version": "1.0",
            "mobile": {
                "version": "1.0",
                "name": "test1",
                "visible": true,
                "location": {
                    "top": sob_all_top.value,
                    "left": sob_all_left.value
                },
                "size": {
                    "width": sob_all_width.value,
                    "height": sob_all_height.value
                },
                "class": ["nuMobileInput"]
            }
        }

    }


    var obj = JSON.stringify(data);
    nuSetValue('sob_all_json', obj);

}


function nuObjectExtractClassNames(htmlString) {
  // Create a temporary DOM element
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlString;

  const element = tempDiv.firstElementChild;
  if (element && element.className) {
    return element.className.trim();
  }

  return '';

}

function nuObjectPreviewIcon(i, s) {

    s = nuEscapeHTML(s);

    let $i = $('#'+i);

    $i.html('');

    if (s.startsWith('fas ') || s.startsWith('fa ') || s.startsWith('far ') || s.startsWith('fa-')) {
        $i.append('<i class="' + s + ' fa-2x' + '"></i>');
    } else if (s.startsWith('<i class="fa')) {
        let i = s.indexOf('>', 10);
        $i.append(s.nuInsertString(i-1, ' fa-2x'));

    } else {
        $i.append(s);
    }

}


function nuObjectFileUploadScript() {

    nuObjectColor();

    let htmlCode = $('#sob_html_code');

    if (nuGetValue('sob_input_file_target') == '1' && ! htmlCode.val().includes('Uppy')) {

        nuRunPHPHidden('nu_upload_file_load_uppy_code');
        if (sob_all_height.value < 30) nuSetValue('sob_all_height', '250');

    }

}


// Pick Tabs

function nuObjectOpenMenu(event, menu, element) {
    event.stopPropagation();
    ctxmenu.show(menu, element);
}


function nuObjectSetTabId(tabTitle) {

    const tab = parent.$('.nuTab').filter(function() {
        return $(this).html() == tabTitle;
    });

    if (tab.length == 1) {
        nuGetLookupId(tab.attr('data-nu-tab-id'), 'sob_all_zzzzsys_tab_id', true, true);

    }

}

function nuObjectMenuPickTabsClick(element, event) {

    if (!nuIsIframe()) {
        return;
    }

    var items = [];

    const item = {
        text: nuTranslate('Tabs')
    };

    items.push(item);

    window.parentTabs.each(function() {
        var item =
        {
            text: nuContextMenuItemText(this.innerHTML, "fa-regular fa-square"),
            action: () => nuObjectSetTabId(this.innerHTML)
        }

        items.push(item);
    });

    nuObjectOpenMenu(event, items, element);

}

function nuObjectDisplayProcedureChanged() {
    const hasDisplayProcedure = sob_display_procedurecode.value === '';
    nuEnable('sob_display_sql', hasDisplayProcedure);
    $('#sob_display_sql').toggleClass('nu-sql-strikethrough', !hasDisplayProcedure);

    nuShow('sob_display_procedure_open_button', sob_display_procedure.value !== '');
}

$("#sob_display_procedurecode").on("change", function(event) {
    nuObjectDisplayProcedureChanged();
});

function nuObjectSelectProcedureChanged() { 
    const hasProcedure = sob_select_procedurecode.value !== '';
    const sqlValue = $('#sob_select_sql').val();

    nuEnable('sob_select_sql', !hasProcedure);
    const shouldStrikeThrough = hasProcedure && sqlValue !== '';
    $('#sob_select_sql').toggleClass('nu-sql-strikethrough', shouldStrikeThrough);

    nuShow('sob_select_procedure_open_button', sob_select_procedure.value !== '');

}

$("#sob_select_procedurecode").on("change", function(event) {
    nuObjectSelectProcedureChanged();
});


$('#sob_all_zzzzsys_tab_idbutton').on('contextmenu', function(e) {
    e.preventDefault();
    nuObjectMenuPickTabsClick(this, event);
});

function nuOnMobileViewComplete() { 
    
    const elements = [
        { input: '#sob_input_file_target', label: '#label_sob_input_file_target' },
        { input: '#sob_input_count', label: '#label_sob_input_count' },
        { input: '#sob_input_javascript', label: '#label_sob_input_javascript' },
        { input: '#sob_input_datalist', label: '#label_sob_input_datalist', offsety: 80 }
    ];

    const inputAnchorTop = $('#sob_input_format').nuCSSNumber('top');
    const inputAnchorTopLabel = $('#label_sob_input_format').nuCSSNumber('top');

    elements.forEach(({ input, label, offsety = 0 }) => {

        $(input).css('top', inputAnchorTop + offsety);
        $(label).css('top', inputAnchorTopLabel + offsety);

    });
    
}

var url = nuComposeURL(
    'https://fontawesome.com/search?ic=free',
    nuGetValue('label_sob_input_icon'),
    '_blank',
    '',
    'View icon list on Font Awesome'
);
nuSetValue('label_sob_input_icon', url);


function nuTabsCustomCodeSetMarker() {
   nuTabSetMarker('nu5bad6cb370b409e', 'zzzzsys_event_sf000sev_event');
}

nuTabsCustomCodeSetMarker();

function nuAfterSave(){
 if (nuIsPopup()) {
	parent.nuUpdateMessage('refresh_required');
 }
}
