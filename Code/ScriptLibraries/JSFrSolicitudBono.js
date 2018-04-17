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
	var aCampos = ["jefe","fechaRedencion","jornada"];
	var aTipos = ["text","text","text"];
	var contador = camposNoValidos(aCampos, aTipos, true);
	
	if (contador > 0){
		bAlert("Por favor, diligencie correctamente los campos indicados");
		return false;
	}
	
	var fecha;
	var anio;
	var anioActual;
	
	fecha = $("[name='fechaRedencion']").val().split("/");
	anio = parseInt(fecha[2],10);
	fecha = documento.sFechaActual.split("/");
	anioActual = parseInt(fecha[2],10);
	if(anio > anioActual){
		bAlert("El año de la fecha de redención debe ser igual año actual");
		return false;
	}
	if(!application.bEsAdmin){		
		if (documento.sPermitirAprobarVencidas == "N"){
			if (ordenFechasValido($("[name='fechaRedencion']").val(), "<", documento.sFechaActual)){
				bAlert("La fecha de redención debe ser hoy o superior");
				return false;
			}
		}						
	}
	return true;
}

function validarSolicitud(x){
		var jornada;
		var url = application.sWebDbName + "agValidarSolicitudMes?Open&autor=" + documento.sAutorAbbreviate + "&fechaRedencion=" +(application.bEdicion ?$("[name = fechaRedencion]").val() :documento.sFechaRedencion) +"&jornada="+(application.bEdicion ?$("[name = jornada]").val(): documento.sJornada)+"&unique="+application.sUnique+"&cargo="+(application.bEdicion ?$("[name = cargo]").val() :documento.sCargo)+"&solicitud=frConfBonoTiempo&form="+application.sForm+"&cedula="+$("[name='cedula']").val();
		$.getJSON(url, function(data){
			if (data.msgError == ""){
				if (!data.fechaValida){
					bAlert("No es posible generar una nueva solicitud, la fecha de redención es mayor a la fecha de vencimineto de bonos");
					return false;
				}
				if (data.mes > 0){
					if( $("[name='jornada']").val()=="D"){
						var num = data.mes - 2
						bAlert("La solicitud excede el número de jornadas disponibles para "+data.nomMes+", no es posible generar una nueva solicitud de día completo para el mismo mes");
						return false;
					}
					bAlert("La solicitud excede el número de jornadas disponibles para "+data.nomMes+", no es posible generar una nueva solicitud para el mismo mes");
					return false;
				}
				
				
				if (data.jornadaRepetida > 0 ){
					if(application.bEdicion){
						jornada = $("[name = jornada] option:selected").text();
					}else{
						if(documento.sJornada == "T"){
							jornada = "tarde";
						}else if(documento.sJornada == "D"){
							jornada = "día completo";
						}else{
							jornada = "mañana";
						}
					}
					bAlert(documento.sAutorCommon+" ha registrado en el sistema una solicitud para el dia "+data.dia+" de "+data.nomMes+" en la "+jornada+" no es posible generar una nueva solicitud con la misma jornada para el mismo día");
					return false;
				}
				
				
				if (data.anio > 0){
					if( $("[name='jornada']").val()=="D"){
						var num = data.anio - 2
						bAlert("La solicitud excede el número de jornadas disponibles para el año "+data.anioActual+", no es posible generar una nueva solicitud de día completo para este año");
						return false;
					}
					bAlert("La solicitud excede el número de jornadas disponibles para el año "+data.anioActual+", no es posible generar una nueva solicitud para este año");
					
					return false;
				}
				
				if ( $("[name='jornada']").val()=="D"){
					if (!data.diaCompletoDisponible){
						bAlert("No es posible crear una solicitud de día completo para este año, por favor seleccionar otra jornada")
						return false 
					}
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
