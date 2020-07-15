<?php
    $datos = file_get_contents("libros.json");
    $libros = json_decode($datos, true);
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



                    if ((($(".bloque-imagenes").children().size() - 4) * 73) < Math.abs(margenTop[0])) {

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
            height: 109px;
            overflow: hidden;
            width: 600px;
        }

        .bloque-imagenes {
            padding: 0;
            width: 2500px;
        }

        .bloque-imagenes li {
            list-style: none;
            margin: 5px;
            padding: 0;
            display: inline;
        }

        .bloque-imagenes li img {
            height: 109px;
            width: 100px;
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
                foreach ($l1 as $l2){
                echo "<li>";
                echo "<a href='https://search.ebscohost.com/login.aspx?direct=true&AuthType=ip,uid,cookie&custid=ss1248750&groupid=main&profid=eds" . "&bquery=" .  $l2["ISBN"] . "&lang=es&type=0&searchMode=And&site=eds-live&scope=site' target='_blank'>" . "<img src='covers/" . $l2["ISBN"] . ".jpg' /></a>" ;
                echo "</li>";
            }
            }
            ?>
        </ul>
    </div>
</body>
</html>