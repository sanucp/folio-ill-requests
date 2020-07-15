var position = 0;
var shiftTimeout;
var animated = false;
var width = 130;
var bookCount = bookList.length;
var link="";


try
{
	if(carousel.booksDisplayed > bookCount)
		carousel.booksDisplayed = bookCount;
		
	if(carousel.shiftRate > carousel.booksDisplayed)
		carousel.shiftRate = carousel.booksDisplayed;
}
catch(err)
{
	//alert(err);
}

 function is_valid_isbn(isbnvalue){
	  var re = new RegExp("^(97(8|9))?\\d{9}(\\d|X)$");
	  return re.test(isbnvalue);
 }

function shiftNext()
{
	try
	{
		if(!animated) {
			window.clearTimeout( shiftTimeout );
			animated = true;
			position += carousel.shiftRate;
			
			jQuery("#slideHolder").animate(
				{
					left : '-=' + (width*carousel.shiftRate)
				},
				carousel.shiftSpeed,
				function() {
					if(position >= bookCount) {
						position = position % bookCount;
			
						jQuery("#slideHolder").css({
							'left' : ((bookCount*width) + (position*width)) * -1
						});
					}
					animated=false;
					if( carousel.autoShift )
						shiftTimeout = window.setTimeout( "shiftNext()", (carousel.shiftTime * 1000) );
				}
			);
		}
	}
	catch(err)
	{
		//alert(err);
	}
}

function shiftPrev()
{
	try
	{
		if(!animated) {
			window.clearTimeout( shiftTimeout );
			animated = true;
			position -= carousel.shiftRate;
			
			jQuery("#slideHolder").animate(
				{
					left : '+=' + (width*carousel.shiftRate)
				},
				carousel.shiftSpeed,
				function() { 
					if(position < 0) {
						position += bookCount;
						
						jQuery("#slideHolder").css({
							'left' : ((bookCount*width) + (position*width)) * -1
						});
					}
					animated = false;
					if( carousel.autoShift )
						shiftTimeout = window.setTimeout( "shiftNext()", (carousel.shiftTime * 1000) );
				}
			);
		}
	}
	catch(err)
	{
	}
}

function buildCarousel() {
	var returnString;
	var popup="";
	
	try
	{
		if( carousel.newWindow )
		{
			popup = "_blank";
		} else {
			popup = "_self";
		}	
		for(var i=0;i<3;i++) {
			for(var j=0;j<bookCount;j++) {
				var isb=bookList[j].ISBN;
				if (is_valid_isbn(isb)) {
					if (carousel.catalogurl!="")
					{
						var array = {"{ILSRecNo}":bookList[j].AN};
						var array2 = {"{ISBN}":bookList[j].ISBN};
						// replace the {ILSRecNo} with the ID 
						for (var val in array)
							link = carousel.catalogurl.replace(new RegExp(val, "g"), array[val]);
						for (var val in array2)
							link=link.replace(new RegExp(val, "g"), array2[val]);				
						
					}
					else
					{
						link='http://search.ebscohost.com/login.aspx?authtype=ip,cookie,uid&direct=true&db='+bookList[j].database+'&AN='+bookList[j].AN+'&site=eds-live&scope=site';
					}
					returnString += '<div class="book">';
					returnString += '<a target="' + popup + '" href="'+link+'">';
					returnString += '<img style="border: 0px; width: 80px; height: 120px;" alt="' + bookList[j].ISBN + '_image" src="http://smallcontent.ebsco-content.com/branding/s1248750/covers/' + bookList[j].ISBN + '.jpg" />';
					returnString += '<div class="bookTitle">';
					returnString += '' + bookList[j].title + '';
					returnString += '</div>';
					returnString += '</a>';
					returnString += '</div>';
				}				
			}
		}
	
	}
	catch (err)
	{}
	//clean the undefined
	returnString=returnString.replace(/undefined/gi,"");	
	return returnString;
}

	try
	{
		if(bookList.length>0) {
		
			// write carousel to screen
			jQuery("#slideHolder").html( buildCarousel() );

			if( carousel.autoShift )
			{
				shiftTimeout = window.setTimeout( "shiftNext()", (carousel.shiftTime * 1000) );
			}
		
			jQuery(".mainWindow").css({ 
				'width' : (carousel.booksDisplayed*width)
			});
			
			jQuery("#carouselContainer").css({
				'width' : (carousel.booksDisplayed*width)
			});
			
			jQuery("#slideHolder").css({
				'right' : 3*(bookCount*width),
				'width' : 3*(bookCount*width)
			});
			
			jQuery(".next").css({
				'left' : (carousel.booksDisplayed*width)
			});			
			
			jQuery("#slideHolder").css({
				'left' : (bookCount*width) * -1
			});
				
			jQuery("#next").click( function() {
				shiftNext();
			});
			
			jQuery("#prev").click( function() {
				shiftPrev();
			});
			
		}
		else
		{
			// if no books, hide the block
			jQuery("#carouselTitle").hide();
			jQuery("#carouselContainer").hide();
			
		}

	}
	catch (err)
	{
		//console.log("error carousel " + err );
	}

