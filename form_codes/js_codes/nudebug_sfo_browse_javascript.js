nuAddBrowseFilter('nu65e9ea5e7414ca0').nuSearchablePopup({ items: getFlag() });


nuAddActionCheckbox({
  id: 'chkAutoRefresh',
  text: 'Auto Refresh',
  checked: false,
  storage: 'local',
  onChecked(isChecked) { 
    nuDebugSetAutoRefresh(isChecked);
  }
});

function nuDebugSetAutoRefresh(active) {
   
    const button = document.getElementById('nuSearchField');
    if (!button) return; 

    if (button._refreshTimer) {
        clearInterval(button._refreshTimer);
        delete button._refreshTimer;
    }

    if (!active) return;

    button._refreshTimer = setInterval(() => {
        if (!button.isConnected) {
            clearInterval(button._refreshTimer);
            delete button._refreshTimer;
            return;
        }
        nuGetBreadcrumb();
    }, 2000);
    
}


nuDebugSetAutoRefresh(nuGetValue('chkAutoRefresh'));