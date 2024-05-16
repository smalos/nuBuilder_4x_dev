const tables = selectToValueArray('clo_tables_include');
    nuSetProperty('nubackup_tables_include', tables.length === 0 ? '' : JSON.stringify(tables));

nuRunBackup();