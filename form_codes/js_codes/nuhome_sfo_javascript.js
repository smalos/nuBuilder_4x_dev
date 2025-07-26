$('#user_home').addClass('nuUserHomeButton');
$('.nuActionButton').hide();

// nuHideTabs(0);
nuGetStartingTab();

function nuHomeOpenForm(f, r, event) {
    n = event.ctrlKey ? '2' : '0';
    nuForm(f, r, '', '', n);
}

function nuHomeOpenCreateMenuConfig(menuType, event) {
    const baseMenus = {
        Procedure: [{
                text: nuContextMenuItemText("Run", "fa fa-play"),
                action: () => nuHomeOpenForm('nurunphp', '', event)
      },
            {
                text: nuContextMenuItemText("Add", "fa fas fa-plus"),
                action: () => nuHomeOpenForm('nuprocedure', '-1', event)
      }
    ],
        Notes: [{
                text: nuContextMenuItemText("Add", "fa fas fa-plus"),
                action: () => nuHomeOpenForm('nunotes', '-1', event)
      },
            {
                text: nuContextMenuItemText("Categories", "fa-solid fa-list"),
                action: () => nuHomeOpenForm('nunotescategroy', '', event)
      }
    ],
        User: [{
                text: nuContextMenuItemText("Add", "fa fas fa-plus"),
                action: () => nuHomeOpenForm('nuuser', '-1', event)
      },
            {
                text: nuContextMenuItemText("Permission Items", "fa-solid fa-list"),
                action: () => nuHomeOpenForm('nupermissionitem', '', event)
      }
    ],
        Email: [{
                text: nuContextMenuItemText("Add Template", "fa fas fa-plus"),
                action: () => nuHomeOpenForm('nuemailtemplate', '-1', event)
      },
            {
                text: nuContextMenuItemText("Email Templates", "fa-solid fa-list"),
                action: () => nuHomeOpenForm('nuemailtemplate', '', event)
      }
    ],
        Report: [{
                text: nuContextMenuItemText("Run", "fa fa-play"),
                action: () => nuHomeOpenForm('nurunreport', '', event)
      },
            {
                text: nuContextMenuItemText("Add", "fa fas fa-plus"),
                action: () => nuHomeOpenForm('nubuildreport', '-1', event)
      },
            {
                text: nuContextMenuItemText("Fast Report", "fa fa-bolt"),
                action: () => nuHomeOpenForm('nufrlaunch', '', event)
      }
    ],
        Form: [{
                text: nuContextMenuItemText("Add", "fa fas fa-plus"),
                action: () => nuHomeOpenForm('nuform', '-1', event)
      },
            {
                text: nuContextMenuItemText("Fast Form", "fa fa-bolt"),
                action: () => nuHomeOpenForm('nufflaunch', '', event)
      }
    ],
        Database: [{
                text: nuContextMenuItemText("Sessions", "fa-solid fa-key"),
                action: () => nuHomeOpenForm('nusession', '', event)
      },
            {
                text: nuContextMenuItemText("Backup", "backup far fa-hdd"),
                action: () => nuRunBackup()
      },
            {
                text: nuContextMenuItemText("Cloner", "far fa-clone"),
                action: () => nuHomeOpenForm('nucloner', '', event)
      },
            {
                text: nuContextMenuItemText("Update", "fas fa-cloud-download-alt"),
                action: () => nuHomeOpenForm('nuupdate', '', event)
      },
            {
                text: nuContextMenuItemText("CSV Transfer", "fas fa-file-csv"),
                action: () => nuHomeOpenForm('nucsvtransfer', '-1', event)
      }
    ],
        Setup: [{
                text: nuContextMenuItemText("Format", "fa fa-calendar"),
                action: () => nuHomeOpenForm('nuFormat', '', event)
      },
            {
                text: nuContextMenuItemText("Items", "fa fa-list"),
                action: () => nuHomeOpenForm('nuitem', '', event)
      },
            {
                text: nuContextMenuItemText("Translation", "fa fa-globe"),
                action: () => nuHomeOpenForm('nutranslate', '', event)
      }
    ]
    };
    if (menuType === 'Database' && nuSERVERRESPONSE.is_demo) {
        baseMenus.Database = baseMenus.Database.filter(item => item.text !== "Sessions");
    }
    const menu = [{
        text: nuTranslate(menuType)
  }, ...baseMenus[menuType]];
    return menu;
}

function nuHomeMenuClick(element, event, menuType) {
    const menu = nuHomeOpenCreateMenuConfig(menuType, event);
    nuOpenContextMenu(event, menu, element);
}