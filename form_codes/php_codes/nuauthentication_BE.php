$devMode = nuReplaceHashVariables("#DEV_MODE#");

$t = $devMode == '1' ? '_template' : '';

$p  = nuProcedure('nu_authentication_2fa'.$t);	

if($p != '') { 
    eval($p); 
} else {
    nuDisplayError(nuTranslate('The Procedure nu_authentication_2fa does not exist.'));    
}