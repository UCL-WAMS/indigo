(function(){
    var listingTemplate = checkVarInGlobalSiteSpecific('searchTemplate',"genericSearchPage")
    ,numRanks = checkVarInGlobalSiteSpecific('numRanks',10)
    ,facetTemplate = checkVarInGlobalSiteSpecific('facetTemplate','nothing')
    ,defaultImage = checkVarInGlobalSiteSpecific('defaultImage',"//cdn.ucl.ac.uk/indigo/images/ucl-portico-650.jpg")
    ,listingImageMetaMapping = checkVarInGlobalSiteSpecific('listingImageMapping','I')
    ,listingElMapping = checkVarInGlobalSiteSpecific("listingEl",".search-page__listing-results")
    ,listingDescriptionMapping = checkVarInGlobalSiteSpecific("listingDescriptionMapping",'summary')
    ,showResultCount = checkVarInGlobalSiteSpecific("showResultCount",true)
    ,facetEl = checkVarInGlobalSiteSpecific("facetEl",'')
    ,gscope = checkVarInGlobalSiteSpecific("gscope",'');

    define(['jquery','backbone','underscore','text!templates/' + listingTemplate + '.tmpl','text!templates/' + facetTemplate + '.tmpl'],function($,B,_,ListingTemplate,FacetTemplate){
        
        var SearchModel = Backbone.Model.extend({
           defaults: function() {        
                var assetUrl = document.URL
                ,domainParam = assetUrl.replace(/^([^\?]*)\?(.*)(\&*)fbenv=([^&]+)(.*)$/ig,'$4')
                ,searchQueryParam = assetUrl.replace(/^([^\?]*)\?(.*)(\&*)search=([^&]+)(.*)$/ig,'$4')
                ,funnelBackServer = "search2"
                ,defaultSearchTerm = "!padrenullquery"
                ,initialSearchTerm = defaultSearchTerm;

                if(typeof domainParam!=='undefined') {
                    switch(domainParam) {
                        case "dev":
                            funnelBackServer = "funnelback-dev";
                            break;
                        case "uat":
                            funnelBackServer = "funnelback-uat";
                            break;
                    }
                }

                if(typeof searchQueryParam!=='undefined' && searchQueryParam !== assetUrl) {
                    initialSearchTerm = searchQueryParam;
                }

                return {
                    data: {}
                    ,queryStr: ''
                    ,url: '//' + funnelBackServer + '.ucl.ac.uk/s/search.json'
                    ,numRanks: numRanks 
                    ,defaultSearchTerm: defaultSearchTerm
                    ,searchTerm: initialSearchTerm
                    ,totalMatching: 0
                    ,startRank: 0
                    ,currEnd: 0
                    ,resultsCount: 0
                    ,prevStart: 0
                    ,nextStart: 0
                    ,numPages: 0
                    ,currPage: 0
                    ,currStart: 0
                    ,newCurrentStart: 0
                    ,listingEl: listingElMapping
                    ,searchInputSelector: 'input.search-page__input'
                    ,defaultSort: ''
                    ,currentSort: '' 
                    ,init: false
                    ,defaultImage: defaultImage
                    ,listingImageMapping: listingImageMetaMapping
                    ,listingDescriptionMapping: listingDescriptionMapping
                    ,dummy: true
                    ,showResultCount: showResultCount
                    ,facetParamQryStr: ''
                    ,facetEl: facetEl
                    ,gscope: gscope
                }
            }
        });

        var SearchListings = Backbone.View.extend({
            el: $('body')
            ,template: _.template(ListingTemplate)
            ,initialize: function() {
                var self = this;

                this.model = searchModel;

                this.model.set({
                    collection: $(this.model.get("listingEl")).attr('collectionid')
                });

                this.model.on('change', function() {
                    if(self.model.hasChanged("searchTerm") || self.model.hasChanged("newCurrentStart") || self.model.hasChanged("init") || self.model.hasChanged("currentSort") || self.model.hasChanged("facetParamQryStr")){
                        if(!self.model.hasChanged("newCurrentStart")){
                            self.model.set('newCurrentStart',0);
                        }
                        self.ajaxCall();
                    }
                });

                this.model.set({init: true});//kick off the app
            }
            ,events: {
                'click .search-page__submit' : 'updateQuery'
                ,'submit form.form__keyword-search' : 'updateQuery'
                ,'click a.search-page__pagination--list-link' : 'updatePaginationParams'
                ,'change select.search-page--sort-form__options' : 'updateSortParam'
                ,'click .btn--reset': 'resetResults'
                ,'change .facet-option': 'facetHandler'
            }
            ,ajaxCall: function() {
                var self = this;

                $.ajax({
                    type:'GET'
                    ,data: '&query=' + this.model.get("searchTerm") + '&collection=' + this.model.get("collection") +  '&num_ranks=' + this.model.get("numRanks") + '&start_rank=' + this.model.get("newCurrentStart") + "&sort=" + this.model.get("currentSort") + this.model.get("facetParamQryStr") + this.getGscopeStr(this.model.get("gscope"))
                    ,jsonp: 'jsonp'
                    ,dataType: "jsonp"
                    ,url: this.model.get("url")
                    ,timeout: 10000
                    ,scriptCharset: "utf-8"
                    ,success: function (json) {
                        self.parseResults(json);
                    }
                });
            }
            ,parseResults: function(data) {
                this.model.set({
                    "data" : this.cleanseData(data)
                    ,"totalMatching" : data.response.resultPacket.resultsSummary.fullyMatching
                    ,"currStart" : data.response.resultPacket.resultsSummary.currStart
                    ,"currEnd" : data.response.resultPacket.resultsSummary.currEnd
                    ,"prevStart" : data.response.resultPacket.resultsSummary.prevStart
                    ,"nextStart" : data.response.resultPacket.resultsSummary.nextStart
                    ,"numPages" : Math.ceil(data.response.resultPacket.resultsSummary.fullyMatching/data.response.resultPacket.resultsSummary.numRanks)
                    ,"currPage" : Math.floor(data.response.resultPacket.resultsSummary.currStart/data.response.resultPacket.resultsSummary.numRanks)
                    ,"resultsCount" : data.response.resultPacket.resultsSummary.currEnd - data.response.resultPacket.resultsSummary.currStart + 1
                });
                
                this.render();
            }
            ,updateQuery: function(e) {
                var tmpQry = $(this.model.get("searchInputSelector")).val();

                if(tmpQry.length < 1){
                    tmpQry = this.model.get("defaultSearchTerm");   
                }
                this.model.set({
                    searchTerm: tmpQry
                    ,currentSort: this.model.get("defaultSort")
                });

                e.preventDefault();
            }
            ,updatePaginationParams: function(e) {
                this.model.set({
                    newCurrentStart: $(e.currentTarget).attr('data-currentStartRank')
                });
                e.preventDefault();
            }
            ,prettyDateConvertor: function(dateStr) {
                var d = new Date(dateStr)
                ,monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"]

                ,str = d.getDay() + ' ' + monthNames[parseInt(d.getMonth())] + ', ' + d.getFullYear();
                
                return str;
            }
            ,cleanseData: function(x) {
                var tmpData = x
                ,tmpResultArr = []
                ,i
                ,tmpResult;

                for(i in tmpData.response.resultPacket.results) {
                    tmpResult = tmpData.response.resultPacket.results[i];
                    if(typeof tmpResult.metaData.d !== 'undefined') {
                        tmpResult.metaData['datePretty'] = this.prettyDateConvertor(tmpResult.metaData.d);
                    }
                    tmpResult.metaData['listingDescription'] = (this.model.get('listingDescriptionMapping') === 'summary') ? tmpResult.metaData[this.model.get('listingDescriptionMapping')] : tmpResult.summary;
                    
                    /* set image */
                    if(typeof tmpResult.metaData[this.model.get('listingImageMapping')] !== 'undefined'){
                        tmpResult.metaData['listingImage'] = tmpResult.metaData[this.model.get('listingImageMapping')];
                    }else{
                        tmpResult.metaData['listingImage'] = this.model.get('defaultImage');
                    }
                    /* end set image */

                    //push all updates
                    tmpResultArr.push(tmpResult);
                }
                tmpData.response.resultPacket.results = tmpResultArr;
                return tmpData;
            }
            ,updateSortParam: function(e) {
                this.model.set({
                    'currentSort' : e.currentTarget.value
                });
            }
            ,getGscopeStr: function(g) {
                return (g.length) ? "&gscope1=" + g : "";
            }
            ,render: function() {
                var pagination = new paginationView({model: this.model})
                ,verboseResult = new verboseResultView({model: this.model})
                ,facets;

                if(this.model.get("facetEl").length > 0){
                    facets = new facetsView({model: this.model});
                }

                $(this.model.get("listingEl")).html(this.template({
                    data: this.model.get("data").response.resultPacket.results
                }));

                return this;
            }
        });
        var verboseResultView = Backbone.View.extend({
            el: $('.results-context')
            ,initialize: function() {
                this.model = searchModel;
                this.model.bind('change',this.render());
            }
            ,render: function() {
                var searchTermStr = (this.model.get("searchTerm") === this.model.get("defaultSearchTerm")) ? 'Searching for everything' : this.model.get("searchTerm")
                ,resultsStr = (parseInt(this.model.get("totalMatching"))===1) ? "result" : "results"
                ,str = '';

                if(this.model.get("showResultCount")){
                    if(listingTemplate === 'search-paired-listing'){
                        str = '<em>"' +  searchTermStr + '</em>" returned ' +  this.model.get("totalMatching") + ' ' + resultsStr;
                    }else{
                        str = "Displaying <strong>1 to " + this.model.get("resultsCount") + "</strong> of <strong>" + this.model.get("totalMatching") + "</strong> results";
                    }
                }
                $(this.el).html(str);
            }
        });
        
        var facetsView = Backbone.View.extend({
            el: $('body')
            ,template: _.template(FacetTemplate)
            ,initialize: function() {
                this.model = searchModel;
                this.model.bind('change',this.render());
            }
            ,events: {
                'click .btn--reset': 'resetResults'
                ,'change .facet-option': 'facetHandler'
            }

            ,resetResults: function() {
                this.model.set({
                    'currentSort' : this.model.get("searchTerm")
                    ,'facetParamQryStr': ''
                });
            }
            ,facetHandler: function(e) {
                var newFacetParam = this.model.get("facetParamQryStr") + '&' + e.currentTarget.value;

                this.model.set(
                    'facetParamQryStr', newFacetParam
                );
            }
            ,facetCleanser: function(x) {
                var i
                ,j
                ,k
                ,tmpFacet
                ,tmpCat
                ,checkedDomAttr;

                for(i in x) {
                    tmpFacet = x[i].categories;
                    for(j in tmpFacet) {
                        tmpCat = tmpFacet[j];
                        for(k in tmpFacet[j].values) {
                            checkedDomAttr = "";
                            if(this.isFacetIsSelected(x[i].categories[j].queryStringParamName,tmpFacet[j].values[k].data))
                                checkedDomAttr = "selected";
                            //update facet data with is selected status
                            x[i].categories[j].values[k].checkedDomAttr = checkedDomAttr;
                        }
                    }
                }

                return x;
            }
            ,isFacetIsSelected: function(catQueryStr,value) {
                var i
                ,selectedCats = this.model.get("data").question.selectedCategoryValues;

                if(typeof selectedCats[catQueryStr] !=='undefined') {
                    for(i in selectedCats[catQueryStr]) {
                        if(selectedCats[catQueryStr][i] === value)
                            return true;
                    }
                }

                return false;
            }
            ,render: function() {
                $(this.model.get("facetEl")).html(this.template({
                    data: this.facetCleanser(this.model.get("data").response.facets)
                }));
            }
        });

        var paginationView = Backbone.View.extend({
            el: $('.search-page__pagination')
            ,initialize: function() {
                var self = this;

                self.model = searchModel;
                self.model.bind('change',this.render());
                self.model.on('change', function() {
                });
            }
            ,buildPaginationStr: function(pos,isPrev,isNext) {
                var str = ''
                ,currentPageClass = ''
                ,startRank = pos;

                if(isPrev){
                    label = "Previous";
                }else if(isNext){
                    label = "Next";
                }else{
                    label = parseInt(pos) + 1;
                    startRank = (parseInt(pos) * this.model.get("numRanks")) + 1;
                }

                if(this.model.get("currPage") === pos && !(isPrev || isNext)){
                    currentPageClass = " search-page__pagination--list-el--current";
                }

                str = '<li class="search-page__pagination--list-el' + currentPageClass + '"><a class="search-page__pagination--list-link" href="#" data-currentStartRank="' + startRank + '">' + label + '</a></li>'

                return str;
            }
            ,render: function() {
                var resultsSummary = this.model.get("data").response.resultPacket.resultsSummary
                ,i = 0
                ,paginationStr = "";

                if (typeof this.model.get("prevStart") === 'number') {
                    paginationStr += this.buildPaginationStr(this.model.get("prevStart"),true,false);;
                }
                for(i=0;i<this.model.get("numPages");i++){
                    paginationStr += this.buildPaginationStr(i,false,false);
                }
                if(this.model.get("nextStart")){
                    paginationStr += this.buildPaginationStr(this.model.get("nextStart"),false,true);;
                }

                $(this.el).html(paginationStr);
            }
        });
        
        var searchModel = new SearchModel();
        
        $(document).ready(function() {
            
            var searchListings = new SearchListings({
                model: searchModel
            });
        });
    });

    function checkVarInGlobalSiteSpecific(varToCheck,defaultVal) {
        var x = defaultVal;

        if(typeof globalSiteSpecificVars[varToCheck] !== 'undefined') {
            x = globalSiteSpecificVars[varToCheck];
        }
        return x;
    }
})();