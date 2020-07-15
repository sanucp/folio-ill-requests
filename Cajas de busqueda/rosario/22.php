<?php
set_time_limit(240);
echo "<br>Procesando... Por favor espere un momento!<br>";
$authentication_end_point = 'https://eds-api.ebscohost.com/Authservice/rest';
$end_point = 'https://eds-api.ebscohost.com/edsapi/rest';
$userID = "rosario";
$password = "bogota";
$interfaceID = "";
$profile = "cbuilder";
$orgID = "s4300083";
$guest ="n";

function get_auth($url, $params, $headers) {
	$log = fopen('curl.log', 'w');
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 30);
        curl_setopt($ch, CURLOPT_VERBOSE, true);
        curl_setopt($ch, CURLOPT_STDERR, $log);  // for debugging cURL
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // Temporary
        curl_setopt($ch, CURLOPT_ENCODING, 'gzip,deflate'); // ensure compressed traffic is used
		curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $params);
		curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
		$response = curl_exec($ch);
		$response1 = new SimpleXMLElement($response);
        $token = (string) $response1->AuthToken;
        $timeout = (integer) $response1->AuthTimeout;
        $result = array(
            'authenticationToken'   => $token,
            'authenticationTimeout' => $timeout,
            'authenticationTimeStamp'=> time()
        );
		curl_close($ch);
        return $result;
     }
function get_session($url, $params, $headers) {
	$log = fopen('curl.log', 'w');
	$query = http_build_query($params);
                // replace query params like facet[0]=value with facet=value
                $query = preg_replace('/%5B(?:[0-9]|[1-9][0-9]+)%5D=/', '=', $query);
                $url .= '?' . $query;
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 30);
        curl_setopt($ch, CURLOPT_VERBOSE, true);
        curl_setopt($ch, CURLOPT_STDERR, $log);  // for debugging cURL
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // Temporary
        curl_setopt($ch, CURLOPT_ENCODING, 'gzip,deflate'); // ensure compressed traffic is used
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
		$response = curl_exec($ch);
		$response1 = new SimpleXMLElement($response);
		$sesion = (string) $response1->SessionToken;
		$result = $sesion;	
		curl_close($ch);
        return $result;
     } 
function get_data($url,$auth,$session) {
	$log = fopen('curl.log', 'w');
	$timeout = 5;
  $ch = curl_init();
  //curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 30);
        curl_setopt($ch, CURLOPT_VERBOSE, true);
        curl_setopt($ch, CURLOPT_STDERR, $log);  // for debugging cURL
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // Temporary
        curl_setopt($ch, CURLOPT_ENCODING, 'gzip,deflate'); // ensure compressed traffic is used
		curl_setopt($ch, CURLOPT_URL, $url);
  curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'x-authenticationToken: '.$auth,
    'x-sessionToken: '.$session,
    'Content-Type: application/xml'
    ));
  curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
  $data = curl_exec($ch);
  curl_close($ch);
  return $data;
}

// Inicio

	
  $nombre = $_FILES['archivo']['name'];
  $nombre_tmp = $_FILES['archivo']['tmp_name'];
  $tipo = $_FILES['archivo']['type'];
  $tamano = $_FILES['archivo']['size'];
  $ext_permitidas = array('csv');
  $partes_nombre = explode('.', $nombre);
  $extension = end( $partes_nombre );
  $ext_correcta = in_array($extension, $ext_permitidas);
  //$tipo_correcto = preg_match('/^csv\/(csv)$/', $tipo);
  $limite = 500 * 1024;
 
  if( $ext_correcta  && $tamano <= $limite ){
    if( $_FILES['archivo']['error'] > 0 ){
      echo 'Error: ' . $_FILES['archivo']['error'] . '<br/>';
    }else{
      echo 'Nombre: ' . $nombre . '<br/>';
      echo 'Tipo: ' . $tipo . '<br/>';
      echo 'Tama�o: ' . ($tamano / 1024) . ' Kb<br/><br/>';
     // echo 'Guardado en: ' . $nombre_tmp;
      $nombre_int = $nombre;
        move_uploaded_file($nombre_tmp,
           'subidas/'.$nombre_int);
// Inicio		
	$registros = array();
	if (($fichero = fopen('subidas/'.$nombre_int, "r")) !== FALSE) {
		$nombres_campos = fgetcsv($fichero, 0, ",", "\"", "\"");
        $num_campos = count($nombres_campos);
		while (($datos = fgetcsv($fichero, 0, ",", "\"", "\"")) !== FALSE) {
        // Crea un array asociativo con los nombres y valores de los campos
           for ($icampo = 0; $icampo < $num_campos; $icampo++) {
			   $registro[$nombres_campos[$icampo]] = $datos[$icampo];
		   }
		   $registros[] = $registro;
		}
	  fclose($fichero);
	  $reg_tot = count($registros);
	  echo "Leidos " . $reg_tot . " registros<br>";
	  //Autorizar e iniciar sesi�n
$params =<<<BODY
<UIDAuthRequestMessage xmlns="http://www.ebscohost.com/services/public/AuthService/Response/2012/06/01">
    <UserId>$userID</UserId>
    <Password>$password</Password>
    <InterfaceId>$interfaceID</InterfaceId>
</UIDAuthRequestMessage>
BODY;
//echo strlen($params)."<br>";
//echo $params."<br>";
$url = $authentication_end_point.'/UIDAuth';
$headers = array(
            'Content-Type: application/xml',
            'Conent-Length: ' . strlen($params)
        );	 
$matriz1 = get_auth($url, $params, $headers);
$token = $matriz1["authenticationToken"];
echo $token;
echo "<br>";
echo $matriz1["authenticationTimeout"];
echo "<br>";
$url = $end_point . '/CreateSession';
        $params = array(
            'profile' => $profile,
            'org'     => $orgID,
            'guest'   => $guest
        );
        $headers = array(
            'x-authenticationToken: ' .$token
        );
$sesion = get_session($url, $params, $headers);
echo $sesion."<br>";
	 // print_r($registros);
	 $titulos = "";
	 $arch_salida = fopen("arreglado/".$nombre_int,"w");
	 for($j = 0; $j < $num_campos; $j++) {
		 $titulos = $titulos.$nombres_campos[$j];
		 if($j < $num_campos-2) $titulos = $titulos.",";
	 }
	 $titulos = $titulos.",pubtype";
	 fwrite($arch_salida, $titulos."\n");
	 $campo1 = "readings_title";
	 $campo2 ="readings_an";
	 $campo3 ="readings_notes";
	  for ($i = 0; $i < $reg_tot; $i++) {
		  
		  if (($registros[$i][$campo2] == "") OR ($registros[$i][$campo2] == "none")) {
			  $tipo = "";
		  } else {
			$url="http://eds-api.ebscohost.com/edsapi/rest/Search?query-1=AND,AN:".$registros[$i][$campo2];
            $pubtipo = get_data($url, $token, $sesion);
            $respuesta = new SimpleXMLElement($pubtipo); 
			$hits = $respuesta->SearchResult->Statistics->TotalHits;
            if($hits>0) { 
		    $tipo = $respuesta->SearchResult->Data->Records->Record->Header->PubType;
			} else {
				$tipo = "";
			}
		  }
		  $reg = "";
		  for($j = 0; $j < $num_campos; $j++) { 
			  if (gettype($registros[$i][$nombres_campos[$j]])=='string') $registros[$i][$nombres_campos[$j]] = '"'.$registros[$i][$nombres_campos[$j]].'"';
			 
			  $reg = $reg . $registros[$i][$nombres_campos[$j]];
			  if($j < $num_campos-2) $reg = $reg.",";
		  }
		  $reg = $reg.",".$tipo;
		  fwrite($arch_salida, $reg."\n");  
		  //echo $registros[$i][$campo1]." ".$registros[$i][$campo2]." ".$tipo." ".$registros[$i][$campo3]." ".gettype($registros[$i][$campo3])."<br>"; 
	    }
        fclose($arch_salida);
		echo "<a href='http://gss.ebscohost.com/anavarro/urosario/arreglado/$nombre_int'>Recuperar archivo $nombre_int arreglado!</a>";	
	  }
	}
	
  }

?>
