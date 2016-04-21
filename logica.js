$(document).ready(function () {
    // Formulario
    formularioIngresos = $("form#formIngresos");
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

    inputsTodos = $("input");

    // Número de lugares disponibles en el parqueadero
    var numFichas = 3;
    fichaActual.text(numFichas); // Valor inicial

    // Para la cámara
    $("#camara").scriptcam({
        showMicrophoneErrors: false,
        showDebug: false,
        onError: onError,
        cornerRadius: 0,
        cornerColor: '273238',
        onWebcamReady: onWebcamReady,
        onPictureAsBase64: base64_tofield_and_image,
        width: 450,
        height: 340
    });

    function base64_tofield() {
        $('#formfield').val($.scriptcam.getFrameAsBase64());
    }

    function base64_toimage() {
        $('#foto').attr("src", "data:image/png;base64," + $.scriptcam.getFrameAsBase64());
    }

    function mostrarImagen(campoImg, base64) {
        campoImg.attr("src", "data:image/png;base64," + base64);
    }

    function base64_tofield_and_image(b64) {
        $('#formfield').val(b64);
        $('#foto').attr("src", "data:image/png;base64," + b64);
    }

    function onWebcamReady(cameraNames, camera, microphoneNames, microphone, volume) {
        $.each(cameraNames, function (index, text) {
            $('#cameraNames').append($('<option></option>').val(index).html(text))
        });
        $('#cameraNames').val(camera);
    }

    function onError(errorId, errorMsg) {
        $("#capturar").attr("disabled", true);
        $("#btn2").attr("disabled", true);
        alert(errorMsg);
    }

    btnCapturar = $("div#capturar");
    btnCodigo = $("div#codigo");
    btnMostrarUsuario = $("div#mostrarUsuario");
    codigoBuscarUsuario = $("input#busqUsuario");

    // Campos para insertar los resultados de la búsqueda
    campoNombre1 = $("span#resultadoNombre1");
    campoNombre2 = $("span#resultadoNombre2");
    campoApellido1 = $("span#resultadoApellido1");
    campoApellido2 = $("span#resultadoApellido2");
    campoIdentificacion = $("span#resultadoIdentificacion");
    campoEdad = $("span#resultadoEdad");
    campoPago = $("span#resultadoPago");
    campoVencimiento = $("span#resultadoVencimiento");
    
    campoImgUsu = $('#fotoBusquedaUsu');

    // Para recuperar la información de un usuario
    btnMostrarUsuario.click(function () {
        $.post("mostrarUsuario.php", {
            codigo: codigoBuscarUsuario.val()
        }, function (info) {
            mostrarImagen(campoImgUsu, info.foto);
            campoNombre1.text(" " + info.nombre1);
            campoNombre2.text(" " + info.nombre2);
            campoApellido1.text(" " + info.apellido1);
            campoApellido2.text(" " + info.apellido2);
            campoIdentificacion.text(" " + info.id);
            campoEdad.text(" " + info.edad);
            campoPago.text(" " + info.pago);
            campoVencimiento.text(" " + info.pagoVencimiento);
        }, "json");
    });

    btnCodigo.click(function () {
        base64_tofield();
    });

    btnCapturar.click(function () {
        base64_toimage();
    });

    // Maneja el form submit
    formularioIngresos.on("submit", function (event) {
        // Evita que se recargue la página
        event.preventDefault();

        if (numFichas > 0) {

            numFichas -= 1;
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
                    foto: $("#formfield").val(),
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
        } else {
            fichaActual.text("Lleno");
            numFichas = 0;
            alert("Parqueadero lleno!");
        }
    });
});