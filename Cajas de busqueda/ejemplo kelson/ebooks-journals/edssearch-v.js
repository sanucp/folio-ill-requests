/*var subjSelector='<select onChange=navMDE(this.value) name="combo1" class="profChange textbox" style="display:none">\
				  <option selected="selected" value="">Choose</option>\
				  <option id="L01" value="http://search.ebscohost.com/login.aspx?direct=true&authtype=ip,guest&groupid=trial&profile=edsbrandin&custid=s7905698">All Databases</option>\
				  <option id="L02" value="http://search.ebscohost.com/login.aspx?direct=true&authtype=ip,guest&groupid=trial&profile=edslib&custid=s7905698">Agriculture Forestry </option>\
				  <option id="L03" value="http://search.ebscohost.com/login.aspx?direct=true&authtype=ip,guest&groupid=trial&profile=edsbis&custid=s7905698">Business Studies</option>\
				  <option id="L04" value="http://search.ebscohost.com/login.aspx?direct=true&authtype=ip,guest&groupid=trial&profile=edscsearch&custid=s7905698">Caribbean Studies</option>\
				  <option id="L05" value="http://search.ebscohost.com/login.aspx?direct=true&authtype=ip,guest&groupid=trial&profile=edscomp&custid=s7905698">Computer & Engineering</option>\
				  <option id="L06" value="http://search.ebscohost.com/login.aspx?direct=true&authtype=ip,guest&groupid=trial&profile=edses&custid=s7905698">Environment Studies</option>\
				  <option id="L07" value="http://search.ebscohost.com/login.aspx?direct=true&authtype=ip,guest&groupid=trial&profile=edsedu&custid=s7905698">Education</option>\
				  <option id="L08" value="http://search.ebscohost.com/login.aspx?direct=true&authtype=ip,guest&groupid=trial&profile=edsmed&custid=s7905698">Medical Sciences</option>\
				  <option id="L09" value="http://search.ebscohost.com/login.aspx?direct=true&authtype=ip,guest&groupid=trial&profile=edsnat&custid=s7905698">Natural & Life Sciences</option>\
				  <option id="L10" value="http://search.ebscohost.com/login.aspx?direct=true&authtype=ip,guest&groupid=trial&profile=edsport&custid=s7905698">Sport Sciences</option>\
				  </select>';
						


var newSearchTerm;
function getSearchTerm()
{
	jQuery(document).ready(function(){
        newSearchTerm = jQuery("#SearchTerm1").val();
    });
	return newSearchTerm;
}

*/

//Gets the profile collor ( top menu) and sets the same collor for custom search box.
var bgCollor = jQuery('.bg-p1').css('background-color');
function getRgba (bgCollor) 
{
	var ALPHA = "0.4";
	var rgba = bgCollor.substring (0,bgCollor.length -1);
	rgba += ", " + ALPHA + " )";
	rgba = rgba.substring(3);
	rgba= "rgba" + rgba;
	return rgba;
}

/*
function createSelector()
{
	if( (document.URL.indexOf("/results?") > -1 )|| (document.URL.indexOf("/resultsadvanced?") > -1) || (document.URL.indexOf("/detail?") > -1 ))
	jQuery('#findFieldLinks').prepend("<span>" + subjSelector + "</span>");
}
*/

function CustomEDS() 
{
	
 //if (QueryString('sdb')=='edspub')

 
 //{	 comming from removed if
  //createSelector();
  
  
  if (1 != jQuery("body").data("customeds")) {
	
	
    if (jQuery("body").attr("data-customeds", "1"),
jQuery(".customer-label").removeClass("color-p2").addClass("color-p1"),
      jQuery("head").append("<style> .bg-p1{height: 30px};	.basic-search{		padding-bottom: 50px;	}	#searchBoxItems  li {		float:left;		display:block;		margin-right:0px;		padding:7px;	margin-right: 0px;	}	#searchBoxWrap{	font-weight: bold; border: 1px solid " + getRgba(bgCollor) + "; border-bottom-color:" + bgCollor + " ; border-bottom-width: thick; }	#searchBoxItems  li a {	color:#595959; text-decoration: none; }	#searchBoxItems{	display:block!important;	}	.activeSearch, .activeSearch a{	color:#B90000!important;	background: " + bgCollor + ";	text-decoration:none;	}	#limiterExpanderControl{		background-color:#FFF;	}	.legend .h3 {		margin-top:0px;	margin-left:-23px;	}	.legend {		background-color:transparent!important;	}	#column2 .rl-lim-heading {		display: block;		padding: 8px 15px 8px 0;		color: #535353;		font-size: 1.167em;		font-weight: bold;		border-top: solid 2px #f2f2f0;	}	#column2 .rl-lim-heading .icon {	top: 8px;	right: 0;	left: auto;	}	.history #limitersSelectedControl {		display: none;	}	.change-user{	background-image:none;	}	#HO_checkboxes {margin-bottom: 10px;} #hon_ft,#hon_rv {padding-right: 10px;}	</style>"),
      ((document.URL.indexOf("/basic?")  > -1)||(document.URL.indexOf("/results?") > -1 )||(document.URL.indexOf("/resultsadvanced?") > -1))) {
      jQuery(".find-field-controls").wrap('<div id="searchBoxWrapper" style="width:620px;background-color:#FFF;margin-top: 60px;"></div>'),
      ep.messages.findfield_default_text = "Pesquisar em livros  e Periódicos",
      jQuery("#SearchTerm1").attr("placeholder", ep.messages.findfield_default_text),
      jQuery("#searchBoxWrapper").prepend('<div id="searchBoxWrap"><ul id="searchBoxItems" style="display:none;"><li id="searchAll" class="activeSearch"><a href="javascript:SearchSettings(\'searchAll\',ep.messages.findfield_default_text, \'fr\');"> Busca Integrada </a>&nbsp;&nbsp;&nbsp;</li><li id="searchJournals"><a href="javascript:SearchSettings(\'searchJournals\',\'Pesquisa em Periódicos\', \'fr1\');">Periódicos</a>&nbsp;&nbsp;&nbsp;</li><li id="searchBooksAndMore"><a href="javascript:SearchSettings(\'searchBooksAndMore\',\'Pesquisar em livros\', \'fr\');">Livres</a>&nbsp;&nbsp;&nbsp;</li></ul></div><div style="clear:both;"></div>'),
      jQuery(".find-field-controls").css("border", "1px solid #bfbfbf"),
      jQuery("#SearchTerm1").css("width", "350px"),
      jQuery("#SearchTerm1").css("max-width", "400px");
	  jQuery("#history").css('display','none');
	  jQuery(".selected-databases-caption").css('display','none');
	  jQuery(".customer-label.color-p1").css('display','none');
	  jQuery(".logo").removeAttr('href title');
	
	  jQuery(".logo-img").css('max-width','50px');
	  
	  //implements profile selector
	  //implements atoz link
     //var AZlink = '<li id="aToZlink" class="find-field-link"><a href="http://search.ebscohost.com/login.aspx?authtype=ip,guest&custid=ns001683&groupid=trial&profile=edsbrandin&direct=true&plp=1" target="_blank"></a></li>';
     var AZlink = '<li id="aToZlink" class="find-field-link"><a href="http://search.ebscohost.com/login.aspx?authtype=ip,guest&custid=s3067642&groupid=C-Test&profile=keds&direct=true&plp=1" target="_blank"></a></li>';
	jQuery(AZlink).insertAfter("#historyItem");
	
	  
     // jQuery(".find-field-controls").append('<div id="HO_checkboxes"><span id="hon_ft"><input name="common_FC" type="checkbox" id="common_FC" title="Catalogue uniquement">Catalogue uniquement</span></div>')
    }
	//(document.URL.indexOf("/results?") > -1 || document.URL.indexOf("/resultsadvanced?") > -1),
    
	
	jQuery("#aspnetForm").submit(function() {
      var e = jQuery("#SearchTerm1").attr("value");
      if ("searchBooksAndMore" == activeSearch) {
          e = e +' NOT (ZT Journal OR PT *Journal*)';
		  
		  //e += ' NOT (ZT Journal OR PT *Journal*)';
		  
		 //  e += ' AND (PT Book OR PT Ebook)';
        //e += " (AND LN cat00093a) ";
		//jQuery("#common_FC").trigger("click");
        jQuery("#SearchTerm1").attr("value", e);
      }
      else if ("searchDatabases" == activeSearch) {
         e += ' AND (ZT Article OR PT *article* OR ZT Serial)';
        //e += " AND (LN NOT cat00093a )";
        jQuery("#SearchTerm1").attr("value", e);
	 }
	 else if  ("searchJournals" == activeSearch) {
		e += ' AND (ZT Journal OR PT *Journal*)';
        //e = "JN "+e;
        jQuery("#SearchTerm1").attr("value", e);
		//jQuery("#common_FC").trigger("click");
        //var value =  jQuery("#SearchTerm1").attr("value", "http://search.ebscohost.com/login.aspx?authtype=ip,guest&custid=s7905698&groupid=trial&profile=edsbrandin&direct=true&plp=1" + e);
		//value = "http://search.ebscohost.com/login.aspx?direct=true&site=eds-live&scope=site&type=44&db=edspub&bquery=" + e + "&custid=s7905698&groupid=main&profid=eds&mode=and&lang=fr&authtype=ip,guest";
		//location.href = value;
	    //return false;
	
			
		//
	 }

      
    });
	

	
	/*
    try {
      jQuery("#SearchNavigationMenubar .nav-item a").each(function() {
        jQuery(this).text(jQuery(this).text().trim())
      })
    } catch (t) {}
    var a = jQuery("#SearchTerm1").attr("value");
    if (a = a.replace(' AND PT Book', " "), a = a.replace(' AND PT ARTICLE', ""), jQuery("#SearchTerm1").attr("value", a), setTimeout(function() {
     jQuery("#SearchTerm1").focus(), jQuery("#SearchTerm1").trigger("keyup")
    }, 500), document.URL.indexOf("/detail?") > -1) {
        //removed code here - as it seemed irrelevant
    }
	*/
    
  }
  
 //} comming from removed if
}
var activeSearch;
function SearchSettings(e, r, c) {
  jQuery(".activeSearch").removeClass("activeSearch");
  jQuery("#" + e).addClass("activeSearch");
  var id_selected=$('.activeSearch').attr('id');
  if (id_selected === "searchBooksAndMore") { 
												//jQuery(".module-header.bg-p1").css('display','none');
												//jQuery(".l-block:not(:first-child)").css('display','none');
												$('.l-block').not(':first').hide();
												
												}
											else
												{ 
												//jQuery(".module.solid").css('display','inline');
												$('.l-block').not(':first').show();
												}
												
  activeSearch = e;
  
  jQuery("#SearchTerm1").attr("placeholder", r);
  if(c == 'f'){
   // jQuery("#hon_rv").css('display','none');
   //jQuery("#hon_ft").css('display','none');
   jQuery("#hon_rv").css('display','none');
   jQuery("#hon_ft").css('display','none');
  }
  else if(c == 'fr'){
    jQuery("#hon_ft").css('display','none');
    jQuery("#hon_rv").css('display','none');
  }
  else if(c == 'fr1' ){
    jQuery("#hon_ft").css('display','none');
    jQuery("#hon_rv").css('display','none');
	
  }
  
  if ("searchDatabases" == activeSearch) 
  {
		jQuery("#common_FT").prop("checked",true);
  }
  else if ("searchBooksAndMore" == activeSearch)
  {
		jQuery("#common_FT").prop("checked",false);
  }
  
  
   
}



/* function navMDE(value) 
{		var term = getSearchTerm();
		console.log(term);
		if (term) 
		{
			value = value + "&bQuery=" + term;
			console.log(value);
		}
		location.href = value;
}
*/

function QueryString(key) 
{
   var re=new RegExp('(?:\\?|&)'+key+'=(.*?)(?=&|$)','gi');
   var r=[], m;
   while ((m=re.exec(document.location.search)) != null) r.push(m[1]);
   return r;
}







						

