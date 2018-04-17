$(function(){
	$("#general").show();
})

function generar(){
	location.href = application.sWebDbName + "agReporteBonosEspacios?Open";
}

function consultarReporte(){
	var ractive;
		var url = application.sWebDbName+"agConsultaBonosEspacios?Open";
		$.getJSON(url, function(data){
			if(data.sError == ""){
				if (data.personas.length > 0) {				
					ractive = new Ractive({
						el: 'bonosEspacios',
						template:'#bonos',
						data: data
					});	
				}else{
					$("#bonosEspacios").html("No se ha hallado ningún documento.");
				}
				$("#general").show();
			}else {
				location.href = application.sWebDbName +"frError?Open&msg=" + data.sError
			}
		})
	}