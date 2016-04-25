<?php
    
    include "conexion.php";

    $placa = $_POST["placa"];

    $sql = "SELECT * FROM ultimo_conductor WHERE placaVehiculoUltimoConductor = '$placa'";
    $resultados = $conexion->query($sql);

    if ($resultados->num_rows > 0) {
        while($ocurrencia = $resultados->fetch_assoc()) {
            $info = array(
                'foto' => $ocurrencia['ultimaFotoConductor'],
                'codigo' => $ocurrencia['codigoUltimoConductor']
            );
            
            header('Content-Type: application/json');
            echo json_encode($info);
            exit();
        }
    }

    $conexion->close();
    
?>