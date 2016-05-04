// Variable en el global scope para ser accedida desde logica.js
var registrado = false;

$(document).ready(function () {
    // Estilos e interacciones

    // Selectores generales
    menuItem = $("#menu li");
    labels = $("label");
    inputs = $("input");

    // Secciones del menú lateral
    seccionIngresos = $("#generarIngresos");
    seccionUsuarios = $("#buscarUsuarios");
    seccionSalidas = $("#manejarSalidas");
    seccionFichas = $("#buscarFichas");
    seccionUbicacion = $("#ubicacionMapa");

    // Items del menú lateral
    itemIngresos = $("#menu li#ingresos");
    itemSalidas = $("#menu li#salidas");
    itemUsuarios = $("#menu li#usuarios");
    itemFichas = $("#menu li#fichas");
    itemUbicacion = $("#menu li#ubicacion");

    // Títulos de cada item del menú lateral
    infoIngresos = $("#menu li#ingresos h4");
    infoSalidas = $("#menu li#salidas h4");
    infoUsuarios = $("#menu li#usuarios h4");
    infoFichas = $("#menu li#fichas h4");
    infoUbicacion = $("#menu li#ubicacion h4");

    // Íconos de cada item del menú lateral
    iconIngresos = $("#menu li#ingresos i.fa");
    iconSalidas = $("#menu li#salidas i.fa");
    iconUsuarios = $("#menu li#usuarios i.fa");
    iconFichas = $("#menu li#fichas i.fa");
    iconUbicacion = $("#menu li#ubicacion i.fa");

    // Labels de cada input del formulario de ingreso
    labelCodigo = $("label[for='codigo']");
    labelNombre1 = $("label[for='nombre1']");
    labelNombre2 = $("label[for='nombre2']");
    labelApellido1 = $("label[for='apellido1']");
    labelApellido2 = $("label[for='apellido2']");
    labelIdentificacion = $("label[for='identificacionUsu']");
    labelEdad = $("label[for='edad']");
    labelFoto = $("label[for='foto']");
    labelPlaca = $("label[for='placa']");
    labelModelo = $("label[for='modelo']");
    labelColor = $("label[for='color']");
    labelPago = $("label[for='pago']");
    labelFechaVencimiento = $("label[for='fechaVencimiento']");

    // Inputs del formulario de ingreso
    inputCodigo = $("input#codigo");
    inputNombre1 = $("input#nombre1");
    inputNombre2 = $("input#nombre2");
    inputApellido1 = $("input#apellido1");
    inputApellido2 = $("input#apellido2");
    inputIdentificacion = $("input#identificacionUsu");
    inputEdad = $("input#edad");
    inputFoto = $("input#foto");
    inputPlaca = $("input#placa");
    inputModelo = $("input#modelo");
    inputColor = $("input#color");
    inputPago = $("input#pago");
    inputFechaVencimiento = $("input#fechaVencimiento");

    // Labels e inputs del formulario para buscar un usuario
    inputIdentificacionBusquedaUsu = $("input#busqUsuario");
    labelIdentificacionBusquedaUsu = $("label[for='busqUsuario']");
    inputIdentificacionBusquedaUltUsu = $("input#busqUltimoUsuario");
    labelIdentificacionBusquedaUltUsu = $("label[for='busqUltimoUsuario']");

    // Labels e inputs del formulario para gestionar las salidas
    inputCodigoUltimo = $("input#codigoUltimo");
    labelCodigoUltimo = $("label[for='codigoUltimo']");
    inputPlacaUltimo = $("input#placaUltimo");
    labelPlacaUltimo = $("label[for='placaUltimo']");

    // Para deshabilitar campos no requeridos al estar registrado
    inputsUsuario = $("#datosUsuario input:not(#codigo)");
    labelsRequeridos = $("form#formIngresos div.form-group > label:not([for='placa'], [for='codigo'])");

    // Para los botones de la esquina inferior derecha
    var infoVisible = false;
    var ayudaVisible = false;
    btnExtras = $(".btn-extras");

    info = $(".btn-extras .info");
    burbujaInfo = $(".btn-extras .info-wrapper .burbujaExtrasInfo");

    ayuda = $(".btn-extras .ayuda");
    burbujaAyuda = $(".btn-extras .ayuda-wrapper .burbujaExtrasAyuda");

    // Para el botón de deshabilitar inputs cuando el vehículo ya se encuentre registrado
    btnDeshabilitarWrapper = $(".deshabilitar-wrapper");
    btnDeshabilitar = $(".btn-deshabilitar");

    // Para el menú desplegable de la derecha con la información del usuario y vehículo correspondiente a una ficha
    btnFicha = $(".btnFicha");
    menuInfoVehiculo = $(".infoVehiculo");
    btnCerrarInfoVehiculo = $(".btnCerrarInfoVehiculo");
    var desplegado = false;

    btnFicha.click(function () {
        if (!desplegado) {
            menuInfoVehiculo.addClass("desplegado");
            desplegado = true;
        }
    });
    
    btnCerrarInfoVehiculo.click(function () {
        if (desplegado) {
            menuInfoVehiculo.removeClass("desplegado");
            desplegado = false;
        }
    });

    btnDeshabilitarWrapper.click(function () {
        if (!registrado) {
            btnDeshabilitar.addClass("habilitado");
            inputsUsuario.attr("disabled", true).addClass("inputsDeshabilitados");
            inputModelo.attr("disabled", true).addClass("inputsDeshabilitados");
            inputColor.attr("disabled", true).addClass("inputsDeshabilitados");
            labelsRequeridos.addClass("labelsDeshabilitados");
            registrado = true;
        } else {
            btnDeshabilitar.removeClass("habilitado");
            inputsUsuario.attr("disabled", false).removeClass("inputsDeshabilitados");
            inputModelo.attr("disabled", false).removeClass("inputsDeshabilitados");
            inputColor.attr("disabled", false).removeClass("inputsDeshabilitados");
            labelsRequeridos.removeClass("labelsDeshabilitados");
            registrado = false;
        }
    });

    function mostrarInfoExtra(elemento, elementoInfo) {
        elemento.click(function () {
            if (elemento == info) {
                if (!infoVisible) {
                    elementoInfo.addClass("infoVisible");
                    infoVisible = true;
                } else {
                    elementoInfo.removeClass("infoVisible");
                    infoVisible = false;
                }
            }
            if (elemento == ayuda) {
                if (!ayudaVisible) {
                    elementoInfo.addClass("infoVisible");
                    ayudaVisible = true;
                } else {
                    elementoInfo.removeClass("infoVisible");
                    ayudaVisible = false;
                }
            }
        });
    }

    // Para mostrar la información entra al hacer click sobre cada botón
    mostrarInfoExtra(ayuda, burbujaAyuda);
    mostrarInfoExtra(info, burbujaInfo);

    function cambiarFocus(elemento, label) {
        elemento.focusin(function () {
            elemento.addClass("inputHover");
            label.css("bottom", "25px");
        });

        elemento.focusout(function () {
            elemento.removeClass("inputHover");
            if (elemento.val() == "") {
                label.css("bottom", "0");
            }
        });
    }

    // Para el efecto al seleccionar cada input
    cambiarFocus(inputCodigo, labelCodigo);
    cambiarFocus(inputNombre1, labelNombre1);
    cambiarFocus(inputNombre2, labelNombre2);
    cambiarFocus(inputApellido1, labelApellido1);
    cambiarFocus(inputApellido2, labelApellido2);
    cambiarFocus(inputIdentificacion, labelIdentificacion);
    cambiarFocus(inputEdad, labelEdad);
    cambiarFocus(inputFoto, labelFoto);
    cambiarFocus(inputPlaca, labelPlaca);
    cambiarFocus(inputModelo, labelModelo);
    cambiarFocus(inputColor, labelColor);
    cambiarFocus(inputPago, labelPago);
    cambiarFocus(inputIdentificacionBusquedaUsu, labelIdentificacionBusquedaUsu);
    cambiarFocus(inputIdentificacionBusquedaUltUsu, labelIdentificacionBusquedaUltUsu);
    cambiarFocus(inputCodigoUltimo, labelCodigoUltimo);
    cambiarFocus(inputPlacaUltimo, labelPlacaUltimo);

    // Items del menú lateral
    var menuItems = [
        itemIngresos,
        itemSalidas,
        itemUsuarios,
        itemFichas,
        itemUbicacion
    ];

    function cambiarActiveItem(elemento) {
        elemento.click(function () {
            for (i = 0; i < menuItems.length; i++) {
                if (menuItems[i] != elemento) {
                    menuItems[i].removeClass("active");
                }
            }
            elemento.addClass("active");
        });
    }

    // Para cambiar el estilo del item seleccionado del menú lateral
    cambiarActiveItem(itemIngresos);
    cambiarActiveItem(itemSalidas);
    cambiarActiveItem(itemUsuarios);
    cambiarActiveItem(itemFichas);
    cambiarActiveItem(itemUbicacion);

    function hoverMenuItem(elemento, icono, info) {
        elemento.hover(function () {
            elemento.addClass("menuHover");
            icono.addClass("iconHover");
            info.addClass("menuInfoHover");
        }, function () {
            elemento.removeClass("menuHover");
            icono.removeClass("iconHover");
            info.removeClass("menuInfoHover");
        });
    }

    // Para el efecto al hover cada item del menú lateral
    hoverMenuItem(itemIngresos, iconIngresos, infoIngresos);
    hoverMenuItem(itemSalidas, iconSalidas, infoSalidas);
    hoverMenuItem(itemUsuarios, iconUsuarios, infoUsuarios);
    hoverMenuItem(itemFichas, iconFichas, infoFichas);
    hoverMenuItem(itemUbicacion, iconUbicacion, infoUbicacion);

    // Secciones del contenido
    var secciones = [
        seccionIngresos,
        seccionUsuarios,
        seccionSalidas,
        seccionFichas,
        seccionUbicacion // Ir agregando a medida que se vayan implementando
    ];

    function activarCamara() {
        // Para volver a capturar los eventos al crearse denuevo el objeto de la cámara
        btnCapturar = $("div#capturar");
        btnCodigo = $("div#codigo");
        btnCodigo.click(function () {
            base64_a_campo($('#formfield'));
        });

        btnCapturar.click(function () {
            base64_a_imagen($('#foto'));
        });
    }

    function cambiarContenido(menuItem, seccionVisible) {
        menuItem.click(function () {
            for (i = 0; i < secciones.length; i++) {
                secciones[i].fadeOut("fast");
            }
            seccionVisible.fadeIn("fast");

            // Para cambiar la ubicación de la cámara en el DOM
            if (seccionVisible == seccionSalidas) {
                $("#camera-wrapper").html("");
                $("#camera-wrapper-salidas").html(contenidoCamara);
                crearCamara(camara);
                activarCamara();
            } else {
                $("#camera-wrapper").html(contenidoCamara);
                crearCamara(camara);
                activarCamara();
            }
        });
    }

    // Oculta todas las secciones excepto la de inicial de ingresos
    seccionUsuarios.hide();
    seccionSalidas.hide();
    seccionFichas.hide();
    seccionUbicacion.hide();

    // Para mostrar las secciones respectivas desde el menú lateral
    cambiarContenido(itemUsuarios, seccionUsuarios);
    cambiarContenido(itemIngresos, seccionIngresos);
    cambiarContenido(itemSalidas, seccionSalidas);
    cambiarContenido(itemFichas, seccionFichas);
    cambiarContenido(itemUbicacion, seccionUbicacion);
});