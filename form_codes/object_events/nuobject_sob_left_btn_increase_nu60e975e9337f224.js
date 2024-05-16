var n = Number(sob_all_left.value) + (event.ctrlKey ? -50 : 50);
$('#sob_all_left').val(n < 0 ? 0 : n).change();