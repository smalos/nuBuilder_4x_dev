nuAddActionButton('runOutputEval', 'Run', 'nuOutputEval()');

function scrollToBottom(id) {
    let textarea = document.getElementById(id);
    textarea.scrollTop = textarea.scrollHeight;
}

function nuOutputEval() {

    try {
        jsc_output.value += eval(jsc_Input.value) + "\n";
        scrollToBottom('jsc_output');
    } catch (e) {

        jsc_output.value += e.message;
    }

}