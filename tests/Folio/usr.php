<?php
$datos_usuario = file_get_contents("usuario.json");
$json_usr = json_decode($datos_usuario, true);

echo $json_usr;
/*foreach ($json_usr as $usuario) {
    
    echo $usuario."<br>";
}*/
?>