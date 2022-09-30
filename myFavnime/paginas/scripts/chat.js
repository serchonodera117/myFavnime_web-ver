//get info fromuser to his profile data
let userPic = document.getElementById("img-prfile");
let userData = JSON.parse(localStorage.getItem("datosUsuario"))
userPic.src = userData.ImagenUsuario;


function myprint(){alert("boton jalando");}
function displayModalContact(){
    alert("modal con las chingaderas que me dan hueva poner ahorita");

}