<?php

    include "conexion.php";

    $placa = $_POST["placa"];

    $sql = "DELETE FROM fichas WHERE placaVehiculoFicha = '$placa'";
    $conexion->query(sql);

    $conexion->close();

?>