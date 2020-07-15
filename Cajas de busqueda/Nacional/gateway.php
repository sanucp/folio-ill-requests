<?php
#http://search.ebscohost.com/login.aspx?direct=true&site=eds-live&scope=site&type=0&custid=s4892549&groupid=main&profile=eds&mode=AND&lang=es&authtype=ip,guest&bquery=
print ("<form name='edsSearch' action='http://search.ebscohost.com/login.aspx' method='GET'> 
<input type='hidden' name='direct' value='".$_GET["direct"]."'>
<input type='hidden' name='site' value='".$_GET["site"]."'>
<input type='hidden' name='scope' value='".$_GET["scope"]."'>
<input type='hidden' name='type' value='".$_GET["type"]."'>
<input type='hidden' name='custid' value='".$_GET["custid"]."'>
<input type='hidden' name='groupid' value='".$_GET["groupid"]."'>
<input type='hidden' name='profile' value='".$_GET["profile"]."'>
<input type='hidden' name='mode' value='".$_GET["mode"]."'>
<input type='hidden' name='authtype' value='".$_GET["authtype"]."'>
<input type='hidden' name='lang' value='".$_GET["lang"]."'>
<input type='hidden' name='bquery' value='".mb_strtolower($_GET["bquery"],'UTF-8')."'>


</form>
<script> document.forms['edsSearch'].submit();</script>
");

?>
...Buscando



