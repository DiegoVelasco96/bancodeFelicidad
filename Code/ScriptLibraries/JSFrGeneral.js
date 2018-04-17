$(function(){
	$('.date').datepicker({
		autoclose:true,
		language:'es'
	});
	//SelectFromAjaxField("[name='bienestar'],[name='noNotificar'],[name='usuarios']", true, application.sWebDbName + 'agBuscarPersonas?Open')
	SelectFromAjaxField("[name='bienestar'],[name='usuarios']", true, application.sWebDbName + 'agBuscarPersonas?Open')
	
	cargarAnexos();
})

function guardar(){
	var cont = 0;
	var validar = false;
	var aCampos = ["host", "carpeta", "remitenteCorreos", "rutaDirectorio","rutaNomina", "codigoCompania"];
	var aTipos = ["url", "text","text","text", "text","text"];
	//var aCampos = ["host", "carpeta", "remitenteCorreos", "rutaDirectorio","rutaNomina", "codigoCompania", "bonosAnio", "bonosMes", "diaVencimiento", "mesVencimiento"];
	//var aTipos = ["url", "text","text","text", "text","text", "numds", "numds", "numds","numds"];
	
	/*if($("[name = bonosAnioPro]").val() !== ""){
		aCampos.push("bonosAnioPro");
		aTipos.push("numds");
		aCampos.push("bonosMesPro");
		aTipos.push("numds");
		validar = true;
	}*/
	
	if (!application.bNuevo  && $("[name = rutaDirectorio]").val() != ""){
		aCampos.push("bienestar")
		aTipos.push("text")
	}
	
	/*if(!validar){
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
	}*/
	
	/*if ($("[name=notificacionUltimo]:checked").val() == "S"){
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
	
	/*if(parseInt($("[name = bonosMes]").val()) > parseInt($("[name = bonosAnio]").val())){
		bAlert("El nÃºmero de bonos por mes aÃ±o actual debe ser igual o menor al nÃºmero de bonos por aÃ±o actual");
		$("[name = bonosMes]").focus();
		return false;
	}
	
	if($("[name = bonosAnioPro]").val() !== "" && $("[name = bonosMesPro]").val() !== "" ){
		if(parseInt($("[name = bonosMesPro]").val()) > parseInt($("[name = bonosAnioPro]").val())){
			bAlert("El nÃºmero de bonos para el prÃ³ximo aÃ±o debe ser igual o menor al nÃºmero de bonos por mes prÃ³ximo aÃ±o");
			$("[name = bonosMes]").focus();
			return false;
		}
	} 
	
	if($("[name = diaVencimiento]").val() > 31 || $("[name = diaVencimiento]").val() == 0 ){
		$("[name = diaVencimiento]").parents("td").append("<div class=aviso>DÃ­a no vÃ¡lido</div>")
		$("[name = diaVencimiento]").focus().remove(".aviso");
		cont += 1;
	}
	
	if($("[name = mesVencimiento]").val() > 12  || $("[name = mesVencimiento]").val() == 0){
		$("[name = mesVencimiento]").parents("td").append("<div class=aviso>Mes no vÃ¡lido</div>")
		$("[name = mesVencimiento]").focus().remove(".aviso");
		cont += 1;
	}
	
	if($("[name = mesAviso]").val() > 12 || $("[name = mesAviso]").val() == 0){
		$("[name = mesAviso]").parents("td").append("<div class=aviso>Mes no vÃ¡lido</div>")
		$("[name = mesAviso]").focus().remove(".aviso");
		cont += 1;
	}
	
	if($("[name = diaAviso]").val() > 31 || $("[name = diaAviso]").val() == 0 ){
		$("[name = diaAviso]").parents("td").append("<div class=aviso>Mes no vÃ¡lido</div>")
		$("[name = diaAviso]").focus().remove(".aviso");
		cont += 1;
	}*/
	
	if (cont > 0){
		bAlert("Por favor, diligencie correctamente los campos indicados");
		return false;
	}
	
	document.forms[0].submit();
}