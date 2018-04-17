$(function(){
	$('.datepicker').datepicker({
		autoclose:true,
		language:'es'
	});
	
	$("[name='horaInicioPermiso'],[name='horaFinPermiso'],[name='horaInicioCompensacion'],[name='horaFinCompensacion']").timepicker({
		autoclose:true,
		minuteStep: 15,
		defaultTime: ''
	 });
	
	$("[name='diasCompensacion'],[name='diasPermiso']").select2({placeholder: "Buscar"});
	
	SelectFromAjaxField("[name='jefe']", false, application.sWebDbName + 'agBuscarPersonas?Open');
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
	var aCampos = ["jefe","tipoPermiso","fechaInicioSolicitud","fechaFinSolicitud","horaInicioPermiso","horaFinPermiso","diasPermiso"];
	var aTipos = ["text","text","text","text","text","text","multi"];
	var contador = camposNoValidos(aCampos, aTipos, true);
	
	if (contador > 0){
		bAlert("Por favor, diligencie correctamente los campos indicados");
		return false;
	}
	return true;
}

function validarSolicitud(x){
	if(x == "g"){
		document.forms[0].submit();
	}else{
		abrirCambioEstado(x);
	}
}