<?php
    
    include "conexion.php";

    $placa = $_POST["placa"];

    $sql = "INSERT INTO entradas (placaVehiculoEntrada, horaEntrada) VALUES ('$placa', NOW())";
    $conexion->query($sql);

    $conexion->close();

?>