
<?php 
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Content-Type');
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);
$nombre = $_POST['nombre'];
$file = fopen("test.txt", "a+");
fwrite($file, $nombre);
fclose($file);
?>
