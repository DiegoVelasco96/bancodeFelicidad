$(function(){
	$("[name='formularios']").select2({placeholder: "Buscar"});
	$("#general").show();
})

function guardar(){
	var aCampos = ["nombre", "formularios"];
	var aTipos = ["text", "multi"];
	            
	if (camposNoValidos(aCampos, aTipos, true) > 0){
		bAlert("Por favor, diligencie correctamente los campos indicados", function(){
			if (application.oCampoFocus){
				$(application.oCampoFocus).focus()
			}
		});
		return false;
	}
	validarClave(function(){
		var enter = /\r|\n|\r\n/g
		var arreglo = [];
		$("[name='formularios'] option:selected").each(function (){
			arreglo.push($(this).text().replace(enter, ""));
		})
		$("[name='nomFormularios']").val(arreglo.join("\r\n"))
		document.forms[0].submit();
	});
}

