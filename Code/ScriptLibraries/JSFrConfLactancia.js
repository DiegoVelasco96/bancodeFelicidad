$(function(){
	cargarAnexos();
	$("#general").show();
	//cargar();
	$("[name='codigoCompania']").select2({placeholder: "Buscar"});
	
})
function adicionarHorario(){
	var horario= $("[name='horarios']").val();
	var horas= $("[name='horaInicio']").val() + "-" + $("[name='horaFin']").val()
	if(camposValidosHF()){		
		 var n = horario.indexOf(horas);
		 if(n==-1){
			 horario= horario+ horas +"\n";
			 $("[name='horarios']").val(horario);
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
			bAlert("El número de bonos para el número debe ser igual o menor al número de bonos por mes número");
			$("[name = bonosMes]").focus();
			return false;
		}
	} 
	
	/*	
	var n = $("[name='horariosHF']").val().toUpperCase();
	 var am =n.indexOf("AM");
	 var pm =n.indexOf("PM");
	 if(am==-1 && pm==-1){
		 $("[name = horariosHF]").parents("td").append("<div class=aviso>Horario no válido</div>")
			$("[name = horariosHF]").focus().remove(".aviso");
			cont += 1;
	 }*/
	
	if (cont > 0){
		bAlert("Por favor, diligencie correctamente los campos indicados");
		return false;
	}
	
	document.forms[0].submit();
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