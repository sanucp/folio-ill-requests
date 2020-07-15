<?php
$fecha= new DateTime('NOW', new DateTimeZone('UTC'));
$fecha->setTimezone(new DateTimeZone('UTC'));
$ticURL = "_ob=TicketedURL&_origin=C000264090&_originUser=" . $_POST["idUsuario"] . "&_target=&_ts=" . $fecha->format('YmdHis') . "&_version=1";
$cadenaMD5 = md5($ticURL . "DMIdciYjog.T7sV9Uyxi6ITfL6ka1s6T");
$ticURL .= "&md5=" . $cadenaMD5; 
header('Location: ' . 'https://www.ClinicalKey.es/ticurl/?' . $ticURL); 
?>

