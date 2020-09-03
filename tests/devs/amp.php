<?php
$url = "https://login.bibliotecavirtual.udla.edu.ec/login?url=http://search.ebscohost.com/login.aspx?direct=true&amp;site=eds-live&amp;db=edselb&amp;AN=edselb.3213300";

$amp = "&amp;";

$uri2 = str_replace($amp, "&", $url);

echo $uri2;

?>