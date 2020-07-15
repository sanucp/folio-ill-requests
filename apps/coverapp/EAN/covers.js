try {
  var myVarBanner = setInterval("loadbranding()", 5000);

  function loadbranding() {
    if (!window.jQuery) {
      return;
    }
    clearInterval(myVarBanner);
    jQuery(window.parent.document).ready(function() {
      if (1 != jQuery("body").data("customeds2")) {
        //alert('body data'+jQuery("body").data("customeds2"));
        jQuery("body").attr("data-customeds2", "1");
        showbookjacket();
      }

      function showbookjacket() {
        var p_counter = 0;
        jQuery(".result-list-record").each(function() {
          p_counter = p_counter + 1;
          //if (p_counter == 1) {
          jQuery(".record-icon.pubtype", jQuery(this)).attr(
            "id",
            "p_" + p_counter
          );
          jQuery(".pubtype-icon", jQuery(this)).attr("id", "img_" + p_counter);
          var cl_counter = 0;
          jQuery(".custom-link", jQuery(this)).each(function() {
            cl_counter = cl_counter + 1;
            jQuery(this).attr("id", "cl_" + p_counter + cl_counter);
            bookjacketlink = jQuery(this)
              .html()
              .toString();
            var cat = /cat00798a/;
            var cat1 = cat.exec(bookjacketlink);
            if (cat1 == "cat00798a") {
              var regExp = /test([0-9]+)/;
              var resul = regExp.exec(bookjacketlink);
              var regExp1 = /test/;
              if (regExp.test(bookjacketlink)) {
                var recdIdentifer = resul[1];
                var url_i = "http://sibean.ean.edu.co/X?op=find-doc";
                var url_r = "base=ean01";
                //alert(recdIdentifer);
                $.ajax({
                  type: "POST",
                  dataType: "json",
                  url:
                    "https://widgets.ebscohost.com/prod/customerspecific/s1194157/algo.php",
                  data: {
                    id: recdIdentifer,
                    int: url_i,
                    res: url_r,
                    rec: p_counter
                  }
                })
                  .done(function(respuesta) {
                    var a = respuesta.registro;
                    //alert(respuesta.url_img);
                    //jQuery(".pubtype-icon").empty().css("background", "none");
                    jQuery("#img_" + a)
                      .empty()
                      .html("<img src='" + respuesta.url_img + "'/>");
                    jQuery(".caption").css("margin-top", "60%");
                    //alert("#img_"+a);
                  })
                  .fail(function() {});
              }
            }
          });
          //}
        });
      }
    });
  }
} catch (e) {}
