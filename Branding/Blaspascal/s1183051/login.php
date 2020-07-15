<?php
	session_start();
	if (!isset($_GET['returnData'])) {
		die("Organization ID or returnData not set.");
	}
	
	$custID="s1183051";

	$config = @json_decode(file_get_contents('./conf/'.$custID.'.json'));
	
	if ($config==null) {
		die("config not set.");
	}
	
	
?>
<!--
Author: UBP
Author URL: http://www.ubp.edu.ar
-->
<!DOCTYPE html>
<html>
	
<head>
	<title>.:: UBP ::.</title>
        <meta http-equiv="content-type" content="text/html; charset=utf-8" />
		<link href="css/style.css" rel='stylesheet' type='text/css' />
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<script type="application/x-javascript"> addEventListener("load", function() { setTimeout(hideURLbar, 0); }, false); function hideURLbar(){ window.scrollTo(0,1); } </script>
		<!--webfonts-->
		<link href='https://fonts.googleapis.com/css?family=Open+Sans:600italic,400,300,600,700' rel='stylesheet' type='text/css'>
		<!--//webfonts-->
        <script type="text/javascript" src="includes/jquery-3.2.1.min.js"></script>
        <script type="text/javascript" src="includes/jsencrypt.min.js"></script>
        <script type="text/javascript" src="includes/login.js"></script>		
</head>
<body>
	
				 <!-----login---->
				<div class="login-form">
					<div class="head">
						<img src="images/mem2.jpg" alt=""/>
						
					</div>
					<form>
						<input type="hidden" id="custid" value="<?php echo $custID; ?>" />
						<input type="hidden" id="returnData" value="<?php echo $_GET['returnData']; ?>" />
						<li>
							<div id="warning"></div>
						</li>
						<li>
							<input type="text" class="text" value="USUARIO" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'USUARIO';}" id="login-un"  ><a href="#" class=" icon user"></a>
						</li>
						<li>
							<input type="password" value="Clave" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Clave';}" id="login-pw" ><a href="#" class=" icon lock"></a>
						</li>
						<div class="p-container">
									<input type="button"  onclick="restlogin();" value="Ingresar" >
								<div class="clear"> </div>
						</div>
					</form>
					<?php
					if (isset($_GET['verbose']) && ($_GET['verbose'] == "Y")) {
					?>
						<div id="results">
							<strong>Rest Response will appear here.</strong>
						</div>
					<?php
					}
					?>					
				</div>
				
        <div style="display:none;">
            <label for="pubkey">Public Key</label><br/>
            <textarea id="pubkey" rows="15" style="width:100%" readonly="readonly">-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA7LgTfrm1dRMEGBIonOhR
ZmymNWNk7f1wszVBF7AvWVgacLmUG+cu59VqK7dUSbA5o1XmMVtI2/LpHnfyNuv3
4/tuVCPhqdipgqkQYKb9896TlTEUWyj+EnBT7JEYc21qcx+MAASh/feG8tsAHbpT
ThtksCnCCPG5jjBN7H8IENoWEupyS/CIOoqaxRaIllBkFIbw1L3Z048bobVgAlF2
EuFoV6J0Q9ltuEt+QKkoRxxZ5I29l/dlneK+vkTw1KUBIJcrOQGUgfSYrNVoJ+9z
mi4tZUiywG0DSlseN6N4Q3kgIYfCntFeHTKtIOVFAGsGmqH8xi5D1T2QA67hOdlX
LdQGMcw4oVZRyHl2xqc9HQWRE0A2lXM8dYuvaIjXwBQTIEqnXsZKNRG73P1JS2fY
j5pgB9bKeg4wRJGx7aXSUmGnxbLOyielB2P3bQVNtk+Wif0/kqjOR6qcoiaCXJ8s
RDWewnCA7snYARjH93ObDncKtCPLuA1iPFa9LfekfBNcadrDXEDid94unXQfXB1H
WanXoiJZhs7gRxxD2QvLqOmqOBcgTnSdaXSHIewriFliNJCiz+MANoV6DQBl9wr8
tz8alSp5vO9Z2jRet9iyutjnN8ygVcreEGG0kEQ7vzNWWjFzWpzHJH4XQr7FcCko
8HX+yZtaF1evRMOq9O8/P/UCAwEAAQ==
-----END PUBLIC KEY-----</textarea>
        </div>			
			<!--//Fin-login-form-->
		  <!-----copyright---->
   					<div class="copy-right">
						<p>2018 . EBSCO Information Services (C)</p> 
					</div>
				<!-----//copyright---->
				
				<script>
						jQuery( "#login-pw" ).keyup(function( event ) {
							event.preventDefault();
							if ( event.which == 13 ) {
								restlogin();
							}
						});
				</script>

		 		
</body>
</html>
