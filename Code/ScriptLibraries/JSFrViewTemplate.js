$(function(){ 
	if (application.sForm == "frBusqueda"){
		$("#vista table").prepend("<tr><th>Sede</th></tr>")
		$("#vista table tr").first().remove().end().each(function (){
			$(this).children().first().remove();
		})
	}	

	if ($("#vista").html().indexOf('No se ha hallado ningún documento')>0 || $("#vista").html().indexOf('No documents found')>0){
		$("#vista").html("<div align='left'>No se ha hallado ningún documento</div>");
	}
	$("#vista td").removeAttr("nowrap");
	$("img[src*='icons/ecblank']").hide();
	$("img[src*='icons/vwicnsr']").hide();
	$("#general").show();
});

function viewExpand(){
	$("[name='btnExpand']").click();   
}

function viewCollapse(){
    $("[name='btnCollapse']").click();   
}

function viewPrevious(){
    $("[name='btnPrevious']").click();   
}

function viewNext(){
    $("[name='btnNext']").click();   
}

function crearDocumento(){
	var queryString = "";
	switch (application.sVista){
		case "vwMaestros":
			queryString = "frMaestro?Open"
			break;
		case "vwEmpleados":
			queryString = "frEmpleados?Open"
			break;
		case "vwPlantillas":
			queryString = "frPlantilla?Open"
			break;
		case "vwArchivos":
			queryString = "frArchivo?Open"
			break;
		case "vwIntroducciones":
			queryString = "frIntroduccion?Open"
			break;
		case "vwAvisos":
			queryString = "frAviso?Open"
			break;
		case "vwFlujos":
			queryString = "frFlujo?Open"
			break;
		case "vwEstados":
			queryString = "frEstado?Open"
			break;
		case "vwNotificaciones":
			queryString = "frNotificacion?Open"
			break;
		case "vwTransiciones":
			queryString = "frTransicion?Open"
			break;
		case "vwReportes":
			queryString = "frReporte?Open"
			break;
		case "vwSolicitudesBonos":
			queryString = "frSolicitudBono?Open"
			break;
		case "vwCargosEspecificos":
			queryString = "frCargosEspecificos?Open"
			break;
		}
	if (queryString != ""){
		location.href = application.sWebDbName + queryString
	}
}

function buscar(){
	var clave = $("[name='clave']").val()
	if (clave == ""){
		bAlert("Debe ingresar la clave de búsqueda");
		return false;
	}
	location.href = application.sWebDbName + "vwBusqueda?searchView&query=" + urlencode(clave) + "&SearchFuzzy=True&id=" + Math.random()
}

function buscarSolicitud()
{
	location.href=application.sWebDbName+"vwGenCedulaConse?searchView&query="+urlencode($("[name='cedula1']:input").val())+ "&id=" + Math.random()
}
