<?php
/*
=============================================================================================
* WIDGET NAME: RTAC for Univ La Sabana
* DESCRIPTION: RTAC for Univ La Sabana
* KEYWORDS: RTAC, Aleph, Univ La Sabana
* CUSTOMER PARAMETERS: --
* EBSCO PARAMETERS: ILSRecNo
* URL: http://widgets.ebscohost.com/prod/rtac/aleph5.20/index.php?id={ILSRecNo}&base={AlephBase}&lang=eng&url=http://serveraddress/F/
* AUTHOR & EMAIL: Rui Francisco - rfrancisco@ebsco.com
* DATE ADDED: 2018-01-11
* DATE MODIFIED:
* LAST CHANGE DESCRIPTION:
=============================================================================================
*/


	include("wclasses.php");
	include("wfunctions.php");
	include("walephrtac.php");
	

	if (!cURLcheckBasicFunctions())
	{
		die("The server has no support for php curl functions. Please review it to continue.");
	}
	
	if (count($_GET)==0)
	{
		die("You need to specify uniqueID ");
	}
	
	if (!isset($_GET["id"]))
	{
		die("You need to specify the unique ID");
	}		

	$id=urldecode($_GET["id"]);
	$base="CNA01";
	
	if (isset($_GET["base"]))
	{
		$base=urldecode($_GET["base"]);
	}			
	
	$baseURL="https://unisabana22.gsl.com.mx";
	$baseURL="http://unisabana.hosted.exlibrisgroup.com";
	
	$xmlresponse=getStatus($baseURL,$id,$base);
	
	//export the results in XML
	$callback=null;
	if (isset($_GET['callback']))
		$callback = htmlentities($_GET['callback']);

	header('content-type: application/xml; charset=utf-8');


	# XML if no callback
	if( ! isset($callback))
		exit($xmlresponse);
		
	# XMLP if valid callback
	if(is_valid_callback($callback))
		exit("{$callback}($xmlresponse)");

	# Otherwise, bad request
	header('status: 400 Bad Request', true, 400);
		
?>