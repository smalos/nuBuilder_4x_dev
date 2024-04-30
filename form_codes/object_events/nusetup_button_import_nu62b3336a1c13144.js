if (confirm(nuTranslate("Import settings from nuconfig.php.") + "\r\n" + nuTranslate("All existing configuration settings will be overwritten. Continue?")) === true) {
  nuSetValue('configImport',1);
  window.configImport = 1;
  nuSaveAction();
}