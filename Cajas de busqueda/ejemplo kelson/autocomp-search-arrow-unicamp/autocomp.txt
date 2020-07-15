var currentRequest;
var selected = 0;
var autodiv = document.createElement("div");
autodiv.id = "auto-results";
document.getElementById(appenddiv).appendChild(autodiv);
$('#auto-results').css("display","none");
function clearLimiters () {
    $('.searchlimiter').val("n");
}
function submitSearch(){
  if (selected > 0){
    document.getElementById(searchboxid).value = $("#auto-results li:nth-child("+selected+")").html();
  }
}
function autocomp(event){
    //for up arrow
    if (event.keyCode == 38){
      console.log("seeing down action");
      if (selected >= 1){
      selected--;
      $("#auto-results li").removeClass("autocomp-selected");
      $("#auto-results li:nth-child("+selected+")").addClass("autocomp-selected");
    }
    
    }
    //for down arrow
    else if (event.keyCode == 40){
      console.log("seeing down action");
      if (selected <= 4){
      selected++;
      $("#auto-results li").removeClass("autocomp-selected");
      $("#auto-results li:nth-child("+selected+")").addClass("autocomp-selected");
    }
    //highlight the next item
    //track that it is selected in case they hit enter at this point
    }
    //for enter
    else if (event.keyCode == 13){
      document.getElementById(searchboxid).value = $("#auto-results li:nth-child("+selected+")");
      //console.log($("#auto-results li:nth-child("+selected+")").html().text);
    //check if any of these are selected
    //if selected, do a click event on the selected item
    }
    else{
      selected = 0;
      if (!(typeof currentRequest === "undefined")) {
          currentRequest.abort();
      }
      box = document.getElementById(searchboxid);
      query = box.value;
      query = query.replace(/ /gi,"+");
      $('#auto-results').css("display","none");
      if (query != ''){
          getResults(encodeURIComponent(query));
          }
    }

}

function getResults(term){
    currentRequest = $.ajax({
        type:"GET",
        //url: "autocomp.php",
        url: "http://widgets.ebscohost.com/prod/simplekey/autocomplete/autocomp.php",
        data: { q: term},
        dataType: 'json'
        }).done(function( data ) {

            results = $.parseJSON(data);
            if (results.hasOwnProperty('terms')) {
                newTerm = document.getElementById(searchboxid).value;
                newTerm = newTerm.replace(/ /gi,"+");
                newTerm = encodeURIComponent(newTerm);
                
                if (term == newTerm){
                    $("#auto-results").css("display","none");
                    $("#auto-results").find("li").each(function(){
                        $(this).remove();
                    });
                    var firstterm = results.terms[0];

                    var num = 0;
                    
                    $.each(results.terms, function(){
                        if (num < 5) {
                            num++;
                            if (num == 1) {
                                $('#auto-results').append('<li style="border-top:thin solid #CCCCCC;" class="result" onclick="updateSearch(&quot;'+this['term']+'&quot;)">'+this['term']+'</li>');
                            } else {
                                $('#auto-results').append('<li class="result" onclick="updateSearch(&quot;'+this['term']+'&quot;)">'+this['term']+'</li>');
                            }
                        }
                    });
                    $("#auto-results").css("display","block");
                }
            }
            else {
                var div = document.getElementById('auto-results');
                if (div != null) {
                    $("#auto-results").css("display","none");
                }
            }
        });
}
function updateSearch(term){
    term = term.trim();
    document.getElementById(searchboxid).value = term;
    if (searchOnClick == true) {
        $('#'+searchformid).submit();
    }
    if (searchOnClick == false) {autocomp();}
}

function updateSearchWithFacet(term,inputid){
    $('#'+inputid).val("y");
    term = term.trim();
    document.getElementById(searchboxid).value = term;
    if (searchOnClick == true) {
        $('#'+searchformid).submit();
    }
    if (searchOnClick == false) {autocomp();}
}

$('body').click(function(e){
       if( e.target.id == 'auto-results' )
          { return true; }
       else
          { $('#auto-results').hide(); }
 });
