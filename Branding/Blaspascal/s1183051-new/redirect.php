<?php
session_start();
if (!(isset($_SESSION['valid']) && ($_SESSION['valid'] == "Y"))) {
    die("Something went wrong.");
}

$config = json_decode(file_get_contents('conf/'.$_SESSION['custid'].'.json'));
$oa_connectionid = $config->oaconnectionid;
$oa_endpoint = $config->oaendpoint;
$oa_apikey = $config->oaapikey;
$user_uid = $_SESSION['uid'];
$user_returnData = $_SESSION['returnData'];

if (strlen($user_returnData) > 0) {
    $request_json = [];
    $request_json["connectionID"] = $oa_connectionid;
    $request_json["uniqueUserIdentifier"] = $user_uid;
    if (strlen($user_uid) > 0) {
        $request_json["displayName"] = $_SESSION["restdata"]->nombre." ".$_SESSION["restdata"]->apellido;
    } else {
        $request_json["displayName"] = "Anonymous";        
    }

	$request_json["attributes"] = array(
		"userid" => $user_uid,
		"name" => $_SESSION["restdata"]->nombre,
		"surname" => $_SESSION["restdata"]->apellido,
		"email" => $_SESSION["restdata"]->e_mail,
		"nro_persona" => $_SESSION["restdata"]->nro_persona,
	);	
	
    $request_json["returnData"] = $user_returnData;
    $data_string = json_encode($request_json);

    $url = $oa_endpoint;

    $session = curl_init($url); 	               // Open the Curl session

    curl_setopt($session, CURLOPT_CUSTOMREQUEST, "POST");                                                                     
    curl_setopt($session, CURLOPT_POSTFIELDS, $data_string);                                                                  
    curl_setopt($session, CURLOPT_RETURNTRANSFER, true);                                                                      
    curl_setopt($session, CURLOPT_HTTPHEADER, array(
        'Authorization: OAApiKey '.$oa_apikey,
        'Content-type: application/vnd.eduserv.iam.auth.localAccountSessionRequest+json'
    ));
    
    $headers = array(
        'Authorization: OAApiKey '.$oa_apikey,
        'Content-type: application/vnd.eduserv.iam.auth.localAccountSessionRequest+json'
    );

    $html = curl_exec($session); 	                       // Make the call
    //header("Content-Type: text/xml"); 	               // Set the content type appropriately
    curl_close($session); // And close the session

    $redirect_url = json_decode($html);


    if (isset($_GET['verbose'])) {
        echo "Request URL: ".$url."<br/><br />";
        echo "Request Headers: ".var_export($headers,TRUE)."<br/><br/>";
        echo "Request JSON: <textarea>".$data_string."</textarea><hr />";
        echo "Redirect URL: <textarea>".$redirect_url->sessionInitiatorUrl."</textarea><br />";
        echo "OA Response: <textarea>".var_export($redirect_url,TRUE)."</textarea>";
    } else {
        if (isset($redirect_url->sessionInitiatorUrl) && (strlen($redirect_url->sessionInitiatorUrl) > 0)) {
            header("Location: ".$redirect_url->sessionInitiatorUrl);
        } else {
            die("Something went wrong.  No Redirect URL provided by OpenAthens.");
        }
    }
} else {
    die("Something went wrong.  No ReturnData.");
}
?>