var _gaq = _gaq || []
  ,$ = jQuery
  ,filetypes = /\.(zip|exe|pdf|doc*|xls*|ppt*|mp3|xlsx)$/i
  ,baseHref = ''
  ,gaIterator = 0;

if ($('base').attr('href') != undefined)
  baseHref = $('base').attr('href');

if(globalSiteSpecificVars.googleAnalyticsIdsArray instanceof Array){
  (function() { 
    //default UCL Google Analytics tracking
    globalSiteSpecificVars.googleAnalyticsIdsArray.push('UA-943297-1');

    //set up site specif Google Analytics tracking
    for(gaIterator in globalSiteSpecificVars.googleAnalyticsIdsArray){
      gaCall(gaIterator,'pageView');
    }
    downloadEvents();

    var ga = document.createElement('script');
    ga.type = 'text/javascript';
    ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s =document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ga, s);
  })();
}
function gaCall(gaIterator,callType,customLink,downloadExt,downloadFilePath) {
  var identifier;
  if(gaIterator === globalSiteSpecificVars.googleAnalyticsIdsArray.length -1) {
      identifier = '';
  } else {
      identifier = '';
      //identifier = 't' + gaIterator;
  }
  _gaq.push([identifier + '._setAccount', globalSiteSpecificVars.googleAnalyticsIdsArray[gaIterator]]);
  _gaq.push([identifier + '._setDomainName', 'ucl.ac.uk']);

  switch(callType) {
    case "pageView":
      _gaq.push(['_setSiteSpeedSampleRate', 100]);
      _gaq.push([identifier + '._trackPageview']); 
    break;
    case "externalLink":
      _gaq.push([identifier + '_trackEvent', 'External', 'Click', customLink]);
    break;
    case "email":
      _gaq.push([identifier + '_trackEvent', 'Email', 'Click', customLink]);
    break;
    case "file":
      _gaq.push([identifier + '_trackEvent', 'Download', 'Click-' + downloadExt, downloadFilePath]); 
    break;
  }

  return;
}
function downloadEvents() {
  var gaIterator = 0;

  $(document).ready(function(){
    $('a').each(function(e) {
      var href = $(this).attr('href');

      if (href && (href.match(/^https?\:/i)) && (!href.match(document.domain))) {
        $(this).click(function(e) {
          var extLink = href.replace(/^https?\:\/\//i, '');

          for(gaIterator in globalSiteSpecificVars.googleAnalyticsIdsArray){
            gaCall(gaIterator,'externalLink',extLink);
          }

          if ($(this).attr('target') != undefined && $(this).attr('target').toLowerCase() != '_blank') {
            setTimeout(function() { location.href = href; }, 200);
            return false;
          }
        });
      } else if (href && href.match(/^mailto\:/i)) {
        $(this).click(function() {
          var mailLink = href.replace(/^mailto\:/i, '');

          for(gaIterator in globalSiteSpecificVars.googleAnalyticsIdsArray){
            gaCall(gaIterator,'email',mailLink);
          }
        });
      } else if (href && href.match(filetypes)) {
        $(this).click(function() {
          var extension = (/[.]/.exec(href)) ? /[^.]+$/.exec(href) : undefined
            ,filePath = href;

          for(gaIterator in globalSiteSpecificVars.googleAnalyticsIdsArray){
            gaCall(gaIterator,'file','',extension,filePath);
          }

          if ($(this).attr('target') != undefined && $(this).attr('target').toLowerCase() != '_blank') {
            setTimeout(function() { location.href = href; }, 200);
            return false;
          }
        });
      }
    });
  });
}
