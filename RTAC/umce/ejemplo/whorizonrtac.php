<?php
/************************************************
  EBSCO
  Andres Navarro (anavarro@ebscohost.com)
  Description : RTAC for horaizon
  
  Date        : 2019-01-03
  
 ***********************************************/
 
	
 	
	function breakRecords($resHtml)
	{
		try
		{
		
			//search for the highest number of results
			$pi=stripos($resHtml,'CC"><table')+10;
			$pf=stripos($resHtml,'</table></t',$pi);
			$tmphtml=substr($resHtml,$pi,$pf-$pi);
			

			//check if no records
		
			//return array of html blocks
			$m=explode('<tr',$tmphtml);	
			//var_dump($m);	
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
			if (!stripos($html,'height="15"'))
				return null;
	
			$r=new rtacresult();

			// clean the \t and the \n
			$html=str_replace(Array("\t","\r\n","\n"),"",$html);
			
			$m=explode("<td ",$html);
			//var_dump($m);
			//die();

			//location
			$pi=stripos($m[1],'Item">')+6;
			$pf=stripos($m[1],'</a>',$pi);
			$v=substr($m[1],$pi,$pf-$pi);
			$r->location=trim(html_entity_decode(strip_tags($v)));	

			//callNumber
			$pi=stripos($m[3],'Item">')+6;
			$pf=stripos($m[3],'</a>',$pi);
			$v=substr($m[3],$pi,$pf-$pi);
			$r->callNumber=trim(html_entity_decode(strip_tags($v)));

			//status
			$pi=stripos($m[5],'Item">')+6;
			$pf=stripos($m[5],'</a>',$pi);
			$v=substr($m[5],$pi,$pf-$pi);
			$r->status=trim(html_entity_decode(strip_tags($v)));


			//volInfo
			$pi=stripos($m[4],'Item">')+6;
			$pf=stripos($m[4],'</a>',$pi);
			$v=substr($m[4],$pi,$pf-$pi);
			$r->volInfo=trim(html_entity_decode(strip_tags($v)));

			//duedate
			if (stripos($m[6],'Item">')!=false){
				$pi=stripos($m[6],'Item">')+6;
				$pf=stripos($m[6],'</a>',$pi);
				$v=substr($m[6],$pi,$pf-$pi);
				$r->duedate=trim(html_entity_decode(strip_tags($v)));
			}
		
			
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

			
			$url=$baseURL.$id;
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