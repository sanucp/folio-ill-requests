<?php
/************************************************
  EBSCO
  Rui Francisco (rfrancisco@ebscohost.com)
  Description : RTAC for Koha
  
  Date        : 2015-02-03
  
 ***********************************************/
 
	
 	
	function breakRecords($resHtml)
	{
		try
		{
		
			//search for the highest number of results
			$pi=stripos($resHtml,' id="holdings">')+15;
			$pf=stripos($resHtml,'id="descriptions"',$pi);
			$tmphtml=substr($resHtml,$pi,$pf-$pi);

			//check if no records
			if (stripos($tmphtml,'id="noitems"')!=false) {
				return array();
			}
		
			//return array of html blocks
			$m=explode('<tr',$tmphtml);		
			return($m);
		}
		catch (Exception $e)
		{
			return false;
		}
	}
	
	function getRecord($html,$url="")
	{
		$lista=array();
		try
		{

			if (!stripos($html,'href='))
				return null;
	
			$r=new rtacresult();

			// clean the \t and the \n
			$html=str_replace(Array("\t","\r\n","\n"),"",$html);
			
			//location
			$pi=stripos($html,'class="location">')+17;
			$pf=stripos($html,'</td>',$pi);
			$v=substr($html,$pi,$pf-$pi);
			$r->location=trim(html_entity_decode(strip_tags($v)));	
			
			//callNumber
			$pi=stripos($html,'class="call_no">')+16;
			$pf=stripos($html,'</td>',$pi);
			$v=substr($html,$pi,$pf-$pi);
			$v=str_replace("(Browse shelf)","",strip_tags($v));
			$r->callNumber=trim(html_entity_decode(strip_tags($v)));	


			//itemType
			$pi=stripos($html,'class="itype">')+14;
			$pf=stripos($html,'</td>',$pi);
			$v=substr($html,$pi,$pf-$pi);
			$r->itemType=trim(html_entity_decode(strip_tags($v)));	
			
			//volInfo
			if (stripos($html,'class="vol_info">')!=false) {
				$pi=stripos($html,'class="vol_info">')+17;
				$pf=stripos($html,'</td>',$pi);
				$v=substr($html,$pi,$pf-$pi);
				$r->volInfo=trim(html_entity_decode(strip_tags($v)));	
			}
			
			//status
			$pi=stripos($html,'class="status">')+15;
			$pf=stripos($html,'</td>',$pi);
			$v=substr($html,$pi,$pf-$pi);
			$r->status=trim(html_entity_decode(strip_tags($v)));	
			
			//due date
			$pi=stripos($html,'class="date_due">')+17;
			$pf=stripos($html,'</td>',$pi);
			$v=substr($html,$pi,$pf-$pi);
			$r->duedate=trim(html_entity_decode(strip_tags($v)));	

			
			array_push($lista,$r);
			return $lista;
		}
		catch (Exception $i)
		{
			return false;
		}
	}
	
	function getStatus($baseURL, $id)
	{
		$listResults= Array();
		
		$html="";
		
		try
		{
			$cookie=Array();
			$header="";

			
			$url=$baseURL."/cgi-bin/koha/opac-detail.pl?biblionumber=".$id;
			getWeb($url, $header, $html,$cookie );
			
			$registos=breakRecords($html);

			foreach ($registos as $r)
			{
				$v1= getRecord($r,$baseURL);
				if ($v1!=null){
					foreach($v1 as $r)
						if (!in_array($r,$listResults))
							array_push($listResults,$r);
				}
			}
		}
		catch (Exception $i)
		{
			return $listResults;
		}
		return $listResults;
	}

?>