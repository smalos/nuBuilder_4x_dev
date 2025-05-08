nuHideHolders(0,1,2);

function nuSelectBrowse(event, element) {    
    const primaryKey = $(element).attr('data-nu-primary-key');  
    nuForm('nuObject', primaryKey, '', '', '2');  
}


var numRows = nuCurrentProperties().browse_filtered_rows;
parent.nuSetValue('nuTab1', nuTranslate('Linked Objects') + ' (' + numRows + ')','html')