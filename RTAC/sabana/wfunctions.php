<?php
/************************************************
  EBSCO
  Rui Francisco (rfrancisco@ebscohost.com)
  Description : widget functions
  
  Date        : 2013-05-08
  
 ***********************************************/
 
 
	function is_valid_callback($subject)
	{
		$identifier_syntax
		  = '/^[$_\p{L}][$_\p{L}\p{Mn}\p{Mc}\p{Nd}\p{Pc}\x{200C}\x{200D}]*+$/u';

		$reserved_words = array('break', 'do', 'instanceof', 'typeof', 'case',
		  'else', 'new', 'var', 'catch', 'finally', 'return', 'void', 'continue', 
		  'for', 'switch', 'while', 'debugger', 'function', 'this', 'with', 
		  'default', 'if', 'throw', 'delete', 'in', 'try', 'class', 'enum', 
		  'extends', 'super', 'const', 'export', 'import', 'implements', 'let', 
		  'private', 'public', 'yield', 'interface', 'package', 'protected', 
		  'static', 'null', 'true', 'false');

		return preg_match($identifier_syntax, $subject)
			&& ! in_array(mb_strtolower($subject, 'UTF-8'), $reserved_words);
	}
 		
	function cURLcheckBasicFunctions()
	{
	  if( !function_exists("curl_init") &&
		  !function_exists("curl_setopt") &&
		  !function_exists("curl_exec") &&
		  !function_exists("curl_close") ) 
		  {return false;}
	  else 
		{return true;}
	}
	
	function validURL($url)
	{
		try
		{
			if (!filter_var($url,FILTER_VALIDATE_URL))
				return false;
			
			return true;
		}
		catch (Exception $e)
		{
			return false;
		}
	}
	
	
	function getWeb($url, &$header="", &$result="",$cookie=array(), $followlocation=1 )
	{
		try
		{
			$ch = curl_init($url);
	

			curl_setopt($ch, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:30.0) Gecko/20100101 Firefox/30.0" );
			curl_setopt($ch, CURLOPT_VERBOSE, 1);
			curl_setopt($ch, CURLOPT_NOSIGNAL, 1);
			curl_setopt($ch, CURLOPT_MAXREDIRS, 10 );		
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
			curl_setopt($ch, CURLOPT_HEADER, 0);
			curl_setopt($ch, CURLINFO_HEADER_OUT, 0);
			curl_setopt($ch, CURLOPT_FOLLOWLOCATION, $followlocation);
			curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);			
			
			curl_setopt($ch, CURLOPT_COOKIEFILE, "");
			
			//set multiple cookies
			$cList="";
			foreach ($cookie as $c)
			{
				$cList.=" ".$c.";";
			}
			curl_setopt($ch,CURLOPT_COOKIE, rtrim($cList,";"));
			
			curl_setopt($ch, CURLOPT_CONNECTTIMEOUT ,0); 
			curl_setopt($ch, CURLOPT_TIMEOUT, 0);		

			$res= curl_exec($ch);		



			$errno          = @curl_errno($ch);
			$error          = @curl_error($ch);

			if( $errno != CURLE_OK) {
				die($errno." - ".$error." - ".$url);
			}
			$result=$res;
			curl_close($ch);
		}
		catch(Exception $e) {
			die( 'Exception: '.  $e->getMessage());
		}
		

	}


?>