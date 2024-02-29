if ('#nuDevMode#' != 1 && substr('#RECORD_ID#', 0, 2) === 'nu' ) {
        nuDisplayError(nuTranslate("Templates cannot be saved. Clone it instead."));
}