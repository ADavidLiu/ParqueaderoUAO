<?php

    include "conexion.php";

    $placa = $_POST["placa"];

    $sql = "SELECT * FROM entradas WHERE placaVehiculoEntrada = '$placa'";
    $resultados = $conexion->query($sql);

    if ($resultados->num_rows > 0) {
        while($ocurrencia = $resultados->fetch_assoc()) {
            echo $ocurrencia["horaEntrada"];
        }
    }

    $conexion->close();

?>