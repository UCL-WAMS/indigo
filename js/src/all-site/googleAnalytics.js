var _gaq = _gaq || [];

if(globalSiteSpecificVars.googleAnalyticsIdsArray instanceof Array){
	//default UCL Google Analytics tracking
	_gaq.push(['_setAccount', 'UA-943297-1']);
	_gaq.push(['_setDomainName', 'ucl.ac.uk']);
	_gaq.push(['_setSiteSpeedSampleRate', 100]);
	_gaq.push(['_trackPageview']);
	downloadTracking();

	//set up site specif Google Analytics tracking
	if(globalSiteSpecificVars.googleAnalyticsIdsArray.length > 0){
		var gaIterator = 0;
		for(gaIterator in globalSiteSpecificVars.googleAnalyticsIdsArray){
			_gaq.push(['t' + gaIterator + '._setAccount', globalSiteSpecificVars.googleAnalyticsIdsArray[gaIterator]]);
			_gaq.push(['t' + gaIterator + '._setDomainName', 'ucl.ac.uk']);
			_gaq.push(['t' + gaIterator + '._trackPageview']);
			downloadTracking();
		}
	}

	(function() {	
	var ga = document.createElement('script');
	ga.type = 'text/javascript';
	ga.async = true;
	ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	var s =document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(ga, s);
	})();
}

function downloadTracking() {
	var $ = jQuery;
	var filetypes = /\.(zip|exe|pdf|doc*|xls*|ppt*|mp3)$/i;
	var baseHref = '';

	if ($('base').attr('href') != undefined)
	    baseHref = $('base').attr('href');

	$('a').each(function() {
	    var href = $(this).attr('href');
	    if (href && (href.match(/^https?\:/i)) && (!href.match(document.domain))) {
	        $(this).click(function() {
	            var extLink = href.replace(/^https?\:\/\//i, '');
	            _gaq.push(['_trackEvent', 'External', 'Click', extLink]);
	            if ($(this).attr('target') != undefined && $(this).attr('target').toLowerCase() != '_blank') {
	                setTimeout(function() { location.href = href; }, 200);
	                return false;
	            }
	        });
	    }
	    else if (href && href.match(/^mailto\:/i)) {
	        $(this).click(function() {
	            var mailLink = href.replace(/^mailto\:/i, '');
	            _gaq.push(['_trackEvent', 'Email', 'Click', mailLink]);
	        });
	    }
	    else if (href && href.match(filetypes)) {
	        $(this).click(function() {
	            var extension = (/[.]/.exec(href)) ? /[^.]+$/.exec(href) : undefined;
	            var filePath = href;
	            _gaq.push(['_trackEvent', 'Download', 'Click-' + extension, filePath]);
	            if ($(this).attr('target') != undefined && $(this).attr('target').toLowerCase() != '_blank') {
	                setTimeout(function() { location.href = href; }, 200);
	                return false;
	            }
	        });
	    }
	});
}