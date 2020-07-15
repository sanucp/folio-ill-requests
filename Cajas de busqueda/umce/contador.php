<?php
header("Access-Control-Allow-Origin: *");
header('Content-type: application/json');
function contador()
{
 // fichero donde se guardaran las visitas
 $fichero = "visitas.txt";

 $fptr = fopen($fichero,"r");

 // sumamos una visita
 $num = fread($fptr,filesize($fichero));
 $num++;

 $fptr = fopen($fichero,"w+");
 fwrite($fptr,$num);
 
 return $num;
 
}

echo contador();
?>