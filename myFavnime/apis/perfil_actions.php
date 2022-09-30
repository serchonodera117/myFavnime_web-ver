<?php
//header('Content-Type: application/json');
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
$codigo=$datos["codigo"];  //edit, upload, follow, save-item

if($codigo=="edit"){
    $idUsuario = $datos["id-usuario"];
    $imagenUsuario = $datos["imagenUsuario"];
    $conrrasenaUsuario = $datos["contrasena"];
    $nombre=$datos["nombre"];

    $sql = "UPDATE Usuarios SET NombreUsuario='$nombre'  
                                WHERE idusuario='$idUsuario'";
    
    if($conn->query($sql)){
        echo "Datos Actualizados";
    }else{
        echo '{"error: "' . $sql . ' ' . $conn->error.'"}';
    }
}


$conn->close();
?>
