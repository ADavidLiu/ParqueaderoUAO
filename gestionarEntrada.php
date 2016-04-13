<?php
    // Inicia la conexión predefinida con la base de datos
    $servername = "localhost";
    $username = "root";
    $password = "Simsklapaucius96"; // Password de la base de datos local
    $dbname = "parqueaderouao";
    
    // Crea la conexión
    $conexion = new mysqli($servername, $username, $password, $dbname);

    // Variables recibidas a través de AJAX
    $placa = $_POST["placa"];
    $modelo = $_POST["modelo"];
    $color = $_POST["color"];
    
    // Controla si agregar o no un vehículo en la base de datos
    $existe = false;

    // Primero busca en la base de datos si este vehículo ya se encuentra o no
    $sql = "SELECT placa from vehiculos";
    $resultados = $conexion->query($sql);
    // Si el número de ocurrencias es mayor a 0
    if ($resultados->num_rows > 0) {
        while($ocurrencia = $resultados->fetch_assoc()) {
            // Checkea si la placa (única) insertada coincide con alguna de las placas ya existentes en la base de datos
            if ($placa == $ocurrencia["placa"]) {
                // Si ya existe, sólo agrega la entrada
                $sql = "INSERT INTO entradas (placaVehiculoEntrada, horaEntrada) VALUES ('$placa', NOW())"; // NOW() retorna la fecha y hora actuales
                $conexion->query($sql);
                $existe = true;
                break; // Si ya encuentra una similitud, sale del while
            }
        }
        // Sino, lo registra como un nuevo vehículo y agrega su entrada
        if ($existe == false) {
            $sql = "INSERT INTO vehiculos (placa, modelo, color) VALUES ('$placa', '$modelo', '$color')";
            $conexion->query($sql);
                
            $sql = "INSERT INTO entradas (placaVehiculoEntrada, horaEntrada) VALUES ('$placa', NOW())"; // NOW() retorna la fecha y hora actuales
            $conexion->query($sql);
        }
    }

    // Retorna si existe o no el vehículo
    echo $existe;

    if(
        isset($_POST['codigo'])&& !empty($_POST['codigo']) && isset($_POST['nombre1']) && !empty($_POST['nombre1']) && isset($_POST['apellido1']) && !empty($_POST['apellido1']) && isset($_POST['identificacion']) && !empty($_POST['identificacion']) && isset($_POST['edad']) && !empty($_POST['edad'])
        ) {
        //$fechavencimiento = "'".date('Y-m-d H:i:s', strtotime(str_replace('-', '/', $_POST['pagovencimiento'])))."'";
        //$fechavencimiento=date_default_timezone_get(UTC);

        $con = mysql_connect($host,$user,$pw)or die("problemas al conectar");
        mysql_select_db($db,$con)or die ("problemas al conectar a la base de datos");
        mysql_query("INSERT INTO USUARIOS (codigo,nombre1,nombre2,apellido1,apellido2,identificacion,edad,pago) VALUES ('$_POST[codigo]','$_POST[nombre1]','$_POST[nombre2]','$_POST[apellido1]','$_POST[apellido2]','$_POST[identificacion]',$_POST[edad],$_POST[pago])",$con);
    } else {
        echo "Problemas al insertar";
    }
    
    // Cierra la conexión
    $conexion->close();
?>