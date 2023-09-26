getassetLocation = function(){
	var assetUrl = document.URL;
	var domainParam = assetUrl.replace(/^([^\?]*)\?(.*)(\&*)domain=([^&]+)(.*)$/ig,'$4');
	console.log(domainParam);
	var assetDomain = "//cdn.ucl.ac.uk/";
	var libLocation = 'indigo/js/lib';
	if(typeof domainParam !== 'undefined'){

		switch(domainParam){
			case "static":
				assetDomain = "//static.ucl.ac.uk/";
			break;
			case "local":
				assetDomain = "//local-static.lndo.site/";
			break;
			case "uat":
				assetDomain = "//static-uat.ucl.ac.uk/";
			break;
		}
	}
	return assetDomain + libLocation;

}

var fullAssetLocation = getassetLocation();
var urlArgs = "";

require.config({
	baseUrl: fullAssetLocation,
	paths: {
		app: '../app'
		,allsite: 'all-site.min'
		,templates: '../templates'
		//libaries
		,jquery: globalSiteSpecificVars.pathToJquery
		,underscore: '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore-min'
		,backbone: '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min'
		,fastclick: 'fastclick'
		,googleAnalyticsLib: 'googleAnalytics.min'
		,owl: 'owl.carousel.min'
		,jwplayer: 'jwplayer'
		,handleBars: 'handlebars.min'
		,typeAheadBundle:  'typeahead.bundle.min'
	}
	,shim:{
		allsite: {
			deps: ['jquery']
			,exports: 'gen'
		}
		,underscore: {
			exports: '_'
		}
		,backbone: {
			deps: ['underscore','jquery']
			,exports: 'B'
		},
		modernizr: {
			exports: 'Modernizr'
		},
		googleAnalyticsLib: {
			exports: 'ga'
		},
		owl: {
			deps: ['jquery']
		},
		jwplayer: {
			exports: 'jwplayer'
		},
		typeAheadBundle: {
			deps: ['jquery']
			,exports: 'Bloodhound'
		},
		handleBars : {
			exports: 'Handlebars'
		}
	}
});