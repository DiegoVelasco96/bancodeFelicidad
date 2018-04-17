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
	
	$("[name='codigoCompania']").select2({placeholder: "Buscar"});
	
	$("#general").show();
})

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

function guardar(){
	var aCampos = ["nombreSolicitud"];
	var aTipos = ["text"];
	
	if (camposNoValidos(aCampos, aTipos, true) > 0){
		bAlert("Por favor, diligencie correctamente los campos indicados", function(){
			if (application.oCampoFocus){
				$(application.oCampoFocus).focus()
			}
		});
		return false;
	}
	
	document.forms[0].submit();
}