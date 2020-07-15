<?php
/************************************************
  EBSCO
  Andres Navarro (anavarro@ebscohost.com)
  Description : RTAC for SISRI Andes
  
  Date        : 2019-10-23
  
 ***********************************************/
 
	
 	
	function breakRecords($resHtml)
	{
		//print_r($resHtml);
		try
		{
		
			//search for the highest number of results
			$pi=stripos($resHtml,'name="holdings">')+15;
			$pf=stripos($resHtml,'/table>',$pi);
			$tmphtml=substr($resHtml,$pi,$pf-$pi);
			//check if no records
		
			//return array of html blocks
			$m=explode('<tr',$tmphtml);	
			//var_dump($m);
			//die();		
			return($m);
		}
		catch (Exception $e)
		{
			return false;
		}
	}
	
	
	function getRecord($html,$url="")
	{
		global $cl;
		$lista=array();
		try
		{

			if (!stripos($html,'class="holdingslist"'))
				return null;
	
			$r=new rtacresult();

			// clean the \t and the \n
			$html=str_replace(Array("\t","\r\n","\n"),"",$html);
			//print_r($html);
			

			$m = explode('<td class=',$html);
			//var_dump($m);
			//die();
			//print_r($m);
			
			//location
			$pi=stripos($m[4],'ign="left">')+11;
			$pf=stripos($m[4],'</td>',$pi);
			$v=substr($m[4],$pi,$pf-$pi);
			if(substr($v,0,6) == "Vence:"){
				$r->duedate=trim(html_entity_decode(strip_tags(substr($v,8,18))));
			}
			else{
				$r->location=trim(html_entity_decode(strip_tags($v)));
			}
				
			
			//callNumber
			$pi=stripos($m[1],'ign="left">')+11;
			$pf=stripos($m[1],'</td>',$pi);
			$v=substr($m[1],$pi,$pf-$pi);
			if($v == "&nbsp;"){
				$v = $cl;
			}
			else {
				$cl = $v;
			}
			//$v=str_replace("(Browse shelf)","",strip_tags($v));
			$r->callNumber=trim(html_entity_decode(strip_tags($v)));	

			//itemType
			$pi=stripos($m[3],'ign="left">')+14;
			$pf=stripos($m[3],'</td>',$pi);
			$v=substr($m[3],$pi,$pf-$pi);
			$r->itemType=trim(html_entity_decode(strip_tags($v)));	
			
			//volInfo
			$pi=stripos($m[2],'NORTL>')+6;
			$pf=stripos($m[2],'</td>',$pi);
			$v=substr($m[2],$pi,$pf-$pi);
			$r->volInfo=trim(html_entity_decode(strip_tags($v)));
			
			//status
			$pi=stripos($m[4],'ign="left">')+11;
			$pf=stripos($m[4],'</td>',$pi);
			$v=substr($m[4],$pi,$pf-$pi);
			if(substr($v,0,6) == "Vence:"){
				$r->status="On Loan";
			}
			else{
				$r->status="Avile";
			}	
			
			//due date
			//$pi=stripos($html,'class="date_due">')+17;
			//$pf=stripos($html,'</td>',$pi);
			//$v=substr($html,$pi,$pf-$pi);
			//$r->duedate=trim(html_entity_decode(strip_tags($v)));	

			
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

			
			$url=$baseURL."/uhtbin/cgisirsi/x/0/0/5?searchdata1=".$id."{ckey}";
			getWeb($url, $header, $html,$cookie );
			//print_r($html);
			
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