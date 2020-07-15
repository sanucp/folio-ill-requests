<?php
/************************************************
  EBSCO
  Rui Francisco (rfrancisco@ebscohost.com)
  Description : RTAC for BGU
  
  Date        : 2017-02-07
  
 ***********************************************/
 
	function getReadItem($baseURL,$barcode) {
		$html="";
		
		try
		{
			$cookie=array();
			$header="";
			
			$url=$baseURL."/X?op=read-item&library=cna50&item_barcode=".$barcode;
			getWeb($url, $header, $html,$cookie, false );	
			// echo $url."\r\n";
			// die();
			// always returns something, there is no results found message
			$xml=simplexml_load_string($html);
			return $xml;

		}
		catch (Exception $i)
		{
			return false;
		}		
		
	}
	
 	function getHoldingsData($resXML,$baseURL="")
	{
		try
		{
			$xml=simplexml_load_string($resXML);
			
			$c=0;
			$m1=array();
			if ($xml) {
				
				foreach ($xml->{'item'} as $r)
				{
					$s=trim((string)$r->{'call-no-1'});
					$r->{'sub-library'}=(string)$r->{'sub-library'}." " .(string)$r->{'call-no-2'};
					$b=(string)$r->{'barcode'};
					if (mb_stripos($s,'$$h')!==false) {
						$r->{'call-no-1'}=str_ireplace('$$h','',(string)$r->{'call-no-1'})." " .(string)$r->{'description'};
					}				
					if (mb_stripos((string)$r->{'call-no-1'},'$$i')!==false) {
						$r->{'call-no-1'}=str_ireplace('$$i',' ',(string)$r->{'call-no-1'});
					}
					
					// format data
					
					if (isset($r->{'loan-due-date'})) {
						if (strlen($r->{'loan-due-date'})==8) {
							// convert data from yyyymmdd-> dd/mm/yyyy
							$v=$r->{'loan-due-date'};
							$v1=substr($v,-2)."/".substr($v,4,2)."/".substr($v,0,4);
							$r->{'loan-due-date'}=$v1;
						}
						
					}
					
					// optimize for journals /hemeroteca
					 if ((string)$r->{'enumeration-a'}!=='') 
					{
						//check if it's a journal
						//$r->{'z30-item-status-description'}='Seriada';
						$r->{'call-no-1'}=(string)$r->{'description'}."-".(string)$r->{'note'};

					}
					$v=getReadItem($baseURL,$r->{"barcode"});
					//var_dump($v);
					if ($v!=false) {
						// check if doesnt already exists and prepend not append
						$z30=str_replace('&nbsp;'," ",trim((string)$v->z30->{'z30-call-no'}));
						//echo " Call-no-1 ".trim((string)$r->{'call-no-1'})." - z30-call ".$z30;
						$p1=stripos(trim((string)$r->{'call-no-1'}) ,$z30) ;
						if ( $p1===false) {
							$r->{'call-no-1'}=$z30." ".(string)$r->{'call-no-1'};
						}
						
						if (stripos((string)$r->{'call-no-1'},"&nbsp;")!==false) {
							$r->{'call-no-1'}=str_replace("&nbsp;"," ",(string)$r->{'call-no-1'});
						}
						$r->{'z30-item-status-description'}=(string)$v->z30->{'z30-item-status'};
						$r->{'z30-item-process-status'}=(string)$v->z30->{'z30-item-process-status'};
					}
					 set_time_limit(300) ;
					$c++;
				}
			}
			else
			{
				//var_dump($resXML);
				//die();
			}
			
			// filter for unwanted status
			$statusToRemove = array (
				"Sin pr\u00e9stamo",
				"Sin Préstamo",
				"Descartado",
				"Perdido"
			);
			// filter for unwanted status code
			$statuscodeToRemove = array (
				 'OI',
				 'AD',
				 'CT',
				 'EC',
				 'BD',
				 'AL',
				 'MS',
				 'DS',
				 'NA',
				 'CL',
				 'OR',
				 'IL'
			);
			
			for ($i=count($xml->item) -1; $i >=0; $i-- ) {
				if (in_array((string)$xml->item[$i]->{'z30-item-process-status'},$statuscodeToRemove)) {
					unset($xml->item[$i]);
					continue;
				}
				if (in_array((string)$xml->item[$i]->{'z30-item-status-description'},$statusToRemove)) {
					unset($xml->item[$i]);
					continue;
				}
			}
			
			return($xml->asXml());
		}
		catch (Exception $e)
		{
			return false;
		}
	}

	
	function getStatus($baseURL, $id,$base)
	{
		$listResults= Array();
		
		$html="";
		
		try
		{
			$cookie=array();
			$header="";
			
			$url=$baseURL."/X?op=item-data&base=".$base."&doc_number=".$id;
			//die($url);
			getWeb($url, $header, $html,$cookie, false );	
			// always returns something, there is no results found message
			$listResults=getHoldingsData($html,$baseURL);

		}
		catch (Exception $i)
		{
			return $listResults;
		}
		return $listResults;
	}

?>