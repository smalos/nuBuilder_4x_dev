if (nuFormType() == 'edit') {

    $('#sre_layout').addClass('nuEdited'); 
      nuAttachButtonImage('open_builder','RD');
    
    if (! nuIsNewRecord()) {
  //    nuAddActionButton('Run', 'Run', 'nuRunReport("'+ $('#sre_code').val() +'")');       
    }
    
  }
  
  function nuBuildReportPickTableType(){
      
      var i   = $('#sre_zzzzsys_php_id').val();
      
      var f   = '';
      var r   = '';
      
      if(i.substr(0,10) == 'PROCEDURE:'){
          
          f   = 'nuphp';
          r = i.substr(10);
          
      }
      
      if(i === ''){
          
          nuMessage([nuTranslate('No table selected')]);
          return;
  
      }
      
      if(i.substr(0,6) == 'TABLE:'){
          
          nuVendorLogin('PMA', sre_zzzzsys_php_iddescription.value)
          return;
  
      }
      
      if(i.substr(0,4) == 'SQL:'){
          
          f   = 'nuselect';
          r = i.substr(4);
  
      }
      
      nuPopup(f,r);
      
  }
  
  function nuBuildReportUpdateAclCount() {
      var l = $("[data-nu-field='sre_zzzzsys_access_id']").length -2;
      var t = l <= 0 ? '' : ' (' + l + ')';
      $('#nuTab1').html(nuTranslate('Access Level') + t);
  }