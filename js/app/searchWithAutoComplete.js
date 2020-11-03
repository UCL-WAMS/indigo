define([
		"jqueryInternal"
	]
	,function($){
	
		$(document).ready(function(){
			/* Autocomplete removed 02/05/2020
			-----------------------------------------------------------------*/
            
            /* Disable the blank search that hammers the funnelback server
             * --------------------------------------------------------------------------*/
            function disableBlankSearch() {
                $('.masthead__search form').submit(function(e){
                    if($('.masthead__search input[type="search"]').val().length < 1) {
                        e.preventDefault();
                    }
                });
            }  
            disableBlankSearch(); 
		})
});
