function searchCatalog() {
  var text1 = document.getElementById("catalogsearch").value;
  if (text1 != "") {
    var rev1 = document.getElementsByName("searchFieldSelectorCat");
    var url = "";
    if (rev1[0].checked == true) {
      url =
        "http://biblioteca.ugc.edu.co/cgi-bin/koha/opac-search.pl?" +
        "q=" +
        text1;
    }
    if (rev1[1].checked == true) {
      url =
        "ttp://biblioteca.ugc.edu.co/cgi-bin/koha/opac-search.pl?" +
        "idx=ti&" +
        "q=" +
        text1;
    }
    if (rev1[2].checked == true) {
      url =
        "ttp://biblioteca.ugc.edu.co/cgi-bin/koha/opac-search.pl?" +
        "idx=au&" +
        "q=" +
        text1;
    }
    window.open(url);
  }
}

function searchRepo() {
  var text1 = document.getElementById("repoSearch").value;
  var enco = encodeURI(text1);
  if (text1 != "") {
    var rev1 = document.getElementsByName("searchFieldSelectorRep");
    var url = "";
    if (rev1[0].checked == true) {
      url =
        "http://repository.ugc.edu.co/discover" +
        "query=" +
        enco +
        "&submit=Ir";
    }
    if (rev1[1].checked == true) {
      url =
        "http://repository.ugc.edu.co/discover?filtertype=title&filter_relational_operator=equals&filter=" +
        enco;
    }
    if (rev1[2].checked == true) {
      url =
        "http://repository.ugc.edu.co/discover?filtertype=author&filter_relational_operator=equals&filter=" +
        enco;
    }
    window.open(url);
  }
}
