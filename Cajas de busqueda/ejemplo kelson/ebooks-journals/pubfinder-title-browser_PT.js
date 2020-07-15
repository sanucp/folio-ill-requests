function extractDomain(url) {
    var domain;
    //find & remove protocol (http, ftp, etc.) and get domain
    if (url.indexOf("://") > -1) {
      domain = url.split('/')[2];
    } else {
      domain = url.split('/')[0];
    }
  
    //find & remove port number
    domain = domain.split(':')[0];
  
    return domain;
  }
  
  var trackAtoZEvent = setInterval(function() {
    try {
      jQuery().jquery;
      clearInterval(trackAtoZEvent);
      if ((document.URL.indexOf("sdb=edspub") > 0) || (jQuery(
          "div[data-searchwithin]").length > 0) || (document.URL.indexOf(
          "/pfi/") > 0)) {
        StartAtoZBar();
      }
    } catch (err) {}
  }, 10);
  
  function setCookie(key, value) {
    var expires = new Date();
    expires.setTime(expires.getTime() + (10000));
    document.cookie = key + '=' + value + ';expires=' + expires.toUTCString() +
      '; path=/pfi';
  }
  
  function getCookie(key) {
    var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
    return keyValue ? keyValue[2] : null;
  }
  
  //title sort
  var dotitlesort = getCookie('titlesortflag');
  if (dotitlesort == 1) {
    var sorturl = window.location.href;
    setCookie('titlesortflag', '0');
    window.location.href = sorturl.substr(0, sorturl.indexOf('/pfi')) +
      "/pfi/sortoptions/setsort?id=title&isStickySort=False&" + sorturl.split("?")[
        1];
  }
  
  function html_entity_decode(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }
  
  function runAjax(bquery, selectedLetter) {
  
    var urlparams = window.location.href.split("?")[1];
    var params = urlparams.split("&");
    var vid = '';
    var sid = '';
    var hid = '';
  
    jQuery.each(params, function(index, item) {
      var paramname = item.split("=")[0];
      var paramvalue = item.split("=")[1];
      if (paramname == "vid") {
        vid = paramvalue;
      }
      if (paramname == "hid") {
        hid = paramvalue;
      }
      if (paramname == "sid") {
        sid = paramvalue;
      }
    });
  
    var hrefurl = window.location.href;
    var domain = hrefurl.substring(0, hrefurl.indexOf("/", 10));
  
    if (hrefurl.indexOf("/eds/")) {
  
      var my_url = domain + '/eds/Search/PerformSearch?sid=' + sid + '&vid=' +
        encodeURIComponent(vid) + '&SearchTerm=' + encodeURIComponent(bquery);
  
    } else {
  
      var my_url = domain + '/pfi/Search/PerformSearch?sid=' + sid + '&vid=' +
        encodeURIComponent(vid) + '&SearchTerm=' + encodeURIComponent(bquery);
  
    }
  
    jQuery.ajax({
      'global': false,
      'url': my_url,
      'error': function(data) {
  
      },
      'success': function(data) {
        if (data.indexOf("sortItem") == -1) {
          var notfound =
            '<div class="lettererror" style="display:none;border-radius:5px;border:thin solid red;background-color:#F5F5F5;clear:both;padding:20px;"><strong>Nenhum resultado começando com ' +
            selectedLetter + '</div>';
          if (jQuery('.content-header').length >= 1) {
            jQuery('.content-header').before(notfound);
          } else {
            jQuery('#letter-mod-content').append(notfound);
          }
          jQuery('.lettererror').fadeIn("slow");
        } else {
          var link = data.substring(data.indexOf("sortItem") + 2);
          link = link.substring(link.indexOf("sortItem"));
          link = link.substring(link.indexOf("href=") + 6);
          link = link.substring(0, link.indexOf("\""));
  
          domain = extractDomain(window.location.href);
          window.location = "http://" + domain + html_entity_decode(link);
        }
      }
    });
  
  }
  
  function isEnglishLetter(str) {
    return str.length === 1 && (str.match(/[a-z]/i) || str.match(/[A-Z]/i));
  }
  
  function StartAtoZBar() {
  
    if (document.URL.indexOf("/advanced?") > -1 && (document.URL.indexOf("/pfi/") >
        -1 || document.URL.indexOf("sdb=edspub") > -1)) {
      var screentype = "advanced";
    } else if (document.URL.indexOf("/resultsadvanced?") > -1 && (document.URL.indexOf(
        "/pfi/") > -1 || document.URL.indexOf("sdb=edspub") > -1)) {
      var screentype = "resultsadvanced";
    } else if (document.URL.indexOf("/detail?") > -1 && (document.URL.indexOf(
        "/pfi/") > -1 || document.URL.indexOf("sdb=edspub") > -1)) {
      var screentype = "detail";
    } else if (document.URL.indexOf("/results?") > -1 && (document.URL.indexOf(
        "/pfi/") > -1 || document.URL.indexOf("sdb=edspub") > -1)) {
      var screentype = "results";
    } else {
      var screentype = "basic";
    }
  
    var firstChar = "A",
      lastChar = "Z";
    var barHolder =
      '<div id="lettercontainer"><ul class="letterrow topletterrow">';
    var alphasearch = false;
    var selectedLetter = '';
    var styling = '';
  
    if (jQuery('#Searchbox1').length > 0) {
      selectedLetter = jQuery('#Searchbox1').val();
      if ((selectedLetter.indexOf("JN ") >= 0) && (selectedLetter.indexOf("*") >=
          0)) {
        selectedLetter = selectedLetter.substring(selectedLetter.indexOf("JN ") +
          3);
        selectedLetter = selectedLetter.substring(0, selectedLetter.indexOf("*"));
        if (((selectedLetter.length == 1) || (selectedLetter.length == 2)) && (
            isEnglishLetter(selectedLetter.substring(0, 1))) && (isNaN(
            selectedLetter))) {
          alphasearch = true;
        }
      }
    } else if (jQuery('#SearchTerm1').length > 0) {
      selectedLetter = jQuery('#SearchTerm1').val();
      if ((selectedLetter.indexOf("JN ") >= 0) && (selectedLetter.indexOf("*") >=
          0)) {
        selectedLetter = selectedLetter.substring(selectedLetter.indexOf("JN ") +
          3);
        selectedLetter = selectedLetter.substring(0, selectedLetter.indexOf("*"));
        if (((selectedLetter.length == 1) || (selectedLetter.length == 2)) && (
            isEnglishLetter(selectedLetter.substring(0, 1))) && (isNaN(
            selectedLetter))) {
          alphasearch = true;
        }
      }
    }
  
    barHolder +=
      '<li class="letteroption"><a class="alphaAction color-p4">#</a></li>';
    for (var i = firstChar.charCodeAt(0); i <= lastChar.charCodeAt(0); i++) {
      var alphaChar = eval("String.fromCharCode(" + i + ")");
      if ((alphasearch) && (alphaChar == selectedLetter)) {
        styling = ' style="font-weight:bold;"';
      }
      alphaChar = '<li class="letteroption"><a class="alphaAction color-p4"' +
        styling + ';>' + alphaChar + '</a></li>';
      styling = '';
      barHolder += alphaChar;
    }
    barHolder +=
      '<li class="letteroption"><a class="alphaAction color-p4">Autores</a></li>';
  
    barHolder += '</ul>';
  
    if (jQuery('#extraletters').length >= 1) {
      barHolder += '<ul class="letterrow extraletterrow">';
      var extraletters = jQuery('#extraletters').text();
      for (var i = 0, len = extraletters.length; i < len; i++) {
        var alphaChar = extraletters[i];
        if ((alphasearch) && (alphaChar == selectedLetter)) {
          styling = ' style="font-weight:bold;"';
        }
        alphaChar = '<li class="letteroption"><a class="alphaAction color-p4"' +
          styling + ';>' + alphaChar + '</a></li>';
        barHolder += alphaChar;
        styling = '';
      }
      barHolder += '</ul>';
    }
  
  
    if (alphasearch) {
      barHolder +=
        '<ul class="letterrow subletterrow"><li class="letteroption subletter"></li>';
      if (selectedLetter.length == 1) {
        for (var i = firstChar.charCodeAt(0); i <= lastChar.charCodeAt(0); i++) {
          var alphaChar = eval("String.fromCharCode(" + i + ")");
          alphaChar =
            '<li class="letteroption subletter"><a class="alphaAction color-p4";>' +
            selectedLetter + alphaChar + '</a></li>';
          barHolder += alphaChar;
        }
      }
      if (selectedLetter.length == 2) {
        var firstLetter = selectedLetter.substring(0, 1);
        for (var i = firstChar.charCodeAt(0); i <= lastChar.charCodeAt(0); i++) {
          var alphaChar = eval("String.fromCharCode(" + i + ")");
          if ((firstLetter + alphaChar) == selectedLetter) {
            styling = ' style="font-weight:bold;"';
          }
          alphaChar =
            '<li class="letteroption subletter"><a class="alphaAction color-p4"' +
            styling + ';>' + firstLetter + alphaChar + '</a></li>';
          styling = '';
          barHolder += alphaChar;
        }
      }
      barHolder += '</ul>';
    }
  
    barHolder += '</div>';
  
    if (screentype == "advanced") {
      barHolder =
        '<div class="limiters"><div id="ctl00_ctl00_MainContentArea_MainContentArea_ctrlLimiters_divAlphaBrowse"><fieldset class="fieldset" id="alphabrowse"><legend class="legend"><span class="h4">Navegue pelo título</span></legend>' +
        barHolder + '</fieldset></div>';
      jQuery(
        '#ctl00_ctl00_MainContentArea_MainContentArea_ctrlLimiters_divDisciplines'
      ).before(barHolder);
    } else if ((screentype == "resultsadvanced") || (screentype == "results")) {
      jQuery('#header').after(barHolder);
      jQuery('#lettercontainer').css('background-color', '#F5F5F5');
      jQuery('.letterrow').css('padding-left', '20px');
    } else if (screentype == "detail") {
      jQuery('#header').after(barHolder);
      jQuery('#lettercontainer').css('background-color', '#F5F5F5');
      jQuery('.letterrow').css('padding-left', '20px');
    } else if (jQuery('.customer-label.color-p3').length) {
      if (jQuery('#pageHeader').length >= 1) {
        barHolder =
          '<div class="l-one-block id-3000EP"><div class="l-block"><div class="module solid" data-id="facetsListFeature"><div class="module-header bg-p1"><h2 class="module-heading color-s1">Navegue pelo título</h2></div><div id="letter-mod-content" class="module-content">' +
          barHolder + '</div></div></div></div>';
        jQuery('#pageHeader').after(barHolder);
      } else {
        jQuery('#header').after(barHolder);
        jQuery('#lettercontainer').css('background-color', '#F5F5F5');
        jQuery('.letterrow').css('padding-left', '20px');
      }
    }
  
    jQuery('.alphaAction.color-p4').click(function() {
      jQuery(".lettererror").fadeOut("slow", function() {
        jQuery(this).remove();
      });
      var id_selected=$('.activeSearch').attr('id');
      
      switch (id_selected)
          {
              case "searchBooksAndMore":
                  //id_selected = "";
                  //alert (id_selected);
                      var bquery = 'TI ' + jQuery(this).text() + '*' + ' NOT (ZT Journal OR PT *Journal*)';
                          if (bquery == 'TI #* NOT (ZT Journal OR PT *Journal*)') {
                            bquery =
                              '(TI 0* OR TI  1* OR TI  2* OR TI  3* OR TI  4* OR TI  5* OR TI  6* OR TI  7* OR TI  8* OR TI  9*) NOT (ZT Journal OR PT *Journal*)';
                          }
                          if (bquery == 'TI Autres* NOT (ZT Journal OR PT *Journal*)') {
                            bquery =
                              'TI  * NOT ( A* OR B* OR  C* OR  D* OR  E* OR  F* OR  G* OR  H* OR  I* OR  J* OR  K* OR  L* OR  M* OR  N* OR  O* OR  P* OR  Q* OR  R* OR  S* OR  T* OR  U* OR  V* OR  W* OR  X* OR  Y* OR  Z* OR  0* OR  1* OR  2* OR  3* OR  4* OR  5* OR  6* OR  7* OR  8* OR  9*) NOT (ZT Journal OR PT *Journal*)';
                          }
                  break;
              case "searchJournals":
                  //id_selected = "";
                  //alert (id_selected);
                      var bquery = 'JN ' + jQuery(this).text() + '*' + ' AND (ZT Journal OR PT *Journal*)';
                      if (bquery == 'JN #* AND (ZT Journal OR PT *Journal*)') {
                        bquery =
                          'JN 0* OR JN 1* OR JN 2* OR JN 3* OR JN 4* OR JN 5* OR JN 6* OR JN 7* OR JN 8* OR JN 9*';
                      }
                      if (bquery == 'JN Other*') {
                        bquery =
                          'JN * NOT (JN A* OR JN B* OR JN C* OR JN D* OR JN E* OR JN F* OR JN G* OR JN H* OR JN I* OR JN J* OR JN K* OR JN L* OR JN M* OR JN N* OR JN O* OR JN P* OR JN Q* OR JN R* OR JN S* OR JN T* OR JN U* OR JN V* OR JN W* OR JN X* OR JN Y* OR JN Z* OR JN 0* OR JN 1* OR JN 2* OR JN 3* OR JN 4* OR JN 5* OR JN 6* OR JN 7* OR JN 8* OR JN 9*)';
                      }
                  
                  break;
              case "searchAll":
                  //id_selected = ;
                  //alert (id_selected);
                      var bquery = 'JN ' + jQuery(this).text() + '*';
                          if (bquery == 'JN #*') {
                            bquery =
                              'JN 0* OR JN 1* OR JN 2* OR JN 3* OR JN 4* OR JN 5* OR JN 6* OR JN 7* OR JN 8* OR JN 9*';
                          }
                          if (bquery == 'JN Autres*') {
                            bquery =
                              'JN * NOT (JN A* OR JN B* OR JN C* OR JN D* OR JN E* OR JN F* OR JN G* OR JN H* OR JN I* OR JN J* OR JN K* OR JN L* OR JN M* OR JN N* OR JN O* OR JN P* OR JN Q* OR JN R* OR JN S* OR JN T* OR JN U* OR JN V* OR JN W* OR JN X* OR JN Y* OR JN Z* OR JN 0* OR JN 1* OR JN 2* OR JN 3* OR JN 4* OR JN 5* OR JN 6* OR JN 7* OR JN 8* OR JN 9*)';
                          }
                  
                  
                  break;				
                  
          }
  
      runAjax(bquery, jQuery(this).text());
    });
  
    jQuery('.alphaAction.color-p4').css('cursor', 'pointer');
    jQuery('.letterrow li').css('display', 'block');
    jQuery('.letterrow li').css('float', 'left');
    jQuery('.letterrow li').css('width', '12px');
    jQuery('.letterrow li').css('padding', '5px');
    jQuery('.letterrow li').css('margin', '2px');
    jQuery('.letterrow li').css('broder-radius', '3px');
    jQuery('ul.letterrow').css('padding-bottom', '10px');
    jQuery('ul.letterrow').css('clear', 'both');
    jQuery('.topletterrow').css('font-size', '14px');
    jQuery('.extraletterrow').css('font-size', '14px');
    jQuery('.subletterrow').css('font-size', '11px');
    jQuery('ul.subletterrow').css('border-top', 'thin solid #DDDDDD');
    jQuery('.letterrow').css('text-align', 'left');
  
    var styledefine =
      '<style type="text/css">li.letteroption:hover { font-weight: bolder; }</style>';
    jQuery('.branding-container').append(styledefine);
  
    var pagination = jQuery('div.results-bottom-nav').html();
    pagination = '<div style="clear:both;">' + pagination + '</div>';
    jQuery('ul.result-list').before(pagination);
  }
  