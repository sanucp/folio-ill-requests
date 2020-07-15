try {

    var color_RTAC = setInterval("load_color_RTAC()", 500);

    function load_color_RTAC() {
        if (!window.jQuery) {
            return;
        }

        clearInterval(color_RTAC); //clean interval	
        //hide widget

        jQuery(window.parent.document).ready(function () {
            var search = jQuery("script#color_RTAC").data("search");
            var color = jQuery("script#color_RTAC").data("color");
            var remove = jQuery("script#color_RTAC").data("remove");
            var date_regexp = jQuery("script#color_RTAC").data("date_regexp");
            var return_date_label = jQuery("script#color_RTAC").data("return_date_label");
            var i;

            var lookingforRTACclass = setInterval(function () {
                if (jQuery('div.rtac.loading', window.parent.document).length == 0) {
                    //alert("Fisrt Jquery condition met");
                    clearInterval(lookingforRTACclass); //clean interval

                    // change the color to red
                    jQuery("table.circulation.rtac-table", window.parent.document).each(function (index) {
                        //alert("Second Jquery condition met");
                        var me = this;
                        var date_de_retour = 0;
                        $('th', jQuery(this)).each(function () {

                            if (jQuery(this).text().trim().indexOf(return_date_label) === 0) {
                                jQuery(this).wrapInner('<span style="color:#FF0000;font-weight:bold;"></span>');
                                date_de_retour = 1;
                            }
                            if (jQuery(this).text().trim().indexOf("Emplacement") === 0) {
                                //jQuery('"<th>*</th>"').insertBefore(this);						
                            }
                        });


                        jQuery('tbody > tr', jQuery(me)).each(function () {

                            bookjacketlink = jQuery(this).html().toString();
                            //alert('Custom link scan :'+bookjacketlink);
                            //var regExp = /[0-9]+\/[0-9]+\/[0-9]+/;

                            var search_regexp = date_regexp;

                            var re = new RegExp(search_regexp, "g");

                            var datefound = 0;
                            var matches1 = re.test(bookjacketlink);
                            //alert('Custom link regexp match or not ? :'+regExp.test(bookjacketlink));
                            if (matches1) {
                                //jQuery(this).wrapInner('"<span style="color:#FF0000;font-weight:bold;">*</span>"');
                                //jQuery('"<span style="color:#FF0000;font-weight:bold;">*</span>"').insertBefore(this).children();	
                                //jQuery('"<span style="color:#FF0000;font-weight:bold;">*</span>"').insert(this).children();
                                jQuery(this).children(":eq(2)").prepend('<span style="color:red;font-weight:bold;font-size: 2em;">&#8226;</span>');
                                datefound = 1;
                            }


                            for (i = 0; i < search.length; ++i) {
                                var search_regexp = search[i];
                                //var replace_regexp = replace[i]
                                var regExp2 = new RegExp(search_regexp, "g");

                                //var regExp2 = /PRET NORMAL/;
                                var matches2 = regExp2.test(bookjacketlink);


                                //if ( matches2 && !matches1)(regExp2.test(bookjacketlink)) && (!(regExp.test(bookjacketlink)))) { 
                                if (matches2 && (!matches1)) {
                                    //if (datefound == 0){ jQuery(this).prepend('"<td><span style="color:green;font-weight:bold;">*</span></td>"'); }
                                    jQuery(this).children(":eq(2)").prepend('<span style="color:' + color[i] + ';font-weight:bold;font-size: 2em">&#8226;</span>');
                                }
                            }



                            //if (date_de_retour == 1) {//jQuery('td:last',jQuery(this)).append("<td>*</td>");}
                        });
                    });




                    jQuery("table.circulation.rtac-table td.status", window.parent.document).each(function (index) {
                        for (i = 0; i < remove.length; ++i) {
                            if (jQuery(this).text().trim().indexOf(remove[i]) === 0) {
                                jQuery(this).parents('tr').remove();
                            }
                        }
                    });
                    //jQuery(".rtac-show-less").hide();





                    //hide the result list widget
                    //jQuery('.related-info-area:contains("greenstatus")',window.parent.document).css('display','none');
                }
            }, 500);

        });
    }
} catch (err) {}