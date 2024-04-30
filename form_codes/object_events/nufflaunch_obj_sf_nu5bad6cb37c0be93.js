nuSetFFTable();
nuDisableLastFFRow();

const l = nuSubformObject('obj_sf').rows.length;

var rowPrefix = 'obj_sf' + nuPad3(l == 1 ? 0: l - 1);
nuSetFFTypeOptionsColor(rowPrefix + 'ff_type');
nuSelectRemoveEmpty(rowPrefix + 'ff_type', '-1');

nuEnableFFDataType();