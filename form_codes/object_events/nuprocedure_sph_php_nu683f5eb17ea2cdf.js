const noTags = this.value.nuStripBoundaryTags("<?php", "?>");
if (this.value !== noTags) {
  this.value = noTags.trim();
}