<?php
	// check if https
	// if (empty($_SERVER['HTTPS']) ) {
		// // redirect to https
		// header("Location: https://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]");
		// die();
	// }
	date_default_timezone_set('America/Argentina/Buenos_Aires');

	
	$oakey ="2ce5f8ed-e16a-4f75-9b05-5ba0240cdaac";
	$userPrefix="uai";
	$baseUrl="https://login.openathens.net/api/v1/uai.edu.ar/organisation/70226388";
	$adminBaseUrl="https://admin.openathens.net/api/v1/uai.edu.ar/organisation/70226388";

	include ("openathens.php");
	
	$userMsg="";
	$error=false;
	
	// detect the post of the register
	if(isset($_POST["selfregister"])) {
		
		// check if the user / email exists
		$useremail=$_POST["correo"];
		if (userExists ($useremail, $baseUrl, $oakey) ) {
			// if exists inform the user
			$userMsg="El usuario ya esta registrado . ";
			$error=true;
		}
		else
		{
			$user = $_POST["correo"];
			$charc = "@";
			$userLgt = strpos($user,$charc);
			$uid = substr($user,0,$userLgt);
			// if not register the user
			$objUser = new  OAUser ();
			$objUser->codUsuario=$uid;
			$objUser->nombre=$_POST["nombre"];
			$objUser->apellido=$_POST["apellido"];
			$objUser->correo=$_POST["correo"];
			$objUser->carrera=$_POST["carrera"];
			$objUser->genero=$_POST["genero"];

			if (createUser ($userPrefix, $adminBaseUrl, $oakey,$objUser) ) {
				// if exists inform the user
				$userMsg="Usuario registrado correctamente ";
			}
			else
			{
				$userMsg="Error en el registro del usuario";
				$error=true;
			}
			
		}
		
		$email_from = $_POST["correo"];
    	$nombre = $_POST["nombre"];
    	$apellido = $_POST["apellido"];
    	$codusuario = $_POST["codusuario"];
    	$carrera = $_POST["carrera"];
    	$genero = $_POST["genero"];

    	$to = "anavarro@ebsco.com";

    	$subject = "Alta usuario Open Athens";

    	$email_message = "Usuario recien registrado: \n\n";
    	$email_message .= "Nombre: " . $_POST["nombre"] . "\n";
    	$email_message .= "Apellido: " . $_POST["apellido"] . "\n";
    	$email_message .= "Codígo: " . $_POST["codusuario"] . "\n";
    	$email_message .= "Genero: " . $_POST["genero"] . "\n";
    	$email_message .= "carrera: " . $_POST["carrera"] . "\n";

    	$headers = 'From: '.$email_from."\r\n".
    	'Reply-To: '.$email_from."\r\n" .
    	'X-Mailer: PHP/' . phpversion();
    	mail($to,$subject,$email_message,$headers);
		
	}

?>
<html>
<head>
	<title>Universidad Abierta Interamericana - Auto registro autenticacion </title>
	<meta charset="UTF-8">
	<meta http-equiv="x-ua-compatible" content="ie=edge">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
	<link rel="stylesheet" href="uai.css" >

    <!--[if lt IE 9]>
	  <script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
	  <link href="https://cdn.jsdelivr.net/gh/coliff/bootstrap-ie8/css/bootstrap-ie8.min.css" rel="stylesheet">
    <![endif]-->
    <!--[<!--[if gte IE 9]>]>
      <link href="https://cdn.jsdelivr.net/gh/coliff/bootstrap-ie8/css/bootstrap-ie9.min.css" rel="stylesheet">
	  <script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
      <script src="https://cdn.jsdelivr.net/g/html5shiv@3.7.3"></script>
    <![endif]-->
	<!--[if !IE]>
		<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
	<!-- <![endif]-->
</head>
<body>
	<div>
		<form class="form-horizontal " method="post">
			<div class="title-center">
				<img src="uai-logo.gif" class="text-center" alt="Universidad Abierta Interamericana " width="250" />
				<h1 class="h3 mb-3 font-weight-normal">Formulario de auto registro</h1>
			</div>
			<?php
				// process results
				if ($userMsg!="")
				{
					if ($error==true)
					{
						echo '<div class="alert alert-danger"> <strong>Error!</strong>'.$userMsg.'.</div>';
					}
					else
					{
						echo '<div class="alert alert-success"> <strong>Éxito!</strong>'.$userMsg.'.</div>';
					}
				}
			?>
			<fieldset>
			<!-- Text input-->
			<div class="form-group">
			  <label class="col-md-7 control-label" for="codusuario">Codigo Usuario</label>  
			  <div class="col-md">
			  <input id="codusuario" name="codusuario" placeholder="Codigo de Usuario" class="form-control input-md" type="text" required="true">
				
			  </div>
			</div>
			<!-- Text input-->
			<div class="form-group">
			  <label class="col-md-7 control-label" for="nombre">Nombre</label>  
			  <div class="col-md">
			  <input id="nombre" name="nombre" placeholder="Nombre de la persona" class="form-control input-md" type="text" required="true">
				
			  </div>
			</div>

			<!-- Text input-->
			<div class="form-group">
			  <label class="col-md control-label" for="apellido">Apellido</label>  
			  <div class="col-md">
			  <input id="apellido" name="apellido" placeholder="Apellido de la persona" class="form-control input-md" type="text" required="true">
				
			  </div>
			</div>

			<!-- Text input-->
			<div class="form-group">
			  <label class="col-md control-label" for="correo">Correo</label>  
			  <div class="col-md">
			  <input id="correo" name="correo" placeholder="email / correo electronico" class="form-control input-md" type="email" required="true">
				
			  </div>
			</div>

			<!-- Select Basic -->
			<div class="form-group">
			  <label class="col-md control-label" for="carrera">Carrera</label>
			  <div class="col-md">
				<select id="carrera" name="carrera" class="form-control">
					<option value='C1'>Abogacía</option>
					<option value='C2'>Analista Programador (A Distancia)</option>
					<option value='C3'>Aplicaciones de Inteligencia Artificial para Proyectos</option>
					<option value='C4'>Aprendiendo a Ajustar por Inflación</option>
					<option value='C5'>Arquitectura</option>
					<option value='C6'>Asistente en Arteterapia</option>
					<option value='C7'>Cirugía Plástica Estética: Práctica Anual Intensiva</option>
					<option value='C8'>Concurso Monográfico - Senado de la Nación</option>
					<option value='C9'>Contador Público</option>
					<option value='C10'>Curso de Aceptación y Presencia Incondicional</option>
					<option value='C11'>Curso de Análisis de Riesgo Crediticio y Cobranzas</option>
					<option value='C12'>Curso de Auxiliar de Farmacia - 1º Cuatrimestre - Turno Mañana</option>
					<option value='C13'>Curso de Auxiliar de Farmacia - 1º Cuatrimestre - Turno Noche</option>
					<option value='C14'>Curso de Dinamica de Entrevista e Intervenciones en Gestalt</option>
					<option value='C15'>Curso de Extraccionista con Manejo Básico de Laboratorio de Análisis Clínicos - Sábados</option>
					<option value='C16'>Curso de Mandatarios y Gestores ante el Registro de la Propiedad Automotor</option>
					<option value='C17'>Curso Universitario de Acompañamiento Terapéutico</option>
					<option value='C18'>Curso Universitario Introductorio a Psicología de la Reproducción Humana Asistida</option>
					<option value='C19'>Diplomado Bases neurocientíficas de la enseñanza y el aprendizaje</option>
					<option value='C20'>Diplomado: Equinoterapia y Psicoterapia con Caballos - Nivel 1</option>
					<option value='C21'>Diplomatura “Estrategias e Intervenciones en Violencia Familiar</option>
					<option value='C22'>Diplomatura de Enfermería en Cuidados Críticos del Adulto - Rosario</option>
					<option value='C23'>Diplomatura de iniciación en cirugía e implantología buco-maxilo-facial</option>
					<option value='C24'>Diplomatura de Innovación en Comunicación</option>
					<option value='C25'>Diplomatura de medicina crítica y emergencias hospitalarias</option>
					<option value='C26'>Diplomatura en Administración de Consorcios</option>
					<option value='C27'>Diplomatura en Análisis Conductual Aplicado en Trastornos del Neurodesarrollo</option>
					<option value='C28'>Diplomatura en Arte y Salud: Recursos Expresivos-Corporales-Escénicos</option>
					<option value='C29'>Diplomatura en Calidad y Seguridad del Paciente</option>
					<option value='C30'>Diplomatura en Cicatrización de Heridas - Buenos Aires</option>
					<option value='C31'>Diplomatura en Cicatrización de Heridas - Rosario</option>
					<option value='C32'>Diplomatura en Clínica Estomatológica</option>
					<option value='C33'>Diplomatura en Clínica Psicoanalítica</option>
					<option value='C34'>Diplomatura en Comunicación Gubernamental</option>
					<option value='C35'>Diplomatura en Cuidados Avanzados y Cicatrizacion de Heridas</option>
					<option value='C36'>Diplomatura en Economía Política y Negocios del Asia y el Pacífico</option>
					<option value='C37'>Diplomatura en Endodoncia</option>
					<option value='C38'>Diplomatura en Enfermería Neonatal - Rosario</option>
					<option value='C39'>Diplomatura en Enfermería Oncológica</option>
					<option value='C40'>Diplomatura en Enfermeria Neonatal</option>
					<option value='C41'>Diplomatura en Entrenamiento Profesional Contable e Impositivo</option>
					<option value='C42'>Diplomatura en Estudios Cardiovasculares</option>
					<option value='C43'>Diplomatura en Evaluación e Intervención Psicológica en el Ámbito del Deporte</option>
					<option value='C44'>Diplomatura en Gestalt</option>
					<option value='C45'>Diplomatura en Inmunohematología</option>
					<option value='C46'>Diplomatura en Intervenciones Asistidas con Perros</option>
					<option value='C47'>Diplomatura en Linfedematología</option>
					<option value='C48'>Diplomatura en Marketing Digital</option>
					<option value='C49'>Diplomatura en Neuroeducación</option>
					<option value='C50'>Diplomatura en Neurorehabilitación con orientación Neurocognición y Movimiento</option>
					<option value='C51'>Diplomatura en Nutrición Clínica y Servicios de Alimentación</option>
					<option value='C52'>Diplomatura en Odontología Laser y Ciencias de la Salud</option>
					<option value='C53'>Diplomatura en Odontopediatría – Método Integral.</option>
					<option value='C54'>Diplomatura en Operatoria y Estética Dental</option>
					<option value='C55'>Diplomatura en Patología de ATM - Disfunción Cráneo-Cérvico-Mandibular y Dolor Orofacial</option>
					<option value='C56'>Diplomatura en Psicodrama</option>
					<option value='C57'>Diplomatura en Psicodrama y Corporeidad Clínica de la Imagen y la Escena</option>
					<option value='C58'>Diplomatura en Psicología Jurídica</option>
					<option value='C59'>Diplomatura en Psicología Transpersonal - Modelos Teóricos, Socioculturales y Aplicaciones Clínicas</option>
					<option value='C60'>Diplomatura en Psicoterapia y Aprendizaje Asistido con Equinos - Introducción al Modelo EAGALA</option>
					<option value='C61'>Diplomatura en Psicoterapia y Aprendizaje Asistido con Equinos - Introducción al modelo EAGALA - Córdoba</option>
					<option value='C62'>Diplomatura en Psicoterapia y Aprendizaje Asistido con Equinos. Introducción al Modelo EAGALA - Rosario</option>
					<option value='C63'>Diplomatura en Quiropraxia - Formación de Profesionales del Campo de la Salud en la Ciencia, Arte y Filosofía de la Quiropráctica</option>
					<option value='C64'>Diplomatura en Relaciones Internacionales</option>
					<option value='C65'>Diplomatura en Resonancia Magnética por Imágenes</option>
					<option value='C66'>Diplomatura en Soporte Nutricional</option>
					<option value='C67'>Diplomatura en Tomografia Multislice</option>
					<option value='C68'>Diplomatura en Valoración del Daño Corporal</option>
					<option value='C69'>Diplomatura Introducción a la Terapia Cognitivo Conductual con Niños y Adolescentes</option>
					<option value='C70'>Diplomatura Procuración y Procesamiento Material Biológico para Trasplante</option>
					<option value='C71'>Diplomatura SAMF en Marketing & Negocios para la Industria Farmacéutica</option>
					<option value='C72'>Diplomatura Superior en Clínica Psicoanalítica Contemporánea</option>
					<option value='C73'>Diplomatura Superior en Educación Somática</option>
					<option value='C74'>Diplomatura Universitaria en Acompañamiento Terapéutico</option>
					<option value='C75'>Diplomatura Universitaria en Acompañamiento Terapéutico. Con prácticas presenciales</option>
					<option value='C76'>Diplomatura Universitaria en Aspectos Legales y Forenses</option>
					<option value='C77'>Diplomatura Universitaria en Bases Neurocientífica de la Enseñanza y el Aprendizaje</option>
					<option value='C78'>Diplomatura Universitaria en Condiciones del Espectro del Autismo</option>
					<option value='C79'>Diplomatura Universitaria en Diagnostico con imágenes en Cardiología</option>
					<option value='C80'>Diplomatura Universitaria en Educación y Neurociencias</option>
					<option value='C81'>Diplomatura Universitaria en Formación en Psicoterapias Cognitivo Conductuales. Clínica y Tratamiento</option>
					<option value='C82'>Diplomatura Universitaria en Nutrición Clínica</option>
					<option value='C83'>Diplomatura Universitaria en Sexualidades, Parentalidades y Reproducción Humana</option>
					<option value='C84'>Diplomatura Universitaria en Socorrismo con Orientación Docente</option>
					<option value='C85'>Diplomatura Universitaria Estimulación y Habilitación Cognitiva de Niños y Adolescentes</option>
					<option value='C86'>Diplomatura Universitaria Evaluación y Diagnóstico Neuropsicológico de Niños y Adolescentes</option>
					<option value='C87'>Diplomatura: Enfermería en Cuidados Críticos del Adulto - Buenos Aires</option>
					<option value='C88'>Doctorado en Arquitectura y Urbanismo</option>
					<option value='C89'>Doctorado en Ciencias Médicas</option>
					<option value='C90'>El poder de Mindfulness y Autocompasión</option>
					<option value='C91'>El rol de los entrenadores en el deporte formativo: Desafíos y estrategias psicológicas</option>
					<option value='C92'>El Rol Profesional del Martillero Público, Corredor y Administrador de Consorcios</option>
					<option value='C93'>Equinoterapia y Psicoterapia con Caballos</option>
					<option value='C94'>Especialización en Cardiología</option>
					<option value='C95'>Especialización en Clínica Psicoanalítica</option>
					<option value='C96'>Especialización en Concursos y Quiebras</option>
					<option value='C97'>Especialización en Docencia Universitaria</option>
					<option value='C98'>Especialización en Docencia Universitaria - Rosario</option>
					<option value='C99'>Especialización en Estrategias de Evaluación en Psicología</option>
					<option value='C100'>Especialización en Investigación Clínica Farmacológica (A Distancia)</option>
					<option value='C101'>Especialización en Kinesiología Deportiva</option>
					<option value='C102'>Especialización en Negocios Agroindustriales</option>
					<option value='C103'>Especialización en Ortodoncia</option>
					<option value='C104'>Especialización en Periodismo Digital</option>
					<option value='C105'>Especialización en Periodoncia</option>
					<option value='C106'>Especialización en Redes y Sistemas Distribuidos</option>
					<option value='C107'>Especialización en Salud y Seguridad en la Construcción</option>
					<option value='C108'>Especialización en Sindicatura Concursal</option>
					<option value='C109'>Especialización en Terapia Cognitiva</option>
					<option value='C110'>Fellowship en Medicina Crítica y Cuidados Intensivos</option>
					<option value='C111'>Fellowship en Soporte Nutricional</option>
					<option value='C112'>Fellowship Universitario de Cardiología Crítica</option>
					<option value='C113'>Fellowship Universitario Ecodoppler Vascular</option>
					<option value='C114'>Fellowship Universitario en Cardiología intervencionista</option>
					<option value='C115'>Fellowship Universitario en Eco stress y ecocardiografía Trans esofágica</option>
					<option value='C116'>Fellowship Universitario en Ecocardiografía</option>
					<option value='C117'>Fellowship Universitario en Insuficiencia Cardíaca</option>
					<option value='C118'>Filosofía para Niños y Niñas: Una Introducción a la Práctica</option>
					<option value='C119'>Flow Zen Gestalt & Psicología Contemplativa</option>
					<option value='C120'>Formación Continua en Osteopatía y Posturología</option>
					<option value='C121'>Formación Integral en Administración de Consorcios y Conjuntos Inmobiliarios</option>
					<option value='C122'>Guía Universitario en Turismo</option>
					<option value='C123'>II Curso Intensivo Básico de Ventilación Mecánica</option>
					<option value='C124'>Ingeniería en Sistemas Informáticos</option>
					<option value='C125'>Instrumentador Quirúrgico Universitario</option>
					<option value='C126'>Jornada de Soporte Nutricional en pacientes Adultos</option>
					<option value='C127'>Jornada Gratuita de Acompañamiento Terapéutico</option>
					<option value='C128'>La Alimentación complementaria, desde la teoría a la práctica</option>
					<option value='C129'>Lectura de Trabajos en Ortopedia y Traumatología</option>
					<option value='C130'>Lic. en Gestión de Instituciones Educativas (A Distancia)</option>
					<option value='C131'>Licenciatura en Administración</option>
					<option value='C132'>Licenciatura en Ciencia Política</option>
					<option value='C133'>Licenciatura en Ciencias de la Educación</option>
					<option value='C134'>Licenciatura en Comercialización</option>
					<option value='C135'>Licenciatura en Comercio Internacional</option>
					<option value='C136'>Licenciatura en Diseño de Interiores</option>
					<option value='C137'>Licenciatura en Diseño Gráfico</option>
					<option value='C138'>Licenciatura en Economía</option>
					<option value='C139'>Licenciatura en Educación Física y Deportes</option>
					<option value='C140'>Licenciatura en Educación Física y Deportes (Plan especial para profesores A.R.T.D.)</option>
					<option value='C141'>Licenciatura en Educación Física y Deportes (Plan especial para profesores G.E.D.)</option>
					<option value='C142'>Licenciatura en Educación Inicial</option>
					<option value='C143'>Licenciatura en Enfermería</option>
					<option value='C144'>Licenciatura en Gastronomía</option>
					<option value='C145'>Licenciatura en Gestión de Instituciones Educativas</option>
					<option value='C146'>Licenciatura en Gestión de Tecnología Informática</option>
					<option value='C147'>Licenciatura en Hotelería</option>
					<option value='C148'>Licenciatura en Ingeniería Comercial</option>
					<option value='C149'>Licenciatura en Kinesiología y Fisiatría</option>
					<option value='C150'>Licenciatura en Matemática</option>
					<option value='C151'>Licenciatura en Musicoterapia</option>
					<option value='C152'>Licenciatura en Musicoterapia - Rosario</option>
					<option value='C153'>Licenciatura en Nutrición</option>
					<option value='C154'>Licenciatura en Periodismo</option>
					<option value='C155'>Licenciatura en Producción de Bioimágenes</option>
					<option value='C156'>Licenciatura en Producción de Bioimágenes (A Distancia)</option>
					<option value='C157'>Licenciatura en Producción y Realización Audiovisual</option>
					<option value='C158'>Licenciatura en Psicología</option>
					<option value='C159'>Licenciatura en Psicopedagogía</option>
					<option value='C160'>Licenciatura en Publicidad</option>
					<option value='C161'>Licenciatura en Relaciones Internacionales</option>
					<option value='C162'>Licenciatura en Relaciones Públicas</option>
					<option value='C163'>Licenciatura en Terapia Ocupacional</option>
					<option value='C164'>Licenciatura en Turismo</option>
					<option value='C165'>Liderazgo, Mando y Conducción</option>
					<option value='C166'>Maestría en Alta Dirección de Empresas</option>
					<option value='C167'>Maestría en Cardiología Crítica</option>
					<option value='C168'>Maestría en Cicatrización de Heridas</option>
					<option value='C169'>Maestría en Derecho Administrativo</option>
					<option value='C170'>Maestría en Derecho del Comercio Internacional</option>
					<option value='C171'>Maestría en Investigación Clínica Farmacológica</option>
					<option value='C172'>Maestría en Psicología Organizacional</option>
					<option value='C173'>Maestría en Tecnología Educativa (A Distancia)</option>
					<option value='C174'>Maestría en Tecnología Informática</option>
					<option value='C175'>Martillero Público, Corredor y Administrador de Consorcio</option>
					<option value='C176'>Martillero Público, Corredor y Administrador de Consorcio (A Distancia)</option>
					<option value='C177'>Medicina</option>
					<option value='C178'>Odontología</option>
					<option value='C179'>Para que estudio Kinesiología” “Alcances profesionales. Mitos y realidades</option>
					<option value='C180'>Primera jornada de nutrición infantil: La Alimentación complementaria desde la teoría a la práctica</option>
					<option value='C181'>Proceso de rescate del niño interior - Método Gestarte</option>
					<option value='C182'>Profesorado Universitario en Educación Física y Deportes</option>
					<option value='C183'>Profesorado Universitario en Matemática</option>
					<option value='C184'>Profesorado Universitario para la Educación Secundaria y Superior</option>
					<option value='C185'>Programa de Desarrollo Gerencial. El "Ser" Gerente</option>
					<option value='C186'>Programa de Entrenamiento Clínico en Rehabilitación Neurocognitiva del Movimiento</option>
					<option value='C187'>Programa Ejecutivo de Formación Profesional</option>
					<option value='C188'>Psicología del Aquí y Ahora</option>
					<option value='C189'>ROBÓTICA</option>
					<option value='C190'>Taller de Alfabetización Académica: “Sexología: herramientas para diagnóstico y tratamiento”</option>
					<option value='C191'>TALLER: ¿Por qué amo las Relaciones Internacionales y la Ciencia Política?</option>
					<option value='C192'>TALLER: “El alcance laboral del profesional en Relaciones Internacionales y en Ciencia Política</option>
					<option value='C193'>Tecnicatura Universitaria en Administración de Comunidades Virtuales</option>
					<option value='C194'>Tecnicatura Universitaria en Animación Digital y Efectos Visuales</option>
					<option value='C195'>Tecnicatura Universitaria en Desarrollo de Videojuegos</option>
					<option value='C196'>Tecnicatura Universitaria en Gestión y Organización de Eventos</option>
					<option value='C197'>Tecnicatura Universitaria en Gestión y Organización de Eventos (A Distancia)</option>
					<option value='C198'>Tecnicatura Universitaria en Guion de Producciones Audiovisuales</option>
					<option value='C199'>Tecnicatura Universitaria en Periodismo Deportivo</option>
					<option value='C200'>Tecnicatura Universitaria en Prótesis Dental</option>
					<option value='C201'>Tecnicatura Universitaria en Ventas</option>
					<option value='C202'>Tecnicatura Universitaria en Ventas (A Distancia)</option>
					<option value='C203'>¿Sabiduría o Inteligencia emocional? Cómo comprender la adolescencia desde la psicología positiva.</option>
					<option value='C204'>11º Curso Universitario: Entrenador de Natación - Castelar</option>
					<option value='C205'>1er Simposio de Medicina Regenerativa y Terapia Celular</option>
					<option value='C206'>63° Jornada Federal de Gestión Educativa</option>

				</select>
			  </div>
			</div>


			<!-- Multiple Radios -->
			<div class="form-group">
			  <label class="col-md control-label" for="genero">Genero</label>
			  <div class="col-md">
			  <div class="radio">
				<label for="radios-0"><input name="genero" id="radios-0" value="M" checked="checked" type="radio">Masculino</label>
				<label for="radios-1"><input name="genero" id="radios-1" value="F" type="radio">Femenino</label>
				</div>
			  </div>
			</div>

			<!-- Button -->
			<div class="form-group">
			  <div class="col-md">
				<button id="singlebutton" name="selfregister" class="btn btn-primary">Registrar</button>
			  </div>
			</div>

			</fieldset>
		</form>
	</div>
</body>
</html>