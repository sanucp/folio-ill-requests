<?php
    $usuario = $_POST["correo"];
    echo ($usuario) . "<br>";
    $caracter = "@";
    $uid = strpos($usuario,$caracter);
    echo $uid . "<br>";
    $uid1 = substr($usuario,0,$uid);
    echo $uid1;
?>