$(function(){ 
	registerPartials(["hbDivEnlaceAnexo"])
	$("table").addClass("mainTable table table-striped table-bordered table-condensed").css({
		"margin-bottom": "0px"
	});
	
	$("tr td .datepicker, tr td .bootstrap-timepicker").parent().append( "<span class='clear' data-toggle='tooltip' title='Limpiar'><i class='icon-trash' id='icircle'></i></span>" );

	$(".clear").on("click",function(){
		var hermano = $(this).siblings();
		hermano.children('input').val("");
	})
	
	$('#dModal').on('hide', function (){
		try{
			delete window.frames["ifModal"];
		}catch(e){
		}
		$(this).find("h3").remove()
		$(this).find(".modal-body, .modal-footer").empty();
	})
	$("input:not([type])").attr("type", "text");
	addOnChange(':input');
	$("textarea").attr("rows","5");
	
	$(document).ajaxStart(
		function(){	
	  		$("#ajaxLoadingMessage").center();
	  		$("#ajaxLoadingMessage").show();
	 	}
	).ajaxStop(
		function(){		
    		$("#ajaxLoadingMessage").hide();
    		$(".xspPrevious").html("Anterior");
    		$(".xspNext").html("Siguiente");
    	}
	)
	
	$('#menuPrincipal li').on('mouseover', function (){
		$(this).find("ul").first().show();
	}).on('mouseleave', function (){
		$(this).find("ul").first().hide();
	});
	$('#menuPrincipal li.top ul').each(function (){
		$(this).find("li").last().css("background", "none")
	})
	
	switch (application.sForm){
	case "frError":
	case "frRespuesta":
		$("#general").show();
		break;
	}
	$(".campoRadio").parent("label").addClass("radio");
});

document.body.onkeypress = function(event){
	if(event.target.type && event.target.type.toLowerCase() != "textarea"){
		return bloquearEnter(event);
	}
}

function setEventosMouse(id, rutaOv, ruta){
	$("#"+id).on('mouseover', function (){
		$(this).attr("src", application.sWebDbName + rutaOv);
	}).on('mouseleave', function (){
		$(this).attr("src", application.sWebDbName + ruta);
	})
}

function abrirHome(){
	location.href = application.sWebDbName + "frPrincipal?Open&id=" + Math.random();
}

function cerrarSesion(){
	location.href = application.sWebDbName + "?logout"
}

function abrirRuta(ruta){
	location.href = application.sWebDbName + ruta + "&id=" + Math.random();
}

function abrirPagina(ruta, target){
	if (ruta != ""){
		switch (target){
			case "_blank":
				window.open(ruta);
				break;
			default:
				location.href = ruta;
				break
		}
	}
}

function addOnChange(selector){
	$(selector).change(function () { 
		$(this).parents("td").first().children(".aviso").remove()  
	})
}

function bAlert(sMess, callback){
    if(!callback){
        callback = function(){};
    }
    bootbox.alert(
            sMess,
            callback
            );
    $(".bootbox .modal-body").css({"height":"auto","width":"500px"});
}

function bConfirm(sMess, callback){
    bootbox.confirm(
            sMess, 
            function(result) {                        
                callback(result)                
            }
    );
    $(".bootbox .modal-body").css({"height":"auto","width":"500px"});
}

function login(){
	document.getElementById("ifRefrescar").src = application.sWebDbName + "pgVacia?OpenPage&login&id=" + Math.random();
}

function abrirRuta(ruta){
	location.href = application.sWebDbName + ruta + "&id=" + Math.random();
}

function seleccionarTodos(flag){
	if(flag){
		$("[name='$$SelectDoc']").attr("checked", true);
	}else{
		$("[name='$$SelectDoc']").removeAttr("checked");
	}
}

function nuevoDocumento(){
	location.href = application.sWebDbName + application.sForm + "?OpenForm"
}

function editar(){
	window.open(application.sWebDbName + "0/" + application.sUnid + "?EditDocument", document._domino_target);
}

function cerrar(){
	location.href = application.sWebDbName + application.sRedireccion + "&id=" + Math.random()
}

function abrirModal(url, height){
	$("#dModal .modal-body").height(height+"px");
	$("#dModal").modal({backdrop: "static",show: true});
	$("#dModal .modal-body").html("<iframe name='ifModal' style='width:100%;height:"+height+"px' frameBorder='no' vspace='0' src='"+url+"'></iframe>");
}

function adaptarModal(titulo, htmlBotones){
	var btnCerrar = "<a class='btn btn-mini' href='javascript:void(0)' onclick='cerrarModal()'><i class='icon-remove icon-white'></i> Cerrar </a>"
	parent.$("#dModal .modal-header").find("h3").remove().end().append("<h3>"+titulo+"</h3>")
	parent.$("#dModal .modal-footer").html((htmlBotones ? htmlBotones : "") + btnCerrar);
}

function guardarModal(){
	window.frames["ifModal"].guardar()
}

function cerrarModal(){
	$("#dModal").modal("hide");
}

function validarClave(callback){
	var parametros = "";
	var formulario = application.sForm;
	switch(formulario){
		case "frFlujo":
			parametros = "&nombre=" + urlencode($("[name='nombre']").val()) + "&formularios=" + $("[name='formularios']").val().join(";");
			break;
		case "frEstado":
			parametros = "&flujo="+urlencode($("[name=flujo]").val())+"&nombre="+urlencode($("[name=nombre]").val())+"&inicial="+urlencode($("[name=inicial]").val());
			break;
		case "frNotificacion":
		case "frReporte":
			parametros = "&nombre=" + urlencode($("[name='nombre']").val());
			break;
		case "frTransicion":
			parametros = "&flujo="+urlencode($("[name=flujo]").val())+"&estadoOrigen="+urlencode($("[name=estadoOrigen]").val())+"&estadoDestino="+urlencode($("[name=estadoDestino]").val());
			break;
	}
	var url = application.sWebDbName + "agValidarClave?Open&form=" + formulario + "&unid=" + application.sUnid + parametros;
	$.getJSON(url, function(data){
		if (data.msgError == ""){
			callback();
		}else{
			bAlert(data.msgError);
		}
	})
	.error(function(){
		bAlert("No se procesaron los datos. por favor intente mÃ¡s tarde");
	})
}

function eliminarDocumento(){
	bConfirm("Â¿Confirma que desea eliminar el documento?",function(response){
		if(response){
			var url = application.sWebDbName + "agEliminarDocumento?Open&unique=" + application.sUnique;
			$.getJSON(url, function(data){
				if (data.msgError == ""){
					location.href = application.sWebDbName + "frAlert?Open&msg=2&redirect=" + application.sRedireccion
				}else{
					bAlert(data.msgError);
				}
			})
			.error(function(){
				bAlert("No se procesaron los datos. por favor intente mÃ¡s tarde");
			})                            
		}
	});
}

function convertirANumero(cadena){
	if (cadena == ""){
		return 0
	}
	cadena = cadena.replace(/\./g, ",") 
	var arreglo = cadena.split(",")
	if (arreglo.length == 1){
		retorno = parseFloat(cadena)
	}else{
		if (arreglo[1] != ""){
			retorno = parseFloat(arreglo[0]) + (parseFloat(arreglo[1]) / (Math.pow(10,parseFloat(arreglo[1].length))))
		}else{
			retorno = parseFloat(arreglo[0])
		}
	}
	return retorno
}

function formatoNumero(numero){
	var cadena = numero + "";
	cadena = cadena.replace(/\./g, ",")
	var arreglo = cadena.split(",")
	cadena = ""
	encontro = false
	for (var i = 0; i < arreglo[0].length; i++){
		if (arreglo[0].substring(i,i+1) != "0" || encontro){
			cadena += arreglo[0].substring(i,i+1)
			encontro = true 
		}
	}
	arreglo[0] = cadena == "" ? "0" : cadena
	if (arreglo.length == 1){
		cadena = arreglo[0] + ",00"
	}else{
		cadena = arreglo[0] + "," + (arreglo[1]+"00").substring(0, 2)
	}	
	return cadena
}

function urlencode (str) {
    str = (str+'').toString();
    return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
}

function cero(){
	return "0,00"	
}

function avisoRequerido(){
	return "<div class=aviso>Campo requerido</div>"
}

function avisoNumero(){
	return "<div class=aviso>Ingrese un valor numérico</div>"
}

function avisoEntero(){
	return "<div class=aviso>Ingrese un número entero</div>"
}

function avisoEntero4(){
	return "<div class=aviso>Ingrese un número de 4 dígitos</div>"
}

function avisoNumeros(){
	return "<div class=aviso>Ingrese solamente números</div>"
}

function avisoAlfaNum(){
	return "<div class=aviso>Ingrese valor alfanumérico</div>"
}

function avisoUrl(){
	return "<div class=aviso>El formato de la url no es valido</div>"
}

function avisoImagen(){
	return "<div class=aviso>Seleccione un archivo con extensión png, jpg o gif</div>"
}

function avisoCedulaRepetida(){
	return "<div class=aviso>Cédula repetida</div>"
}

function esNumero(cadena){
	re =/^\d+(\,(\d+))?$/;
	if (cadena.match(re)){
		return true;
	}
	return false;
}

function esEntero(cadena){
	var re =/^\d+$/;
	return cadena.match(re)
}

function esAlfaNum(cadena){
	re1 =/^[a-zA-Z0-9]+$/ 
	if (cadena.match(re1)){
		return true;
	}
	return false;
}

function formatoUrlValido(cadena){
	re1 = /^https?:\/\/([\w\-\.])+(:\d+)?(\/.*)?$/;
	if (cadena.match(re1)){
		return true;
	}
	return false;
}

function soloNumeros(cadena){
	var re =/^\d+?$/;
	return cadena.match(re)
}

function extensionValida(ruta, reg){
	if (ruta == ""){
		return false
	}
	ruta = ruta.substring(ruta.lastIndexOf(".") + 1, ruta.length).toLowerCase();
	if (!ruta.match(reg)){
		return false;
	}
	return true
}

function camposNoValidos(campos, tipos, flag, seccion){
	
	if (flag){
		$(".aviso").remove();
	}
	var contador = 0
	
	for(var i = campos.length - 1; i >= 0; i--){
		var tipo = tipos[i];var tipo = tipos[i];
		var tipo = tipos[i];
		var campo;
		if (tipo == "div" || tipo == "file"){
			if (seccion){
				campo = $(seccion).find("[id='"+campos[i]+"']");	
			}else{
				campo = $("[id='"+campos[i]+"']");	
			}
		}else{
			if (seccion){
				campo = $(seccion).find("[name='"+campos[i]+"']");
			}else{
				campo = $("[name='"+campos[i]+"']");
			}
		}
		if (campo && campo.parents("td").first().find(".aviso").length == 0){
			
			if ((tipo == "text" && campo.val() == "") || (tipo == "multi" && campo.val() == null) || (tipo == "check" && $("[name='"+campos[i]+"']:checked").length == 0)){
				campo.parents("td").first().append(avisoRequerido());
				application.oCampoFocus = tipo == "text" ? campo : campo.parents("td").first().find(".select2-input");
				contador ++;
			}
			
			if (tipo == "numerico" ){
				if (esNumerico(campo.val())){alert ("El campo es numerico");}
				else{
					alert ("El campo es numerico");
					campo.parents("td").first().append(avisoNumero());
					application.oCampoFocus = campo;
					contador ++;
				}
				
			}
			if (tipo == "numds" && !esNumero(campo.val())){
				campo.parents("td").first().append(avisoNumero());
				application.oCampoFocus = campo;
				contador ++;
			}
			if (tipo == "entero" && !esEntero(campo.val())){
				campo.parents("td").first().append(avisoEntero());
				application.oCampoFocus = campo;
				contador ++;
			}
			if (tipo == "entero4" && (!esEntero(campo.val()) || campo.val().length != 4)){
				campo.parents("td").first().append(avisoEntero4());
				application.oCampoFocus = campo;
				contador ++;
			}
			if (tipo == "alfaNum" && !esAlfaNum(campo.val())){
				campo.parents("td").first().append(avisoAlfaNum());
				application.oCampoFocus = campo;
				contador ++;
			}
			if (tipo == "url" && !formatoUrlValido(campo.val())){
				campo.parents("td").first().append(avisoUrl());
				application.oCampoFocus = campo;
				contador ++;
			}
			if (tipo == "div" && campo.html() == ""){
				campo.parents("td").first().append(avisoRequerido());
				application.oCampoFocus = campo;
				contador ++;
			}
			if (tipo == "file" && campo.find(".enlaceAnexo").length == 0){
				campo.parents("td").first().append(avisoRequerido());
				application.oCampoFocus = campo;
				contador ++;
			}
		}
		
	}
	
	return contador;
}

function validarFila(selector, aCampos, aTipos, indice){
	if (indice > 0){
		return true;
	}
	var validar = false;
	$.each(aCampos, function(index){
		if ((aTipos[index] == "text" && $(selector).find("[name='"+this+"']").val() != "") || (aTipos[index] == "multi" && $(selector).find("[name='"+this+"']").val() != null) || (aTipos[index] == "anexos" && $(selector).find("."+this).length > 0)){
			validar = true;
			return false;
		}
	})
	return validar;
}

function isMember(valor, arreglo){
	for (var i = 0; i < arreglo.length; i++){
		if (arreglo[i] == valor){
			return true
		}
	}
	return false
}

function isNotMember(valor, arreglo){
	for (var i = 0; i < arreglo.length; i++){
		if (arreglo[i] == valor){
			return false
		}
	}
	return true	
}

function SelectFromAjaxField(selector, isMultiple, url){
	$(selector).select2({
        placeholder: "Buscar",
        minimumInputLength: 2,
        multiple: isMultiple,        
        ajax: { 
            url: url,
            dataType: 'json',        
            data: function (term, page) {
                return {
                    query: term, 
                    page_limit: 40
                };
            },
            results: function (data, page) {
                return {results: data.nodes};
            }
        },
        initSelection: function(element, callback) {
            var val = $(element).val();                        
            if(isMultiple){
                var data = [];
                $(val.split(",")).each(function () {
                	data.push({id: $.trim(this), text: $.trim(this)});                  
                });                
                callback(data);
            }else{
                var data = {id: val, text: val};
                callback(data);                
            }                       
        },
        formatResult: function(node){ 
        	if (!node.msgError){
        		return '<div>' + node.text + '</div>'
        	}else{
        		return '<div>' + node.msgError + '</div>'
            }
        } ,
        formatSelection: function (node) {
        	return node.id 
        },
        dropdownCssClass: "bigdrop",
        escapeMarkup: function (m) { 
        	return m; 
        }
    });   
	$(".select2-choices").addClass("img-rounded").css({"background":"#fff", "margin":"0 0 6px"});
}

function htmlSelect(name, array, multi, att){
	var html;
	if(multi){
		html = "<select name='"+name+"' multiple " + (att ? att : "") + ">";
	}else{
		html = "<select name='"+name+"' " + (att ? att : "") + "><option value=''></option>";
	}
	$.each(array, function (){
		html += "<option value='"+this+"'>"+this;
	})
	html += "</select>";
	return html;
}

function formatoValor(separador, valor){
	if (valor){
		if (valor == ""){
			valor = "xxxx"
		}else{
			valor = valor.replace(/"|â€œ|â€�/g, "'");
			valor = valor.replace(/xxxx/g, "##empty##");
			valor = valor.replace(/&/g, "##ampersand##");
			valor = valor.replace(/@/g, "##arroba##");
			valor = valor.replace(/\r\n|\r|\n/g, "##enter##");
		}
	}else{
		valor = "xxxx"
	}
	return separador + valor
}

function setNumeros(selector){
	$(selector).keyup(function () { 
		var valor = this.value.replace(/[^0-9\.,]/g,'').replace(/\./g, ',')
		valor = valor.substring(0,1) == "," ? "0"+valor : valor;
		if (this.value != valor){
			this.value = valor;
		}
	})
	.blur(function (){
		if (this.value != ""){
			this.value = formatoNumero(this.value)
		}
	});
}

function pintarGrafica(selector, arr, posY){
	$.plot(selector, arr, {
		series: {
			bars: {
				show: true,
				barWidth: 0.5,
				align: "center",
				showNumbers: true,
	            numbers : {
					xAlign: function(x) { return x; },
	                yAlign: function(y) { return y + posY; }
	            }
			},
			valueLabels: {
				show: true
			}
		},
		xaxis: {
			mode: "categories",
			tickLength: 0
		},
		yaxis: {
			max: 100,
			tickFormatter: function (val, axis) {
				return "<span class=yLabel>" + val + "%</span>";
			}
		},
		valueLabels: {
			show: true
		}
	});
}

function registerPartials(arrParcialTemplates){
	$.each(arrParcialTemplates, function(index, value) {
		Handlebars.registerPartial(value, $("#" + value).html());            
	});                
}

Handlebars.registerHelper('enEdicion', function(options) {  
	if(application.bEdicion) {
		return options.fn(this);  
	}  
	return options.inverse(this);
});

function cargarAnexos(){
	var arreglo;
	var seccion;
	var eliminar
	var url = application.sWebDbName + "agCargarAnexos?Open&unique=" + application.sUnique
	$.getJSON(url, function(data){
		if (data.msgError == ""){
			$(".anexos").each(function (){
				arreglo = []
				seccion = $(this).attr("data-seccion")
				if ($(this).attr("data-requerido") == "N"){
					eliminar = true
				}else{
					eliminar = false
				}
				$.each(data.anexos, function(){
					$.each(this.archivos, function(){
						this.eliminar = eliminar; 
					})
					if (this.seccion == seccion){
						arreglo = this.archivos
					}
				})
				$(this).html(templatesHb.templateDivAnexo(arreglo));
			})
			$("#general").show();
		}else{
			bAlert(data.msgError)
		}
	})
	.error(function(){
		bAlert("Ocurrió un error al procesar los datos. Por favor intente mÃ¡s tarde.")
	})		
}

function anexar(obj){
	var tabla = ""
	var indice = "";
	var unique = application.sUnique;
	var seccion = $(obj).parents(".anexos").first().attr("data-seccion");
	var requerido = $(obj).parents(".anexos").first().attr("data-requerido");
	var tipo = $(obj).parents(".anexos").first().attr("data-tipo");
	var multiple = $(obj).parents(".anexos").first().attr("data-multiple");
	if (!seccion){
		var tr = $(obj).parents("tr").first();
		tabla = tr.parents("table").first().attr("id")
		indice = tr.attr("class");
		unique = tr.find("[name='id']").val();
		seccion = "";
		if (unique == ""){
			unique = application.sUnique
			seccion =  tabla + indice;
		}
	}
	abrirModal(application.sWebDbName + "frAnexo?open&unique=" + unique + "&seccion=" + seccion + "&tabla=" + tabla + "&indice=" + indice + "&tipo=" + tipo + "&requerido=" + requerido + "&multiple=" + multiple, 150)
}

function adicionarAnexo(seccion, tabla, indice, unid, unique, archivo, nombre, requerido, multiple){
	var eliminar = requerido == "S" ? false : true;
	var objeto = {unid:unid, unique:unique, archivo:archivo, nombre:nombre, eliminar:eliminar}
	var selector = "[data-seccion='"+seccion+"']";
	if ($(selector).length == 0){
		selector = $("#"+tabla+" tbody").find("."+indice).find(".anexos");
	}
	if ($(selector).find(".enlaceAnexo").length == 0 || multiple != "S"){
		$(selector).empty().append(templatesHb.templateDivAnexo([objeto]))
		$(selector).next(".aviso").remove();
	}else{
		$(selector).find(".enlaceAnexo").last().after(templatesHb.templateDivEnlaceAnexo(objeto))
	}
}

function eliminarAnexo(obj){
	bConfirm("Â¿Confirma que desea eliminar el anexo seleccionado?",function(response){
		if(response){
			var unique = $(obj).next("a").attr("id");
			var url = application.sWebDbName + "agEliminarDocumento?Open&unique=" + unique;
			$.getJSON(url, function(data){
				if (data.msgError == ""){
					$(obj).parents("div").first().remove();
				}else{
					bAlert(data.msgError);
				}
			})
			.error(function(){
				bAlert("No se procesaron los datos. por favor intente mÃ¡s tarde");
			})                
		}
	});
}

jQuery.fn.center = function(parent) {
	if (parent) {
    	parent = this.parent();
	}else{
		parent = window;
    }
	this.css({
    	"position": "absolute",
    	"top": ((($(parent).height() - this.outerHeight()) / 2) + $(parent).scrollTop() + "px"),
    	"left": ((($(parent).width() - this.outerWidth()) / 2) + $(parent).scrollLeft() + "px")
	});
	return this;
}

function ordenFechasValido(fecha1, operador, fecha2){
	var aFecha1 = fecha1.split("/");
	var aFecha2 = fecha2.split("/");
	var dia1 = aFecha1[0];
	var mes1 = aFecha1[1];
	var anio1 = aFecha1[2];
	var dia2 = aFecha2[0];
	var mes2 = aFecha2[1];
	var anio2 = aFecha2[2];
	if(eval("parseFloat(anio1+mes1+dia1)"+operador+"parseFloat(anio2+mes2+dia2)")){
		return true
	}
	return false
}

function ordenHorasValido(hora1, operador, hora2){
	var aHora1 = hora1.split(" ");
	var aHora2 = hora2.split(" ");
	var aTiempo1 = aHora1[0].split(":");
	var jornada1 = aHora1[1];
	var aTiempo2 = aHora2[0].split(":");
	var jornada2 = aHora2[1];
	var horas1 = parseInt(aTiempo1[0], 10);
	var minutos1 = aTiempo1[1];
	var horas2 = parseInt(aTiempo2[0], 10);
	var minutos2 = aTiempo2[1];
	if (horas1 == 12){
		horas1 = 0;
	}
	if (horas2 == 12){
		if (jornada2 == "PM"){
			horas2 = 0;
		}else{
			horas2 = 24;
		}
	}
	if (jornada1 == "PM"){
		horas1 += 12
	}
	if (jornada2 == "PM"){
		horas2 += 12
	}
	var tiempo1 = horas1.toString()+minutos1
	var tiempo2 = horas2.toString()+minutos2
	if(eval("parseInt(tiempo1, 10)"+operador+"parseInt(tiempo2, 10)")){
		return true
	}
	return false
}

function validarEnter(e, selector){
	var keynum;

	if(window.event){
		keynum = e.keyCode;
	}else if(e.which){
		keynum = e.which;
	}

	if (keynum == 13){
		$(selector).click();
	}
	return true
}

function bloquearEnter(e){
	var keynum;

	if(window.event){
		keynum = e.keyCode;
	}else if(e.which){
		keynum = e.which;
	}

	if (keynum == 13){
		return false
	}
	return true;
}

function isEnterKey(evt){
	return (getKey(evt)==13)
}

function getKey(evt){
	if (!evt){	
	   evt = window.event;
	}else{
		if (!evt.keyCode){
	 		evt.keyCode = evt.which
		}
	}
	return (evt.keyCode)
}

function cancelarBono(){
	bConfirm("¿Confirma que desea cancelar la solicitud?",function(response){
		if(response){
			abrirModal(application.sWebDbName + ("frCancelarBono") + "?Open&unique=" + application.sUnique + "&flu=" + documento.sUniqueFlujo + "&est=" + documento.sUniqueEstado + "&edi=" + (application.bEdicion ? "1" : "0"), 200);
		}
	});
}