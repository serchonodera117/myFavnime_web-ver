<?php
Header('Access-Control-Allow-Origin: *');

$servername = "localhost";
$username = "id17488564_favnime117";
$password = "j/hq-}BpN6~8!M}2";
$dbname = "id17488564_favnime";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
die("Connection failed: " . $conn->connect_error);
}

$datos=json_decode(file_get_contents('php://input'),true);
$nombre= $datos['nombre'];
$contrasena=$datos['contrasena'];
$imagenUsuario=$datos['imagenUsuario'];

if($nombre!='' && $contrasena!='' && $imagenUsuario!=''){
  $sqlVerification = "SELECT * FROM Usuarios WHERE NombreUsuario='$nombre'";
  $result = $conn->query($sqlVerification);

 if ($result->num_rows > 0){echo "El nombre $nombre ya existe.";}
 else{
     $sql = "INSERT INTO Usuarios (NombreUsuario, ContrasenaUsuario, ImagenUsuario)
       VALUES ('$nombre', '$contrasena', '$imagenUsuario')";
        if ($conn->query($sql) === TRUE) {echo "$nombre, se ha registrado con éxito :D";}
         else {echo '{"error: "' . $sql . ' ' . $conn->error.'"}';}
  }
}
else{echo "Campos vacíos";}

$conn->close();
?>