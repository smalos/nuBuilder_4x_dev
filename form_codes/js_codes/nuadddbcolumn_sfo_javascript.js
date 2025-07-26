function nuAddDBColumnGetDataType(type, inputType, selectMultiple) {
    
    const BASE_TYPE_MAP = {
        lookup: 'VARCHAR(25)',
        calc: 'DECIMAL(12,4)',
        textarea: 'TEXT',
    };

    const SELECT_TYPE_MAP = {
        single: 'VARCHAR(100)',
        multiple: 'VARCHAR(1000)',
    };

    const INPUT_TYPE_MAP = {
        date: 'DATE',
        nuDate: 'DATE',
        number: 'INT',
        nuAutoNumber: 'BIGINT UNSIGNED',
        nuNumber: 'DECIMAL(12,4)',
        file: 'LONGTEXT',
    };

    if (type === 'select') {
        return SELECT_TYPE_MAP[selectMultiple ? 'multiple' : 'single'];
    }

    if (type === 'input') {
        return INPUT_TYPE_MAP[inputType] || 'VARCHAR(100)';
    }

    return BASE_TYPE_MAP[type] || 'VARCHAR(100)';
    
}


function nuAddDBColumnSetDefault() {

    const table = parent.$('#sob_all_table').val();
    const id = parent.$('#sob_all_id').val();
    const type = parent.$('#sob_all_type').val();
    const input = parent.$('#sob_input_type').val();
    const selectMultiple = parent.nuGetValue('sob_select_multiple'); // Currently unused
    const dataType = nuAddDBColumnGetDataType(type, input);

    const query = `\`${id}\` ${dataType} NULL DEFAULT NULL`;
    const alterStart = `ALTER TABLE \`${table}\` ADD`;

    $('#sql_query_word').html(alterStart);
    $('#sql_query').val(query);

    nuSetProperty('sob_all_table', table);
    nuRefreshSelectObject('sql_after_column');

    return `${alterStart} ${query};`;

}

nuAddActionButton('Run', 'Run', 'nuHasNotBeenEdited(); nuRunPHPHidden("nu_run_add_db_column")');
nuAddActionButton('Preview', 'Preview', 'nuAddDBColumnPreview()');
nuAddDBColumnSetDefault();


function nuAddDBColumnPreview() {

    const table = parent.$('#sob_all_table').val();
    const query = nuGetValue('sql_query');
    const after = nuGetValue('sql_after_column');
    let sql = 'ALTER TABLE `' + table + '`  ADD ' + query;

    if (after != '') {
        sql = sql + " AFTER `" + after + '`';
    }

    const escapeForHTMLAttribute = str => str.replace(/\n/g, '\\n').replace(/'/g, "\\'");
    const copyButtonHTML = (value, label) => `<button type="button" class="nuActionButton nuAdminButton" onclick="navigator.clipboard.writeText(nuTranslate('${escapeForHTMLAttribute(value)}'))">${nuTranslate(label)}</button>`;
    const formIdCopyButton = copyButtonHTML(sql, 'Copy');

    nuMessage('Preview SQL', sql + ';' + '<br></br>' + formIdCopyButton);

}

$('#sql_query').addClass('sql');
$('.sql').on('dblclick', function() {
    nuOpenAce('SQL', this.id);
});