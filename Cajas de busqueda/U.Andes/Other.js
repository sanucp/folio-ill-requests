function ebscoHostSearchRI(form, buff) {
  var ebscohostsearchtext = chkObject(form.ebscohostsearchtext, "");
  var ebscohostkeywords = chkObject(form.ebscohostkeywords, "");
  var ebscohostsearchsrc = chkObject(form.ebscohostsearchsrc, "");
  var ebscohostsearchmode = chkObject(form.ebscohostsearchmode, "+AND+");
  var ebscohostwindow = parseInt(chkObject(form.ebscohostwindow, 0));
  var ebscohosturl = chkObject(
    form.ebscohosturl,
    "https://search.ebscohost.com/login.aspx?"
  );
  var isDMP = ebscohosturl.indexOf("dynamed") > -1;
  var bquery = "bquery";
  if (isDMP) {
    bquery = "q";
  }

  var strAlert = "";
  /* [7.5.2017]  Updated below to encodeURIComponent to allow for # wildcard to work in Permalink */
  ebscohostsearchtext = encodeURIComponent(ebscohostsearchtext);

  if (
    ebscohosturl.indexOf("eds-live") == -1 &&
    ebscohosturl.indexOf("pfi-live") === -1
  ) {
    if (ebscohostsearchsrc == "db" || ebscohostsearchsrc == "dbgroup") {
      var ebscohostdatabases = getSelectedDatabases(
        form.cbs,
        ebscohostsearchsrc
      );
      if (ebscohostdatabases == -1)
        strAlert += "Please select one or more databases.\n";

      ebscohosturl += ebscohostdatabases;
    }
  }

  if (ebscohostsearchtext == "") strAlert += "Please enter search term(s).\n";

  if (strAlert !== "") {
    alert(strAlert);
    return false;
  }

  var cbFT = document.getElementById("chkFullText");
  var matches = ebscohosturl.match(/cli[0-9]/g);
  var index = matches === null ? 0 : matches.length;

  if (!_isEmpty(cbFT) && cbFT.checked) {
    ebscohosturl += "&cli" + index + "=FT&clv" + index + "=Y";
    index++;
  }

  //[a.hazen 7.5.2017] Add IR to EDS
  var cbIRO = document.getElementById("chekIROnly");

  if (!_isEmpty(cbIRO) && cbIRO.checked) {
    ebscohosturl += "&cli" + index + "=FC1&clv" + index + "=Y";
    index++;
  }

  try {
    ebscoAddDisciplines();
  } catch (e) {
    debugger;
  }

  if (ebscohostkeywords != "")
    ebscohostkeywords =
      ebscoHostSearchParse(ebscohostkeywords, ebscohostsearchmode) + "+AND+";

  var keywordSelector = document.getElementById("guidedField_0");
  var titleSelector = document.getElementById("guidedField_1");
  var authorSelector = document.getElementById("guidedField_2");

  if (!_isEmpty(authorSelector) && authorSelector.checked) {
    ebscohosturl +=
      "&bquery=AU+(" +
      ebscohostkeywords +
      ebscoHostSearchParse(ebscohostsearchtext, ebscohostsearchmode) +
      ")";
  } else if (!_isEmpty(titleSelector) && titleSelector.checked) {
    ebscohosturl +=
      "&bquery=TI+(" +
      ebscohostkeywords +
      ebscoHostSearchParse(ebscohostsearchtext, ebscohostsearchmode) +
      ")";
  } else {
    ebscohosturl +=
      "&" +
      bquery +
      "=" +
      ebscohostkeywords +
      ebscoHostSearchParse(ebscohostsearchtext, ebscohostsearchmode);
  }

  if (ebscohostwindow) window.open(ebscohosturl, "EBSCOhost");
  else window.location = ebscohosturl;

  return false;
}
function ebscoHostSearchOpac(form, buff) {
  var ebscohostsearchtext = chkObject(form.ebscohostsearchtext, "");
  var ebscohostkeywords = chkObject(form.ebscohostkeywords, "");
  var ebscohostsearchsrc = chkObject(form.ebscohostsearchsrc, "");
  var ebscohostsearchmode = chkObject(form.ebscohostsearchmode, "+AND+");
  var ebscohostwindow = parseInt(chkObject(form.ebscohostwindow, 0));
  var ebscohosturl = chkObject(
    form.ebscohosturl,
    "https://search.ebscohost.com/login.aspx?"
  );
  var isDMP = ebscohosturl.indexOf("dynamed") > -1;
  var bquery = "bquery";
  if (isDMP) {
    bquery = "q";
  }

  var strAlert = "";
  /* [7.5.2017]  Updated below to encodeURIComponent to allow for # wildcard to work in Permalink */
  ebscohostsearchtext = encodeURIComponent(ebscohostsearchtext);

  if (
    ebscohosturl.indexOf("eds-live") == -1 &&
    ebscohosturl.indexOf("pfi-live") === -1
  ) {
    if (ebscohostsearchsrc == "db" || ebscohostsearchsrc == "dbgroup") {
      var ebscohostdatabases = getSelectedDatabases(
        form.cbs,
        ebscohostsearchsrc
      );
      if (ebscohostdatabases == -1)
        strAlert += "Please select one or more databases.\n";

      ebscohosturl += ebscohostdatabases;
    }
  }

  if (ebscohostsearchtext == "") strAlert += "Please enter search term(s).\n";

  if (strAlert !== "") {
    alert(strAlert);
    return false;
  }

  var cbFT = document.getElementById("chkFullText");
  var matches = ebscohosturl.match(/cli[0-9]/g);
  var index = matches === null ? 0 : matches.length;

  if (!_isEmpty(cbFT) && cbFT.checked) {
    ebscohosturl += "&cli" + index + "=FT&clv" + index + "=Y";
    index++;
  }

  var cbCO = document.getElementById("chekCatalogOnly");

  if (!_isEmpty(cbCO) && cbCO.checked) {
    ebscohosturl += "&cli" + index + "=FC&clv" + index + "=Y";
    index++;
  }

  try {
    ebscoAddDisciplines();
  } catch (e) {
    debugger;
  }

  if (ebscohostkeywords != "")
    ebscohostkeywords =
      ebscoHostSearchParse(ebscohostkeywords, ebscohostsearchmode) + "+AND+";

  var keywordSelector = document.getElementById("guidedField_0");
  var titleSelector = document.getElementById("guidedField_1");
  var authorSelector = document.getElementById("guidedField_2");

  if (!_isEmpty(authorSelector) && authorSelector.checked) {
    ebscohosturl +=
      "&bquery=AU+(" +
      ebscohostkeywords +
      ebscoHostSearchParse(ebscohostsearchtext, ebscohostsearchmode) +
      ")";
  } else if (!_isEmpty(titleSelector) && titleSelector.checked) {
    ebscohosturl +=
      "&bquery=TI+(" +
      ebscohostkeywords +
      ebscoHostSearchParse(ebscohostsearchtext, ebscohostsearchmode) +
      ")";
  } else {
    ebscohosturl +=
      "&" +
      bquery +
      "=" +
      ebscohostkeywords +
      ebscoHostSearchParse(ebscohostsearchtext, ebscohostsearchmode);
  }

  if (ebscohostwindow) window.open(ebscohosturl, "EBSCOhost");
  else window.location = ebscohosturl;

  return false;
}
function ebscoHostSearchOther(form, buff) {
  var ebscohostsearchtext = chkObject(form.ebscohostsearchtext, "");
  var ebscohostkeywords = chkObject(form.ebscohostkeywords, "");
  var ebscohostsearchsrc = chkObject(form.ebscohostsearchsrc, "");
  var ebscohostsearchmode = chkObject(form.ebscohostsearchmode, "+AND+");
  var ebscohostwindow = parseInt(chkObject(form.ebscohostwindow, 0));
  var ebscohosturl = chkObject(
    form.ebscohosturl,
    "http://search.ebscohost.com/login.aspx?"
  );
  var strAlert = "";

  ebscohostsearchtext = encodeURI(ebscohostsearchtext);

  if (ebscohostsearchtext == "") strAlert += "Please enter search term(s).\n";

  if (strAlert !== "") {
    alert(strAlert);
    return false;
  }

  //var searchFieldSelector =form["searchFieldSelector"].value;
  var searchFieldSelector = "";
  ebscohosturl +=
    "&bquery=" +
    searchFieldSelector +
    "+(" +
    ebscohostkeywords +
    ebscoHostSearchParse(ebscohostsearchtext, ebscohostsearchmode) +
    ")";

  if (ebscohostwindow) window.open(ebscohosturl, "EBSCOhost");
  else window.location = ebscohosturl;

  return false;
}
function ebscoHostSearchEbooks(form) {
  var ebscohostsearchtext = chkObject(form.ebscohostsearchtext, "");
  var ebscohostkeywords = chkObject(form.ebscohostkeywords, "");
  var ebscohostsearchsrc = chkObject(form.ebscohostsearchsrc, "");
  var ebscohostsearchmode = chkObject(form.ebscohostsearchmode, "+AND+");
  var ebscohostwindow = parseInt(chkObject(form.ebscohostwindow, 0));
  var ebscohosturl = chkObject(
    form.ebscohosturl,
    "http://search.ebscohost.com/login.aspx?"
  );

  var strAlert = "";

  ebscohostsearchtext = encodeURI(ebscohostsearchtext);

  if (ebscohostsearchtext == "") strAlert += "Please enter search term(s).\n";

  if (strAlert !== "") {
    alert(strAlert);
    return false;
  }

  var searchFieldSelector = form["searchFieldSelector"].value;
  ebscohosturl +=
    "&bquery=" +
    searchFieldSelector +
    "+" +
    ebscohostkeywords +
    ebscoHostSearchParse(ebscohostsearchtext, ebscohostsearchmode) +
    " AND (PT ebook)";
  if (ebscohostwindow) window.open(ebscohosturl, "EBSCOhost");
  else window.location = ebscohosturl;

  return false;
}
function ebscoHostSearchVideos(form) {
  var ebscohostsearchtext = chkObject(form.ebscohostsearchtext, "");
  var ebscohostkeywords = chkObject(form.ebscohostkeywords, "");
  var ebscohostsearchsrc = chkObject(form.ebscohostsearchsrc, "");
  var ebscohostsearchmode = chkObject(form.ebscohostsearchmode, "+AND+");
  var ebscohostwindow = parseInt(chkObject(form.ebscohostwindow, 0));
  var ebscohosturl = chkObject(
    form.ebscohosturl,
    "http://search.ebscohost.com/login.aspx?"
  );

  var strAlert = "";

  ebscohostsearchtext = encodeURI(ebscohostsearchtext);

  if (ebscohostsearchtext == "") strAlert += "Please enter search term(s).\n";

  if (strAlert !== "") {
    alert(strAlert);
    return false;
  }

  var searchFieldSelector = form["searchFieldSelector"].value;
  ebscohosturl +=
    "&bquery=" +
    searchFieldSelector +
    "+" +
    ebscohostkeywords +
    ebscoHostSearchParse(ebscohostsearchtext, ebscohostsearchmode) +
    " AND (PT video OR PT audio)";
  if (ebscohostwindow) window.open(ebscohosturl, "EBSCOhost");
  else window.location = ebscohosturl;

  return false;
}
function ebscoHostSearchArticle(form) {
  var ebscohostsearchtext = chkObject(form.ebscohostsearchtext, "");
  var ebscohostkeywords = chkObject(form.ebscohostkeywords, "");
  var ebscohostsearchsrc = chkObject(form.ebscohostsearchsrc, "");
  var ebscohostsearchmode = chkObject(form.ebscohostsearchmode, "+AND+");
  var ebscohostwindow = parseInt(chkObject(form.ebscohostwindow, 0));
  var ebscohosturl = chkObject(
    form.ebscohosturl,
    "http://search.ebscohost.com/login.aspx?"
  );

  var strAlert = "";

  ebscohostsearchtext = encodeURI(ebscohostsearchtext);

  if (ebscohostsearchtext == "") strAlert += "Please enter search term(s).\n";

  if (strAlert !== "") {
    alert(strAlert);
    return false;
  }

  var searchFieldSelector = form["searchFieldSelector"].value;
  ebscohosturl +=
    "&bquery=" +
    searchFieldSelector +
    "+" +
    ebscohostkeywords +
    ebscoHostSearchParse(ebscohostsearchtext, ebscohostsearchmode) +
    " AND (PT academic Journal)";
  if (ebscohostwindow) window.open(ebscohosturl, "EBSCOhost");
  else window.location = ebscohosturl;

  return false;
}
