<?php

    include "conexion.php";

    $codigo = $_POST["codigo"];
    $placa = $_POST["placa"];
    $foto = $_POST["foto"];

    $sql = "INSERT INTO ultimo_conductor (codigoUltimoConductor, placaVehiculoUltimoConductor, ultimaFotoConductor) VALUES ('$codigo', '$placa', '$foto')";
    $conexion->query($sql);

    $conexion->close();

?>