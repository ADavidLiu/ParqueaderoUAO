<?php

    include "conexion.php";

    $codigoUsuarioFicha = $_POST["codigo"];
    $placaVehiculoFicha = $_POST["placa"];

    $sql = "INSERT INTO fichas (codigoUsuarioFicha, placaVehiculoFicha) VALUES ('$codigoUsuarioFicha', '$placaVehiculoFicha')";
    $conexion->query($sql);

    $conexion->close();

?>