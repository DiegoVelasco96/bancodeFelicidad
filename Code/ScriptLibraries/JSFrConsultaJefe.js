$(function(){ 	
	cargarPersonas($("[name='anio']").val());
});

function buscarAnio(form){
	location.href = application.sWebDbName + form + "?Open&Date=" + $("[name='anio']").val();
}

function cargarPersonas(anio){
var ractive;
  if(anio != ""){
	var url = application.sWebDbName+"agConsultaJefe?Open&anio="+anio+"&nombre="+documento.sUsuario;
	$.getJSON(url, function(data){
		if(data.sError == ""){
			if (data.personas.length > 0) {				
				ractive = new Ractive({
					el: 'tablaPersonas',
					template:'#Personas',
					data: data
				});				
			}else{
				//location.href = application.sWebDbName +"frError?Open&msg=3"
				$("#tablaPersonas").html("No hay documentos para la fecha seleccionada.");
			}
			$("#general").show();
		}else {
			location.href = application.sWebDbName +"frError?Open&msg=" + data.sError
		}
	})
  }
}



