$(function(){
	var boton;
	boton= "<a id='btnAceptar' class='btn btn-mini' href='javascript:void(0)' onclick='guardarModal()'><i class='icon-arrow-right icon-white'></i> Aceptar</a>";
	adaptarModal("Justificación", boton);
	$("#general").show();
})

function guardar(){
	var aCampos = ["comentario"];
	var aTipos = ["text"];
	if (camposNoValidos(aCampos, aTipos, true) > 0){
		top.bAlert("Por favor, diligencie correctamente los campos indicados", function(){
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
		top.$("[name=comentarioEliminacion]").val($("[name=comentario]").val());
		top.$("[name=evento]").val("E");
		top.document.forms[0].submit();
	}else{
		document.forms[0].submit();
	}
}