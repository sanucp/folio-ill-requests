<?php

	 class OAUser 
	 {
		 public $codUsuario="";
		 public $nombre="";
		 public $apellido="";
		 public $correo="";
		 public $carrera="";
		 public $genero="";
	 }

	function userExists ($useremail, $url, $apikey) {
		try
		{
			$checkUserUrl=$url."/account/query?email=".$useremail;
			$curl = curl_init($checkUserUrl);
			curl_setopt($curl, CURLOPT_HEADER, false);
			curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($curl, CURLOPT_HTTPHEADER,array(
//				"Content-type: application/vnd.eduserv.iam.auth.localAccountSessionRequest+json",
				"Authorization: OAApiKey ".$apikey,
				)
			);		
			curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);		
			$json_response = curl_exec($curl);
			$info=curl_getinfo($curl, CURLINFO_HTTP_CODE);
			if ($info==200)
			{
				return true;
			}
			return false;
		
		}
		catch(Exception $e)
		{
			return false;
		}
		
	}

	function createUser( $userPrefix, $url, $apikey,$userObj) {
		
		try
		{
		
			$createUserObj = array(
			   "status" => "pending",
			   "expiry"=> date("Y")."-12-31T23:29:00Z",
			   "username" => $userPrefix.$userObj->codUsuario,
//			   "displayName" => $userObj->nombre." ".$userObj->apellido,
			   "attributes" => Array( 
//					"userid" => $userObj->codUsuario,
					"forenames" => $userObj->nombre,
					"surname" => $userObj->apellido,
					"emailAddress" => $userObj->correo,
					"carrera" => $userObj->carrera,
					"genero" => $userObj->genero
			   )
			);		

		 
			$json=json_encode($createUserObj );
		
			$checkUserUrl=$url."/accounts/create/personal?sendEmail=false&defaultPermissions=true";
			$curl = curl_init($checkUserUrl);
			
			curl_setopt($curl, CURLOPT_HEADER, false);
			curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($curl, CURLOPT_HTTPHEADER,array(
				"Content-type: application/vnd.eduserv.iam.admin.accountRequest-v1+json; charset=UTF-8",
				"Authorization: OAApiKey ".$apikey,
				)
			);		
			curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);		
			curl_setopt($curl, CURLOPT_POST, true);
			curl_setopt($curl, CURLOPT_POSTFIELDS, $json);

			$json_response = curl_exec($curl);
			$info=curl_getinfo($curl, CURLINFO_HTTP_CODE);

			if (($info==200) || ($info==201))
			{
				return true;
			}
			return false;
		
		}
		catch(Exception $e)
		{
			return false;
		}

	}



?> 