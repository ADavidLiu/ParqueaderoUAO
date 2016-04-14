<?php
    
    // Inicia la conexión predefinida con la base de datos
    $servername = "localhost";
    $username = "root";
    $password = "root"; // Password de la base de datos local
    $dbname = "parqueaderouao";
    
    // Crea la conexión
    $conexion = new mysqli($servername, $username, $password, $dbname);

    $codigo = $_POST["codigo"];
    $nombre1 = $_POST["nombre1"];
    $nombre2 = $_POST["nombre2"];
    $apellido1 = $_POST["apellido1"];
    $apellido2 = $_POST["apellido2"];
    $identificacion = $_POST["identificacion"];
    $edad = $_POST["edad"];
    //$foto = $_POST["foto"];
    $pago = $_POST["pago"];
    //$fechaVencimiento = $_POST["fechaVencimiento"];

    $existeUsuario = false;

    $sql = "SELECT codigo from usuarios";
    $resultados = $conexion->query($sql);
    
    if ($resultados->num_rows > 0) {
        while($ocurrencia = $resultados->fetch_assoc()) {
            if ($codigo == $ocurrencia["codigo"]) {
                $existeUsuario = true;
                break;
            }
        }
        if ($existeUsuario == false) {
            $sql = "INSERT INTO usuarios (codigo, nombre1, nombre2, apellido1, apellido2, identificacionUsu, edad, pago) VALUES ('$codigo', '$nombre1', '$nombre2', '$apellido1', '$apellido2', '$identificacion', '$edad', '$pago')";
            $conexion->query($sql);
        }
    } else {
        $sql = "INSERT INTO usuarios (codigo, nombre1, nombre2, apellido1, apellido2, identificacionUsu, edad, pago) VALUES ('$codigo', '$nombre1', '$nombre2', '$apellido1', '$apellido2', '$identificacion', '$edad', '$pago')";
        $conexion->query($sql);
    }

    // Cierra la conexión
    $conexion->close();

?>