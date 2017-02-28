var formElement = null;
// var secret = 50; //ahora se lee 23 de <answer>23</answer> suministrado en preguntas.xml
var respuestatext=null;
var respuestaselect=null;
var respuestacheckbox= [];


//al cargar la página... 
window.onload = function() {

    alert("BIENVENIDO AL FORMULARIO");

     
     //CORREGIR al apretar el botón
 formElement=document.getElementById('myform');
 formElement.onsubmit=function(){
   inicializar();
   if (comprobar()){
	corregiroscar1(); //text
	corregiroscar2(); //select
    corregiroscar3(); //multiple
	corregiroscar4(); //radio
    corregiroscar5(); //checkbox
	corregiroscar6(); //text
	corregiroscar7(); //checkbox
	corregiroscar8(); //text
	corregiroscar9(); //select
	corregiroscar10(); //select
    presentarNota();
   }
   return false;
 }
 //lee questions.xml
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            gestionarXml(this);
        }
    };
    xhttp.open("GET", "xml/questions.xml", true);
    xhttp.send();
 
 //****************************************************************************************************


function gestionarXml(dadesXml){
 var xmlDoc = dadesXml.responseXML; //Parse XML to xmlDoc
 
 //text oscar1
  var titulotext=xmlDoc.getElementsByTagName("title")[0].innerHTML;
  ponerDatosInputHtml(titulotext);
  respuestatext=(xmlDoc.getElementsByTagName("answer")[0].innerHTML);
 
 //select oscar2
 //Recuperamos el título y las opciones, guardamos la respuesta correcta
 var tituloselect=xmlDoc.getElementsByTagName("title")[1].innerHTML;
 var opcionesSelect = [];
 var nopt = xmlDoc.getElementById("oscar2").getElementsByTagName('option').length;
  for (i = 0; i < nopt; i++) { 
    opcionesSelect[i] = xmlDoc.getElementById("oscar2").getElementsByTagName('option')[i].innerHTML;
 }
 ponerDatosSelectHtml(oscar2,opcionesSelect);
 respuestaselect=parseInt(xmlDoc.getElementsByTagName("answer")[1].innerHTML);

  //multiple oscar3
 
 
 
 
 
 
 
 
  //radio oscar4
 
 
 
 
 
 
 
 //checkbox oscar5
 //Recuperamos el título y las opciones, guardamos las respuestas correctas
 var titulocheckbox = xmlDoc.getElementsByTagName("title")[4].innerHTML;
 var opcionesCheckbox = [];
 var nopt = xmlDoc.getElementById("oscar5").getElementsByTagName('option').length;
 for (i = 0; i < nopt; i++) { 
    opcionesCheckbox[i]=xmlDoc.getElementById("oscar5").getElementsByTagName('option')[i].innerHTML;
 }  
 ponerDatosCheckboxHtml(oscar5,opcionesCheckbox);
 var nres = xmlDoc.getElementById("oscar5").getElementsByTagName('answer').length;
 for (i = 0; i < nres; i++) { 
  respuestacheckbox[i]=xmlDoc.getElementById("oscar5").getElementsByTagName("answer")[i].innerHTML;
 }
}

//****************************************************************************************************
//implementación de la corrección

function corregiroscar1(){  //text
  //compara el texto escrito con el texto que hay en el xml
  
  var resp=formElement.elements[0].value;     
  if (resp==respuestatext) {
   darRespuestaHtml("Correcto!");
   nota +=1;
  }
  else {
    if (resp!=respuestatext) darRespuestaHtml("Incorrecto...");
    
  }
}

function corregiroscar2(){  //select
  //Compara el índice seleccionado con el valor del íncide que hay en el xml (<answer>2</answer>)
  //para implementarlo con type radio, usar value para enumerar las opciones <input type='radio' value='1'>...
  //luego comparar ese value con el value guardado en answer
  var sel = formElement.elements[1];  
  if (sel.selectedIndex-1==respuestaselect) { //-1 porque hemos puesto una opción por defecto en el select que ocupa la posición 0
   darRespuestaHtml("Correcto");
   nota +=1;
  }
  else darRespuestaHtml("Incorrecto");
}


function corregiroscar3(){
	
	
/////////////////////////////////////////////////////////////////////////
	
	
	
}


function corregiroscar4(){
	
	
/////////////////////////////////////////////////////////////////////////	
	
	
	
	
}


//Si necesitáis ayuda para hacer un corregirRadio() decirlo, lo ideal es que a podáis construirla modificando corregirCheckbox

function corregiroscar5(){  //checkbox
  //Para cada opción mira si está checkeada, si está checkeada mira si es correcta y lo guarda en un array escorrecta[]
  var f=formElement;
  var escorrecta = [];
  for (i = 0; i < f.color.length; i++) {  //"color" es el nombre asignado a todos los checkbox
   if (f.color[i].checked) {
    escorrecta[i]=false;     
    for (j = 0; j < respuestacheckbox.length; j++) {
     if (i==respuestacheckbox[j]) escorrecta[i]=true;
    }
    //si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
    if (escorrecta[i]) {
     nota +=1.0/respuestacheckbox.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml(""+i+" correcta");    
    } else {
     nota -=1.0/respuestacheckbox.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml(""+i+" incorrecta");
    }   
   } 
  }
}


function corregiroscar6(){  //text
	//compara el texto escrito con el texto que hay en el xml
  
  var resp=formElement.elements[0].value;     
  if (resp==respuestatext) {
   darRespuestaHtml("Correcto!");
   nota +=1;
  }
  else {
    if (resp!=respuestatext) darRespuestaHtml("Incorrecto...");
    
  }	
}


function corregiroscar7(){  //checkbox
	  //Para cada opción mira si está checkeada, si está checkeada mira si es correcta y lo guarda en un array escorrecta[]
  var f=formElement;
  var escorrecta = [];
  for (i = 0; i < f.color.length; i++) {  //"color" es el nombre asignado a todos los checkbox
   if (f.color[i].checked) {
    escorrecta[i]=false;     
    for (j = 0; j < respuestacheckbox.length; j++) {
     if (i==respuestacheckbox[j]) escorrecta[i]=true;
    }
    //si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
    if (escorrecta[i]) {
     nota +=1.0/respuestacheckbox.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml(""+i+" correcta");    
    } else {
     nota -=1.0/respuestacheckbox.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml(""+i+" incorrecta");
    }   
   } 
  }	
	
}



function corregiroscar8(){  //text
	//compara el texto escrito con el texto que hay en el xml
  
  var resp=formElement.elements[0].value;     
  if (resp==respuestatext) {
   darRespuestaHtml("Correcto!");
   nota +=1;
  }
  else {
    if (resp!=respuestatext) darRespuestaHtml("Incorrecto...");
    
  }	
		
}



function corregiroscar9(){  //select
	var sel = formElement.elements[1];  
  if (sel.selectedIndex-1==respuestaselect) { 
   darRespuestaHtml("Correcto");
   nota +=1;
  }
  else darRespuestaHtml("Incorrecto");	
	
}


function corregiroscar10(){ //select
	//Compara el índice seleccionado con el valor del íncide que hay en el xml (<answer>2</answer>)
  //para implementarlo con type radio, usar value para enumerar las opciones <input type='radio' value='1'>...
  //luego comparar ese value con el value guardado en answer
  var sel = formElement.elements[1];  
  if (sel.selectedIndex-1==respuestaselect) { //-1 porque hemos puesto una opción por defecto en el select que ocupa la posición 0
   darRespuestaHtml("Correcto");
   nota +=1;
  }
  else darRespuestaHtml("Incorrecto");	
		
}


//****************************************************************************************************
// poner los datos recibidos en el HTML
function ponerDatosInputHtml(t){
 document.getElementById("titulotext").innerHTML = t;
}

function ponerDatosSelectHtml(t,opt){
  document.getElementById("tituloselect").innerHTML=t;
  var select = document.getElementsByTagName("select")[1];
  for (i = 0; i < opt.length; i++) { 
    var option = document.createElement("option");
    option.text = opt[i];
    option.value=i+1;
    select.options.add(option);
 }  
}

function ponerDatosCheckboxHtml(t,opt){
 var checkboxContainer=document.getElementById('checkboxDiv');
 document.getElementById('titulocheckbox').innerHTML = t;
 for (i = 0; i < opt.length; i++) { 
    var input = document.createElement("input");
    var label = document.createElement("label");
    label.innerHTML=opt[i];
    label.setAttribute("for", "color_"+i);
    input.type="checkbox";
    input.name="color";
    input.id="color_"+i;;    
    checkboxContainer.appendChild(input);
    checkboxContainer.appendChild(label);
    checkboxContainer.appendChild(document.createElement("br"));
 }  
}

//****************************************************************************************************
//Gestionar la presentación de las respuestas
function darRespuestaHtml(r){
 var p = document.createElement("p");
 var node = document.createTextNode(r);
 p.appendChild(node);
 document.getElementById('resultadosDiv').appendChild(p);
}

function presentarNota(){
   darRespuestaHtml("Nota: "+nota+" puntos sobre 10");
}

function inicializar(){
   document.getElementById('resultadosDiv').innerHTML = "";
   nota=0.0;
}

//Comprobar que se han introducido datos en el formulario
function comprobar(){
   var f=formElement;
   var checked=false;
   for (i = 0; i < f.color.length; i++) {  //"color" es el nombre asignado a todos los checkbox
      if (f.color[i].checked) checked=true;
   }
   if (f.elements[0].value=="") {
    f.elements[0].focus();
    alert("Escribe");
    return false;
   } else if (f.elements[1].selectedIndex==0) {
    f.elements[1].focus();
    alert("Selecciona una opción");
    return false;
   } if (!checked) {    
    document.getElementsByTagName("h3")[2].focus();
    alert("Selecciona una opción del checkbox");
    return false;
   } else  return true;
}
}

