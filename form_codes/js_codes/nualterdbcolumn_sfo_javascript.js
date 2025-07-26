function nuAlterDBColumnSetDefault() {

    const table = parent.$('#sob_all_table').val();
    const id = parent.$('#sob_all_id').val();
    const type = parent.$('#sob_all_id_datatype').val();

    let qry = `\`${id}\` ${type} NULL DEFAULT NULL`;
    let start = `ALTER TABLE \`${table}\` CHANGE \`${id}\``;

    $('#sql_query_word').html(start);
    $('#sql_query').val(qry);

    nuSetProperty('sob_all_table', table);
    nuSetProperty('sob_all_id', id);

}

nuAddActionButton('Run', 'Run', 'nuHasNotBeenEdited(); nuRunPHPHidden("nu_run_alter_db_column")');
nuAddActionButton('Preview', 'Preview', 'nuAlterDBColumnPreview()');
nuAlterDBColumnSetDefault();


function nuAlterDBColumnPreview() {

    const table = parent.$('#sob_all_table').val();
    const query = nuGetValue('sql_query');
    let sql = nuGetValue('sql_query_word', 'html') + ' ' + nuGetValue('sql_query');

    const escapeForHTMLAttribute = str => str.replace(/\n/g, '\\n').replace(/'/g, "\\'");
    const copyButtonHTML = (value, label) => `<button type="button" class="nuActionButton nuAdminButton" onclick="navigator.clipboard.writeText(nuTranslate('${escapeForHTMLAttribute(value)}'))">${nuTranslate(label)}</button>`;
    const formIdCopyButton = copyButtonHTML(sql, 'Copy');

    nuMessage('Preview SQL', sql + ';' + '<br></br>' + formIdCopyButton);

}

$('#sql_query').addClass('sql');
$('.sql').on('dblclick', function() {
    nuOpenAce('SQL', this.id);
});