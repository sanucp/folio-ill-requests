<?php
    $datos = file_get_contents("./libros.json");
    $libros = json_decode($datos, true);
    foreach ($libros as $l1) {
        print_r($l1);
    }
?>