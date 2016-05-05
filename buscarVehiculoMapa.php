<?php

    include "conexion.php";

    $bahia = $_POST["bahia"];
    
    $sql = "SELECT * FROM vehiculos v, fichas f, usuarios u WHERE f.placaVehiculoFicha = v.placa and f.bahia = '$bahia'
    and f.codigoUsuarioFicha = u.codigo";
    $resultados = $conexion->query($sql);

    if ($resultados->num_rows > 0) {
        $info = array();
        while($ocurrencia = $resultados->fetch_assoc()) {
            $info[] = array(
                'placa' => $ocurrencia["placa"],
                'modelo' => $ocurrencia["modelo"],
                'color' => $ocurrencia["color"],
                'codigo' => $ocurrencia["codigo"],
                'id' => $ocurrencia["identificacionUsu"],
                'edad' => $ocurrencia["edad"],
                'nombre1' => $ocurrencia["nombre1"],
                'nombre2' => $ocurrencia["nombre2"],
                'apellido1' => $ocurrencia["apellido1"],
                'apellido2' => $ocurrencia["apellido2"],
                'foto' => $ocurrencia["foto"]
            );
        }
        header('Content-Type: application/json');
        echo json_encode($info);
        exit();
    }

    $conexion->close();

?>