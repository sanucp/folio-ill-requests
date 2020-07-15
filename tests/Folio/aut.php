<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Content-Type');

$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);
$nombre = $_POST['usuario'];

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "http://localhost:9130/bl-users/by-username/".$nombre,
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "GET",
  CURLOPT_HTTPHEADER => array(
    "X-Okapi-Tenant: diku",
    "x-okapi-token: eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzYW51Y3AiLCJ1c2VyX2lkIjoiNTU3ZmE1ZDAtNTQzNS00NzA1LWI4ZTUtYzg3YWIyMTVhMDU5IiwiaWF0IjoxNTgxOTYyMzYwLCJ0ZW5hbnQiOiJkaWt1In0.bYn24MKfdYCyawXa-NckY5dYZ0lS9OteQfKAmO0aT2E"
  ),
));

$response = curl_exec($curl);

curl_close($curl);
//echo $response;
//$json_string = json_encode($response);
$data = fopen ("usr.json","w");
fwrite($data,$response);

?>