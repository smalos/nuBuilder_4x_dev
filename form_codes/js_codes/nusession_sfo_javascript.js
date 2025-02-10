nuHide('nuAddButton');

function addActionButton() {
    const btn = nuAddActionButton('TerminateSession', 'Terminate Sessions', 'askTerminateSessions()');
    btn.addClass('nuSaveButtonEdited');
}

function runTerminateSessions(option = '') {
    nuSetProperty('NUSESSIONTERMINATE_OPTION', option)
    nuRunPHPHidden("NUSESSIONTERMINATE");
}

function askTerminateSessions() {
    $.confirm({
        title: 'Terminate sessions',
        content: 'This will terminate all users\' sessions, which could result in unsaved work. Do you like to proceed?',

        opacity: 0.5,
        boxWidth: '70%',
        useBootstrap: false,
        modal: true,
        closeIcon: false,
        resizable: true,
        zindex: 10000,
        container: '#nubody',

        buttons: {
            terminateAll: {
                text: 'Terminate all sessions',
                btnClass: 'btn-confirm-green',
                action: function () {
                    runTerminateSessions("");
                }
            },
            terminateExceptMine: {
                text: 'Terminate all sessions but mine',
                btnClass: 'btn-confirm-green',
                action: function () {
                    runTerminateSessions("others");
                }
            },
            cancel: {
                text: 'NO',
                btnClass: 'btn-red',
                action: function () {
                    // Do nothing, just close the dialog
                }
            }
        }
    });
}



addActionButton();