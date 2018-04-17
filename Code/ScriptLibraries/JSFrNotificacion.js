$(function(){
	if ($("[name='desCampo']").val() == ""){
		$("[name='desCampo']").val = []
	}
	$("[name='desCampo']").select2({placeholder: "Buscar"});
	$("#general").show();
})

function guardar(){
	var aCampos = ["nombre","asunto","mensaje","enlace","desCampo"];
	var aTipos = ["text","text","text","text","multi"];
	
	if (camposNoValidos(aCampos, aTipos, true) > 0){
		bAlert("Por favor, diligencie correctamente los campos indicados", function(){
			if (application.oCampoFocus){
				$(application.oCampoFocus).focus()
			}
		});
		return false;
	}
	validarClave(function(){
		document.forms[0].submit();
	});
}
