/*
[a.hazen 2.14.2017] Built off of Alvet/Cameron's code for bstabs.
This is modified to clear modifiers when no results are found.
*/

// Function called to replace the search term with the new one.
function replaceSearchTerm() {
  var submitTerm = jQuery("#SearchTerm1").val();
  var additionalTerm = jQuery(".activeSearch").attr("data");
  if (additionalTerm !== "") {
    submitTerm += " " + additionalTerm;
  }
  jQuery("#SearchTerm1").val(submitTerm);
}

//needed to evaulate if modifier is included in current search
function decodeHtml(html) {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

var searchall;
// Load jQuery
// var jq = document.createElement('script');
// jq.src = "https://widgets.ebscohost.com/prod/common/javascript/gss-common.js";
// document.getElementsByTagName('head')[0].appendChild(jq);

// Wait for jQuery
var trackCall = setInterval(function() {
  if (window.jQuery) {
    clearInterval(trackCall);
    CustomEDS(); // Run the application

    jQuery("#aspnetForm").submit(function(e) {
      //            try {
      //                e.preventDefault();
      //            }
      //            catch (err){
      //                e.returnValue = false;
      //            }
      e.returnValue = false;
      replaceSearchTerm();
      jQuery("#aspnetForm").submit();
    });
  }
}, 10);

// Make sure the app is running in the correct pages
function CustomEDS() {
  searchall = jQuery("#bstabs-app").attr("data-searchall");
  // Init flag
  var startBSTabs = false;

  // If in test mode
  if (jQuery("#bstabs-app").data("t") == "test") {
    startBSTabs = true;

    // If not in test mode
  } else {
    // used to ensure the code is run only once.
    if (jQuery("body").data("customeds") == 1) {
      return;
    } else {
      jQuery("body").attr("data-customeds", "1");
    }

    // Execute code only in the basic page
    if (document.location.pathname == "/eds/search/basic") {
      startBSTabs = true;
    }
  }
  // Start the app
  if (startBSTabs == true) {
    var searchOptions = JSON.parse(
      decodeURIComponent(jQuery("#bstabs-app").data("c"))
    );
    var BSTabsObj = new BSTabs(searchOptions);
  }
}

var BSTabs = function(searchOptions) {
  // Save the object context
  var BSTabsObj = this;

  // Store the options to the object
  BSTabsObj.searchOptions = searchOptions;

  // Get the CSS specified, or use one of the defaults
  var cssLink;
  if (BSTabsObj.searchOptions.option_CustomCSS == "default_tabs") {
    cssLink = "https://widgets.ebscohost.com/prod/simplekey/bstabs/bstabs2.css";
  } else if (BSTabsObj.searchOptions.option_CustomCSS == "default_buttons") {
    cssLink = "https://widgets.ebscohost.com/prod/simplekey/bstabs/bstabs.css";
  } else {
    cssLink = BSTabsObj.searchOptions.option_CustomCSS;
  }

  // Attach the CSS
  jQuery("<link/>", {
    rel: "stylesheet",
    type: "text/css",
    href: cssLink
  }).appendTo("body");

  jQuery(".find-field-controls").wrap(
    '<div id="searchBoxWrapper" style="background-color:#FFF;margin-top: 0px;margin: auto;width: 50%;border: none;"></div>'
  );

  // Set the default text to the text on load
  BSTabsObj.defaultText = jQuery("#SearchTerm1").attr("placeholder");

  // Init the content variable
  var content;

  // Search all text (move to builder for v2)
  var searchall = "EDS";

  // If the default active is set to be normal, make the 'all' button active
  if (BSTabsObj.searchOptions.option_DefaultActive == "default") {
    content =
      '<div id="searchBoxWrap"><ul id="searchBoxItems" style="display:none;"><li pdata="' +
      BSTabsObj.defaultText +
      '" data="" id="searchAll" class="activeSearch bstabs_tab" >' +
      searchall +
      "</li>";

    // Otherwise, make the 'all' button not active
  } else {
    content =
      '<div id="searchBoxWrap"><ul id="searchBoxItems" style="display:none;"><li pdata="' +
      BSTabsObj.defaultText +
      '" data="" id="searchAll" class="bstabs_tab" >' +
      searchall +
      "</li>";
  }
  var searchtermArray = [];
  // Create the HTML for each button
  for (
    var i = 0;
    i < BSTabsObj.searchOptions.TabButtonItems.ButtonTabTitle.length;
    i++
  ) {
    var searchTitle = BSTabsObj.searchOptions.TabButtonItems.ButtonTabTitle[i];
    var searchTerm = BSTabsObj.searchOptions.TabButtonItems.LimiterText[i];
    searchtermArray.push(searchTerm);
    var searchDescs = BSTabsObj.searchOptions.TabButtonItems.SearchbarText[i];
    if (BSTabsObj.searchOptions.option_DefaultActive == searchTitle) {
      content +=
        '<li pdata="' +
        searchDescs +
        '" data="' +
        searchTerm +
        '" class="activeSearch middle bstabs_tab" >' +
        searchTitle +
        "</li>";
    } else {
      content +=
        '<li pdata="' +
        searchDescs +
        '" data="' +
        searchTerm +
        '" class="middle bstabs_tab" >' +
        searchTitle +
        "</li>";
    }
  }

  // Finish the HTML
  content += '</ul></div><div style="clear:both;"></div>';

  if (jQuery("#bstabs-app").data("t") != "test") {
    // evaluate if modifiers are included in searchterm container
    // if so this means no results were found and we need to remove the modifiers
    var currentSearch = jQuery("#SearchTerm1").val();
    // console.log("currentSearch: " +currentSearch);

    for (
      var currsearch = 0;
      currsearch < searchtermArray.length;
      currsearch++
    ) {
      var checkSearch = decodeHtml(searchtermArray[currsearch]);
      // console.log("looped search: " +checkSearch);
      if (currentSearch.indexOf(checkSearch) > -1) {
        currentSearch = currentSearch.replace(checkSearch, "");
        // console.log("currentSearch: " +currentSearch);
        jQuery("#SearchTerm1").val(currentSearch.trim());
        break;
      }
    }
  }

  // Add the menu to the searchbox
  jQuery("#searchBoxWrapper").prepend(content);
  // console.log(searchtermArray);
  // Set the placeholder to the active button
  jQuery("#SearchTerm1").attr(
    "placeholder",
    jQuery(".activeSearch").attr("pdata")
  );
  // If a button is clicked, change the class
  $("body").on("click", ".bstabs_tab", function() {
    jQuery(".activeSearch").removeClass("activeSearch");
    jQuery(this).addClass("activeSearch");
    jQuery("#SearchTerm1").attr("placeholder", jQuery(this).attr("pdata"));
  });
};
