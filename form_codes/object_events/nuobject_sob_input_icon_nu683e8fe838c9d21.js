if (this.value.trim().startsWith('<i')) {
  this.value = nuObjectExtractClassNames(this.value);
  nuObjectPreviewIcon('sob_input_icon_preview_html',this.value);
}