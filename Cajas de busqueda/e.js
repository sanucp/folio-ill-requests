(function() {
    var jq = document.createElement('script');

		jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js";

		document.getElementsByTagName('head')[0].appendChild(jq);

		var trackHighlightCollection = setInterval(function() {
        if (window.jQuery) {
            clearInterval(trackHighlightCollection);
            StartHighlightCollection();
        }
    }, 10);

    function StartHighlightCollection() {
			function highlight(statusname,colorcode,defaultcolor,Available,statusonly,switchstate,matchField,tableclass){
				jQuery(window.frameElement).parent().parent().css('display','none');
				var count = 0;
				var incount = 0;
				var refreshIntervalId = setInterval( function() {
					count++;
					if (count > 60) {
						clearInterval(refreshIntervalId);
					}
					else {
						if (jQuery(tableclass+" tbody tr",window.top.document).length > 0) {

							useStatus = "";

							jQuery(".result-list-li",window.top.document).each(function(){
                //console.log("Record index is "+jQuery(this).find(".record-index").html());
								useStatus = "";

                var numcols = jQuery(this).find("td").length;
                var whichField = 0;
                var thisCount = 1;
                var stopCount = 0;
                jQuery(this).find(tableclass+" th").each(function(){
                  //console.log(jQuery(this).text().trim().toLowerCase());
                  if (jQuery(this).text().trim().toLowerCase() == matchField){
                    whichField = thisCount;
                    stopCount = 1;
                  }
                  if(stopCount == 0){
                    thisCount++;
                  }
                });
                //console.log(whichField);
								jQuery(this).find(tableclass+" tbody tr").each(function(){

									itemStat = jQuery(this).find("td:nth-child("+whichField+")").contents().filter(function() {
				    					return this.nodeType == 3;   //Filtering by text node
									}).text().trim();
                  //console.log(itemStat);
									itemLocation = jQuery(this).find("td:nth-child(1)").contents().filter(function() {
				    					return this.nodeType == 3;   //Filtering by text node
									}).text().trim();
                  statusfield = jQuery(this).find("td:nth-child("+whichField+")");
                  //console.log(statusfield);
									//APPLY ANY FILTERS
									jQuery.each(statusname,function(index,value){

										//IF we haven't already marked useStatus as the Available status
										//AND the item's status is not blank
										if ((useStatus !== 0 && itemStat != "") || statusonly==1){
                      if (switchstate[index] == 1){
                        if (itemStat.indexOf(value) != -1) {
                					itemStat = value;
                				}
                      }
											if (itemStat == value){
												useStatus = index;
											}
										}
									});
                  if (statusonly == 1){
                    if (useStatus !== ""){
                      jQuery(this).find("td:nth-child("+whichField+")").css('background-color',colorcode[useStatus]);
                    }
                    //Use default color if not defined
  									else{
  										jQuery(this).find("td:nth-child("+whichField+")").css('background-color',defaultcolor);
  									}
                    useStatus = "";
                  }
								});
                if (statusonly !=1){
								if (numcols > 2) {

									//Basic formatting
									jQuery(this).css('padding','5px');
									jQuery(this).css('margin-bottom','5px');
									jQuery(this).find(tableclass).css('background-color','white');
									jQuery(this).css('box-shadow','5px 5px 5px #888888');
									jQuery(this).css('border-radius','5px');
									jQuery(this).css('margin-bottom','10px');

									//Use color if defined
									if (useStatus !== ""){
					            jQuery(this).css('background-color',colorcode[useStatus]);
										useStatus = "";
									}
									//Use default color if not defined
									else{
										jQuery(this).css('background-color',defaultcolor);
										useStatus = "";
									}
								}
                useStatus = "";
              }
							});
						clearInterval(refreshIntervalId);
						}
						else {
						}
					}
				}, 500);
			}


			var highlights = {};
			var status = [];

			/*********************
			//DEFINE CUSTOM COLORS (optional)
			**********************/
			green = 'rgba(0,255,0,0.1)';
			red = 'rgba(255,0,0,0.1)';
			blue = 'rgba(0,0,255,0.1)';
			yellow = 'rgba(255,255,0,0.1)';
			white = 'rgb(255,255,255)';
			var colorcode = jQuery('#highlightCollection').data('colorcode');
      if (colorcode.indexOf("|")){
			     colorcode = colorcode.split('\|');
         }
			var statusname = jQuery('#highlightCollection').data('statusname');
      if (statusname.indexOf("|")){
			     statusname = statusname.split('\|');
         }
			var defaultcolor = jQuery('#highlightCollection').data('defaultcolor');
      var switchstate = jQuery('#highlightCollection').data('switch');
      if (switchstate.indexOf("|")){
			     switchstate = switchstate.split('\|');
         }
      var statusonly= jQuery('#highlightCollection').data('statusonly');
			/************************
			//DEFINE AVAILABLE STATUS
			*************************/
			var Available = jQuery('#highlightCollection').data('available');

      //define which field to color code against
      var matchField = jQuery('#highlightCollection').data('matchfield');
      if (matchField != "" && matchField !== undefined){
        matchField = matchField.toLowerCase();
      }
      else{
        matchField = "status";
      }
      var tableclass = "";
      if (jQuery('#highlightCollection').data('tableclass') != "" && jQuery('#highlightCollection').data('tableclass') !== undefined){
        tableclass = jQuery('#highlightCollection').data('tableclass');
        //console.log("FOUND TABLECLASS! = "+tableclass);
        if (tableclass.indexOf(".") != 0){
          tableclass="."+tableclass;
        }
      }
      else{
        //console.log("NO TABLECLASS!");
        tableclass = ".circulation";
      }
      //console.log("tableclass = "+tableclass);

			/***************************************************
			//FILTERS
			//Use only if you have special cases
			//Example: Verifying that when "DUE" is anywhere in status
			//then the status is set to "due"
			****************************************************/

			function filter(status,location){
				/*Example:
				if (status.indexOf("DUE") != -1) {
					status = "due";
				}
				return status;
				*/

				return status;
			}

			highlight(statusname,colorcode,defaultcolor,Available,statusonly,switchstate,matchField, tableclass);
		}
		}());