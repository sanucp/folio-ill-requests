<?php
    $datos = file_get_contents("https://www.unisabana.edu.co/fileadmin/Archivos_de_usuario/Documentos/Documentos_Biblioteca/Caratulas/caratulas.json");
    $libros = json_decode($datos, true);
    print_r($libros);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.11.3/themes/smoothness/jquery-ui.css">
	<script src="https://code.jquery.com/jquery-1.10.2.js"></script>
	<script src="https://code.jquery.com/ui/1.11.3/jquery-ui.js"></script>
    <script>
        $(document).ready(

            function () {

                var numeroImagenes;

                var contenidoInicial = $(".bloque-imagenes").html();

                var margenTop;
                var ancho;
                var anchoOriginal = $(".bloque-imagenes").css("width");
                anchoOriginal = anchoOriginal.split("p");

                function carrusel() {

                    margenTop = $(".bloque-imagenes").css("margin-left");

                    margenTop = margenTop.split("p");
                    margenTop[0] = margenTop[0] - 1;

                    ancho = $(".bloque-imagenes").css("width");;
                    ancho = ancho.split("p");



                    if ((($(".bloque-imagenes").children().size() - 40) * 400) < Math.abs(margenTop[0])) {

                        $(".bloque-imagenes").append(contenidoInicial);
                        $(".bloque-imagenes").css("width", (parseInt(ancho[0]) + parseInt(anchoOriginal)) + "px");

                    };

                    $(".bloque-imagenes").css("margin-left", margenTop[0] + "px");

                }


                var parar = setInterval(function mover() {
                    carrusel();
                }, 30);


                $(".bloque-imagenes").mouseover(function () {
                    clearInterval(parar);

                });

                $(".bloque-imagenes").mouseout(function () {
                    parar = setInterval(function mover() {
                        carrusel();
                    }, 30);
                });

            });
    </script>
    <style>
        body{
            height: 100%;
        }
        .carrusel {
            margin: auto;
            height: 400px;
            overflow: hidden;
            width: 800px;
        }

        .bloque-imagenes {
            padding: 0;
            width: 40800px;
        }

        .bloque-imagenes li {
            list-style: none;
            margin: 5px;
            padding: 0;
            display: inline;
        }

        .bloque-imagenes li img {
            height: 400px;
            width: 400px;
            border: 0;
        }

        .bloque-imagenes a:hover img {
            border: 1px #fff solid;
        }
    </style>
</head>
<body>
    <div class="carrusel">
        <ul class="bloque-imagenes">
            <?php foreach ($libros as $l1){    
                echo "<li>";
                echo "<a href='https://search.ebscohost.com/login.aspx?direct=true&AuthType=ip,guest&custid=s9495846&groupid=main&profid=eds" . "&bquery=AN+sab." . $l1["Doc No"] . "&lang=es&type=0&searchMode=And&site=eds-live&scope=site' target='_blank'>" . "<img src='https://www.unisabana.edu.co/fileadmin/Archivos_de_usuario/Documentos/Documentos_Biblioteca/Caratulas/" . $l1["ISBN"] . ".jpg' /></a>" ;
                echo "</li>";
            }
            ?>
        </ul>
    </div>
</body>
</html>