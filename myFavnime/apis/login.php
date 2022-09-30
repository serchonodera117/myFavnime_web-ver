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

$nickname=$_GET["nickname"];
$contrasena=$_GET["contrasena"];

$sql = "SELECT * FROM Usuarios WHERE ContrasenaUsuario='$contrasena' AND NombreUsuario='$nickname'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $registros=array();
    $i=0;
    while($row = sqli_fetch_assoc($result)) {
    $registros[$i]=$row;
    $i++;
    }
    echo '{"DatosUsuario":'.json_encode($registros).'}';
    } else {
    echo '{"DatosUsuario":[]}';;
    }  
$conn->close();
?>