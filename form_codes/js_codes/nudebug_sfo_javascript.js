$('#deb_message')
.css('font-size', 10 + 'px')
// .css('background-color', '#FFEEA6')
.prop('readonly', true)
.on('dblclick', function() {
    nuOpenAce('Text', this.id);
});


$('#delete_option').val(0);
$('#nuAddButton').remove();
$('#nuOptions').remove();

var mess = String($('#deb_message').val());
var i = mess.indexOf('<br>');
var m = mess.substr(i + 6);
var t = mess.substr(0, i);
var isHTMLText = m.startsWith('<html>');

nuSetTitle(m.substr(0, i));

$('#nuTab0').remove();

$('#nuBreadcrumb2')
.css('text-align', 'center')
.css('width', '95%')
.css('color', 'black')
.css('padding', '5px')
.html(t + ' :: ' + nuWhen(nuEscapeHTML($('#deb_added').val())))
.appendTo("#nuTabHolder");

$('#deb_message').val(m);


$("[data-nu-column='2']").each(function(index) {

    if ($(this).html().trim() !== '') {

        const nuhtm = nuWhen(Number($(this).html()));

        $(this).html(nuhtm);

    }

});

if (nuFORM.getCurrent().record_id !== '') {

    $('.nuActionButton').remove();
    nuAddActionButton('Delete');

}

nuAddActionButton('DeleteAll', 'Delete All', 'nuDeleteAllAction()');

if (isHTMLText) {
    nuDebugConvertTextareaToDiv();
}

function nuDebugConvertTextareaToDiv() {

    const textarea = document.getElementById('deb_message');
    const htmlCode = textarea.value;
    const div = document.createElement('div');
    div.innerHTML = htmlCode;
    div.style.cssText = textarea.style.cssText;
    div.style.userSelect = 'text';
    textarea.parentNode.replaceChild(div, textarea);

}