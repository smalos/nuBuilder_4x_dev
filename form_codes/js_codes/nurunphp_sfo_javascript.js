$('#nuAddButton').remove();
$('#nuPrintButton').remove();

function nuSelectBrowse(event) {

    const $element = $('#' + event.target.id);
    const primaryKey = $element.attr('data-nu-primary-key');

    const row = $element.attr('data-nu-row');
    const phpFunction = $('#nucell_' + row + '_0').html();

    nuGetPHP(phpFunction, primaryKey);

}
