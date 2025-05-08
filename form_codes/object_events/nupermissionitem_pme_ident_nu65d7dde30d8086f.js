$(this).val(function(_, value) {
  return value.replace(/[\s+*"%\/()=?`#;:{}\\]/g, ''); 
});