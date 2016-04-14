$(document).ready(function () {
    // Formulario
    formulario = $("form");
    placaIn = $("input#placa");
    modeloIn = $("input#modelo");
    colorIn = $("input#color");

    codigoIn = $("input#codigo");
    nombre1In = $("input#nombre1");
    nombre2In = $("input#nombre2");
    apellido1In = $("input#apellido1");
    apellido2In = $("input#apellido2");
    identificacionIn = $("input#identificacionUsu");
    edadIn = $("input#edad");
    fotoIn = $("input#foto");
    pagoIn = $("input#pago");
    fechaVencimientoIn = $("input#fechaVencimiento");

    formulario.on("submit", function (event) {
        // Evita que se recargue la página
        event.preventDefault();
        // Envía los datos al script de PHP "insertarVehiculo" a través de AJAX
        $.post("insertarVehiculos.php", {
            placa: placaIn.val(),
            modelo: modeloIn.val(),
            color: colorIn.val()
        }, function () {
            // Sólo para debug
            alert("Vehículo procesado...");
        });

        $.post("insertarUsuarios.php", {
            codigo: codigoIn.val(),
            nombre1: nombre1In.val(),
            nombre2: nombre2In.val(),
            apellido1: apellido1In.val(),
            apellido2: apellido2In.val(),
            identificacion: identificacionIn.val(),
            edad: edadIn.val(),
            foto: fotoIn.val(),
            pago: pagoIn.val(),
            fechaVencimiento: fechaVencimientoIn.val()
        }, function () {
            // Sólo para debug
            alert("Usuario procesado...");
        });
    });
});