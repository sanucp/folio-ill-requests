$(function(){
    $("#tabs").tabs();
})
function catalog(){
    var text = document.getElementById("CatSearch").value;
    if (text != ""){
        var biblo = document.getElementsByName("bib");
        var url = '' ;
        if(biblo[0].value == "1"){ url = "http://200.38.75.83:8975/F/?opac=btru&request="+text+"&func=find-b&local_base=btru"}
        if(biblo[1].value == "2"){ url = "http://200.38.75.83:8975/F/?opac=bsit&request="+text+"&func=find-b&local_base=bsit"}
        if(biblo[2].value == "3"){ url = "http://200.38.75.83:8975/F/?opac=bcaj&request="+text+"&func=find-b&local_base=bcaj"}
        if(biblo[3].value == "4"){ url = "http://200.38.75.83:8975/F/?opac=blim&request="+text+"&func=find-b&local_base=blim"}
        if(biblo[4].value == "5"){ url = "http://200.38.75.83:8975/F/?opac=bcen&request="+text+"&func=find-b&local_base=bcen"}
        if(biblo[5].value == "6"){ url = "http://200.38.75.83:8975/F/?opac=best&request="+text+"&func=find-b&local_base=best"}
        if(biblo[6].value == "7"){ url = "http://200.38.75.83:8975/F/?opac=bcom&request="+text+"&func=find-b&local_base=bcom"}
        window.open(url);
    }
}
function ebscoHostSearchOther(form, buff) {
    var ebscohostsearchtext = chkObject(form.ebscohostsearchtext,'');
    var ebscohostkeywords = chkObject(form.ebscohostkeywords,'');
    var ebscohostsearchsrc = chkObject(form.ebscohostsearchsrc,'');
    var ebscohostsearchmode = chkObject(form.ebscohostsearchmode,'\+AND\+');
    var ebscohostwindow = parseInt(chkObject(form.ebscohostwindow,0));
    var ebscohosturl = chkObject(form.ebscohosturl,'http://search.ebscohost.com/login.aspx?');
    var strAlert="";
   
    ebscohostsearchtext = encodeURI(ebscohostsearchtext);
   
    if (ebscohostsearchtext=="") 
           strAlert+="Please enter search term(s).\n"; 
    
    if (strAlert !== "") {
       alert(strAlert);
       return false;
    }
    
   var searchFieldSelector =form["searchFieldSelector"].value;
   ebscohosturl+='&bquery='+searchFieldSelector+'+('+ebscohostkeywords+ebscoHostSearchParse(ebscohostsearchtext,ebscohostsearchmode)+')'; 

   if (ebscohostwindow)
       window.open(ebscohosturl, 'EBSCOhost');
   else
       window.location = ebscohosturl;
       
   return false;
}
function searchRepo() {
	var text1 = document.getElementById("repoSearch").value;
	var enco = encodeURI(text1);
	if (text1 != ''){
	var url = 'http://repositorio.upn.edu.pe/discover?scope=%2F&' + "query=" + enco + "&submit=Ir" ;
	window.open (url);}
}
function ebscoHostSearchEbooks(form) {
    var ebscohostsearchtext = chkObject(form.ebscohostsearchtext, '');
    var ebscohostkeywords = chkObject(form.ebscohostkeywords, '');
    var ebscohostsearchsrc = chkObject(form.ebscohostsearchsrc, '');
    var ebscohostsearchmode = chkObject(form.ebscohostsearchmode, '\+AND\+');
    var ebscohostwindow = parseInt(chkObject(form.ebscohostwindow, 0));
    var ebscohosturl = chkObject(form.ebscohosturl, 'http://search.ebscohost.com/login.aspx?');

    var strAlert = "";

    ebscohostsearchtext = encodeURI(ebscohostsearchtext);

    if (ebscohostsearchtext == "")
        strAlert += "Please enter search term(s).\n";

    if (strAlert !== "") {
        alert(strAlert);
        return false;
    }

    var searchFieldSelector = form["ebook"].value;
    ebscohosturl += '&bquery=' + searchFieldSelector + '+(' + ebscohostkeywords + ebscoHostSearchParse(ebscohostsearchtext, ebscohostsearchmode) + ') AND PT eBook';
    if (ebscohostwindow)
        window.open(ebscohosturl, 'EBSCOhost');
    else
        window.location = ebscohosturl;

    return false;
}