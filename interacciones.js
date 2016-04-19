var registrado = false;

$(document).ready(function () {
    // Estilos e interacciones
    menuItem = $("#menu li");
    registroIngrso = $(".registroIngreso");
    labels = $("label");
    inputs = $("input");

    itemIngresos = $("#menu li#ingresos");
    itemSalidas = $("#menu li#salidas");
    itemUsuarios = $("#menu li#usuarios");
    itemFichas = $("#menu li#fichas");
    itemUbicacion = $("#menu li#ubicacion");

    infoIngresos = $("#menu li#ingresos h4");
    infoSalidas = $("#menu li#salidas h4");
    infoUsuarios = $("#menu li#usuarios h4");
    infoFichas = $("#menu li#fichas h4");
    infoUbicacion = $("#menu li#ubicacion h4");

    iconIngresos = $("#menu li#ingresos i.fa");
    iconSalidas = $("#menu li#salidas i.fa");
    iconUsuarios = $("#menu li#usuarios i.fa");
    iconFichas = $("#menu li#fichas i.fa");
    iconUbicacion = $("#menu li#ubicacion i.fa");

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
    
    inputsUsuario = $("#datosUsuario input:not(#codigo)");
    labelsRequeridos = $("div.form-group > label:not([for='placa'], [for='codigo'])");

    var infoVisible = false;
    var ayudaVisible = false;
    btnExtras = $(".btn-extras");

    info = $(".btn-extras .info");
    burbujaInfo = $(".btn-extras .info-wrapper .burbujaExtrasInfo");

    ayuda = $(".btn-extras .ayuda");
    burbujaAyuda = $(".btn-extras .ayuda-wrapper .burbujaExtrasAyuda");

    btnDeshabilitarWrapper = $(".deshabilitar-wrapper");
    btnDeshabilitar = $(".btn-deshabilitar");

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
            inputColor.attr("disabled", false).removeClass("inputsDeshabilitados"); labelsRequeridos.removeClass("labelsDeshabilitados");
            registrado = false;
        }
        console.log(registrado);
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
    cambiarFocus(inputFechaVencimiento, labelFechaVencimiento);

    var menuItems = [
        itemIngresos,
        itemSalidas,
        itemUsuarios,
        itemFichas,
        itemUbicacion,
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

    hoverMenuItem(itemIngresos, iconIngresos, infoIngresos);
    hoverMenuItem(itemSalidas, iconSalidas, infoSalidas);
    hoverMenuItem(itemUsuarios, iconUsuarios, infoUsuarios);
    hoverMenuItem(itemFichas, iconFichas, infoFichas);
    hoverMenuItem(itemUbicacion, iconUbicacion, infoUbicacion);

    var secciones = [
        registroIngrso.selector,
    ];

    function cambiarContenido(seccionVisible) {
        for (i = 0; i < secciones.length; i++) {
            if (secciones[i] != seccionVisible) {
                secciones[i].hide();
            }
        }
    }
});