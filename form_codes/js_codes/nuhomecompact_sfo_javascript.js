$('#user_home').addClass('nuUserHomeButton');
$('.nuActionButton').hide();
nuHideTabs(0);
nuGetStartingTab();

function nuHomeOpenForm(f, r, event) {
    n = event.ctrlKey ? '2': '0';
    nuForm(f, r, '', '', n);
}

function nuHomeOpenMenu(event, menu, element) {
    event.stopPropagation();
    ctxmenu.show(menu, element);
}

function nuHomeMenuProcedureClick(element, event) {

    const menu = [{
        text: nuTranslate("Procedure")
    },

        {
            text: nuContextMenuItemText("Run", "fa fa-play"),
            action: () => nuHomeOpenForm('nurunphp', '', event)
        },
        {
            text: nuContextMenuItemText("Add", "fa fas fa-plus"),
            action: () => nuHomeOpenForm('nuprocedure', '-1', event)
        }]

    nuHomeOpenMenu(event, menu, element);

}

function nuHomeMenuNotesClick(element, event) {

    const menu = [{
        text: nuTranslate("Notes")
    },

        {
            text: nuContextMenuItemText("Add", "fa fas fa-plus"),
            action: () => nuHomeOpenForm('nunotes', '-1', event)
        },
        {
            text: nuContextMenuItemText("Categories", "fa-solid fa-list"),
            action: () => nuHomeOpenForm('nunotescategroy', '', event)
        }]

    nuHomeOpenMenu(event, menu, element);

}

function nuHomeMenuUserClick(element, event) {

    const menu = [{
        text: nuTranslate("User")
    },

        {
            text: nuContextMenuItemText("Add", "fa fas fa-plus"),
            action: () => nuHomeOpenForm('nuuser', '-1', event)
        },
        {
            text: nuContextMenuItemText("Permission Items", "fa-solid fa-list"),
            action: () => nuHomeOpenForm('nupermissionitem', '', event)
        }]

    nuHomeOpenMenu(event, menu, element);

}

function nuHomeMenuEmailClick(element, event) {

    const menu = [{
        text: nuTranslate("Email")
    },

        {
            text: nuContextMenuItemText("Add Template", "fa fas fa-plus"),
            action: () => nuHomeOpenForm('nuemailtemplate', '-1', event)
        },
        {
            text: nuContextMenuItemText("Email Templates", "fa-solid fa-list"),
            action: () => nuHomeOpenForm('nuemailtemplate', '', event)
        }]

    nuHomeOpenMenu(event, menu, element);

}

function nuHomeMenuReportClick(element, event) {

    const menu = [{
        text: nuTranslate("Report")
    },

        {
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
        }]

    nuHomeOpenMenu(event, menu, element);

}

function nuHomeMenuFormClick(element, event) {

    const menu = [{
        text: nuTranslate("Form")
    },

        {
            text: nuContextMenuItemText("Add", "fa fas fa-plus"),
            action: () => nuHomeOpenForm('nuform', '-1', event)
        },
        {
            text: nuContextMenuItemText("Fast Form", "fa fa-bolt"),
            action: () => nuHomeOpenForm('nufflaunch', '', event)
        }]

    nuHomeOpenMenu(event, menu, element);

}

function nuHomeMenuDatabaseClick(element, event) {


    let menuSession =

    {
        conditional: true,
        text: nuContextMenuItemText("Sessions", "fas fa-key"),
        action: () => nuHomeOpenForm('nusession', '', event)
    };



    let menu = [{
        text: nuTranslate("Database")
    },
        {
            text: nuContextMenuItemText("CSV Transfer", "fas fa-file-csv"),
            action: () => nuHomeOpenForm('nucsvtransfer', '', event)
        },
        menuSession,
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
        }]



    if (nuSERVERRESPONSE.is_demo) {
        menuProcedure = menuProcedure .filter((item) => item.conditional !== true);
    }

    nuHomeOpenMenu(event, menu, element);

}


function nuHomeMenuSetupClick(element, event) {

    const menu = [{
        text: nuTranslate("Setup")
    },
        {
            text: nuContextMenuItemText("Format", "fa fa-calendar"),
            action: () => nuHomeOpenForm('nuFormat', '', event)
        },

        {
            text: nuContextMenuItemText("Translation", "fa fa-globe"),
            action: () => nuHomeOpenForm('nutranslate', '', event)
        }]

    nuHomeOpenMenu(event, menu, element);

}