$(function(){
	$("[name='botones']").select2({placeholder: "Buscar"});
	$("#general").show();
})


function guardar(){
	var aCampos = ["flujo","nombre","posicion","inicial","final","rechazo","aprobacion","responsable"];
	var aTipos = ["text","text","entero","text","text","text","text","text"];
	if ($("[name='diasAlarma']").val() != ""){
		aCampos.push("diasAlarma");
		aTipos.push("entero");
	}
	
	var fin = $("[name='final']").val();	
	var modo;
	if (fin != "Si"){
		aCampos.push("resCampo");
		aTipos.push("text");
	}
	
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
