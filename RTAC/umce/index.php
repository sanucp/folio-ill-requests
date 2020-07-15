<?php
/*
=============================================================================================
* WIDGET NAME: RTAC for horaizon 
* DESCRIPTION: RTAC for horaizon
* KEYWORDS: RTAC, horaizon
* CUSTOMER PARAMETERS: baseURL - this URL need the profile of the library ex: "http://www,yorlibrary.com/ipac20/ipac.jsp?&profile=BIBUMCE"
* EBSCO PARAMETERS: ILSRecNo
* URL: http://gss.ebscohost.com/anavarro/test/test/test.php?id={ILSRecNo}&url={baseURL}
* AUTHOR & EMAIL: Andres Navarro - anavarro@ebsco.com
* DATE ADDED: 2019-01-03
* DATE MODIFIED: 26-03-2019
* LAST CHANGE DESCRIPTION:
=============================================================================================
*/

$id = $_GET["id"];
$uri = $_GET["url"];
$ure = "&index=BIB&term=";
$urlF = $uri.$ure.$id; 
$ch = curl_init();
$res= curl_setopt ($ch, CURLOPT_URL, $urlF);
curl_setopt ($ch, CURLOPT_HEADER, 0);
curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
$result = curl_exec ($ch);
$info = 'CC"><table';
$info_fin = "</table></t";
$pos = strpos($result, $info);
$uno = substr($result, $pos);
$pos2 =strpos($uno, $info_fin);
$dos = substr($uno, 0, $pos2);
$long = strlen($dos);
$tr = "<tr";
$tr_fin ="</tr";
$td = "<td";
$td_fin ="</td";
$car = 0;
$fin = 0;
$num_fila=0;
while ($car+138<$long){
    $incicio = strpos($dos, $tr, $fin);
    $fin = strpos($dos, $tr_fin, $fin+6);
    $num_fila++;
    $fila = substr($dos, $incicio, ($fin-$inicio));
    $fin_campo=0;
    for($i=1;$i<7;$i++){
        $ini_campo=strpos($fila, $td, $fin_campo);
		$fin_campo=strpos($fila, $td_fin, $fin_campo+6);
        $campo[$num_fila][$i]=substr($fila, $ini_campo, ($fin_campo-$ini_campo));
    }
    $car = $fin+6;
}
$c = count($campo);

utf8_decode($campo);
//header('content-type: application/xml; charset=utf-8');
$xmlresponse="<?xml version=\"1.0\" encoding=\"utf-8\" ?>\n"
."<holdings>\n";
for($j=2;$j<$c+1;$j++){
    $u = strip_tags($campo[$j][1]);
    html_entity_decode($u);
    $call = strip_tags($campo[$j][3]);
    $copia = strip_tags($campo[$j][4]);
    $e = strip_tags($campo[$j][5]);
    $due = strip_tags($campo[$j][6]);
$s="<holding>\n";
		$s.="<location>".$u."</location>\n";
		$s.="<callNumber>".$call."</callNumber>\n";
		$s.="<status>".$e."</status>\n";
        $s.="<volInfo>".$copia."</volInfo>\n";
        $s.="<duedate>".$due."</duedate>\n";
		$s.="</holding>\n";
		$xmlresponse.=$s;
}
$xmlresponse.="</holdings>\n";
echo $xmlresponse;
curl_close ($ch);

?>