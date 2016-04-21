<?php
    
    include "conexion.php";

    $codigo = $_POST["codigo"];

    $sql = "SELECT * FROM usuarios WHERE codigo = '$codigo'";
    $resultados = $conexion->query($sql);

    if ($resultados->num_rows > 0) {
        while($ocurrencia = $resultados->fetch_assoc()) {
            $info = array(
                'nombre1' => $ocurrencia['nombre1'],
                'nombre2' => $ocurrencia['nombre2'],
                'apellido1' => $ocurrencia['apellido1'],
                'apellido2' => $ocurrencia['apellido2'],
                'id' => $ocurrencia['identificacionUsu'],
                'edad' => $ocurrencia['edad'],
                'pago' => $ocurrencia['pago'],
                'foto' => $ocurrencia['foto'],
                'pagoVencimiento' => $ocurrencia['pagoVencimiento']
            );
            
            header('Content-Type: application/json');
            echo json_encode($info);
            exit();
        }
    }

    $conexion->close();
    
?>