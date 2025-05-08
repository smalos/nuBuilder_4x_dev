if ($('#zzzzsys_tab_sf000syt_access').val() !== '') {
    nuMessage(nuTranslate('Validation Error'), nuTranslate('The first tab must not be set to hidden'));
}

function nuDisplayObjectRefreshed(obj) {

    let v = nuGetValue(obj);
    if (v != '' && sfo_primary_key.value !== v) {
        nuSetValue('sfo_primary_key', v);
    }
}

nuAccessFormSetButtonIcons();

function nuFormColorObjectTypes() {

    // Color Types
    $('select[id$=sob_all_type]').find('option').each(function(index, element) {
        $(element).addClass('nu_' + element.value);
    });

    $('select[id$=sob_all_type]').each(function(index, element) {

        $(element).removeClass();
        $(element).addClass('nu_' + element.value);
    });

}

function nuFormSetControlsVisibility() {

    var pb = 'previewbrowse';
    var pe = 'previewedit';
    var js = 'sfo_javascript';

    var bb = 'bb_event';
    var be = 'be_event';
    var bs = 'bs_event';
    var as = 'as_event';
    var bd = 'bd_event';
    var ad = 'ad_event';

    nuEnable([pb, pe, bb, be, bs, as, bd, ad, js]);

    var t = String($('#sfo_type').val());

    if (t == 'browseedit') {
        nuEnable(['js_edit', 'js_browse', 'js_browse_edit']);
    } else
        if (t == 'browse') {
        nuDisable([pe, be, bs, as, bd, ad, 'js_edit']);
        nuEnable(['js_browse', 'js_browse_edit']);
    } else
        if (t == 'edit') {
        nuDisable([pb, pb, bb, 'js_browse']);
        nuEnable(['js_edit', 'js_browse_edit']);
    } else
        if (t == 'launch') {
        nuDisable([pb, bb, bs, as, bd, ad, 'js_browse', 'js_edit']);
        nuEnable('js_browse_edit');
    } else
        if (t == 'subform') {
        nuDisable([pb, bb, be, bs, as, bd, ad, js, 'js_browse', 'js_edit', 'js_browse_edit']);
        $('#js_browse_edit').html('Launch');
    }

    for (let i = 1; i <= 3; i++) {
        nuShow('nuTab' + i, t !== 'subform' || i == 1);
    }

}

function nuFormAfterInsertRowObjects() {
    nuFormColorObjectTypes();
}

function nuFormJSMod(i) {

    var js = $('#' + i);

    if (js.val() !== '') {
        $('#nuTab2').css('font-weight', 'bold');
    }

    js.addClass('js');

}

if (nuFormType() == 'edit') {

    $('#sfo_code_snippet_sql_lookupbutton').on('click', function() {
        nuSetSnippetFormFilter(0, 0, 1, 0); // Custom Code
    });

    $('#sfo_code_snippet_lookupbutton').on('click', function() {
        nuSetSnippetFormFilter(1, 0, 0, 0); // SQL
    });

    nuFormColorObjectTypes();

    $('#title_objformbtnOpenDetails').html(nuTranslate('Details'));

    nuHide('sfo_code_snippet_lookupcode');
    nuHide('sfo_code_snippet_sql_lookupcode');
    nuHide('label_sfo_browse_sql');

    nuSetPlaceholder('sfo_javascript', 'JavaScript / Browse & Edit');
    nuSetPlaceholder('sfo_browse_javascript', 'JavaScript / Browse');
    nuSetPlaceholder('sfo_edit_javascript', 'JavaScript / Edit');
    nuSetPlaceholder('sfo_style', 'CSS');

    $('#title_zzzzsys_tab_sfsyt_help').attr('id', 'help_title');
    $("[id$='syt_help']").addClass('js');

    nuAttachButtonImage('previewbrowse', 'PB', 'nuButtonImageSmall');
    nuAttachButtonImage('previewedit', 'PE', 'nuButtonImageSmall');
    nuAttachButtonImage('bb_event', 'BB', 'nuButtonImageSmall');
    nuAttachButtonImage('be_event', 'BE', 'nuButtonImageSmall');
    nuAttachButtonImage('bs_event', 'BS', 'nuButtonImageSmall');
    nuAttachButtonImage('as_event', 'AS', 'nuButtonImageSmall');
    nuAttachButtonImage('bd_event', 'BD', 'nuButtonImageSmall');
    nuAttachButtonImage('ad_event', 'AD', 'nuButtonImageSmall');
    nuAttachButtonImage('icon_js', 'JS');
    nuAttachButtonImage('icon_sql', 'SQL');
    nuAttachButtonImage('icon_php', 'PHP');
    nuAttachButtonImage('icon_style', 'CSS');

    nuFormJSMod('sfo_edit_javascript');
    nuFormJSMod('sfo_browse_javascript');
    nuFormJSMod('sfo_javascript');

    nuHide('sfo_edit_javascript');
    nuHide('sfo_browse_javascript');
    nuHide('sfo_style');

    $('#sfo_style').addClass('css');

    $('#sfo_browse_sql').addClass('sql').css('font-size', '10px');

    if (!nuIsNewRecord()) {
        nuFormUpdateAclCount();
    }

    nuFromDefaultDescription();

    nuACEInitDblClickHandlers();

    nuFormUpdateDisplayDatalists();

    nuFormTypeChanged();

    let js = nuGetProperty('js');
    if (js !== undefined) {
        let js_button = nuGetProperty('js_button');
        nuFormJSSelectCustomCode('#' + js_button, js);
    } else {
        if ($('#sfo_javascript').val() == '' && $('#sfo_edit_javascript').val() == '' && $('#sfo_browse_javascript').val() !== '') {
            nuFormJSSelectCustomCode('#js_browse', 'sfo_browse_javascript');
        } else if ($('#sfo_javascript').val() == '' && $('#sfo_browse_javascript').val() == '' && $('#sfo_edit_javascript').val() !== '') {
            nuFormJSSelectCustomCode('#js_edit', 'sfo_edit_javascript');
        } else {
            nuFormJSSelectCustomCode('#js_browse_edit', 'sfo_javascript');
        }
    }

    nuFormHighlightJSButtons();


}

if (window.filter == 'justjs') {

    $('#nuDeleteButton').remove();
    $('#nuCloneButton').remove();
    $('#nuTab0').remove();
    $('#nuTab1').remove();
    $('#nuTab2').trigger("click");
    $('#nuTab2').remove();

    nuSetTitle($('#sfo_description').val());

}


$('#user_home')
.css({
    'color': 'white',
    'font-size': '13px',
    'display': 'inline',
    'border-style': 'solid',
    'height': 30,
    'text-shadow': '0 1px 2px #9AB973',
    'border-color': '#9AB973',
    'border-width': '0px 0px 1px 0px',
    'background-color': '#88cb51'
});

function nuFormTypeChanged() {

    var t = String($('#sfo_type').val());

    var pb = 'previewbrowse';
    var pe = 'previewedit';

    var bb = 'bb_event';
    var be = 'be_event';
    var bs = 'bs_event';
    var as = 'as_event';
    var bd = 'bd_event';
    var ad = 'ad_event';

    nuEnable([pb, pe, bb, be, bs, as, bd, ad]);

    nuSetValue('js_browse_edit', 'Browse & Edit');

    if (t == 'browse') {
        nuDisable([pe, be, bs, as, bd, ad]);
    } else
        if (t == 'edit') {
        nuDisable([pb, pb, bb]);
    } else
        if (t == 'launch') {
        nuDisable([pb, bb, bs, as, bd, ad]);
        nuSetValue('js_browse_edit', 'Launch');
    } else
        if (t == 'subform') {
        nuDisable([pb, bb, be, bs, as, bd, ad]);
        nuDisable('sfo_javascript');
    }

    var h = $('#sfo_type').addClass('nuEdited');

    var o = [];
    o.browse = [0,
        1,
        2];
    o.edit = [0,
        2];
    o.browseedit = [0,
        1,
        2];
    o.launch = [0,
        2];
    o.subform = [0,
        1];

    $('#sfo_type').removeClass();
    $('#sfo_type').addClass('nu_' + $('#sfo_type').val());

    if (h) {
        $('#sfo_type').addClass('nuEdited');
    }

    $("#sfo_type > option").each(function() {
        $(this).addClass('nu_' + this.value);
    });

    for (var i = 0; i < 7; i++) {
        $('#nuTab' + i).removeClass('nuRelatedTab');
    }

    t = o[$('#sfo_type').val()];
    if (t !== undefined) {

        for (i = 0; i < t.length; i++) {
            $('#nuTab' + t[i]).addClass('nuRelatedTab');
        }

    }

    nuFormSetControlsVisibility();

}

function nuFormEventList() {

    if ($('sob_all_type').val() == 'subform') {
        return ['onchange',
            'onadd'];
    } else {
        return ['onblur',
            'onchange',
            'onfocus',
            'onkeydown'];
    }

}

function nuFormOnDisplayBlur(event) {

    var id = event.target.id;

    var obj;
    obj = nuSubformRowObject(id, 'sbr_display');
    var dispValue = obj.val();
    if (dispValue !== '' && (dispValue.charAt(3) == '_' || dispValue.charAt(2) == '_')) {

        let idx = dispValue.indexOf('_');
        if (idx == 2 || idx == 3) {
            dispValue = dispValue.substring(idx + 1);
        }

        const title = dispValue.replaceAll('_', ' ').nuCapitalise().nuToTitleCase();

        let objTitle = nuSubformRowObject(id, 'sbr_title');
        if (objTitle.val() == '') objTitle.val(title).change();
    }

}

function nuFormOnTitleDisplayChanged(event) {

    var obj;
    var id = event.target.id;

    if (nuSubformRowObject(id, 'sbr_display').val().trim() == '' && nuSubformRowObject(id, 'sbr_title').val().trim()) return;

    obj = nuSubformRowObject(id, 'sbr_width');
    if (obj.val() == '') obj.val(100).change();

    obj = nuSubformRowObject(id, 'sbr_align');
    if (obj.prop("selectedIndex") < 2) obj.prop("selectedIndex", 1).change();

    obj = nuSubformRowObject(id, 'sbr_order');
    if (obj.val() == '') {

        var max = 0;
        $('[data-nu-field=sbr_order]').each(function() {
            var v = parseInt($(this).val());
            max = (v > max) ? v: max;
        });

        obj.val(max + 10).change();
    }

}

function nuFormOnTabsTitleChanged(event) {

    var obj;
    var id = event.target.id;

    if (nuSubformRowObject(id, 'syt_title').val().trim() == '' && nuSubformRowObject(id, 'syt_title').val().trim()) return;

    obj = nuSubformRowObject(id, 'syt_order');
    if (obj.val() == '') {

        var max = 0;
        $('[data-nu-field=syt_order]').each(function() {
            var v = parseInt($(this).val());
            max = (v > max) ? v: max;
        });

        obj.val(max + 10).change();
    }

}

function nuFromDefaultDescription() {

    var s = 'zzzzsys_browse_sf';
    var r = nuSubformObject(s).rows.length - 1;
    var o = s + nuPad3(r) + 'sbr_title';

    nuSetPlaceholder(o, 'Something');

}

function nuFormUpdateAclCount() {
    const l = $("[data-nu-field='slf_zzzzsys_access_id']").length - 2;
    const t = l <= 0 ? '': ' (' + l + ')';
    $('#nuTab3').html(nuTranslate('Access Levels') + t);
}

function nuFormUpdateDisplayDatalists(i) {

    const a = nuFORM.SQLFields($('#sfo_browse_sql').val());
    const selector = i === undefined ? "[id$='sbr_display']": "#" + i;

    $(selector).each(function() {
        nuAddDatalist($(this).attr('id'), a);
    });
}

function nuBeforeSave() {

    var dupDisplay = nuSubformColumnUnique('zzzzsys_browse_sf', 'sbr_display', 'Display (Browse)');

    if (dupDisplay !== true) {

        nuMessage(dupDisplay);
        return false;
    }

    return true;

}

function nuFormJSSelectCustomCode(t, obj) {

    $('[data-custom-code-textarea-button]').removeClass('nuButtonSelected');
    $(t).addClass('nuButtonSelected');
    nuSetProperty('js', obj);
    nuSetProperty('js_button', $(t).attr('id'));

    $('[data-custom-code-textarea]').nuHide();
    nuShow(obj);
    $('#' +obj).trigger('focus');

    nuFormHighlightJSButtons()

}

function nuFormHighlightJSButtons() {

    $('#js_edit').toggleClass('nuButtonHighlighted', $('#sfo_edit_javascript').val() !== '');
    $('#js_browse').toggleClass('nuButtonHighlighted', $('#sfo_browse_javascript').val() !== '');
    $('#js_browse_edit').toggleClass('nuButtonHighlighted', $('#sfo_javascript').val() !== '');
    $('#css_style').toggleClass('nuButtonHighlighted', $('#sfo_style').val() !== '');

}

/*

function nuOnMobileViewComplete() {
    
    const elements = [
        { input: '#sfo_browse_javascript' },
        { input: '#sfo_edit_javascript' },
        { input: '#sfo_style' },
    ];

    const inputAnchorTop = $('#sfo_javascript').nuCSSNumber('top');

    elements.forEach(({ input, offsety = 0 }) => {
        $(input).css('top', inputAnchorTop + offsety);
		$('label_' + input).css('top', inputAnchorTop + offsety);
    });
    
}
*/

function nuOnMobileBeforeObjectPosition(id, element, top) {

	if (id === 'sfo_edit_javascript' || id === 'sfo_javascript' || id === 'sfo_style') {
		top = 100;
	}
	
	return { top };
	
}