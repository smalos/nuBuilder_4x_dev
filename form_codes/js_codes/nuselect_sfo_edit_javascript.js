nuSetToolTip('sse_resize', 'Resize');
$('#sse_sql').css('z-index', 1);
nuLabelOnTop(['nusvg']);



if (nuIsNewRecord()) {
 $('#sse_edit').val(0);
}

$("#sse_edit option[value='']").remove();

$('#sse_sql')
.css('font-size', '10px')
.addClass('sql')
.on('dblclick', function() {
 nuOpenAce('SQL', this.id);
});

$('#label_sse_sql').remove();
nuHide('sse_code_snippet_lookupcode');
nuSetSnippetFormFilter(0, 0, 1);

$('#sse_resize').addClass('nuAllowDblClick');

nuSelectSetSFCB();

if (window.filter == 'justsql') {

 var sid = String(nuFORM.getCurrent().record_id);
 var from = sid.substring(sid.length-2);
 var targ = '#sfo_browse_sql';

 $('#nuDeleteButton').remove();
 $('#nuCloneButton').remove();
 $('#sse_description').val(sid);

 nuHide('sse_description');

 if (nuFORM.getCurrent().record_id != -1) {

 $('#nuSaveButton').hide();

 if (from == 'BR') {
 nuAddActionButton('SaveToTextarea', 'Copy to Form Browse SQL', 'nuSelectCopySQL("sfo_browse_sql")');
 }
 if (from == 'SE') {
 nuAddActionButton('SaveToTextarea', 'Copy to Select Object SQL', 'nuSelectCopySQL("sob_select_sql")');
 }
 if (from == 'DI') {
 nuAddActionButton('SaveToTextarea', 'Copy to Display Object SQL', 'nuSelectCopySQL("sob_display_sql")');
 }

 }

}





$('#sse_sql').css('overflow-x', 'scroll');


nuSelectWhereClauses();


function nuSelectCopySQL(target) {

 const s = $('#sse_sql').val();

 parent.$('#' + target).val(s).change();

 parent.$('#dialogClose').trigger("click");

}


function nuSelectTempPHP() {

 var p = [];

 p.push('');
 p.push('$sql = "');
 p.push('');
 p.push('CREATE TABLE #TABLE_ID#');
 p.push($('#sse_sql').val());
 p.push('');
 p.push('";');
 p.push('');
 p.push("nuRunQuery($sql);");
 p.push('');
 nuMessage(p);

 $("#nuMessageDiv").css('text-align', 'left');

}

function nuBeforeSave() {

 nuSelectBuildSQL();
 return true;

}

function nuSelectWhereClauses() {

 $("[id$='ssc_type']select").each(function(index) {

 var p = $(this).attr('data-nu-prefix');
 var t = $(this).val();

 if (t == 2 || t == 3) {

 if ($('#' + p + 'ssc_sort').val() == '') {
 $('#' + p + 'ssc_sort').val('ASC');
 }

 $('#' + p + 'ssc_clause').hide();
 $('#' + p + 'ssc_sort').show();

 } else {

 $('#' + p + 'ssc_clause').show();
 $('#' + p + 'ssc_sort').hide();

 }

 });

}

function nuSelectWhereClausesold() {

 $("[id$='ssc_type']select").each(function(index) {

 var p = $(this).attr('data-nu-prefix');
 var t = $(this).val();

 if (t == 2 || t == 3) {

 if ($('#' + p + 'ssc_sort').val() == '') {
 $('#' + p + 'ssc_sort').val('ASC');
 }

 $('#' + p + 'ssc_clause').hide();
 $('#' + p + 'ssc_sort').show();

 } else {

 $('#' + p + 'ssc_clause').show();
 $('#' + p + 'ssc_sort').hide();

 }

 });

}

function nuSelectAddSQLTable(e) {

 let s = $('#sqlframe')[0].contentWindow.nuSQL;

 s.addBox(e.target.value);
 e.target.value = '';
 s.buildSQL();

}

function nuSelectSFCB() {

 nuSelectWhereClauses();
 nuSelectBuildSQL();

}

function nuSelectBuildSQL() {
 $('#sqlframe')[0].contentWindow.nuSQL.buildSQL();
}

function nuSelectSetSFCB() {

 $('.nuSubformCheckbox.zzzzsys_select_clause').on('click',
 function() {
 nuSelectSFCB();
 });


}

function nuSelectResizeSQL() {

 if ($('#sqlframe').css('height') == '460px') {
 $('#sqlframe').css('height', 700);
 } else {
 $('#sqlframe').css('height', 460);
 }

}