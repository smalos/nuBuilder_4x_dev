$lu = nuLookupRecord();
$type = $lu->sfo_type ?? '';

if ($type !== 'launch') {

    nuSetFormValue('slf_add_button', '1');
    nuSetFormValue('slf_print_button', '1');

    if ($type !== 'browse') {
        nuSetFormValue('slf_save_button', '1');
        nuSetFormValue('slf_clone_button', '1');
        nuSetFormValue('slf_delete_button', '1');
    }

}