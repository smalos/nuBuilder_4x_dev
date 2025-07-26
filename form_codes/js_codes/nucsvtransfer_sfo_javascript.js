function nuCheckCSV() {

    const csvTo = $('#csv_to').val().trim();
    const csvFrom = $('#csv_from').val().trim();
    const csvDelimiter = $('#csv_delimiter').val().trim();
    const csvTransfer = $('#csv_transfer').val().trim();

    if (!csvTransfer || !csvFrom || !csvTo || !csvDelimiter) {
        return nuMessage(nuTranslate('Validation Error'), nuTranslate('No fields can be left blank') + '...');
    }

    if (csvTransfer === 'export') {
        if (nuFORM.getJustTables().includes(csvFrom)) {
            return nuRunPHP('nu_csv_transfer');
        }
        return nuMessage(nuTranslate('No such tablename') + '...');
    }

    if (csvTransfer === 'import') {
        if (!nuCSVfiles.includes(csvFrom)) {
            return nuMessage([
                nuTranslate('File not found'),
                '',
                nuTranslate('CSV File must be located in the temp directory of the nuBuilder directory')
            ]);
        }

        if (csvTo === 'zzzzsys_user') {
            return nuImportUsersFromCSV(csvFrom, csvDelimiter);
        }

        if (nuFORM.getJustTables().includes(csvTo)) {
            return nuMessage([
                nuTranslate('There is already a table named'),
                `<b>${csvTo}</b>`
            ]);
        }

        return nuRunPHP('nu_csv_transfer');
    }

}



nuAddActionButton('transfer', "Transfer", 'nuCheckCSV()', '');

$('#csv_transfer').val('export');
$('#csv_delimiter').val('44');

nuHide('csv_delete_after_import');

nuCSVTransfer('export');

function nuCSVTransfer(action) {

    const isExport = action === 'export';

    $('#label_csv_from').html(nuTranslate(isExport ? 'Export From (Table)': 'Import From CSV File'));
    $('#label_csv_to').html(nuTranslate(isExport ? 'Export To CSV File': 'Import To (Table)'));

    const dataListValue = isExport ? nuFORM.getJustTables(): nuCSVfiles;

    isExport ? nuHide('csv_delete_after_import'): nuShow('csv_delete_after_import');

    nuAddDatalist('csv_from', dataListValue, true);

}