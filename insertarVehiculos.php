<?php
    
    include "conexion.php";

    // Variables recibidas a través de AJAX
    $placa = $_POST["placa"];
    $modelo = $_POST["modelo"];
    $color = $_POST["color"];
    
    // Controla si agregar o no un vehículo en la base de datos
    $existe = false;

    // Primero busca en la base de datos si este vehículo ya se encuentra o no
    $sql = "SELECT placa from vehiculos";
    $resultados = $conexion->query($sql);
    // Si el número de ocurrencias es mayor a 0
    if ($resultados->num_rows > 0) {
        while($ocurrencia = $resultados->fetch_assoc()) {
            // Checkea si la placa (única) insertada coincide con alguna de las placas ya existentes en la base de datos
            if ($placa == $ocurrencia["placa"]) {
                // Si ya existe, sólo agrega la entrada
                $sql = "INSERT INTO entradas (placaVehiculoEntrada, horaEntrada) VALUES ('$placa', NOW())"; // NOW() retorna la fecha y hora actuales
                $conexion->query($sql);
                $existe = true;
                break; // Si ya encuentra una similitud, sale del while
            }
        }
        // Sino, lo registra como un nuevo vehículo y agrega su entrada
        if ($existe == false) {
            $sql = "INSERT INTO vehiculos (placa, modelo, color) VALUES ('$placa', '$modelo', '$color')";
            $conexion->query($sql);
                
            $sql = "INSERT INTO entradas (placaVehiculoEntrada, horaEntrada) VALUES ('$placa', NOW())"; // NOW() retorna la fecha y hora actuales
            $conexion->query($sql);
        }
    } else { // Esta parte sólo es por si la base de datos está vacía, es decir, sólo se ejecuta la primera vez.
        $sql = "INSERT INTO vehiculos (placa, modelo, color) VALUES ('$placa', '$modelo', '$color')";
        $conexion->query($sql);
        
        $sql = "INSERT INTO entradas (placaVehiculoEntrada, horaEntrada) VALUES ('$placa', NOW())";
        $conexion->query($sql);
    }
    
    // Cierra la conexión
    $conexion->close();
?>