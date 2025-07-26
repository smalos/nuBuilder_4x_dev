$decodedParams = nuGetProperty('nu_browse_add_tab_params');

if ($decodedParams) {
    $parsedData = nuDecode($decodedParams);

    $formId = $parsedData['form_id'] ?? '';
    $title = $parsedData['title']  ?? 'New Tab';
    $order = $parsedData['order']  ?? 0;

    nuBrowseAddNewTab($formId, $title, $order);
    nuReorderBrowse($formId);

    $js = "if (nuIsSaved()) { nuGetBreadcrumb()} else { parent.nuUpdateMessage('refresh_required')} ";
    nuJavaScriptCallback($js);
}

function nuBrowseAddNewTab($formId, $title, $order) {

    $tabId = nuID();

    $sql = "
        INSERT INTO zzzzsys_tab (
            zzzzsys_tab_id,
            syt_zzzzsys_form_id,
            syt_title,
            syt_order
        ) VALUES (
            :tabId,
            :formId,
            :title,
            :tabOrder
        )
    ";

    nuRunQuery($sql, [
        ':tabId' => $tabId,
        ':formId' => $formId,
        ':title' => $title,
        ':tabOrder' => $order
    ]);

    return $tabId;
}