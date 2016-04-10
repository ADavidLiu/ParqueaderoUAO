$(document).ready(function () {
    // Formulario
    formulario = $("form");
    placaIn = $("input#placa");
    modeloIn = $("input#modelo");
    colorIn = $("input#color");

    formulario.on("submit", function (event) {
        // Evita que se recargue la página
        event.preventDefault();
        // Envía los datos al script de PHP "insertarVehiculo" a través de AJAX
        $.post("gestionarEntrada.php", {
            placa: placaIn.val(),
            modelo: modeloIn.val(),
            color: colorIn.val()
        }, function () {
            alert("Datos enviados...");
        });
        masInfo.hide();
        btnBuscar.show();
    });
});