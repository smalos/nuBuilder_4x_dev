nuHide('sph_code_snippet_select_lookupcode');

// Code Snippets form
nuSetSnippetFormFilter(0, 0, 0, 1); // PHP Code

var recordId = nuRecordId();
var recordIdSuffix = recordId.slice(-2);

window.nuImages = parent.nuImages;
window.nuHelp = 'Functions';

$('#nuCloneButton').remove();

var title = nuEventName() + ' - ' + recordId;
if (nuIsIframe()) {
    $('#nuBreadcrumb0').html(title);
} else {
   nuSetTitle(title);
}

nuAttachButtonImage('icon', recordIdSuffix);
nuSetValue('sph_code', recordId);
nuHide('sph_code');
setStyles();

$('.nuSaveButtonEdited').removeClass('nuSaveButtonEdited');

$('#sph_php')
.addClass('php')
.on('dblclick', function() {
    nuOpenAce('PHP', this.id);
});

$(function() {
    $('#sph_php').scrollTop(window.scrollTop);
});

nuHasNotBeenEdited();

function setStyles() {

    $('#sph_php')
    .css('padding', '3px 3px 3px 3px')
    .trigger("focus");

}


function nuBeforeSave() {

    if (nuFormType() == 'edit') {
        window.scrollTop = $('#sph_php').scrollTop();
    }

    return true;

}