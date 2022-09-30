  //------Cargar los datos del usuario)  
if(localStorage.getItem("datosUsuario")){

 let usuario = JSON.parse(localStorage.getItem("datosUsuario"));
 let normalContra = localStorage.getItem("contraUsuario")
 
  let nombre = document.getElementById("myNombre");
  let foto = document.getElementById("myImagen");
  
     foto.src = usuario.ImagenUsuario;
     nombre.innerHTML = usuario.NombreUsuario;
}


//--------------- botón de editar perfil.

function irEdicion(){
  console.log("funciona")
  window.location = "edicion_perfil.html"
}




