<?php 
    include("conexion.php");
        if(isset($_POST['codigo'])&& !empty($_POST['codigo']) && isset($_POST['nombre1']) && !empty($_POST['nombre1']) && isset($_POST['apellido1']) && !empty($_POST['apellido1']) && isset($_POST['identificacion']) && !empty($_POST['identificacion']) && isset($_POST['edad']) && !empty($_POST['edad']))
        {
        //$fechavencimiento = "'".date('Y-m-d H:i:s', strtotime(str_replace('-', '/', $_POST['pagovencimiento'])))."'";
        //$fechavencimiento=date_default_timezone_get(UTC);

        $con = mysql_connect($host,$user,$pw)or die("problemas al conectar");
        mysql_select_db($db,$con)or die ("problemas al conectar a la base de datos");
        mysql_query("INSERT INTO USUARIOS (codigo,nombre1,nombre2,apellido1,apellido2,identificacion,edad,pago) VALUES ('$_POST[codigo]','$_POST[nombre1]','$_POST[nombre2]','$_POST[apellido1]','$_POST[apellido2]','$_POST[identificacion]',$_POST[edad],$_POST[pago])",$con);

    }else{
        echo "Problemas al insertar";
    }
?>