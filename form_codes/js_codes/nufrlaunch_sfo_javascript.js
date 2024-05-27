
$('#wrdaddable').css({'font-size' : '14px', 'font-weight' : 700, 'padding' : 5}).addClass('nuTabHolder');
$('#frwrd').css({'font-size' : '14px', 'font-weight' : 700, 'padding' : 5}).addClass('nuTabHolder');
$('#nufr').css({'text-align' : 'left', 'height' : 410, 'background-color': '#ebebeb'});

$('#list').addClass('nuScroll').removeClass('nuReadonly');

$('.nuActionButton').hide();
nuAddActionButton('nuRunPHPHidden', 'Build Fast Report', 'nuRunPHPHidden("RUNFR", true)');


function nuAddReportField(t){

    var f   = nuPad3($("[data-nu-label='Field Name']").length - 1);

    $('#fast_report_sf' + f + 'field').val($(t).html()).change();
    $('#fast_report_sf' + f + 'width').val(100).change();
    $('#fast_report_sf' + f + 'sum').val('no').change();
    $('#fast_report_sf' + f + 'title').val($(t).html()).change().trigger( "select" );
    
}


function nuBeforeSave(){
    
    if($('#table').val() === ''){
        
        nuMessage(['<b>Table Data</b>', nuTranslate('Cannot be left blank...')])
        return false;
        
    }
    
    
    if($('#orderby').val() === ''){
        
        nuMessage(['<b>Order By</b>', nuTranslate('Cannot be left blank...')])
        return false;
        
    }
    
    nuBuildFastReport();
    
    return true;
    
}


function nuFRSetData() {

if($('#fieldlist').val() !== ''){
   
    var s   = String($('#fieldlist').val());
    var ds  = s.replaceAll('[','').replaceAll(']','').replaceAll('\\','').replaceAll('"','');
    var fl  = ds.split(',');
    var fu  = [];
    
    $('#orderby').find('option').remove();

    for(var i = 0 ; i < fl.length ; i++){
        
        if(fl[i] != 'KEEP EXACT HEIGHT'){
            
            fu[i]   = '<tr><td><div style="overflow:hidden;width:285px;text-align:left;padding:2px" onclick="nuAddReportField(this);" class="nuCalculatorButton nu_input">' + fl[i] + '</div></td></tr>';
    
            $('#orderby').append('<option value="' + fl[i] + '">' + fl[i] + '</option>');
        
        }
            
    }

    $('#nufr').html('<table>' + fu.join('') + '</table>');
    
}

$('#orderby').val(fl[0]);

}