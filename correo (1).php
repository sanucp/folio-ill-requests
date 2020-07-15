<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Enviar Formato</title>
</head>

<body>




<?php
include "../include/comun.php";
  
if(isset($_POST['enviar'])) {

// Debes editar las próximas dos líneas de código de acuerdo con tus preferencias
$email_to = "lfnavarro@gmail.com";
$email_subject = "Formulario de contacto - El Sello del Chef";
$tipo = "";
// Aquí se deberían validar los datos ingresados por el usuario

$tipo=$_POST['tipo'];
$nombre = $_POST['nombre'];
$email = $_POST['email'];
$comentarios = $_POST['comentarios'];

$email_message = "Formulario El Sello del Chef - Soporte Técnico:\n\n";
$email_message .= "Nombre: " . $_POST['nombre'] . "\n";
$email_message .= "Compañia: " . $_POST['compania'] . "\n";
$email_message .= "E-mail: " . $_POST['email'] . "\n";
$email_message .= "Tipo: " . $tipo . "\n";
$email_message .= "Fecha: " . $fecha . "\n";
$email_message .= "Comentarios: " . $_POST['comentarios'] . "\n\n";

$email_from = $_POST['email'];
// Ahora se envía el e-mail usando la función mail() de PHP
$headers = 'From: '.$email_from."\r\n".
'Reply-To: '.$email_from."\r\n" .
'X-Mailer: PHP/' . phpversion();
mail($email_to, $email_subject, $email_message, $headers);
//print_r($_POST);
//echo "<br>".$email_message;
echo "¡El formato se ha enviado con éxito!";
$sql = "insert into soporte (tienda, fecha, usuario, nombre, tipo, comentario, email, estado) values ('$tienda', '$fecha', '$usuario_numero', '$nombre', '$tipo', '$comentarios', '$email', 'Activo')";
$res = $conexion->query($sql);

}
?>
<br /><input type='button' name='close' value='Cerrar ventana' onclick='window.close()'>
</body>
</html>