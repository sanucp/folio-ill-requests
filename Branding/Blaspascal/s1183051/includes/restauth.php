<?php

session_start();
$_SESSION["valid"] = "N";
$_SESSION['returnData'] = "";
$_SESSION['uid'] = "";
$_SESSION['custid'] = "";

$debug = "";

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

	class MyEncryption
	{

		public $pubkey = '-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA7LgTfrm1dRMEGBIonOhR
ZmymNWNk7f1wszVBF7AvWVgacLmUG+cu59VqK7dUSbA5o1XmMVtI2/LpHnfyNuv3
4/tuVCPhqdipgqkQYKb9896TlTEUWyj+EnBT7JEYc21qcx+MAASh/feG8tsAHbpT
ThtksCnCCPG5jjBN7H8IENoWEupyS/CIOoqaxRaIllBkFIbw1L3Z048bobVgAlF2
EuFoV6J0Q9ltuEt+QKkoRxxZ5I29l/dlneK+vkTw1KUBIJcrOQGUgfSYrNVoJ+9z
mi4tZUiywG0DSlseN6N4Q3kgIYfCntFeHTKtIOVFAGsGmqH8xi5D1T2QA67hOdlX
LdQGMcw4oVZRyHl2xqc9HQWRE0A2lXM8dYuvaIjXwBQTIEqnXsZKNRG73P1JS2fY
j5pgB9bKeg4wRJGx7aXSUmGnxbLOyielB2P3bQVNtk+Wif0/kqjOR6qcoiaCXJ8s
RDWewnCA7snYARjH93ObDncKtCPLuA1iPFa9LfekfBNcadrDXEDid94unXQfXB1H
WanXoiJZhs7gRxxD2QvLqOmqOBcgTnSdaXSHIewriFliNJCiz+MANoV6DQBl9wr8
tz8alSp5vO9Z2jRet9iyutjnN8ygVcreEGG0kEQ7vzNWWjFzWpzHJH4XQr7FcCko
8HX+yZtaF1evRMOq9O8/P/UCAwEAAQ==
-----END PUBLIC KEY-----';

		public $privkey = '-----BEGIN PRIVATE KEY-----
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
ToeKRjQxIUDK2kYBdYnKmkW2bq7BTFs=
-----END PRIVATE KEY-----';

		public function encrypt($data)
		{
			if (openssl_public_encrypt($data, $encrypted, $this->pubkey))
				$data = base64_encode($encrypted);
			else
				throw new Exception('Unable to encrypt data. Perhaps it is bigger than the key size?');

			return $data;
		}

		public function decrypt($data)
		{
			if (openssl_private_decrypt(base64_decode($data), $decrypted, $this->privkey))
				$data = $decrypted;
			else
				$data = '';

			return $data;
		}
	}

	class UAIRest{
		public function authenticate($url, $username, $pwd) {
				try
				{
					
					$ch = curl_init($url); 	               // Open the Curl session
					$m=array(
						"usuario" => $username,
						"clave" => $pwd
					);
					$data_string=http_build_query($m);

					curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");                                                                     
					curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);                                                                  
					curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);                                                                      
					$html = curl_exec($ch); 	                       // Make the call
					$httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
					switch ($httpcode) {
						case 200:
							$jsonObj=json_decode($html);
							return $jsonObj;
							break;
						case 400:
							$jsonObj=json_decode($html);
							return (string)$jsonObj->errMsg;
							break;
					}
					
				}
				catch (Exception $e)
				{
					return false;
				}
		}
	}

	$post = file_get_contents('php://input');

	//echo "POST: ".$post."<br/><br/>";
	$json_data = json_decode($post);

	$config = json_decode(file_get_contents('../conf/'.$json_data->custid.'.json'));


	$codex= new MyEncryption();
	// call authentication to webservice
	
	$myRest = new UAIRest();
	$msg_result=$myRest->authenticate($config->url, $codex->decrypt($json_data->un),$codex->decrypt($json_data->pw));

	
	//$debug .= "<br/><strong>".(is_object ($msg_result)?print_r($msg_result):$msg_result)."</strong><br/>";

	$connectorResponse = [];

	if (is_object ($msg_result)) {
		if (isset($json_data->rd)) {
			$returnData = $json_data->rd;
			$_SESSION['returnData'] = $returnData;
		} else {
			$_SESSION['returnData'] = "";
		}
		$_SESSION["valid"] = "Y";
		$_SESSION["uid"] = $codex->decrypt($json_data->un);
		$_SESSION["custid"] = $json_data->custid;
		//$_SESSION["restdata"] = $msg_result;
		$connectorResponse["valid"] = "Y";
		$connectorResponse["returnData"] = $_SESSION['returnData'];
		$_SESSION["restdata"] = $msg_result;
		
		echo json_encode($connectorResponse);
	} 
	else 
	{
		$connectorResponse["valid"] = "N";
		if (isset($msg_result)) 
		{
			$connectorResponse["message"] = $msg_result;
		} 
		else 
		{
			$connectorResponse["message"] = "";
		}
		echo json_encode($connectorResponse);
	}
	
	$debug .= "<br /><strong>Debug: </strong>".var_export($_SESSION,TRUE)."<br/>";
	
	if ($json_data->verbose == "Y") {
		echo $debug;
	}
?>
