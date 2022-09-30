//----------- registro del modal
//variables
let contenedor_login = document.getElementById("contenedor-login");
let modalRegustro = document.getElementById('modalRegistro'); 
let contraControl = document.getElementById('contraseñaRegistro');  
let nombreUsuario = document.getElementById('NombreUsuario');
let contra1 = document.getElementById('Contrasena1');
let contra2 = document.getElementById('Contrasena2');
let preview  = document.getElementById('imagenRegistro');
let imageName = document.getElementById('image-name')
let progresResgistro = document.getElementById('progress-register');
progresResgistro.style.display="none";

let toast = document.getElementById('mensajeRegistro')

function desplegarRegistro(){modalRegustro.style.display = 'block'; 
                             contenedor_login.style.filter="blur(5px)";}
function cerrarRegistro(){
  modalRegustro.style.display = 'none'; 
                         progresResgistro.style.display= 'none';
                         contenedor_login.style.filter="blur(0px)";}
function cerrarToast(){toast.style.display = 'none';}

function hideShowPaswords(){
if(contraControl.checked) {
    contra1.type = 'text';
    contra2.type = 'text';
}else{
    contra1.type = 'password';
    contra2.type = 'password';
}
}

//--------- seleccionar imagen 
let userImg = null;
let docImg = document.getElementById("selectImage");
let allowedExtensions = /(.jpg|.png|.gif|.svg)$/i; 


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
          preview  = document.getElementById('imagenRegistro');
         let  image = document.createElement('img');
            image.innerHTML = ''
            image.style.width = "160px";
            image.style.height = "160px";
            image.style.objectFit = "cover";
            image.style.borderRadius = "50%";
            image.src = '';
            image.src = reader.result;
            preview.innerHTML = '';
            preview.append(image);
             userImg = image.src;
              
             let inputImage = document.querySelector("input[type=file]").files[0];
             imageName.innerText = inputImage.name;
             console.log(e.target.files[0])  
        }
  }
};


//--------------------------registro
function Registrar(){
 if(nombreUsuario.value != ""){
     if((contra1.value!= "" && contra2.value !="") && (contra2.value == contra1.value)){
       progresResgistro.style.display = "block";
       let a = EncriptarMD5(contra1.value).toString();
        let b = nombreUsuario.value;
        let imgUser = userImg 

    let url = `https://registrosappinventor.000webhostapp.com/favnime/registro.php?`
    let dataUser = {
      'nombre': b,
      'contrasena': a,
      'imagenUsuario':imgUser,
    }

    fetch(url,{
      method: 'POST',
      body: JSON.stringify(dataUser)
    })
    .then(response => response.text())
    .then(data => {
      cerrarRegistro();
      toastWrite(data);
      preview.value="";
      nombreUsuario.value =""
      contra1.value="";
      contra2.value="";

    })
    .catch((error)=>{
      cerrarRegistro();
      toastWrite("Error al conectarse a la base :(")
    })
    
      }else{alert("contraseñas NO coinciden");}
  }else{alert("No debe dejar el usuario en blanco")}
}


                                              //-------------------- entrar
let user = document.getElementById("nicknameLogin");
let myContra = document.getElementById("contraLogin");

function entrar(){
  if(user.value.trim() && myContra.value.trim()){
      let u = user.value
      let myC = EncriptarMD5(myContra.value)
      let urlLogin = `https://registrosappinventor.000webhostapp.com/favnime/login.php?nickname=${u}&contrasena=${myC}`

      fetch(urlLogin).then(response => response.json())
                     .then(data =>{
                          if(data.DatosUsuario == ""){   
                            toastWrite("contrasena de usuario en erroneos")
                          }else{
                          //  console.log(data)
                            let x = data.DatosUsuario[0];
                             localStorage.setItem("datosUsuario", JSON.stringify(x));
                             window.location="paginas/homescreen.html";
                         }
                      })
    }else{toastWrite("No debes dejar campos vacíos")}
}
//---- llamar la función de escaner para cargar los nombres
function callScan(){
  scan(nombreUsuario.value.toString(), contra1.value.toString())
}

//----------- escanear tanto nombre de usuario y contraseña para prohibir caracteres extraños
function scan(user, password){
  let strangeCharacters = "{}=!¡¿?[]+*'|°#$%&/();:~";
  let st1 = false;
  let st2 = false;
  contador= 0;
  let caracteres ="";
  console.log(`tamaño: ${user.split("").length}`)

  if(user.split("").length <=20 && password.split("").length <=20)
  {
  for(i=0; i< user.split("").length; i++){
    for(j=0; j<strangeCharacters.split("").length;j++){
      if(user[i]==strangeCharacters[j]){st1=true;
        caracteres+=user[i]
      }
      contador++;
    }
  }
  for(i=0; i< password.split("").length; i++){
    for(j=0; j<strangeCharacters.split("").length;j++){
      if(password[i]==strangeCharacters[j]){st2=true;
        caracteres+=password[i];
      }
      contador++;
    }
  }
   if(st1==true || st2==true){
      let mensaje = `Los caracteres ${caracteres} son invalidos, intentelo de nuevo`;
      toastWrite(mensaje.toString());
    }
    else{Registrar();}
  }else{toastWrite("El limite de caracteres para contraseña y usuario es 20")}
}


function toastWrite(contenidoMensaje){
  toast.style.display = "block";
  let mensaje = document.getElementById("toastRegistroContent");
  mensaje.innerHTML = ''
  mensaje.innerHTML = contenidoMensaje
}
