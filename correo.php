<?php
    $from = $_POST["correo"];
    $nombre = $_POST["nombre"];
    $apellido = $_POST["apellido"];
    $codusuario = $_POST["codusuario"];
    $carrera = $_POST["carrera"];
    $genero = $_POST["genero"];
    $to = "sanucp@gmail.com";
    $subject = "Alta usuario Open Athens";
    $email_message = "Usuario recien registrado: \n\n";
    $email_message = "Nombre: " . $_POST["nombre"] . "\n";
    $email_message = "Apellido: " . $_POST["apellido"] . "\n";
    $email_message = "Código: " . $_POST["codusuario"] . "\n";
    $email_message = "Genero: " . $_POST["genero"] . "\n";
    $email_message = "carrera: " . $_POST["carrera"] . "\n";
    $headers = 'From: '.$email_from."\r\n".
    'Reply-To: '.$email_from."\r\n" .
    'X-Mailer: PHP/' . phpversion();
    mail($to,$subject,$message,$headers);
    echo "email enviado"; 
?>