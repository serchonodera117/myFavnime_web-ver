//---- cargar datos usuario
 let imgUser=document.querySelector("#imgEdit");
 let userName=document.querySelector("#nombreEdit");
let descripcion=document.querySelector("#descripcion")

let usuario = JSON.parse(localStorage.getItem("datosUsuario"));


 imgUser.src= usuario.ImagenUsuario;
 userName.value = usuario.NombreUsuario;

 //--------- seleccionar imagen 
let finalImage = null;
let allowedExtensions = /(.jpg|.png|.gif|.svg)$/i; 
let docImg = document.querySelector("#selectImage");

 docImg.onchange = (e)=>{
  let ruta = docImg.value;
  if(!allowedExtensions.exec(ruta)){
    alert("Solo se permiten imagenes .jpg, .png, .gif, .svg")
    docImg.value='';
  }
  else{ 
   let reader = new FileReader()
     reader.readAsDataURL(e.target.files[0]);
     reader.onload = ()=>{
        imgUser.src=reader.result
        finalImage = reader.result
        }
  }
};
                            //-----------actualizar los datos petición http
function actualizar(){
    if(userName.value.trim()&&imgUser.src!=""){
        let url =`https://registrosappinventor.000webhostapp.com/favnime/perfil.php?`
        let myObg={
            'codigo':"edit",
            'id-usuario':usuario.idusuario,
            'nombre': userName.value.toString(),
        }
        // 'imagenUsuario':imgUser,
        //     'descripcion:':descripcion

    
        fetch(url,{
            method: 'POST',
            body: JSON.stringify(myObg)
          })
          .then(response => response.text())
          .then(data => {
            alert(data.toString());
          })
          .catch((error)=>{
            alert(error.toString());
        })
    }
}