var _gaq = _gaq || [];

(function(){

	var $ = jQuery,
		filetypes = /\.(zip|exe|pdf|doc*|xls*|ppt*|mp3|xlsx)$/i,
		baseHref = '',
		gaIterator = 0;

	if ($('base').attr('href') != undefined)
		baseHref = $('base').attr('href');

	if(globalSiteSpecificVars.googleAnalyticsIdsArray instanceof Array){
		(function() {
			//default UCL Google Analytics tracking
			globalSiteSpecificVars.googleAnalyticsIdsArray.push('UA-943297-1');

			//set up site specif Google Analytics tracking
			for(gaIterator in globalSiteSpecificVars.googleAnalyticsIdsArray){
				gaCall(gaIterator,'pageView');
				downloadEvents(gaIterator);
			}

			var ga = document.createElement('script');
			ga.type = 'text/javascript';
			ga.async = true;
			ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
			var s =document.getElementsByTagName('script')[0];
			s.parentNode.insertBefore(ga, s);
		})();
	}
	function gaCall(gaIterator,callType,customLink,downloadExt,downloadFilePath) {
		_gaq.push(['._setAccount', globalSiteSpecificVars.googleAnalyticsIdsArray[gaIterator]]);
		_gaq.push(['._setDomainName', 'ucl.ac.uk']);

		switch(callType) {
			case "pageView":
				_gaq.push(['_setSiteSpeedSampleRate', 100]);
				_gaq.push(['._trackPageview']);
				break;
			case "cta":
				_gaq.push(['_trackEvent', 'cta', 'Click', customLink + ' ' + document.URL]);
				break;
			case "donate":
				_gaq.push(['_trackEvent', 'donate', 'Click', customLink + ' ' + document.URL]);
				break;
			case "give":
				_gaq.push(['_trackEvent', 'give', 'Click', customLink + ' ' + document.URL]);
				break;
			case "externalLink":
				_gaq.push(['_trackEvent', 'External', 'Click', customLink]);
				break;
			case "email":
				_gaq.push(['_trackEvent', 'Email', 'Click', customLink]);
				break;
			case "file":
				_gaq.push(['_trackEvent', 'Download'
					, 'Click-' + downloadExt, downloadFilePath + ' ' + document.URL]);
				break;
		}

		return;
	}
	function downloadEvents(gaIterator) {

		$(document).ready(function(){
			$('a').each(function(e) {
				var href = $(this).attr('href'),
					classAttribute = $(this).attr('class');

				if (typeof classAttribute !== 'undefined' && classAttribute.indexOf('cta') > -1) {
					$(this).click(function() {
						gaCall(gaIterator, 'cta', $(this).html() + ' ' + href);
					});
				} else if (typeof classAttribute !== 'undefined' && classAttribute.indexOf('donate') > -1) {
					$(this).click(function() {
						gaCall(gaIterator, 'donate', $(this).html() + ' ' + href);
					});
				} else if (typeof classAttribute !== 'undefined' && classAttribute.indexOf('give-link') > -1) {
					$(this).click(function() {
						gaCall(gaIterator, 'give', $(this).html() + ' ' + href);
					});
				} else if (href && (href.match(/^https?\:/i)) && (!href.match(document.domain))) {
					$(this).click(function(e) {
						var extLink = href.replace(/^https?\:\/\//i, '');

						gaCall(gaIterator,'externalLink',extLink);

						if ($(this).attr('target') != undefined && $(this).attr('target').toLowerCase() != '_blank') {
							setTimeout(function() { location.href = href; }, 200);
							return false;
						}
					});
				} else if (href && href.match(/^mailto\:/i)) {
					$(this).click(function() {
						var mailLink = href.replace(/^mailto\:/i, '');
						gaCall(gaIterator,'email',mailLink);
					});
				} else if (href && href.match(filetypes)) {
					$(this).click(function() {
						var extension = (/[.]/.exec(href)) ? /[^.]+$/.exec(href) : undefined,
							filePath = href;

						gaCall(gaIterator, 'file', '', extension, filePath);

						if ($(this).attr('target') != undefined && $(this).attr('target').toLowerCase() != '_blank') {
							setTimeout(function() { location.href = href; }, 200);
							return false;
						}
					});
				}
			});
		});
	}
})();

// Gridset Overlay JS

gs = {

	init: function () {
		
		if (window.location.href.match('gridset=show')) gs.show();
	
		gs.bind(document, 'keydown', function (e) { 
		
			if (!e) var e = window.event;
		
			if(e.metaKey || e.ctrlKey) {
				
				switch (e.which || e.keyCode) {
					case 71:
					
						var gw = document.querySelectorAll('.gridsetoverlaywrap, #gridsetoverlaystyles, #gridscreenwidthwrap');
					
						if (gw.length == 0) window.location.href = window.location.href + '?gridset=show';
						else window.location.href = window.location.href.replace('?gridset=show', '');
						
						gs.prevent(e);
						break;
						
				}
				
			}
		
		
		});
	
	},
	
	width: function () {
		
		var swv = document.getElementById('gridscreenwidthval');
		if (swv) swv.innerHTML = window.innerWidth + 'px';
		
	},

	show: function () {
	
		var b = document.getElementsByTagName('body')[0],
				gridareas = document.querySelectorAll('[class*=-showgrid]'),
				areacount = gridareas.length,
				wrapper = document.querySelectorAll('.wrapper'),
			
				styles = '.gridsetoverlaywrap{padding:0 !important;display:block;position:absolute;top:0;left:0;width:100%;height:100%;z-index:10000;pointer-events:none;}.gridsetnoareas .gridsetoverlaywrap{position:fixed;}.gridwrap{padding:0 !important;display:block;position:absolute;top:0;left:0;width:100%;height:100%;font-family:Helvetica, Arial, sans-serif !important;}.gridoverlay{padding:0 !important;position:relative;height:100%;overflow:hidden !important;background:none !important;}.gridoverlay .gridset{padding:0 !important;position:absolute;width:100%;height:100%;top:0;left:0;opacity:0.8; display:block;}.gridoverlay .gridset div{padding:0;text-align:left;font-size:10px !important;border:1px solid #FFD800 !important;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;height:100%;}.gridoverlay .gridset > div{border:none !important;height:100%;position:absolute;top:0;left:0;width:100%;}.gridoverlay div small{width:100%;display:block;text-align:center;font-weight:400 !important;letter-spacing: 1px !important;padding-top:0 !important;text-transform:none !important;height:22px !important;line-height:22px !important;text-style:normal !important;border-bottom:1px solid #FFD800 !important;color:#333 !important;background-color:#FFF79F !important;}.gridoverlay .gridset > div:nth-child(2){padding-top:23px !important;}.gridoverlay .gridset > div:nth-child(2) small{border-bottom:1px dashed #FFD800 !important;}.gridoverlay .gridset > div:nth-child(2) > div{border:1px dashed #FFD800 !important;}.gridoverlay .gridset > div:nth-child(3){padding-top:45px !important;}.gridoverlay .gridset > div:nth-child(3) small{border-bottom:1px dotted #FFD800 !important;}.gridoverlay .gridset > div:nth-child(3) > div{border:1px dotted #FFD800 !important;}.gridoverlay .gridset > div:nth-child(4){padding-top:67px !important;}.gridoverlay .gridset > div:nth-child(4) small{border-bottom:1px double #FFD800 !important;}.gridoverlay .gridset > div:nth-child(4) > div{border:1px double #FFD800 !important;}.gridsetoverlaywrap .noshow{display:none;}#gridscreenwidthwrap{margin:0 !important;padding:0 !important;display:none;width:100%;position:fixed !important;z-index:10000 !important;bottom:0 !important;left:0 !important;height:30px !important;opacity:0.95;border-top:1px solid #FFD800 !important;color:#333;background-color:#FFF79F !important;font-family:Helvetica, Arial, sans-serif !important;}#gridscreenwidth{margin:0 !important;display:block;width:100% !important;max-width:none !important;text-align:center !important;font-size:12px;line-height:1;padding-top:8px !important;}#gridscreenwidth strong{text-transform:none;}',
				
				newstyles = document.createElement('style'),
				newwidth = document.createElement('div'),
				head = document.getElementsByTagName('head'),
				newfavicon = document.createElement('link'),
				newgsstyles = document.createElement('link');
		
		newstyles.id = 'gridsetoverlaystyles';
		newstyles.innerHTML = styles;
		newstyles.type = 'text/css';
		
		newwidth.id = 'gridscreenwidthwrap';
		newwidth.innerHTML = '<p id="gridscreenwidth">Screen width: <strong id="gridscreenwidthval"></strong></p>';
		
		b.appendChild(newstyles);
		b.appendChild(newwidth);
		
		var newwidthdisplay = (newwidth.currentStyle) ? newwidth.currentStyle.display : getComputedStyle(newwidth, null).display;
		
		newfavicon.rel = "shortcut icon";
		newfavicon.id = "gridsetfavicon";
		newfavicon.href = "http://dev.gridsetapp.com/app/img/favicon.ico";
		
		head[0].appendChild(newfavicon);
		
		if (newwidthdisplay != 'block') {
		
			newgsstyles.rel = "stylesheet";
			newgsstyles.id = "gridsetstyles";
			newgsstyles.href = "https://get.gridsetapp.com/21065/";
			head[0].appendChild(newgsstyles);
		
		}
		
		if (areacount) {
			
			var j = areacount;
			
			while (j-- > 0) {
			
				var area = gridareas[j];
			
				gs.buildgrid(area, j, areacount);
				
				if (window.getComputedStyle(area,null).getPropertyValue("position") == 'static') area.style.position = 'relative';
				
			}
			
		}
		else {
			
			if (!b.className.match('gridsetnoareas')) b.className += ' gridsetnoareas';
			
			gs.buildgrid(b, j, areacount);
		
		}
		
		gs.width();
		gs.bind(window, 'resize', gs.width);
	
	},
	
	buildgrid: function (area, j, showgrid) {
		
		var set = JSON.parse('{"id":"21065","name":"UCL","widths":{"990":{"width":990,"grids":{"dl":{"name":"Desktop - Layout","prefix":"dl","width":990,"columns":{"dl1":{"name":"dl1","unit":"%","percent":19.86531984,"px":196.67},"dl2":{"name":"dl2","unit":"%","percent":8.4108252,"px":83.27},"dl3":{"name":"dl3","unit":"%","percent":31.28826977,"px":309.75},"dl4":{"name":"dl4","unit":"%","percent":2.67464241,"px":26.48},"dl5":{"name":"dl5","unit":"%","percent":25.57239054,"px":253.17}},"gutter":{"unit":"px","px":30,"percent":3.03030303},"ratio":{"name":"golden","value":0.61803398}},"dc":{"name":"Desktop - Content","prefix":"dc","width":990,"columns":{"dc1":{"name":"dc1","unit":"%","percent":33,"px":326.7},"dc2":{"name":"dc2","unit":"%","percent":13.91414141,"px":137.75},"dc3":{"name":"dc3","unit":"%","percent":13.91414141,"px":137.75},"dc4":{"name":"dc4","unit":"%","percent":33,"px":326.7}},"gutter":{"unit":"px","px":20,"percent":2.02020202},"ratio":{"name":"even","value":1}}}},"768":{"width":768,"grids":{"t":{"name":"Tablet","prefix":"t","width":768,"columns":{"t1":{"name":"t1","unit":"%","percent":31.59722222,"px":242.67},"t2":{"name":"t2","unit":"%","percent":31.59722222,"px":242.67},"t3":{"name":"t3","unit":"%","percent":31.59722222,"px":242.67}},"gutter":{"unit":"px","px":20,"percent":2.60416667},"ratio":{"name":"even","value":1}}}},"320":{"width":320,"grids":{"m":{"name":"Mobile","prefix":"m","width":320,"columns":{"m1":{"name":"m1","unit":"%","percent":46.796875,"px":149.75},"m2":{"name":"m2","unit":"%","percent":46.796875,"px":149.75}},"gutter":{"unit":"px","px":20,"percent":6.25},"ratio":{"name":"even","value":1}}}}},"prefixes":{"index":["dl","dc","t","m"],"990":["dl","dc"],"768":["t"],"320":["m"]}}'),
		
				gridwrap = document.createElement('div'),
				gridinner = (showgrid) ? '<div class="gridwrap"><div class="gridoverlay">' : '<div class="gridwrap"><div class="gridoverlay wrapper">',
				
				awidth = area.clientWidth,
				apadleft = (parseFloat(gs.getstyle(area, 'padding-left')) / awidth) * 100,
				apadright = (parseFloat(gs.getstyle(area, 'padding-right')) / awidth) * 100;
		
		if (showgrid) gridwrap.className = 'gridsetoverlaywrap';
		else gridwrap.className = 'gridsetoverlaywrap';
		
		for (w in set.widths) {
			
			var width = set.widths[w],
					hides = '';
			
			for (p in set.prefixes) {
				
				if (p != w && p != 'index') hides += set.prefixes[p][0] + "-hide ";
				
			}
			
			gridinner += '<div class="gridset ' + hides + '">';
			
			for (j in width.grids) {
			
				var grid = width.grids[j],
						showreg = new RegExp('(^| )' + grid.prefix + '-showgrid( |$)');
				
				if (!showgrid || area.className.match(showreg)) {
				
					gridinner += '<div style="padding-left:' + apadleft + '%;padding-right:' + apadright + '%;">';
					
					for (k in grid.columns) {
						
						var col = grid.columns[k];
						
						gridinner += '<div class="' + col.name + '"><small>' + col.name + '</small></div>';
					
					}
					
					gridinner += '</div>';
				
				}
			}
			
			gridinner += '</div>';
		
		}
		
		gridinner += '</div></div>';
		
		gridwrap.innerHTML = gridinner;
		
		area.appendChild(gridwrap);
		
	},
	
	bind : function (t, e, f) {
		
		if (t.attachEvent) t.attachEvent('on' + e, f);
		else t.addEventListener(e, f, false);
	
	},
	
	prevent : function (e) {
	
		if (e.preventDefault) e.preventDefault();
		else event.returnValue = false;
	
	},
	
	getstyle : function (t, p){
	
	 if (t.currentStyle) return t.currentStyle[p];
	 else if (document.defaultView && document.defaultView.getComputedStyle) return document.defaultView.getComputedStyle(t, "").getPropertyValue(p);
	 else return t.style[p];
	 
	}


};

gs.init();
/* lazyload.js (c) Lorenzo Giuliani
 * MIT License (http://www.opensource.org/licenses/mit-license.html)
 *
 * expects a list of:  
 * `<img src="blank.gif" data-src="my_image.png" width="600" height="400" class="lazy">`
 */

!function(window){
	var $q = function(q, res){
				if (document.querySelectorAll) {
					res = document.querySelectorAll(q);
				} else {
					var d=document
						, a=d.styleSheets[0] || d.createStyleSheet();
					a.addRule(q,'f:b');
					for(var l=d.all,b=0,c=[],f=l.length;b<f;b++)
						l[b].currentStyle.f && c.push(l[b]);

					a.removeRule(0);
					res = c;
				}
				return res;
			}
		, addEventListener = function(evt, fn){
				window.addEventListener
					? this.addEventListener(evt, fn, false)
					: (window.attachEvent)
						? this.attachEvent('on' + evt, fn)
						: this['on' + evt] = fn;
			}
		, _has = function(obj, key) {
				return Object.prototype.hasOwnProperty.call(obj, key);
			}
		;

	function loadImage (el, fn) {
		var img = new Image()
			, src = el.getAttribute('data-src');
		img.onload = function() {
			if (!! el.parent)
				el.parent.replaceChild(img, el)
			else
				el.src = src;

			fn? fn() : null;
		}
		img.src = src;
	}

	function elementInViewport(el) {
		var rect = el.getBoundingClientRect()

		return (
			 rect.top    >= 0
		&& rect.left   >= 0
		&& rect.top <= (window.innerHeight || document.documentElement.clientHeight)
		)
	}

		var images = new Array()
			, query = $q('img.lazy')
			, processScroll = function(){
					for (var i = 0; i < images.length; i++) {
						if (elementInViewport(images[i])) {
							loadImage(images[i], function () {
								images.splice(i, i);
							});
						}
					};
				}
			;
		// Array.prototype.slice.call is not callable under our lovely IE8 
		for (var i = 0; i < query.length; i++) {
			images.push(query[i]);
		};

		processScroll();
		addEventListener('scroll',processScroll);

}(this);
window.twttr = (function (d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0], t = window.twttr || {};
  if (d.getElementById(id)) return t;
  js = d.createElement(s);
  js.id = id;
  js.src = "https://platform.twitter.com/widgets.js";
  fjs.parentNode.insertBefore(js, fjs);

  t._e = [];
  t.ready = function (f) {
    t._e.push(f);
  };

  return t;
}(document, "script", "twitter-wjs"));

// UCL JS
jQuery(document).ready(function() {
	var $ = jQuery;
	$('.tabbed div').hide();
	$('.tabbed div:first').show();
	$('.tabbed ul li:first').addClass('is-active');

	$('.tabbed ul li a').click(function() {
		$('.tabbed ul li').removeClass('is-active');
		$(this).parent().addClass('is-active');
		var currentTab = $(this).attr('href');
		$('.tabbed div').hide();
		$(currentTab).show();
		return false;
	});

	function removeCurrentClassFromAll() {
		var allPanelsAnchor = $('.accordion a');
		allPanelsAnchor.each(function() {
			$(this).removeClass("currentAccordionAnchor");
		});
	}
	/* Accordion - start
	*
	*new Indigo Code sources use the app/accordion to handle multiple instances this is here for backward compatability
	*/
	if(typeof globalSiteSpecificVars.useAccordionApp==='undefined'){
		var allPanels = $('.accordion__description');
		allPanels.slideUp();
		//open accordions that have this set in their class
		$('.accordion__title a').each(function() {
			var tmpAccordionClass = $(this).attr("class");
			if (typeof tmpAccordionClass !== 'undefined' && tmpAccordionClass.indexOf('currentAccordionAnchor') >= 0) {
				$(this).parent().next().slideDown();
			}
		});


		$('.accordion__title a').click(function() {
			allPanels.slideUp();
			var tmpAccordionClass = $(this).attr("class");
			removeCurrentClassFromAll();
			if (typeof tmpAccordionClass === 'undefined' || tmpAccordionClass.indexOf('currentAccordionAnchor') === -1) {
				$(this).parent().next().slideDown();
				$(this).addClass("currentAccordionAnchor");
			}
			return false;
		});
	}	
	/* accordion - end
	---------------------------------------------------------------------*/
	$('.header__open, .header__close').click(function(e) {
		var body = $('body');
		if (body.hasClass('mobile-open')) body.removeClass('mobile-open');
		else body.addClass('mobile-open');
		e.preventDefault();
	});

	if (Modernizr.mq('only screen and (max-width: 768px)')) {
		//Add Inactive Class To All Accordion Headers
		$('.collapse__header').addClass('collapse__header--inactive');
		
		// The Accordion Effect
		$('.collapse__header').click(function() {
			if ($(this).is('.collapse__header--inactive')) {
				//				$('.collapse__header--active').toggleClass('collapse__header--active').toggleClass('collapse__header--inactive').next().slideToggle().toggleClass('open-content');
				//				$(this).toggleClass('collapse__header--active').toggleClass('collapse__header--inactive');
				$(this).removeClass('collapse__header--inactive').addClass('collapse__header--active');
				$(this).next().slideToggle().toggleClass('open-content');
			} else {
				$(this).removeClass('collapse__header--active').addClass('collapse__header--inactive');
				$(this).next().slideToggle().toggleClass('open-content');
			}
		});
	}else{
		$('.collapse__header').addClass('collapse__header--active');
	}
});