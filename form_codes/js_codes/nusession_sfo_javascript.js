nuHide('nuAddButton');

function nuSessionAddActionButton() {
    const btn = nuAddActionButton('TerminateSession', 'Terminate Sessions', 'nuSessionAskTerminateSessions()');
    btn.addClass('nuSaveButtonEdited');
}

function nuSessionRunTerminateSessions(option = '') {
    nuSetProperty('nu_session_terminate_option', option)
    nuRunPHPHidden("nu_session_terminate");
}

function nuSessionGetScreenWidth() {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}

function nuSessionGetBoxWidth() {
    const screenWidth = nuSessionGetScreenWidth();
    return Math.min(screenWidth * 0.9, 500) + 'px';
}

function nuSessionAskTerminateSessions() {
    $.confirm({
        title: 'Terminate sessions',
        content: "This will end all user sessions, which could result in unsaved work. Would you like to continue?",

        opacity: 0.5,
        boxWidth: nuSessionGetBoxWidth(),
        maxWidth: '500px',
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
                    nuSessionRunTerminateSessions("");
                }
            },
            terminateExceptMine: {
                text: 'Terminate all sessions but mine',
                btnClass: 'btn-confirm-green',
                action: function () {
                    nuSessionRunTerminateSessions("others");
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

nuSessionAddActionButton();