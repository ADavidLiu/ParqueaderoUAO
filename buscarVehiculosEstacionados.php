<?php

    include "conexion.php";
    
    $sql = "SELECT * FROM vehiculos v, fichas f WHERE f.placaVehiculoFicha = v.placa";
    $resultados = $conexion->query($sql);

    $numVehiculos = $resultados->num_rows;

    if ($resultados->num_rows > 0) {
        $info = array();
        while($ocurrencia = $resultados->fetch_assoc()) {
            $info[] = array(
                'placa' => $ocurrencia["placa"],
                'modelo' => $ocurrencia["modelo"],
                'color' => $ocurrencia["color"],
                // Todos los JSON contienen la misma información del número de vehículos encontrados
                'numVehiculos' => $numVehiculos
            );
        }
        header('Content-Type: application/json');
        echo json_encode($info);
        exit();
    }

    $conexion->close();

?>