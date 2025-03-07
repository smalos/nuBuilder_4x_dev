nuSetTitle(nuGetValue('srm_format'));

var $sign = $('#sign');
var $separator = $('#separator');
var $decimal = $('#decimal');
var $places = $('#places');
var $srmFormat = $('#srm_format');
var $srmType = $('#srm_type');
var $srmCurrency = $('#srm_currency');

$sign.addClass('nu-bold-big-text');
$separator.addClass('nu-bold-big-text');
$decimal.addClass('nu-bold-big-text');
$places.addClass('nu-bold-big-text');
$srmFormat.addClass('nuReadonly').css('font-size', '22px');


nuSetFormatType();

function nuAddToFormat(e) {
    const srmTypeVal = $srmType.val();
    if (srmTypeVal === 'Date') {
        let v = String(e.target.innerHTML);
        if (v === 'Space') {
            v = ' ';
        }
        $srmFormat.nuSetValue($srmFormat.val() + v);
    } else {
        const si = $sign.val();
        const se = $separator.val();
        const pl = $places.val();
        const de = Number(pl) > 0 ? $decimal.val() : '';
        const cu = JSON.stringify([si, se, de, pl]);

        const space = si !== '' ? ' ' : '';
        $srmFormat.val(si + space + '1' + se + '000' + de + String(0).repeat(pl)).trigger('change');
        $srmCurrency.nuSetValue(cu);
    }

   nuFormatPreview();
}

function nuSetFormatType(a) {
    
    const argLength = arguments.length;
    nuHide('nucalculator');
     $("[data-nu-nunumber-format]").nuHide();

    if (argLength === 1) {
        $srmFormat.val('');
    }

    const srmTypeVal = $srmType.val();
    if (srmTypeVal === 'Date') {
        if (argLength === 1) {
            $srmFormat.val('');
        }
        nuShow('nucalculator');
    }

    if (srmTypeVal === 'Number') {
        if (argLength === 1) {
            $srmFormat.val('1000');
            nuAddToFormat();
        }
        $("[data-nu-nunumber-format]").nuShow();
    }

    $("[data-nu-nunumber-format]").nuShow(srmTypeVal === 'Number');

    nuFormatPreview();

}


function nuFormatPreview() {
    const inputType = $('#srm_type').val();
    const previewElement = $("#srm_preview");

    if (inputType === 'Date') {
        previewElement.attr("data-nu-format", `D|${nuGetValue('srm_format')}`);
        nuSetDateValue('srm_preview');
    }

    if (nuGetValue('srm_preview') === '' &&  nuGetValue('srm_format') !== '') {
        $("#srm_preview").removeAttr("data-nu-format");
        nuSetValue('srm_preview', 'Format Error');
    }

    nuEnable('srm_preview', nuGetValue('srm_preview') !== 'Format Error');
    nuShow('srm_preview', inputType === 'Date');
}