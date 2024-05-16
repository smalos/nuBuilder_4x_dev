nuFromDefaultDescription();

let l = nuSubformObject('zzzzsys_browse_sf').rows.length;
var rowPrefix = 'zzzzsys_browse_sf' + nuPad3(l == 1 ? 0 : l - 1);
nuFormUpdateDisplayDatalists(rowPrefix + 'sbr_display');