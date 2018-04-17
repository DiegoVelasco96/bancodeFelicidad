$(function(){
	$('.date').datepicker({
		autoclose:true,
		language:'es'
	});
	SelectFromAjaxField("[name='noNotificar']", true, application.sWebDbName + 'agBuscarPersonas?Open')
	
	cargarAnexos();
	$("#general").show();
	$("[name='codigoCompania'],[name='jornadas']").select2({placeholder: "Buscar"});
	
})

function guardar(){
	var cont = 0;
	var validar = false;
	var aCampos = [ "bonosAnio", "bonosMes", "bonosEmpleadosNuevos","diaVencimiento", "mesVencimiento", "jornadas", "nombreSolicitud","horarios","equivalenteBono"];
	var aTipos = [ "numds", "numds","numds", "numds","numds", "multi","text","text","numds"];
	
	if($("[name = equivalenteBono]").val() != ""){
		if(($("[name = equivalenteBono]").val() != "1") && ($("[name = equivalenteBono]").val() != "2")){
			bAlert("En equivalente bono únicamente puede ingresar 1 o 2 día completo");
			$("[name = equivalenteBono]").focus();
			return false;
		}
	}
	
	if($("[name = bonosAnioPro]").val() !== ""){
		aCampos.push("bonosAnioPro");
		aTipos.push("numds");
		aCampos.push("bonosMesPro");
		aTipos.push("numds");
		validar = true;
	}
	
	if (!application.bNuevo  && $("[name = rutaDirectorio]").val() != ""){
		aCampos.push("bienestar")
		aTipos.push("text")
	}
	
	if(!validar){
		if($("[name = bonosMesPro]").val() !== ""){
			aCampos.push("bonosAnioPro");
			aTipos.push("numds");
			aCampos.push("bonosMesPro");
			aTipos.push("numds");
		}
	}
	
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
	}
	
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
		$("[name = diaVencimiento]").parents("td").append("<div class=aviso>Día no válido</div>")
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