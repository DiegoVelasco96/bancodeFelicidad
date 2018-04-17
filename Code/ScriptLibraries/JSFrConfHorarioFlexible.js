$(function(){
	
	cargarAnexos();
		
	$("#dInicioLabor").show()
	$("#dHoraInicio").prepend("<span class='input-append bootstrap-timepicker'><input type='text'id='timepicker1' name='horaInicio' class='input-medium hora'><span class='add-on'><i class='icon-time'></i></span></span> ");
	$("[name='horaInicio']").timepicker({
	       minuteStep: 15,
		defaultTime: '7:00 AM'
	 });
	
	$("#dFinLabor").show()
	$("#dHoraFin").prepend("<span class='input-append bootstrap-timepicker'><input type='text' name='horaFin' class='input-medium hora'><span class='add-on'><i class='icon-time'></i></span></span> ");
	$("[name='horaFin']").timepicker({
	       minuteStep: 15,
	       defaultTime: '8:00 AM'
	});
	
	addOnChange('.hora');
	
	
	$("#general").show();
	//SelectFromAjaxField("[name='bienestar'],[name='usuarios']", true, application.sWebDbName + 'agBuscarPersonas?Open')
	//SelectFromAjaxField("[name='codigoCompania']", true, application.sWebDbName + 'agConsultaCompania?Open')
	$("[name='codigoCompania']").select2({placeholder: "Buscar"});
	cargar();
})
function adicionarHorario(){
	var horario= $("[name='horarios']").val();
	
	
	var horas= $("[name='horaInicio']").val() + "-" + $("[name='horaFin']").val()
	if(camposValidosHF()){		
		 var n = horario.indexOf(horas);
		 if(n==-1){
			 if (horario==""){
				 horario= horario+ horas;	 
			 }else{
				 horario= horario+","+ horas;
			 }
			 $("[name='horarios']").val(horario);
			 cargar();
		 }else{
			 top.bAlert("El horario seleccionado se habia ingresado con anteriodidad");
		 }
		
	}
	return true
}
function convertirHora(cadena){
	var arreglo = cadena.split(" ")
	var hora = arreglo[0].split(":")
	if (arreglo[1].toLowerCase() == "am"){
		if (hora[0] == "12"){
			hora[0] = "00"
		}
	}else{
		if (hora[0] != "12"){
			hora[0] = parseFloat(hora[0]) + 12 + ""
		}
	}
	return parseFloat(hora[0]+""+hora[1]) 
}

function camposValidosHF(){
	if(convertirHora($("[name='horaInicio']").val())  >= convertirHora($("[name='horaFin']").val())){
			top.bAlert("La hora de inicio debe ser anterior a la hora de fin");
			return false
	}
	return true
}

function guardar(){
	var cont = 0;
	var validarA = false;
	var validar = false;
	var aCampos = [ "nombreSolicitud","horarios"];
	var aTipos = [ "text","text"];
	
	if($("[name = bonosAnio]").val() !== ""){
		aCampos.push("bonosAnio");
		aTipos.push("numds");
		aCampos.push("bonosMes");
		aTipos.push("numds");
		validarA = true;
	}
	
	if($("[name = bonosAnioPro]").val() !== ""){
		aCampos.push("bonosAnioPro");
		aTipos.push("numds");
		aCampos.push("bonosMesPro");
		aTipos.push("numds");
		validarA = true;
	}
	
	if (!application.bNuevo  && $("[name = rutaDirectorio]").val() != ""){
		aCampos.push("bienestar")
		aTipos.push("text")
	}
	
	if(!validarA){
		if($("[name = bonosMes]").val() !== ""){
			aCampos.push("bonosAnio");
			aTipos.push("numds");
			aCampos.push("bonosMes");
			aTipos.push("numds");
		}
	}
	
	if(!validar){
		if($("[name = bonosMesPro]").val() !== ""){
			aCampos.push("bonosAnioPro");
			aTipos.push("numds");
			aCampos.push("bonosMesPro");
			aTipos.push("numds");
		}
	}
	/*
	if ($("[name=notificacion]:checked").val() == "S"){
		aCampos.push("asunto", "mensaje")
		aTipos.push("text","text");
	}
	
	if ($("[name=notificacionUltimo]:checked").val() == "S"){
		aCampos.push("asuntoUltimo", "mensajeUltimo")
		aTipos.push("text","text");
	}
	
	if ($("[name=notificacionEliminacion]:checked").val() == "S"){
		aCampos.push("asuntoEliminacion", "mensajeEliminacion")
		aTipos.push("text","text");
	}
	
	if ($("[name=notificacionJefe]:checked").val() == "S"){
		aCampos.push("fechaEnvioJefe","periodicidadJefe","asuntoJefe", "mensajeJefe")
		aTipos.push("text","numds","text","text");
	}*/
	
	if (camposNoValidos(aCampos, aTipos, true) > 0){
		bAlert("Por favor, diligencie correctamente los campos indicados", function(){
			if (application.oCampoFocus){
				$(application.oCampoFocus).focus()
			}
		});
		return false;
	}
	
	if(parseInt($("[name = bonosMes]").val()) > parseInt($("[name = bonosAnio]").val())){
		bAlert("El número de bonos por mes año actual debe ser igual o menor al número de bonos por año actual");
		$("[name = bonosMes]").focus();
		return false;
	}
	
	if($("[name = bonosAnioPro]").val() !== "" && $("[name = bonosMesPro]").val() !== "" ){
		if(parseInt($("[name = bonosMesPro]").val()) > parseInt($("[name = bonosAnioPro]").val())){
			bAlert("El número de bonos para el próximo año debe ser igual o menor al número de bonos por mes próximo año");
			$("[name = bonosMes]").focus();
			return false;
		}
	} 
	
	if($("[name = diaVencimiento]").val() > 31 || $("[name = diaVencimiento]").val() == 0 ){
		$("[name = diaVencimiento]").parents("td").append("<div class=aviso>Año no válido</div>")
		$("[name = diaVencimiento]").focus().remove(".aviso");
		cont += 1;
	}
	
	if($("[name = mesVencimiento]").val() > 12  || $("[name = mesVencimiento]").val() == 0){
		$("[name = mesVencimiento]").parents("td").append("<div class=aviso>Mes no válido</div>")
		$("[name = mesVencimiento]").focus().remove(".aviso");
		cont += 1;
	}
	
	if($("[name = mesAviso]").val() > 12 || $("[name = mesAviso]").val() == 0){
		$("[name = mesAviso]").parents("td").append("<div class=aviso>Mes no válido</div>")
		$("[name = mesAviso]").focus().remove(".aviso");
		cont += 1;
	}
	
	if($("[name = diaAviso]").val() > 31 || $("[name = diaAviso]").val() == 0 ){
		$("[name = diaAviso]").parents("td").append("<div class=aviso>Mes no válido</div>")
		$("[name = diaAviso]").focus().remove(".aviso");
		cont += 1;
	}
	
	if (cont > 0){
		bAlert("Por favor, diligencie correctamente los campos indicados");
		return false;
	}
	
	document.forms[0].submit();
}

function cargar(){
	
	var tags = $('[name = "horarios"]').text().split(',');
	$('[name = "horarios"]').select2({
		tags: []
	});
	
	$('.addHorario .select2-input').keypress(function (e) {		
		
		e.preventDefault();
		    
	})
}
function guardar2(){
	 var n = $("[name='horariosHF']").val().toUpperCase();
	 var am =n.indexOf("AM");
	 var pm =n.indexOf("PM");
	 if(am==-1 && pm==-1){
		 $("[name = horariosHF]").parents("td").append("<div class=aviso>Horario no válido</div>")
			$("[name = horariosHF]").focus().remove(".aviso");
			cont += 1;
	 }	
}