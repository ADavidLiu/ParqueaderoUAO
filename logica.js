// Para la cámara
function crearCamara(elemento) {
    elemento.scriptcam({
        showMicrophoneErrors: false,
        showDebug: false,
        cornerRadius: 0,
        cornerColor: '273238',
        width: 450,
        height: 340
    });
}

camara = $("#camara");
contenidoCamara = $("#camera-wrapper").html();
crearCamara(camara);

function base64_a_campo(elemento) {
    elemento.val($.scriptcam.getFrameAsBase64());
}

function base64_a_imagen(elemento) {
    elemento.attr("src", "data:image/png;base64," + $.scriptcam.getFrameAsBase64());
}

function mostrarImagen(campoImg, base64) {
    campoImg.attr("src", "data:image/png;base64," + base64);
}

btnCapturar = $("div#capturar");
btnCodigo = $("div#codigo");
btnMostrarUsuario = $("div#mostrarUsuario");
codigoBuscarUsuario = $("input#busqUsuario");

btnMostrarUltimoUsuario = $("div#mostrarUltimoUsuario");
placaBuscarUltimoUsuario = $("input#busqUltimoUsuario");

btnCodigo.click(function () {
    base64_a_campo($('#formfield'));
});

btnCapturar.click(function () {
    base64_a_imagen($('#foto'));
});

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
var numFichas = 59;
fichaActual.text(numFichas); // Valor inicial

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

campoCodigoUlt = $("span#resultadoCodigoUlt");
campoImgUsuUlt = $('#fotoBusquedaUltUsu');

// Para manejar las salidas
btnSalidas = $("#insertarSalida");
placaUltimo = $("input#placaUltimo");
codigoUltimo = $("input#codigoUltimo");

// Para buscar qué vehículos se encuentran estacionados, a través de las fichas
itemFichas = $("#menu li#fichas");
numVehiculosEstacionados = $("#numVehiculos");
var vehiculoEstacionado = '<div class="col-xs-12 seccion-formulario vehiculoEstacionado"></div>';
var vehiculos = [];

mapaCampoNombre1 = $(".infoVehiculo span#nombre1");
mapaCampoNombre2 = $(".infoVehiculo span#nombre2");
mapaCampoApellido1 = $(".infoVehiculo span#apellido1");
mapaCampoApellido2 = $(".infoVehiculo span#apellido2");
mapaCampoEdad = $(".infoVehiculo span#edad");
mapaCampoId = $(".infoVehiculo span#identificacion");
mapaCampoCodigo = $(".infoVehiculo span#codigo");
mapaCampoPlaca = $(".infoVehiculo span#placa");
mapaCampoModelo = $(".infoVehiculo span#modelo");
mapaCampoColor = $(".infoVehiculo span#color");
mapaCampoFoto = $(".infoVehiculo img");

// Para el mapa
var selectoresBahias = [];
var numeroBahias = 59;

$(".mapa button").click(function () {
    seleccionado = $(this).text();
    console.log(seleccionado);
    $.post("buscarVehiculoMapa.php", {
        bahia: seleccionado
    }, function (info) {
        mapaCampoNombre1.text(info[0].nombre1);
        mapaCampoNombre2.text(info[0].nombre2);
        mapaCampoApellido1.text(info[0].apellido1);
        mapaCampoApellido2.text(info[0].apellido2);
        mapaCampoEdad.text(info[0].edad);
        mapaCampoId.text(info[0].id);
        mapaCampoCodigo.text(info[0].codigo);
        mapaCampoPlaca.text(info[0].placa);
        mapaCampoModelo.text(info[0].modelo);
        mapaCampoColor.text(info[0].color);
        mostrarImagen(mapaCampoFoto, info[0].foto);
        // Resize a la imagen
        mapaCampoFoto.width(240);
        mapaCampoFoto.height(144);
    }, "json");
});


// Recupera la información del parqueadero (Sección 'fichas')
itemFichas.click(function () {
    // Vacía el arreglo
    vehiculos = [];
    $.post("buscarVehiculosEstacionados.php", {}, function (info) {
        // Actualiza el número de ocurrencias encontradas
        numVehiculosEstacionados.text(info[0].numVehiculos);
        // Remueve los anteriores y los actualiza
        $("div.vehiculoEstacionado").remove();

        // Genera dinámicamente el contenido de cada vehículo estacionado
        for (i = 0; i < info[0].numVehiculos; i++) {
            seccionFichas.append(vehiculoEstacionado);
            vehiculos.push($("div.vehiculoEstacionado:last"));
            vehiculos[i].text("Placa: " + info[i].placa + " Modelo: " + info[i].modelo + " Color: " + info[i].color);
        }
    });
});

// Para las notificaciones de procesos realizados
var notificacion = $(".notificacion-wrapper").html(); // Obtiene el contenido de notificación para reusarse
$(".notificacion-wrapper").remove(); // Lo elimina

function feedback(texto) {
    $("body").prepend(notificacion);
    $(".notificacion h3").text(texto);

    setTimeout(function () {
        $(".notificacion").remove();
    }, 2000);
}

// Maneja las transacciones de las salidas
btnSalidas.click(function () {
    abierto = true;
    $.post("eliminarFichas.php", {
        placa: placaUltimo.val()
    }, function () {
        numFichas += 1;
        fichaActual.text(numFichas);
    });

    $.post("insertarUltimoConductor.php", {
        codigo: codigoUltimo.val(),
        placa: placaUltimo.val(),
        foto: $("#formfield").val()
    });

    $.post("insertarSalida.php", {
        placa: placaUltimo.val()
    }, function () {
        feedback("Salida procesada");
    });
});

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

// Para recuperar la información de un último usuario
btnMostrarUltimoUsuario.click(function () {
    $.post("mostrarUltimoUsuario.php", {
        placa: placaBuscarUltimoUsuario.val()
    }, function (info) {
        mostrarImagen(campoImgUsuUlt, info.foto);
        campoCodigoUlt.text(" " + info.codigo);
    }, "json");
});

// Maneja el form submit de los ingresos
formularioIngresos.on("submit", function (event) {
    // Evita que se recargue la página
    event.preventDefault();

    if (numFichas > 0) {

        numFichas -= 1;
        if (numFichas <= 0) {
            fichaActual.text("Lleno");
            numFichas = 0;
            feedback("Parqueadero lleno!");
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
                feedback("Vehículo procesado...");
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
                feedback("Usuario procesado...");
            });
        } else {
            $.post("insertarEntrada.php", {
                placa: placaIn.val(),
                registradoIn: registrado
            }, function () {
                // Sólo para debug
                feedback("Entrada procesada...");
            });
        }

        $.post("insertarFichas.php", {
            codigo: codigoIn.val(),
            placa: placaIn.val(),
            bahia: numFichas
        }, function (data) {
            console.log("data: " + data);
            feedback("Ficha procesada...");
        });
    } else {
        fichaActual.text("Lleno");
        numFichas = 0;
        feedback("Parqueadero lleno!");
    }
});