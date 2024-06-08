$s = get_defined_vars();


function printPreFormatted($variable, bool $return = false): ?string {
    $formattedOutput = '<pre>' . htmlspecialchars(print_r($variable, true)) . '</pre>';

    if ($return) {
        return $formattedOutput;
    } else {
        echo $formattedOutput;
        return null;
    }
}


printPreFormatted($s, true);