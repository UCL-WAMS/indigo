var cuttingTheMustard = document.querySelector && window.localStorage && window.addEventListener;

Modernizr.load({
	//cutting the mustard as used by the BBC
	test : cuttingTheMustard
	//if old browser load the shiv
	,nope : [
		'//cdn.ucl.ac.uk/indigo/js/lib/html5shiv-printshiv.min.js'
		,'//cdn.ucl.ac.uk/indigo/js/lib/respond.min.js'
		,'//cdn.ucl.ac.uk/indigo/js/lib/respond.proxy.min.js'
	]
});
//set conditional assets for main.js
var globalSiteSpecificVars = {
	pathToJquery: '//cdn.ucl.ac.uk/indigo/js/lib/jquery-1.9.1.min'
	,googleAnalyticsIdsArray: []//specify array of site specific id's NOT UCL generic UA-943297-1
}
if(cuttingTheMustard){
	globalSiteSpecificVars.pathToJquery = '//cdn.ucl.ac.uk/indigo/js/lib/jquery-2.1.1.min';
}