<?php

    include "conexion.php";

    $placa = $_POST["placa"];

    $sql = "INSERT INTO salidas (placaVehiculoSalida, horaSalida) VALUES ('$placa', NOW())";
    $conexion->query($sql);

    $conexion->close();

?>