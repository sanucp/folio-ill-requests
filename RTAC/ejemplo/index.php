<?php
/*
=============================================================================================
* WIDGET NAME: RTAC for horaizon 
* DESCRIPTION: RTAC for horaizon
* KEYWORDS: RTAC, horaizon
* CUSTOMER PARAMETERS: baseURL
* EBSCO PARAMETERS: ILSRecNo
* URL: http://widgets.ebscohost.com/prod/rtac/koha/index.php?id={ILSRecNo}&url={baseURL}
* AUTHOR & EMAIL: Andres Navarro - anavarro@ebsco.com
* DATE ADDED: 2019-01-03
* DATE MODIFIED:
* LAST CHANGE DESCRIPTION:
=============================================================================================
*/


	include("wclasses.php");
	include("wfunctions.php");
	include("whorizonrtac.php");
	

	if (!cURLcheckBasicFunctions())
	{
		die("The server has no support for php curl functions. Please review it to continue.");
	}
	
	if (count($_GET)==0)
	{
		die("You need to specify parameters");
	}
	
	if (!isset($_GET["id"]))
	{
		die("You need to specify the unique ID");
	}
	$expression=trim(urldecode($_GET["id"]));

	$baseURL="http://hip.umce.cl/ipac20/ipac.jsp?profile=bibumce&index=BIB&term=";
	
	$listResults=getStatus($baseURL,$expression);
	//export the results in JSON
	$callback=null;
	if (isset($_GET['callback']))
		$callback = htmlentities($_GET['callback']);

	header('content-type: application/xml; charset=utf-8');

	//convert the list into xml
	$xmlresponse="<?xml version=\"1.0\" encoding=\"utf-8\" ?>\n"
				."<holdings>\n"
				;
	;
	foreach ($listResults as $r)
	{
		$s="<holding>\n";
		$s.="<itemType>".$r->itemType."</itemType>\n";
		$s.="<location>".$r->location."</location>\n";
		$s.="<callNumber>".$r->callNumber."</callNumber>\n";
		$s.="<status>".$r->status."</status>\n";
		$s.="<volInfo>".$r->volInfo."</volInfo>\n";
		$s.="<duedate>".$r->duedate."</duedate>\n";
		$s.="</holding>\n";
		$xmlresponse.=$s;
	
	}

	$xmlresponse.="</holdings>\n";

	# XML if no callback
	if( ! isset($callback))
		exit($xmlresponse);
		
	# XMLP if valid callback
	if(is_valid_callback($callback))
		exit("{$callback}($xmlresponse)");

	# Otherwise, bad request
	header('status: 400 Bad Request', true, 400);
		
?>