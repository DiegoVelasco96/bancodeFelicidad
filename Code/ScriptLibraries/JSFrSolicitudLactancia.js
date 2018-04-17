$(function(){
	$('.datepicker').datepicker({
		autoclose:true,
		language:'es'
	});
	SelectFromAjaxField("[name='jefe'], [name='usuarioEntrega']", false, application.sWebDbName + 'agBuscarPersonas?Open');
	$("#general").show();
})

function guardar(){
	if (!camposValidos()){
		return false;
	}
	validarSolicitud("g");
	
}

function adelantar(){
	cambiarEstado("AD")
}

function retroceder(){
	cambiarEstado("AT")
}

function cambiarEstado(direccion){
	if (application.bEdicion){
		if (!camposValidos()){
			return false;
		}
	}
	validarSolicitud(direccion);
}

function abrirCambioEstado(direccion){
	abrirModal(application.sWebDbName + (direccion ? "frCambioEstado" : "frAdmonFlujo") + "?Open&unique=" + application.sUnique + "&flu=" + documento.sUniqueFlujo + "&est=" + documento.sUniqueEstado + "&dir=" + (direccion ? direccion : "") + "&edi=" + (application.bEdicion ? "1" : "0"), 250);
}

function verHistorial(){
	abrirModal(application.sWebDbName + "frHistorial?Open&unique=" + application.sUnique, 250);
}

function eliminarSolicitud(){
	bConfirm("¿Confirma que desea eliminar el documento?",function(response){
		if(response){
			abrirModal(application.sWebDbName + "frEliminar" + "?Open&unique=" + application.sUnique + "&est=" + documento.sUniqueEstado + "&edi=" + (application.bEdicion ? "1" : "0"), 140);
		}
	});
}

function camposValidos(){
	var aCampos = ["jefe","jornada","nombreHijo"];
	var aTipos = ["text","text","text"];
	
	if (documentoAux.sRango == "S"){
		aCampos.push("fechaInicio","fechaFin");
		aTipos.push("text","text");
		
		var fechaI = new Date();
		var fechaF = new Date();
		var fechaInicio = ($("[name=fechaInicio]").val()).split("/");
		var fechaFin = ($("[name=fechaFin]").val()).split("/");
		
		fechaI.setFullYear(fechaInicio[2],fechaInicio[1]-1, fechaInicio[0])
		fechaF.setFullYear(fechaFin[2],fechaFin[1]-1, fechaFin[0])
		
		if(fechaF < fechaI){
			bAlert("La fecha fin debe ser mayor a la fecha inicio");
			return false;
		}
		
	}
	var contador = camposNoValidos(aCampos, aTipos, true);
	var fNacimiento = $("[name='fechaNacimiento']").val()
	if (fNacimiento == ""){
		aCampos.push("fechaNacimiento");
		aTipos.push("text");
	}
	if (contador > 0){
		bAlert("Por favor, diligencie correctamente los campos indicados");
		return false;
	}
	return true;
}

function validarSolicitud(x){
		var jornada;
		var url = application.sWebDbName + "agValidarSolicitudesMes?Open&autor=" + documento.sAutorAbbreviate +  "&fechaNacimiento=" +(application.bEdicion ?$("[name = fechaNacimiento]").val() :documento.sfechaNacimiento)+  "&nombreHijo=" +(application.bEdicion ?$("[name = nombreHijo]").val() :documento.sHijo)+ "&fechaRedencion=" +(application.bEdicion ?$("[name = fechaIngreso]").val() :documento.sFechaRedencion) +"&jornada="+(application.bEdicion ?$("[name = jornada]").val(): documento.sJornada)+"&form="+application.sForm+"&unique="+application.sUnique+"&cargo="+(application.bEdicion ?$("[name = cargo]").val() :documento.sCargo);
		$.getJSON(url, function(data){			
			if (data.msgError == ""){
				if (data.mes > 0){
					//bAlert(documento.sAutorCommon+" ha registrado en el sistema una solicitud para el dia "+data.dia+" de "+data.nomMes+" con dias igual a "+jornada+" no es posible generar una nueva solicitud con la misma información");
					bAlert("La solicitud excede el número permitido para "+data.nomMes+", no es posible generar una nueva solicitud para el mismo mes");
					return false;
				}
				
				if (data.jornadaRepetida > 0 ){
					if(application.bEdicion){
						jornada = $("[name = jornada] option:selected").text();
					}else{
						jornada = documento.sJornada;
					}
					//bAlert(documento.sAutorCommon+" ha registrado en el sistema una solicitud para el dia "+data.dia+" de "+data.nomMes+" con el horario: "+jornada+" no es posible generar una nueva solicitud con la misma información");
					bAlert(documento.sAutorCommon+" ha registrado en el sistema una solicitud con el mismo número de horas ("+jornada+").  No es posible generar una nueva solicitud con la misma información");
					return false;
				}
				
				
				if (data.anio > 0){
					bAlert("La solicitud excede el número de horas disponibles para el año "+data.anioActual+", no es posible generar una nueva solicitud para este año");
					return false;
				}
				if(x == "g"){
					document.forms[0].submit();
				}
				else{
					abrirCambioEstado(x);
				}	
			}else{
				bAlert(data.msgError);
			}
		})
		.error(function(){
			bAlert("No se procesaron los datos. por favor intente más tarde");
		})
	
}