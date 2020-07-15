<?php
    $datos = file_get_contents("https://www.unisabana.edu.co/fileadmin/Archivos_de_usuario/Documentos/Documentos_Biblioteca/Caratulas/caratulas.json");
    $libros = json_decode($datos, true);
    foreach ($libros as $l1) {
        print_r($l1);
    }
?>