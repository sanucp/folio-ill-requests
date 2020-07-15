$(function () {
    $("#tabs").tabs();
});

function ebscoHostSearchOther(form, buff) {
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

    //var searchFieldSelector =form["searchFieldSelector"].value;
    var searchFieldSelector = '';
    ebscohosturl += '&bquery=' + searchFieldSelector + '+(' + ebscohostkeywords + ebscoHostSearchParse(ebscohostsearchtext, ebscohostsearchmode) + ')';

    if (ebscohostwindow)
        window.open(ebscohosturl, 'EBSCOhost');
    else
        window.location = ebscohosturl;

    return false;
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

    var searchFieldSelector = form["searchFieldSelector"].value;
    ebscohosturl += '&bquery=' + searchFieldSelector + '+(' + ebscohostkeywords + ebscoHostSearchParse(ebscohostsearchtext, ebscohostsearchmode) + ') AND PT ebook';
    if (ebscohostwindow)
        window.open(ebscohosturl, 'EBSCOhost');
    else
        window.location = ebscohosturl;

    return false;
}

function buscaJanium(form, formato) {
    var janiumsearchtext = form.titulo.value;
    if (janiumsearchtext != '') {
        var janiumselector = form["janiumFieldSelector"].value;
        //var janiumselector = "keyword";
        var janiumsearchurl = "http://usc.janium.net/janium-bin/janium_login_opac.pl?scan&formato=" + formato;
        janiumsearchtext = encodeURI(janiumsearchtext);
        janiumsearchurl += '&' + janiumselector + '=' + janiumsearchtext;
        window.open(janiumsearchurl, "colmichWindow");
    } else
        alert('Por favor, ingrese un t&eacute;rmino para buscar.')
    return false;
}

function searchOjs() {
    var text1 = document.getElementById("ojssearch").value;
    if (text1 != '') {
        var rev1 = document.getElementsByName("searchFieldSelectorOjs");
        var url = '';
        if (rev1[0].checked == true) {
            url = "http://revistas.usc.edu.co/index.php/index/search/search?" + "simpleQuery=" + text1 + "&searchField=query";
        }
        if (rev1[1].checked == true) {
            url = "http://revistas.usc.edu.co/index.php/index/search/search?" + "simpleQuery=" + text1 + "&searchField=title";
        }
        if (rev1[2].checked == true) {
            url = "http://revistas.usc.edu.co/index.php/index/search/search?" + "simpleQuery=" + text1 + "&searchField=authors";
        }
        window.open(url);
    }
}
