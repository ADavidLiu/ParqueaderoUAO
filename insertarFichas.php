<?php

    include "conexion.php";

    $codigoUsuarioFicha = $_POST["codigo"];
    $placaVehiculoFicha = $_POST["placa"];
    $bahia = $_POST["bahia"];

    $sql = "INSERT INTO fichas (codigoUsuarioFicha, placaVehiculoFicha, bahia) VALUES ('$codigoUsuarioFicha', '$placaVehiculoFicha', '$bahia')";
    $conexion->query($sql);

    $conexion->close();

?>