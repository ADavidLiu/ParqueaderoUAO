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

    fichaActual = $(".fichas h3");

    // Número de lugares disponibles en el parqueadero
    var numFichas = 3;
    fichaActual.text(numFichas); // Valor inicial

    formulario.on("submit", function (event) {
        // Evita que se recargue la página
        event.preventDefault();

        if (numFichas > 0) {

            numFichas = numFichas - 1;
            if (numFichas <= 0) {
                fichaActual.text("Lleno");
                numFichas = 0;
                alert("Parqueadero lleno!");
            } else {
                fichaActual.text(numFichas);
            }

            if (!registrado) {
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
                }, function (respuesta) {
                    // Sólo para debug
                    alert("Usuario procesado...");
                });
            } else {
                $.post("insertarEntrada.php", {
                    placa: placaIn.val(),
                    registradoIn: registrado
                }, function () {
                    // Sólo para debug
                    alert("Entrada procesada...");
                });
            }

            $.post("gestionarFichas.php", {
                codigo: codigoIn.val(),
                placa: placaIn.val()
            }, function () {
                alert("Ficha procesada...");
            });
            console.log("numFichas al final: " + numFichas);
        } else {
            fichaActual.text("Lleno");
            numFichas = 0;
            alert("Parqueadero lleno!");
        }
    });
});