$(function(){
	adaptarModal("Anexo");
	$(".page-container").attr("align", "left");
	$(".container").width("100%")
	$(".input-append").css({"margin": "0px"});
	$("#cargador").attr("name",  $("#fileUpload").attr("name"));
	$("#general").show();
})

function cargar(){
	if($.trim($("[name='nombre']").val()) == ""){
		top.bAlert("Debe ingresar el nombre");
		return false;
	}
	
	ruta = $("#cargador").val();
	if ($.trim(ruta) == ""){
		top.bAlert("Debe seleccionar el archivo a cargar");
		return false;
	}
	var reg = ""
	var extensionesValidas;
	switch(documento.sTipo){
		case "IMG":
			reg = /png|jpg|gif/g;
			extensionesValidas = "png, jpg o gif";
			break;		
		case "FLA":
			reg = /swf/g;
			extensionesValidas = "swf";
			break;		
		case "VID":
			reg = /mp4/g;
			extensionesValidas = "mp4";
			break;		
		case "IOF":
			reg = /png|jpg|gif|swf/g;
			extensionesValidas = "png, jpg, gif o swf";
			break;
	}
	if (reg != ""){
		ruta = ruta.substring(ruta.lastIndexOf(".") + 1, ruta.length).toLowerCase();
		if (!ruta.match(reg)){
			top.bAlert("Debe elegir un archivo con extensión " + extensionesValidas);
			return false;
		}
	}
	$("#general").hide();
	$("#ajaxLoadingMessage").center();
	$("#ajaxLoadingMessage").show();
	document.forms[0].submit()
}