var cuttingTheMustard = document.querySelector && window.localStorage && window.addEventListener;

Modernizr.load({
	// Cutting the mustard as used by the BBC.
	test : cuttingTheMustard
	// If old browser load the shiv.
	,nope : [
		'//cdn.ucl.ac.uk/indigo/js/lib/html5shiv-printshiv.min.js'
		,'//cdn.ucl.ac.uk/indigo/js/lib/respond.min.js'
		,'//cdn.ucl.ac.uk/indigo/js/lib/respond.proxy.min.js'
	]
});
// Get the path to Drupal JQuery for the site in question.
var doubles = ["drupal","prospective-students","study"];
var tmp = location.pathname.split("/");
var pathvar = "/" + (doubles.indexOf(tmp[1]) > -1 && tmp[1].indexOf("drupal-") == -1?tmp[1] + "/" + tmp[2]:tmp[1]);
// Set conditional assets for main.js.
var globalSiteSpecificVars = {
//	pathToJquery: '//cdn.ucl.ac.uk/indigo/js/lib/jquery-1.9.1.min',
	pathToJquery: "https://" + location.hostname + pathvar + "/misc/jquery.js?v=1.4.4",
	googleAnalyticsIdsArray: []//specify array of site specific id's NOT UCL generic UA-943297-1
}
/*if(cuttingTheMustard){
	globalSiteSpecificVars.pathToJquery = '//cdn.ucl.ac.uk/indigo/js/lib/jquery-2.1.1.min';
}*/