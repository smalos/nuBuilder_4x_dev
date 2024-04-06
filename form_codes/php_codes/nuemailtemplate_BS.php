if ('#DEV_MODE#' != 1 && '#emt_template#' == '1') {
    nuDisplayError(nuTranslate("Templates cannot be saved. Clone it instead."));
}