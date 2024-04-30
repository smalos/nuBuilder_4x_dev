var n = Number(sob_all_top.value) + (event.ctrlKey ? -27 : 27);
$('#sob_all_top').val(n < 0 ? 0 : n).change();