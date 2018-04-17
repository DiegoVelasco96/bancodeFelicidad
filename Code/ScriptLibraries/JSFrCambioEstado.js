$(function(){
	var boton;
	if(documento.sError == ""){
		boton= "<a id='btnEnviar' class='btn btn-mini' href='javascript:void(0)' onclick='guardarModal()'><i class='icon-arrow-right icon-white'></i> Enviar</a>";
		if(application.sForm == "frAdmonFlujo"){
			if($("[name='notificaciones'] option").length == 1 && $("[name='notificaciones'] option").first().html() == ""){
				$("[name='notificaciones']").val([]);
			}
			$("[name='notificaciones'], [name='acciones']").select2({placeholder: "Buscar"});
		}
	}else{
		boton= "";
		$("#dCampos").hide();
		$("#dError").show();
	}
	$("[name='notificaciones']").each(function (){
		if ($(this).val() == ""){
			$(this).val([]);
		}
		$(this).select2({placeholder: "Buscar"});
	})
	
	adaptarModal("Cambio de estado", boton);
	$("#general").show();
})

function guardar(){
	var aCampos = ["estadoDestino"];
	var aTipos = ["text"];
	if (camposNoValidos(aCampos, aTipos, true) > 0){
		top.bAlert("Por favor, diligencie correctamente los campos indicados", function(){
			if (application.oCampoFocus){
				$(application.oCampoFocus).focus()
			}
		});
		return false;
	}
	if (documento.sEstadoOrigen == $("[name='estadoDestino']").val()){
		top.bAlert("Debe elegir un estado diferente al estado actual", function(){
			if (application.oCampoFocus){
				$(application.oCampoFocus).focus()
			}
		});
		return false;
	}
	parent.$("#dModal .modal-footer").empty();
	$("#general").hide();

	$("#ajaxLoadingMessage").center();
	$("#ajaxLoadingMessage").show();
	
	if (top.application.bEdicion){
		top.$("[name=estadoDestino]").val($("[name=estadoDestino]").val()) 
		top.$("[name=comentario]").val($("[name=comentario]").val());
		top.$("[name=evento]").val("CE");
		if(application.sForm == "frAdmonFlujo"){
			top.$("[name=admonFlujo]").val("S");
			var notificaciones = $("[name=notificaciones]").val();
			var acciones = $("[name=acciones]").val();
			top.$("[name=notificaciones]").val(notificaciones ? notificaciones.join("\r\n") : "");
			top.$("[name=acciones]").val(acciones ? acciones.join("\r\n") : "");
		}
		top.document.forms[0].submit();
	}else{
		document.forms[0].submit();
	}
}