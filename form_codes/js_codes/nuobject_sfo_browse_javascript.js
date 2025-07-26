/*
$("[data-nu-column='0']").each(function() {
  $(this).addClass('nu_' + this.textContent).addClass('nuCellColored');
});
*/


function nuObjectBrowseStyleBadge(column) {

    function createBadgeHtml(text, objClass) {
        return `
            <span class="text-badge ${objClass}" style="
                border: none;
                border-color: transparent;
                border-radius: 12px;
                padding: 2px 10px;
                box-shadow: none;
                display: inline-block;
                white-space: nowrap;
                line-height: 1.2;
                transition: all 0.2s ease;
                margin-top: 1px;
            ">${text}</span>
        `;
    }

    nuBrowseLoop([column], function (cell) {
        const $cell = $(cell);
        const cellText = $cell.text().trim();
		const objClass = 'nu_' + cellText;
        if (cellText && cellText.length > 0) {
            $cell.html(createBadgeHtml(cellText, objClass));
        }
    });
}

nuObjectBrowseStyleBadge(0);



$("[data-nu-column='4']").each(function() {
  $(this).html(stripHTMLTags($(this).html()).replace(/&nbsp;/g, ' ').trim());
});

function stripHTMLTags(s) {
  return s == '' ? '' : s.replace(/<\/?[^>]+(>|$)/g, "");
}
$(function() {
  const types = [
    ["", ""],
    ["calc", "Calc"],
    ["display", "Display"],
    ["contentbox", "ContentBox"],
    ["editor", "WYSIWYG Editor"],
    ["chart", "Chart"],
    ["html", "HTML"],
    ["image", "Image"],
    ["input", "Input"],
    ["lookup", "Lookup"],
    ["run", "Run"],
    ["select", "Select"],
    ["subform", "Subform"],
    ["textarea", "Textarea"],
    ["word", "Word"]
  ];
  nuAddBrowseFilter('nu5bad6cb375afa75').nuSearchablePopup({
    items: types
  });
  const inputTypes = [
    ["", ""],
    ["nuDate", "nuDate"],
    ["nuNumber", "nuNumber"],
    ["nuScroll", "nuScroll"],
    ["nuAutoNumber", "nuAutoNumber"],
    ["button", "Button"],
    ["checkbox", "Checkbox"],
    ["color", "Color"],
    ["datetime-local", "Datetime-Local"],
    ["email", "Email"],
    ["file", "File"],
    ["image", "Image"],
    ["month", "Month"],
    ["number", "Number"],
    ["password", "Password"],
    ["radio", "Radio"],
    ["range", "Range"],
    ["reset", "Reset"],
    ["search", "Search"],
    ["tel", "Telephone"],
    ["text", "Text"],
    ["time", "Time"],
    ["url", "URL"],
    ["week", "Week"]
  ];
  nuAddBrowseFilter('nu5bad6cb377a01b0').nuSearchablePopup({
    items: inputTypes
  });
});