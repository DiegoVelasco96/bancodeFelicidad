$(function(){
	var anio = $("[name='anio']").val()
	cargarPersonas(anio);
	
    $("[name='anio']").change(function(){
    	if(this.value !== ""){
    		var opciones = "<option value=''></option><option value='T'>Todos</option>";
    		if (this.value != "T"){
    			var anio = parseInt(this.value)
        		var selected = "";
        		for (var i = anio - 10; i <= anio + 10; i++) {
        			if( i == anio){
        				selected = "selected";
        			}else{
        				selected = "";
        			}
        			opciones += "<option "+selected+" value ="+i+">"+i+"</option>"
        		};
        		$(this).html(opciones)
        		cargarPersonas(this.value);
    		}else{
    			cargarPersonas(this.value);
    		}
    	}    	
    });
});

function cargarPersonas(anio){
var ractive;
  if(anio != ""){
	var url = application.sWebDbName+"agConsultaSolicitudes?Open&anio="+anio+"&nombre="+documento.sUsuario;
	$.getJSON(url, function(data){
		if(data.sError == ""){
			if (data.personas.length > 0) {				
				ractive = new Ractive({
					el: 'vista',
					template:'#solicitudes',
					data: data
				});	
			}else{
				if(anio != "T"){
					$("#vista").html("<div align='left'>No hay documentos para la fecha seleccionada</div>");
				}else{
					$("#vista").html("<div align='left'>No se ha hallado ningún documento</div>");
					
				}
			}
			$("#general").show();
		}else {
			location.href = application.sWebDbName +"frError?Open&msg=" + data.sError
		}
	})
  }
}