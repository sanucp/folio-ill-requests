<?php
error_reporting(0);

set_time_limit(0);
$authentication_end_point = 'https://eds-api.ebscohost.com/authservice/rest';
$end_point = 'https://eds-api.ebscohost.com/edsapi/rest';
$userID = "we43Nv9{ITdoEZgx*cM!";
$password = "oZC^3pTIBW750SFM}6Z";
$interfaceID = "";
$profile = "cbuilder";
$orgID = "s4300083";
$guest = "n";

function get_auth($url, $params, $headers)
{
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
  $timeout = (int) $response1->AuthTimeout;
  $result = array(
    'authenticationToken'   => $token,
    'authenticationTimeout' => $timeout,
    'authenticationTimeStamp' => time()
  );
  curl_close($ch);
  return $result;
}
function get_session($url, $params, $headers)
{
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
function get_data($url, $auth, $session)
{
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
    'x-authenticationToken: ' . $auth,
    'x-sessionToken: ' . $session,
    'Content-Type: application/xml'
  ));
  curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
  $data = curl_exec($ch);
  curl_close($ch);
  return $data;
}

// Inicio

$nombre = $_FILES['studentdata']['name'];
$nombre_tmp = $_FILES['studentdata']['tmp_name'];
$tipo = $_FILES['studentdata']['type'];
$tamano = $_FILES['studentdata']['size'];
$ext_permitidas = array('csv');
$partes_nombre = explode('.', $nombre);
$extension = end($partes_nombre);
$ext_correcta = in_array($extension, $ext_permitidas);
$limite = 500 * 4096;

if ($ext_correcta  && $tamano <= $limite) {
  if ($_FILES['student']['error'] > 0) {
    echo 'Error: ' . $_FILES['student']['error'] . '<br/>';
  } else {
    $nombre_int = date("Y-m-d") . "-" . $nombre;
    move_uploaded_file(
      $nombre_tmp,
      'subidas/student/' . $nombre_int
    );
    // Inicio		
    $registros = array();
    if (($fichero = fopen('subidas/student/' . $nombre_int, "r")) !== FALSE) {
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
      $params = <<<BODY
<UIDAuthRequestMessage xmlns="http://www.ebscohost.com/services/public/AuthService/Response/2012/06/01">
    <UserId>$userID</UserId>
    <Password>$password</Password>
    <InterfaceId>$interfaceID</InterfaceId>
</UIDAuthRequestMessage>
BODY;
      $url = $authentication_end_point . '/uidauth';
      $headers = array(
        'Content-Type: application/xml',
        'Conent-Length: ' . strlen($params)
      );
      $matriz1 = get_auth($url, $params, $headers);
      $token = $matriz1["authenticationToken"];
      $url = $end_point . '/createsession';
      $params = array(
        'profile' => $profile,
        'org'     => $orgID,
        'guest'   => $guest
      );
      $headers = array(
        'x-authenticationToken: ' . $token
      );
      $sesion = get_session($url, $params, $headers);
      $titulos = "";
      $arch_salida = fopen("arreglado/student/" . $nombre_int, "w");
      for ($j = 0; $j < $num_campos; $j++) {
        $titulos = $titulos . $nombres_campos[$j];
        if ($j < $num_campos - 1) $titulos = $titulos . ";";
      }
      $titulos = $titulos . ";" . "pubtype" . ";" . "Materias" . ";" . "Autores" . ";" . "ISBX" . ";" . "Plink";
      fwrite($arch_salida, $titulos . "\n");
      $campo1 = "readings_title";
      $campo2 = "accession_number";
      for ($i = 0; $i < $reg_tot; $i++) {

        if (($registros[$i][$campo2] == "") or ($registros[$i][$campo2] == "none")) {
          $tipo = "";
        } else {
          $url = "http://eds-api.ebscohost.com/edsapi/rest/Search?query-1=AND,AN:" . $registros[$i][$campo2];
          $pubtipo = get_data($url, $token, $sesion);
          $respuesta = new SimpleXMLElement($pubtipo);
          $hits = $respuesta->SearchResult->Statistics->TotalHits;
          if ($hits > 0) {
            $tipo = $respuesta->SearchResult->Data->Records->Record->Header->PubType;
            $db = $respuesta->SearchResult->Data->Records->Record->Header->DbLabel;
            $subj = $respuesta->SearchResult->Data->Records->Record->RecordInfo->BibRecord->BibEntity->Subjects->Subject;
            $aut = $respuesta->SearchResult->Data->Records->Record->RecordInfo->BibRecord->BibRelationships->HasContributorRelationships->HasContributor;
            $isbx = $respuesta->SearchResult->Data->Records->Record->RecordInfo->BibRecord->BibRelationships->IsPartOfRelationships->IsPartOf->BibEntity->Identifiers->Identifier;
            $plink = $respuesta->SearchResult->Data->Records->Record->PLink;
          } else {
            $tipo = "";
            $db = "";
            $subj = "";
            $aut = "";
            $isbx = "";
          }
        }

        $cu = count($subj);
        $b = "";
        for ($t = 0; $t < $cu; $t++) {
          $v = $subj[$t]->SubjectFull . ", ";
          $b = $b . $v;
        }

        $cq = count($aut);
        $c = "";
        for ($f = 0; $f < $cq; $f++) {
          $ca = $aut[$f]->PersonEntity->Name->NameFull . ", ";
          $c = $c . $ca;
        }

        $c1 = count($isbx);
        $is = "";
        for ($f1 = 0; $f1 < $c1; $f1++) {
          $ig = $isbx[$f1]->Value . ", ";
          $is = $is . $ig;
        }

        $reg = "";
        for ($j = 0; $j < $num_campos; $j++) {
          if (gettype($registros[$i][$nombres_campos[$j]]) == 'string') $registros[$i][$nombres_campos[$j]] = '"' . $registros[$i][$nombres_campos[$j]] . '"';
          if ($j === 6) {
            $reg = $reg . $db;
          } else {
            $reg = $reg . $registros[$i][$nombres_campos[$j]];
          }
          if ($j < $num_campos - 2) $reg = $reg . ";";
        }
        $reg = html_entity_decode($reg . ";" . $tipo . ";" . $b . ";" . $c . ";" . $is . ";" . $plink);
        fwrite($arch_salida, $reg . "\n");
      }
      fclose($arch_salida);

      $fileName = basename($nombre_int);
      $filePath = 'arreglado/student/' . $fileName;
      if (!empty($fileName) && file_exists($filePath)) {
        // Define headers
        header("Cache-Control: public");
        header("Content-Description: File Transfer");
        header("Content-Disposition: attachment; filename=$fileName");
        header("Content-Type: application/csv");
        header("Content-Transfer-Encoding: binary");

        // Read the file
        readfile($filePath);
        exit;
      } else {
        echo 'The file does not exist.';
      }
    }
  }
}