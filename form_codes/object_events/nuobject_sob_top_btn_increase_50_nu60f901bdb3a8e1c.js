var n = Number(sob_all_top.value) + (event.ctrlKey ? -50 : 50);
$('#sob_all_top').val(n < 0 ? 0 : n).change();