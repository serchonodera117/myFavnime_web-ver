//inicio de la pagina.
window.addEventListener("load", ()=>{
  //Notification.requestPermission().then(response => {})
  //console.log(response)    //granted
                           //denied
})
//paginas : "paginas del nav menu o externas"
localStorage.setItem("tipo_pagina","menu")//tipos: "menu","especial"

//variables del html
let pagina = document.getElementById("CurrentPage");
let navButoms=[4];

navButoms[0] = document.getElementById("a-home");
navButoms[1] = document.getElementById("a-directory");
navButoms[2] = document.getElementById("a-messages");
navButoms[3] = document.getElementById("a-profile");


let notificaciones = document.getElementById("notificaciones");
let c1='rgb(47, 13, 83)';
let c2='rgb(214, 116, 50)';

let notificationContainer = document.getElementById("div-notification-container");

  //------------------------------------------- cambio de paginas
let PushProfile = () => { //------- perfil
  pagina.innerHTML = `
  <iframe src="perfil.html" class="pagina"></iframe>
`;
setBtnColor(3);
}
let PushMessage = () => {//------ chat
  pagina.innerHTML = `
  <iframe src="mensajes.html" class="pagina"></iframe>
`;
setBtnColor(2);
}
let PushDirectory = () => {//------- directorio
  pagina.innerHTML = `
  <iframe src="directorio.html" class="pagina"></iframe>
`;
setBtnColor(1);
}
let PushMyHome = () => {//------- home
  pagina.innerHTML = `
  <iframe src="myhome.html" class="pagina"></iframe>
`;
setBtnColor(0);
}
                   //----------------------------------------------------------------------salir
let Salir = ()=>{openModal();}
let out = ()=>{ window.location = "../login.html"}

   //cerrar o abrir el modal de salida
let openModal= ()=>document.getElementById('modal-salir').style.display = 'block';
let closeModal=()=> document.getElementById('modal-salir').style.display = 'none'

                //----------------------------------------------------cambio de color para iconos
function setBtnColor(number){
  for(i=0; i<navButoms.length;i++){
    if(i==number){navButoms[i].style.color=c2;}
    else{navButoms[i].style.color=c1}
  }
}
                        //-------------------------- checar las paginas (si es del menú o no, para hacer eventos)
function checkPage(page){
let noti = document.querySelector("#notificaciones");
  noti.style.display = (page=="menu")?"block":"none";
}

//-----------------------------------------------------------------------------------------------------------------------notificaciones 
let ntfyContainer=document.getElementById("div-notification-container");
let closeNTF=document.getElementById("cerrar-notificaciones");
let indicadorNTFY=document.getElementById("indicador-notificaciones");
let hideNTFY=document.getElementById("hide-notifications")
let showingNTF = false;
let bodyNTFYcontiner=document.getElementById("div-container-body");
let ntfyCounter = 0;

indicadorNTFY.innerHTML= ntfyCounter;


function hide_showNTY(){ //-------------------------mazimizar-minimizar la caja de notificaciones
  if(showingNTF){
    bodyNTFYcontiner.style.display = "none";
    hideNTFY.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-up-fill" viewBox="0 0 16 16">
    <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
    </svg>
`;
    ntfyContainer.style.height ="2rem";
    showingNTF=false;
  }else{                                        //--cambio de icono al botón  
    bodyNTFYcontiner.style.display = "block";
    hideNTFY.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
    </svg>
  `;
    ntfyContainer.style.height ="20rem";
    showingNTF=true;
  }

}

//----------------- auto refresco cada n cantidad de tiempo notificaciones
   //setInterval('createNotification()',1000);
   //...comprovación del refresco de las notificaciones [aprovado]
   //...el refrescado de las consultas de las notificaciones no refresca completamente la pagina
   //...dependiendo de la situación que se presente en las consultas a tiempo real, podría usarse
   //...esta función para refrescar cada N cantidad de tiempo que sea necesario para consultar
   //...constantemente la base de datos y recibir la notificación cuando suceda. 
   //... es una opción, no necesariamente podría aplicarse así, sin embargo, a las muy malas, podría usarla. 
       
   
           //-------------------------------crear notificaciones
let i = 0;
function createNotification(){
  ntfyCounter++;
  indicadorNTFY.style.display="block";
  indicadorNTFY.innerHTML= ntfyCounter;
 
  let type = ["mensaje","solicitud de amistad","nuevo capitulo"];
  let contenido = "mensaje"
  if(i==0){
    contenido=`
    has recibido un nuevo mensaje
    <button type="button" class="btn btn-primary"onclick="PushMessage()">ir</button>
    `
  }
  bodyNTFYcontiner.innerHTML+= `
 <div id="ntfy-${ntfyCounter}" class="notificacion" style="display: block; margin-left:7%" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
        <img src="../images/toast.png" class="rounded me-2" width="15%" height="15%">
        <strong class="me-auto">myFavnime</strong>
        <small id="ntfy-type-${ntfyCounter}">${type[i]}</small>
        <button id="ntfy-closer" type="button" onclick="cerrarnotificaciones(${ntfyCounter})"
         class="btn-close"  aria-label="Close"></button>
      </div>
      <div id="ntfy-content-${ntfyCounter}" class="toast-body contenido-notificacion">
        ${contenido}
      </div>
    `;
    if(Notification.permission==='granted'){
      new Notification(type[i],{
          icon: '../images/toast.png',
          body: 'myFavnime'
        })
    }
    i=(i==2)?0:i+1;
}

        
        //----cerrar notificacion en especifico
function cerrarnotificaciones(nid){
  let id = "ntfy-"+nid
  document.getElementById(id).remove();
  ntfyCounter--;
  indicadorNTFY.innerHTML= ntfyCounter;
  if(ntfyCounter == 0){
    indicadorNTFY.style.display="none";
    hide_showNTY()
  }
}

              //----------------------------------------------Silenciar notificaciones
              let silencingNFTY = true;
//--------- cerrar todo el contenedor.
function closeNTFContainers(){
  ntfyContainer.style.display = 'none';
  silencingNFTY = false;
  bellStatus();
}
function openNTFContainers(){
  ntfyContainer.style.display = 'block';  
  silencingNFTY=true;
  bellStatus();
}

function bellStatus(){
  if(silencingNFTY){//---------mostrando
    notificaciones.innerHTML=`
      <svg id="notification-bell" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell" viewBox="0 0 16 16">
      <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
      </svg>
    `;
 }else{ //--------------ocultando.
    notificaciones.innerHTML=`
        <svg  id="notification-bell" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell-slash" viewBox="0 0 16 16">
        <path d="M5.164 14H15c-.299-.199-.557-.553-.78-1-.9-1.8-1.22-5.12-1.22-6 0-.264-.02-.523-.06-.776l-.938.938c.02.708.157 2.154.457 3.58.161.767.377 1.566.663 2.258H6.164l-1 1zm5.581-9.91a3.986 3.986 0 0 0-1.948-1.01L8 2.917l-.797.161A4.002 4.002 0 0 0 4 7c0 .628-.134 2.197-.459 3.742-.05.238-.105.479-.166.718l-1.653 1.653c.02-.037.04-.074.059-.113C2.679 11.2 3 7.88 3 7c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0c.942.19 1.788.645 2.457 1.284l-.707.707zM10 15a2 2 0 1 1-4 0h4zm-9.375.625a.53.53 0 0 0 .75.75l14.75-14.75a.53.53 0 0 0-.75-.75L.625 15.625z"/>
        </svg>
    `;
    Notification.permission='denied';
 }
}

function ntfyBlockAllow(){
   if(!silencingNFTY){
    openNTFContainers();
   }else{
    closeNTFContainers();
   }
}
