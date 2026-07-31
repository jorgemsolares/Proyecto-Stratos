// ==========================================
// ADN VISUAL STRATOS - ARCHIVO: logica.js
// Procesamiento, Validaciones e Interacción
// ==========================================

// ==========================================
// 0. VARIABLES GLOBALES Y ESTADO INICIAL
// ==========================================
let pantallaActual = 'registro-invitacion';
let intervaloRotacionMensajes = null;
let colaMensajes = [];
let indiceMensajeActual = 0;
let rotacionActiva = false;
let temporizadorAviso = null;
let temporizadorInactividad = null;
const TIEMPO_INACTIVIDAD = 30 * 60 * 1000;

// ==========================================
// FUNCIÓN PARA MOSTRAR AVISO INMEDIATO
// ==========================================
function mostrarAvisoInmediato(texto, tipo) {
    if (intervaloRotacionMensajes) {
        clearInterval(intervaloRotacionMensajes);
        intervaloRotacionMensajes = null;
        rotacionActiva = false;
    }
    if (temporizadorAviso) {
        clearTimeout(temporizadorAviso);
    }
    const mensajeDiv = document.getElementById('mensaje-personalizado');
    const textoMensaje = document.getElementById('texto-mensaje-personalizado');
    if (mensajeDiv && textoMensaje) {
        mensajeDiv.classList.remove('exito', 'error', 'advertencia');
        if (tipo === 'exito') mensajeDiv.classList.add('exito');
        else if (tipo === 'error') mensajeDiv.classList.add('error');
        else if (tipo === 'advertencia') mensajeDiv.classList.add('advertencia');
        textoMensaje.innerText = texto;
        mensajeDiv.style.display = 'flex';
    }
    temporizadorAviso = setTimeout(() => {
        if (mensajeDiv) mensajeDiv.style.display = 'none';
        iniciarRotacionMensajes();
        temporizadorAviso = null;
    }, 3000);
}

// ==========================================
// FUNCIÓN PARA FRAGMENTAR MISIÓN, VISIÓN Y VALORES
// ==========================================
function obtenerFragmentosMisionVisionValores() {
    const fragmentos = [];
    const textos = [
        identidadCorporativa.mision,
        identidadCorporativa.vision,
        ...(identidadCorporativa.valores || [])
    ];
    const separadores = /[,;.]|\s{2,}/;
    textos.forEach(texto => {
        if (!texto) return;
        let partes = texto.split(separadores);
        partes.forEach(parte => {
            parte = parte.trim();
            if (parte.length === 0) return;
            if (parte.length > 150) {
                let corte = parte.substring(0, 150);
                let ultimoEspacio = corte.lastIndexOf(' ');
                if (ultimoEspacio > 0) {
                    corte = corte.substring(0, ultimoEspacio);
                }
                fragmentos.push(corte + '...');
                let resto = parte.substring(corte.length);
                if (resto.length > 0) {
                    resto = resto.replace(/^\s+/, '');
                    if (resto.length > 0) {
                        if (resto.length > 150) {
                            let nuevoCorte = resto.substring(0, 150);
                            let nuevoUltimoEspacio = nuevoCorte.lastIndexOf(' ');
                            if (nuevoUltimoEspacio > 0) {
                                nuevoCorte = nuevoCorte.substring(0, nuevoUltimoEspacio);
                            }
                            fragmentos.push(nuevoCorte + '...');
                        } else {
                            fragmentos.push(resto);
                        }
                    }
                }
            } else {
                fragmentos.push(parte);
            }
        });
    });
    return fragmentos;
}

// ==========================================
// FUNCIÓN PARA CONSTRUIR LA COLA DE MENSAJES
// ==========================================
function construirColaMensajes() {
    colaMensajes = [];
    if (!identidadCorporativa.completada) {
        const no1 = baseDatosUsuarios.find(u => u.esNo1);
        const nombreNo1 = no1 ? no1.nombre : "El administrador";
        colaMensajes.push({
            texto: `⚠️ Aviso: ${nombreNo1} aún no ha definido toda la Identidad Corporativa.`,
            tipo: 'aviso',
            fechaInicio: new Date(),
            resuelto: false
        });
    }
    if (identidadCorporativa.completada) {
        const hoy = new Date().toDateString();
        const ultimoMensaje = localStorage.getItem('ultimo_mensaje_fecha');
        let mensajeMotivacional = null;
        if (ultimoMensaje !== hoy) {
            const fragmentos = obtenerFragmentosMisionVisionValores();
            if (fragmentos.length > 0) {
                const nuevoIndice = Math.floor(Math.random() * fragmentos.length);
                mensajeMotivacional = fragmentos[nuevoIndice];
                localStorage.setItem('ultimo_mensaje_fecha', hoy);
                localStorage.setItem('ultimo_mensaje_indice', nuevoIndice);
                localStorage.setItem('ultimo_mensaje_texto', mensajeMotivacional);
            }
        } else {
            mensajeMotivacional = localStorage.getItem('ultimo_mensaje_texto');
        }
        if (mensajeMotivacional) {
            colaMensajes.push({
                texto: mensajeMotivacional,
                tipo: 'motivacional',
                fechaInicio: new Date(),
                resuelto: false
            });
        }
    }
    indiceMensajeActual = 0;
}

// ==========================================
// FUNCIÓN PARA INICIAR LA ROTACIÓN DE MENSAJES
// ==========================================
function iniciarRotacionMensajes() {
    if (intervaloRotacionMensajes) {
        clearInterval(intervaloRotacionMensajes);
        intervaloRotacionMensajes = null;
    }
    if (temporizadorAviso) {
        clearTimeout(temporizadorAviso);
        temporizadorAviso = null;
    }
    construirColaMensajes();
    if (colaMensajes.length === 0) {
        const mensajeDiv = document.getElementById('mensaje-personalizado');
        if (mensajeDiv) mensajeDiv.style.display = 'none';
        return;
    }
    mostrarSiguienteMensaje();
    intervaloRotacionMensajes = setInterval(() => {
        mostrarSiguienteMensaje();
    }, 10000);
}

function mostrarSiguienteMensaje() {
    if (colaMensajes.length === 0) return;
    indiceMensajeActual = (indiceMensajeActual + 1) % colaMensajes.length;
    const mensaje = colaMensajes[indiceMensajeActual];
    const mensajeDiv = document.getElementById('mensaje-personalizado');
    const textoMensaje = document.getElementById('texto-mensaje-personalizado');
    if (mensajeDiv && textoMensaje && mensaje) {
        mensajeDiv.classList.remove('exito', 'error', 'advertencia');
        if (mensaje.tipo === 'motivacional') {
            mensajeDiv.classList.add('exito');
        } else if (mensaje.tipo === 'aviso') {
            mensajeDiv.classList.add('advertencia');
        }
        textoMensaje.innerText = mensaje.texto;
        mensajeDiv.style.display = 'flex';
    }
}

// ==========================================
// FUNCIÓN GLOBAL PARA CARGAR SUGERENCIAS
// ==========================================
function cargarSugerencias() {
    const datalist = document.getElementById('lista-usuarios');
    let usuariosDispositivo = localStorage.getItem('usuarios_del_dispositivo');
    if (datalist) {
        datalist.innerHTML = '';
        if (usuariosDispositivo) {
            usuariosDispositivo = JSON.parse(usuariosDispositivo);
            usuariosDispositivo.forEach(nombre => {
                const option = document.createElement('option');
                option.value = nombre;
                datalist.appendChild(option);
            });
        }
    }
}

// ==========================================
// 1. NAVEGACIÓN ENTRE PANTALLAS
// ==========================================
function irAPantalla(id) {
    const destino = document.getElementById(id);
    if (!destino) return;
    if (id === 'pantalla-acceso') {
        const campoId = document.getElementById('acc-id');
        const campoPass = document.getElementById('acc-pass');
        const aviso = document.getElementById('mensaje-acceso');
        if (campoId) campoId.value = '';
        if (campoPass) campoPass.value = '';
        if (aviso) aviso.innerText = '';
    }
    document.querySelectorAll('.pantalla').forEach(p => {
        p.classList.remove('active');
        p.style.display = 'none';
    });
    destino.classList.add('active');
    destino.style.display = 'flex';
    pantallaActual = id;
    ajustarLayoutAdaptativo();
    if (typeof estadoPantallas !== 'undefined' && estadoPantallas[id]) {
        estadoPantallas[id].visitada = true;
    }
    if (typeof historialPantallas !== 'undefined') {
        historialPantallas.push(id);
    }
    if (id === 'registro-invitacion' && usuarioActivo?.id) cargarDatosPantalla1();
    if (id === 'pantalla-identidad') cargarDatosPantalla3();
    if (id === 'pantalla-organigrama-general') renderizarOrganigramaGeneral();
    if (id === 'pantalla-organigrama') renderizarOrganigrama();
    actualizarMenuTuerca();
    aplicarBrandingGlobal();
    verificarMensajeIdentidad();
    iniciarRotacionMensajes();
}

function ajustarLayoutAdaptativo() {
    const container = document.getElementById('app-container');
    if (!container) return;
    const esPantallaAncha = ['pantalla-identidad', 'pantalla-organigrama', 'pantalla-organigrama-general'].includes(pantallaActual);
    if (window.innerWidth > 768) {
        container.style.maxWidth = esPantallaAncha ? "950px" : "480px";
        container.classList.toggle('pantalla-ancha', esPantallaAncha);
    } else {
        container.style.maxWidth = "95%";
        container.classList.remove('pantalla-ancha');
    }
}

// ==========================================
// 2. INICIALIZACIÓN AL CARGAR
// ==========================================
window.onload = function() {
    const usuarioGuardado = cargarDeStorage(STORAGE_KEYS.USUARIO_ACTIVO);
    const identidadGuardada = cargarDeStorage(STORAGE_KEYS.IDENTIDAD);
    const organigramaGuardado = cargarDeStorage(STORAGE_KEYS.ORGANIGRAMA);
    const baseUsuariosGuardada = cargarDeStorage(STORAGE_KEYS.BASE_USUARIOS);
    const solicitudesGuardadas = cargarDeStorage(STORAGE_KEYS.SOLICITUDES_RECUPERACION);
    const indirectosGuardados = cargarDeStorage(STORAGE_KEYS.INDIRECTOS);
    const observadoresGuardados = cargarDeStorage(STORAGE_KEYS.OBSERVADORES);
    const invitacionesGuardadas = cargarDeStorage(STORAGE_KEYS.INVITACIONES);
    
    if (usuarioGuardado) usuarioActivo = usuarioGuardado;
    if (identidadGuardada) {
        identidadCorporativa = identidadGuardada;
        if (identidadGuardada.colorFondo) configuracionEstetica.colorFondo = identidadGuardada.colorFondo;
        if (identidadGuardada.colorTexto) configuracionEstetica.colorTexto = identidadGuardada.colorTexto;
        if (identidadGuardada.colorBotones) configuracionEstetica.colorBotones = identidadGuardada.colorBotones;
    }
    if (baseUsuariosGuardada) baseDatosUsuarios = baseUsuariosGuardada;
    if (organigramaGuardado) {
        datosOrganigrama = organigramaGuardado;
    } else if (usuarioGuardado && usuarioGuardado.esNo1) {
        datosOrganigrama = reconstruirOrganigramaDesdeUsuario(usuarioGuardado);
        if (datosOrganigrama) guardarEnStorage(STORAGE_KEYS.ORGANIGRAMA, datosOrganigrama);
    }
    if (solicitudesGuardadas) solicitudesRecuperacion = solicitudesGuardadas;
    if (indirectosGuardados) contactosIndirectos = indirectosGuardados;
    if (observadoresGuardados) observadores = observadoresGuardados;
    if (invitacionesGuardadas) invitacionesPendientes = invitacionesGuardadas;
    
    const urlParams = new URLSearchParams(window.location.search);
    const codigoInvitacion = urlParams.get('inv');
    if (codigoInvitacion) {
        const invitacion = (typeof invitacionesPendientes !== 'undefined') ? invitacionesPendientes.find(inv => inv.codigoInvitacion === codigoInvitacion) : null;
        if (invitacion && invitacion.estado === "pendiente") {
            datosInvitacionActual = { codigoInvitacion: codigoInvitacion, invitadoPor: invitacion.invitadoPor, tipoContacto: invitacion.tipoContacto };
            irAPantalla('registro-invitacion');
            mostrarAvisoInmediato("📝 Completa tus datos para registrarte", "exito");
        } else {
            mostrarAvisoInmediato("✖ El enlace de invitación no es válido o ya fue utilizado", "error");
            irAPantalla('pantalla-acceso');
        }
        return;
    }
    
    irAPantalla('pantalla-acceso');
    if (identidadGuardada && identidadGuardada.completada) {
        aplicarCambiosVisuales();
        aplicarBrandingGlobal();
    }
    
    const observer = new MutationObserver((mutations, obs) => {
        const pantallaAcceso = document.getElementById('pantalla-acceso');
        if (pantallaAcceso && pantallaAcceso.style.display !== 'none') {
            obs.disconnect();
            inicializarPantallaAcceso();
        }
    });
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['style'] });
    setTimeout(() => cargarSugerencias(), 500);
};

function inicializarPantallaAcceso() {
    const campoNombre = document.getElementById('acc-nombre-completo');
    const campoId = document.getElementById('acc-id');
    const campoPass = document.getElementById('acc-pass');
    const aviso = document.getElementById('mensaje-acceso');
    const intentosDiv = document.getElementById('intentos-restantes');
    if (campoId) campoId.value = '';
    if (campoPass) campoPass.value = '';
    if (aviso) aviso.innerText = '';
    if (intentosDiv) intentosDiv.style.display = 'none';
    let nombreGuardado = localStorage.getItem('stratos_recordar');
    if (nombreGuardado) nombreGuardado = nombreGuardado.replace(/^"|"$/g, '');
    if (nombreGuardado && campoNombre) {
        campoNombre.value = nombreGuardado;
        const checkRecordar = document.getElementById('guardar-local');
        if (checkRecordar) checkRecordar.checked = true;
    } else if (campoNombre) {
        campoNombre.value = '';
    }
    cargarSugerencias();
    if (campoNombre) {
        campoNombre.addEventListener('click', () => { cargarSugerencias(); campoNombre.setAttribute('list', 'lista-usuarios'); });
        campoNombre.addEventListener('input', () => { cargarSugerencias(); campoNombre.setAttribute('list', 'lista-usuarios'); });
        campoNombre.addEventListener('focus', () => { cargarSugerencias(); campoNombre.setAttribute('list', 'lista-usuarios'); });
    }
}

window.addEventListener('resize', ajustarLayoutAdaptativo);

// ==========================================
// 3. CARGAR DATOS PANTALLA 1 (PERFIL)
// ==========================================
function cargarDatosPantalla1() {
    if (!usuarioActivo?.id) return;
    document.getElementById('reg-nombres').value = usuarioActivo.nombre || '';
    document.getElementById('reg-apellidos').value = usuarioActivo.apellidos || '';
    document.getElementById('reg-id').value = usuarioActivo.idEmpleado || '';
    document.getElementById('reg-tel').value = usuarioActivo.telefono || '';
    document.getElementById('reg-email').value = usuarioActivo.email || '';
    document.getElementById('reg-pais').value = usuarioActivo.paisPrefijo || '+502';
    document.getElementById('reg-posicion').value = usuarioActivo.posicion || '';
    if (usuarioActivo.posicion) document.getElementById('visor-acronimo').textContent = usuarioActivo.acronimo || '---';
}

// ==========================================
// 4. CARGAR DATOS PANTALLA 3 (IDENTIDAD)
// ==========================================
function cargarDatosPantalla3() {
    const empresaNombre = document.getElementById('empresa-nombre');
    if (empresaNombre && identidadCorporativa.nombre) {
        empresaNombre.value = identidadCorporativa.nombre;
        document.getElementById('empresa-acronimo').value = identidadCorporativa.acronimo || '';
    }
    if (identidadCorporativa.logo) {
        const vistaPrevia = document.getElementById('vista-previa-logo');
        const placeholder = document.getElementById('texto-placeholder-logo');
        vistaPrevia.src = identidadCorporativa.logo;
        vistaPrevia.style.display = 'block';
        placeholder.style.display = 'none';
        setTimeout(() => analizarColoresLogoAutomatico(), 100);
    }

    configuracionEstetica.colorFondo = identidadCorporativa.colorFondo || configuracionEstetica.colorFondo;
    configuracionEstetica.colorTexto = identidadCorporativa.colorTexto || configuracionEstetica.colorTexto;
    configuracionEstetica.colorBotones = identidadCorporativa.colorBotones || configuracionEstetica.colorBotones;
    aplicarCambiosVisuales();

    document.getElementById('id-slogan').value = identidadCorporativa.slogan || '';
    document.getElementById('sel-tipografia').value = identidadCorporativa.tipografia || "'Segoe UI', sans-serif";
    document.getElementById('sel-estilo').value = identidadCorporativa.estiloSlogan || 'normal';
    actualizarVistaPrevia();
    document.getElementById('id-mision').value = identidadCorporativa.mision || '';
    document.getElementById('id-vision').value = identidadCorporativa.vision || '';
    document.getElementById('id-valores').value = identidadCorporativa.valores ? identidadCorporativa.valores.join(', ') : '';
    document.getElementById('preview-fondo').style.backgroundColor = identidadCorporativa.colorFondo;
    document.getElementById('preview-texto').style.backgroundColor = identidadCorporativa.colorTexto;
    document.getElementById('preview-botones').style.backgroundColor = identidadCorporativa.colorBotones;
}

function procesarLogo(input) {
    const archivo = input?.files?.[0];
    const vistaPrevia = document.getElementById('vista-previa-logo');
    const placeholder = document.getElementById('texto-placeholder-logo');

    if (!archivo) {
        mostrarAvisoInmediato('✖ Seleccione un archivo de imagen', 'error');
        return;
    }
    const nombreArchivo = archivo.name || '';
    const tipoValido = ['image/jpeg', 'image/jpg', 'image/png'];
    const extensionValida = /\.(jpe?g|png)$/i;
    if (!tipoValido.includes(archivo.type) || !extensionValida.test(nombreArchivo)) {
        mostrarAvisoInmediato('✖ El archivo debe ser JPG, JPEG o PNG', 'error');
        input.value = '';
        return;
    }

    const lector = new FileReader();
    lector.onload = function(evento) {
        const resultado = evento.target.result;
        if (vistaPrevia) {
            vistaPrevia.src = resultado;
            vistaPrevia.style.display = 'block';
        }
        if (placeholder) {
            placeholder.style.display = 'none';
        }
        identidadCorporativa.logo = resultado;
        guardarEnStorage(STORAGE_KEYS.IDENTIDAD, identidadCorporativa);
        aplicarBrandingGlobal();
        setTimeout(() => analizarColoresLogoAutomatico(), 100);
    };
    lector.onerror = function() {
        mostrarAvisoInmediato('✖ No se pudo cargar el logo. Intente con otro archivo.', 'error');
        input.value = '';
    };
    lector.readAsDataURL(archivo);
}

// ==========================================
// 5. SEGURIDAD: EFECTO LETRA-PUNTO
// ==========================================
let timerOcultarCaracter;
function manejarMascara(input) {
    if (timerOcultarCaracter) clearTimeout(timerOcultarCaracter);
    const mapaVariables = {
        'reg-pass': 'claveReal', 'reg-pass-conf': 'claveConfReal', 'acc-pass': 'claveAccesoReal',
        'edit-pass-actual': 'claveEditActual', 'edit-pass-nueva': 'claveEditNueva', 'edit-pass-conf': 'claveEditConf',
        'recuperacion-nueva-pass': 'claveRecuperacion', 'recuperacion-conf-pass': 'claveRecuperacionConf',
        'nueva-pass-obligatoria': 'claveObligatoriaNueva', 'conf-pass-obligatoria': 'claveObligatoriaConf'
    };
    const varNombre = mapaVariables[input.id];
    if (!varNombre) return;
    let memoriaActual = window[varNombre] || '';
    const valorActual = input.value;
    if (valorActual === "") memoriaActual = "";
    else if (valorActual.length > memoriaActual.length) {
        const nuevoChar = valorActual[valorActual.length - 1];
        if (nuevoChar !== '●') memoriaActual += nuevoChar;
    } else memoriaActual = memoriaActual.substring(0, valorActual.length);
    window[varNombre] = memoriaActual;
    if (memoriaActual.length > 0) {
        input.value = "●".repeat(memoriaActual.length - 1) + memoriaActual.slice(-1);
        timerOcultarCaracter = setTimeout(() => { if (input.value.length === memoriaActual.length) input.value = "●".repeat(memoriaActual.length); }, 800);
    }
    if (input.id === 'reg-pass' || input.id === 'reg-pass-conf') validarPasswords();
}

// ==========================================
// 6. GENERACIÓN DE ACRÓNIMOS
// ==========================================
function generarAcronimo(valor, esPuesto = false) {
    if (!valor || valor.trim() === "") {
        if (esPuesto) {
            const visor = document.getElementById('visor-acronimo') || document.getElementById('modal-acronimo-preview');
            if (visor) visor.textContent = "---";
        }
        return "---";
    }
    let resultado = "";
    if (esPuesto) {
        resultado = valor.split('').filter(caracter => {
            const codigo = caracter.charCodeAt(0);
            return (codigo >= 65 && codigo <= 90) || (codigo >= 48 && codigo <= 57);
        }).join('');
        if (resultado === "") resultado = "---";
        const visor = document.getElementById('visor-acronimo') || document.getElementById('modal-acronimo-preview');
        if (visor) visor.textContent = resultado;
    } else {
        resultado = valor.trim().split(/\s+/).filter(palabra => palabra.length > 0).map(palabra => palabra[0]).join('').toUpperCase().substring(0, 5);
    }
    return resultado;
}

document.addEventListener('input', (e) => {
    if (e.target.id === 'empresa-nombre') {
        const acronimoInput = document.getElementById('empresa-acronimo');
        if (acronimoInput) acronimoInput.value = generarAcronimo(e.target.value, false);
    }
    if (e.target.id === 'reg-posicion') generarAcronimo(e.target.value, true);
    if (e.target.id === 'modal-puesto') {
        const visor = document.getElementById('modal-acronimo-preview');
        if (visor) visor.textContent = generarAcronimo(e.target.value, true);
    }
});

// ==========================================
// 7. VALIDACIÓN DE CONTACTO
// ==========================================
function validarContacto() {
    const email = document.getElementById('reg-email').value;
    const tel = document.getElementById('reg-tel').value;
    const aviso = document.getElementById('mensaje-contacto');
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const telRegex = /^[0-9]{8}$/;
    if (email !== "" && !emailRegex.test(email)) {
        aviso.innerText = "✖ Correo electrónico inválido";
        aviso.className = "aviso-letrero texto-error";
        aviso.style.maxHeight = "40px";
        return false;
    } else if (tel !== "" && !telRegex.test(tel)) {
        aviso.innerText = "✖ Teléfono inválido (8 dígitos)";
        aviso.className = "aviso-letrero texto-error";
        aviso.style.maxHeight = "40px";
        return false;
    } else if (emailRegex.test(email) || telRegex.test(tel)) {
        aviso.innerText = "✓ Formato correcto";
        aviso.className = "aviso-letrero texto-exito";
        aviso.style.maxHeight = "40px";
        return true;
    }
    aviso.style.maxHeight = "0";
    return false;
}

// ==========================================
// 8. VALIDACIÓN DE CONTRASEÑAS
// ==========================================
function validarPasswords() {
    const pass1 = document.getElementById('reg-pass');
    const pass2 = document.getElementById('reg-pass-conf');
    const aviso = document.getElementById('mensaje-password');
    if (document.getElementById('campos-cambio-contrasena') && document.getElementById('campos-cambio-contrasena').style.display === 'block') return true;
    if (!pass1 || !pass2 || !aviso) return false;
    const p1 = window.claveReal || '';
    const p2 = window.claveConfReal || '';
    if (p1 === '' && p2 === '') {
        aviso.innerText = '';
        aviso.className = 'aviso-letrero';
        aviso.style.maxHeight = '0';
        return false;
    }
    if (p1.length > 0 && p1.length < 6) {
        aviso.innerText = '⚠ Mínimo 6 caracteres';
        aviso.className = 'aviso-letrero texto-advertencia';
        aviso.style.maxHeight = '40px';
        return false;
    }
    if (p2 !== '') {
        if (p1 !== p2) {
            aviso.innerText = '✖ No coinciden';
            aviso.className = 'aviso-letrero texto-error';
            aviso.style.maxHeight = '40px';
            return false;
        } else {
            aviso.innerText = '✓ Coinciden';
            aviso.className = 'aviso-letrero texto-exito';
            aviso.style.maxHeight = '40px';
            return true;
        }
    }
    aviso.innerText = '';
    aviso.className = 'aviso-letrero';
    aviso.style.maxHeight = '0';
    return false;
}

// ==========================================
// 9. PROCESAR REGISTRO O EDICIÓN (CORREGIDO)
// ==========================================
function procesarRegistro() {
    const nombres = document.getElementById('reg-nombres').value.trim();
    const apellidos = document.getElementById('reg-apellidos').value.trim();
    const idEmpleado = document.getElementById('reg-id').value.trim();
    const telefono = document.getElementById('reg-tel').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const posicion = document.getElementById('reg-posicion').value.trim();
    const esEdicion = (typeof usuarioActivo !== 'undefined' && usuarioActivo && usuarioActivo.id);
    
    if (esEdicion) {
        if (!nombres || !idEmpleado || !posicion) {
            mostrarAvisoInmediato("✖ Campos obligatorios incompletos", "error");
            return;
        }
        usuarioActivo.nombre = nombres;
        usuarioActivo.apellidos = apellidos;
        usuarioActivo.nombreCompleto = `${nombres} ${apellidos}`;
        usuarioActivo.idEmpleado = idEmpleado;
        usuarioActivo.telefono = telefono;
        usuarioActivo.email = email;
        usuarioActivo.posicion = posicion;
        usuarioActivo.acronimo = generarAcronimo(posicion, true);
        const passActual = document.getElementById('edit-pass-actual')?.value;
        const passNueva = document.getElementById('edit-pass-nueva')?.value;
        const passConf = document.getElementById('edit-pass-conf')?.value;
        if (passActual || passNueva) {
            if (usuarioActivo.contrasena !== passActual) {
                mostrarAvisoInmediato("✖ Contraseña actual incorrecta", "error");
                return;
            }
            if (!passNueva || passNueva.length < 6 || passNueva !== passConf) {
                mostrarAvisoInmediato("✖ Error en nueva contraseña", "error");
                return;
            }
            usuarioActivo.contrasena = passNueva;
            ['edit-pass-actual', 'edit-pass-nueva', 'edit-pass-conf'].forEach(id => { const el = document.getElementById(id); if (el) { el.value = ""; manejarMascara(el); } });
        }
        const idx = baseDatosUsuarios.findIndex(u => u.id === usuarioActivo.id);
        if (idx !== -1) baseDatosUsuarios[idx] = {...usuarioActivo};
        guardarEnStorage(STORAGE_KEYS.USUARIO_ACTIVO, usuarioActivo);
        guardarEnStorage(STORAGE_KEYS.BASE_USUARIOS, baseDatosUsuarios);
        mostrarAvisoInmediato("✓ Perfil actualizado", "exito");
        setTimeout(() => irAPantalla('pantalla-configuracion'), 1500);
        return;
    }
    
    // REGISTRO NUEVO
    if (!nombres || !idEmpleado || !posicion || (!telefono && !email)) {
        mostrarAvisoInmediato("✖ Datos incompletos", "error");
        return;
    }
    if (!validarPasswords()) {
        mostrarAvisoInmediato("✖ Las contraseñas no son válidas o no coinciden", "error");
        return;
    }
    const usuarioExistente = baseDatosUsuarios.find(u => u.telefono === telefono || u.email === email || u.idEmpleado === idEmpleado);
    if (usuarioExistente) {
        if (datosInvitacionActual && datosInvitacionActual.codigoInvitacion) {
            const invitacion = invitacionesPendientes.find(inv => inv.codigoInvitacion === datosInvitacionActual.codigoInvitacion);
            if (invitacion && invitacion.estado === "pendiente") {
                const invitador = baseDatosUsuarios.find(u => u.id === invitacion.invitadoPor);
                if (invitador && invitador.id !== usuarioExistente.id) {
                    usuarioExistente.superiorId = invitador.id;
                    if (invitador.esNo1 && !usuarioExistente.esNo1) usuarioExistente.esPrimeraLinea = true;
                    invitacion.estado = "aceptada";
                    invitacion.fechaExpiracion = new Date();
                    invitacion.fechaRespuesta = new Date();
                    invitacion.tiempoRespuestaMs = invitacion.fechaRespuesta - new Date(invitacion.fechaInvitacion);
                    guardarEnStorage(STORAGE_KEYS.BASE_USUARIOS, baseDatosUsuarios);
                    guardarEnStorage(STORAGE_KEYS.INVITACIONES, invitacionesPendientes);
                    mostrarAvisoInmediato(`✓ Bienvenido de nuevo. Ahora eres parte del equipo de ${invitador.nombre}`, "exito");
                    datosInvitacionActual = {};
                    setTimeout(() => irAPantalla('pantalla-acceso'), 1500);
                    return;
                }
            }
        }
        mostrarAvisoInmediato("✖ Este usuario ya está registrado", "error");
        return;
    }
    
    const nuevoUsuario = {
        id: generarIdUnico(), nombre: nombres, apellidos: apellidos, nombreCompleto: `${nombres} ${apellidos}`,
        idEmpleado: idEmpleado, telefono: telefono, email: email, posicion: posicion,
        acronimo: generarAcronimo(posicion, true), contrasena: claveReal, rol: "Colaborador",
        superiorId: (datosInvitacionActual && datosInvitacionActual.invitadoPor) ? datosInvitacionActual.invitadoPor : null,
        esNo1: (!datosInvitacionActual || !datosInvitacionActual.invitadoPor), esPrimeraLinea: false,
        activo: true, fechaRegistro: new Date()
    };
    if (nuevoUsuario.esNo1) nuevoUsuario.esPrimeraLinea = true;
    const usuariosGuardados = cargarDeStorage(STORAGE_KEYS.BASE_USUARIOS);
    if (Array.isArray(usuariosGuardados)) baseDatosUsuarios = usuariosGuardados;
    baseDatosUsuarios.push(nuevoUsuario);
    guardarEnStorage(STORAGE_KEYS.BASE_USUARIOS, baseDatosUsuarios);
    if (nuevoUsuario.esNo1) {
        datosOrganigrama = reconstruirOrganigramaDesdeUsuario(nuevoUsuario);
        guardarEnStorage(STORAGE_KEYS.ORGANIGRAMA, datosOrganigrama);
    }
    if (datosInvitacionActual && datosInvitacionActual.codigoInvitacion) {
        const invitacion = invitacionesPendientes.find(inv => inv.codigoInvitacion === datosInvitacionActual.codigoInvitacion);
        if (invitacion) {
            invitacion.estado = "aceptada";
            invitacion.fechaExpiracion = new Date();
            invitacion.fechaRespuesta = new Date();
            invitacion.tiempoRespuestaMs = invitacion.fechaRespuesta - new Date(invitacion.fechaInvitacion);
            guardarEnStorage(STORAGE_KEYS.INVITACIONES, invitacionesPendientes);
        }
    }
    usuarioActivo = nuevoUsuario;
    guardarEnStorage(STORAGE_KEYS.USUARIO_ACTIVO, usuarioActivo);
    let usuariosDispositivo = localStorage.getItem('usuarios_del_dispositivo');
    usuariosDispositivo = usuariosDispositivo ? JSON.parse(usuariosDispositivo) : [];
    if (!usuariosDispositivo.includes(nombres)) { usuariosDispositivo.push(nombres); localStorage.setItem('usuarios_del_dispositivo', JSON.stringify(usuariosDispositivo)); }
    claveReal = ""; claveConfReal = "";
    document.getElementById('reg-pass').value = "";
    document.getElementById('reg-pass-conf').value = "";
    mostrarAvisoInmediato("✓ Registro exitoso", "exito");
    datosInvitacionActual = {};
    setTimeout(() => irAPantalla('pantalla-acceso'), 1500);
}

// ==========================================
// 10. VALIDAR ENTRADA (LOGIN)
// ==========================================
function validarEntrada() {
    let nombreCompleto = document.getElementById('acc-nombre-completo').value.trim();
    const idEmpleado = document.getElementById('acc-id').value.trim();
    const campoPass = document.getElementById('acc-pass');
    const aviso = document.getElementById('mensaje-acceso');
    nombreCompleto = nombreCompleto.replace(/^"|"$/g, '');
    if (!nombreCompleto || !idEmpleado || !window.claveAccesoReal) {
        if (aviso) { aviso.innerText = "✖ Complete todos los campos"; aviso.className = "aviso-letrero texto-error"; aviso.style.maxHeight = "40px"; }
        return;
    }
    const usuario = baseDatosUsuarios.find(u => u.nombreCompleto.toLowerCase() === nombreCompleto.toLowerCase() && u.idEmpleado === idEmpleado);
    if (!usuario) {
        intentosLogin++;
        actualizarIntentosRestantes();
        if (aviso) { aviso.innerText = "✖ Usuario no encontrado"; aviso.className = "aviso-letrero texto-error"; aviso.style.maxHeight = "40px"; }
        window.claveAccesoReal = "";
        if (campoPass) { campoPass.value = ""; manejarMascara(campoPass); }
        const btnOlvido = document.getElementById('btn-olvidaste-pass');
        if (intentosLogin >= maxIntentosLogin && btnOlvido) btnOlvido.style.display = 'block';
        return;
    }
    if (usuario.contrasena !== window.claveAccesoReal) {
        intentosLogin++;
        actualizarIntentosRestantes();
        if (aviso) { aviso.innerText = "✖ Contraseña incorrecta"; aviso.className = "aviso-letrero texto-error"; aviso.style.maxHeight = "40px"; }
        window.claveAccesoReal = "";
        if (campoPass) { campoPass.value = ""; manejarMascara(campoPass); }
        const btnOlvido = document.getElementById('btn-olvidaste-pass');
        if (intentosLogin >= maxIntentosLogin && btnOlvido) btnOlvido.style.display = 'block';
        return;
    }
    intentosLogin = 0;
    if (aviso) aviso.style.maxHeight = "0";
    const divIntentos = document.getElementById('intentos-restantes');
    if (divIntentos) divIntentos.style.display = 'none';
    const btnOlvido = document.getElementById('btn-olvidaste-pass');
    if (btnOlvido) btnOlvido.style.display = 'none';
    usuarioActivo = usuario;
    usuario.ultimoAcceso = new Date();
    sesionActiva = true;
    tokenSesion = generarIdUnico();
    guardarEnStorage(STORAGE_KEYS.USUARIO_ACTIVO, usuarioActivo);
    guardarEnStorage(STORAGE_KEYS.TOKEN_SESION, tokenSesion);
    const organigramaGuardado = cargarDeStorage(STORAGE_KEYS.ORGANIGRAMA);
    if (organigramaGuardado) {
        datosOrganigrama = organigramaGuardado;
    } else if (usuario.esNo1) {
        datosOrganigrama = reconstruirOrganigramaDesdeUsuario(usuario);
        if (datosOrganigrama) guardarEnStorage(STORAGE_KEYS.ORGANIGRAMA, datosOrganigrama);
    }
    const checkGuardar = document.getElementById('guardar-local');
    if (checkGuardar && checkGuardar.checked) guardarEnStorage(STORAGE_KEYS.RECORDAR_USUARIO, nombreCompleto);
    let usuariosDispositivo = localStorage.getItem('usuarios_del_dispositivo');
    usuariosDispositivo = usuariosDispositivo ? JSON.parse(usuariosDispositivo) : [];
    if (!usuariosDispositivo.includes(nombreCompleto)) { usuariosDispositivo.push(nombreCompleto); localStorage.setItem('usuarios_del_dispositivo', JSON.stringify(usuariosDispositivo)); }
    window.claveAccesoReal = "";
    if (campoPass) campoPass.value = "";
    if (usuario.requiereCambioContrasena) { mostrarModalCambioObligatorio(); return; }
    mostrarAvisoInmediato(`✓ Hola, ${usuario.nombre}`, "exito");
    if (typeof iniciarTemporizadorInactividad === 'function') iniciarTemporizadorInactividad();
    actualizarMenuTuerca();
    const botonTuerca = document.getElementById('boton-tuerca-global');
    if (botonTuerca) botonTuerca.style.display = 'flex';
    setTimeout(() => {
        if (usuario.esNo1 && !identidadCorporativa.completada) irAPantalla('pantalla-identidad');
        else irAPantalla('pantalla-comunicacion');
    }, 1500);
}

// ==========================================
// 11. ACTUALIZAR INTENTOS RESTANTES
// ==========================================
function actualizarIntentosRestantes() {
    const intentosRestantes = maxIntentosLogin - intentosLogin;
    const elemento = document.getElementById('intentos-restantes');
    if (elemento && intentosRestantes > 0) {
        elemento.innerText = `⚠ Intentos restantes: ${intentosRestantes}`;
        elemento.style.display = 'block';
        elemento.style.maxHeight = "40px";
    } else if (elemento) {
        elemento.style.maxHeight = "0";
        setTimeout(() => elemento.style.display = 'none', 300);
    }
}

// ==========================================
// 12. ACTUALIZAR MENÚ DE LA TUERCA
// ==========================================
function actualizarMenuTuerca() {
    const menuContainer = document.getElementById('lista-hojas-dinamica');
    if (!menuContainer) return;
    menuContainer.innerHTML = '';
    for (const [id, info] of Object.entries(estadoPantallas)) {
        if (info.visiblePara.includes('todos') || (usuarioActivo && info.visiblePara.includes(usuarioActivo.rol)) ||
            (usuarioActivo && usuarioActivo.esNo1 && info.visiblePara.includes('No.1')) ||
            (usuarioActivo && usuarioActivo.esPrimeraLinea && info.visiblePara.includes('PrimeraLinea'))) {
            const enlace = document.createElement('a');
            enlace.href = '#';
            enlace.innerHTML = `${info.icono} ${info.nombre}`;
            enlace.onclick = (e) => { e.preventDefault(); irAPantalla(id); toggleMenuTuerca(); };
            if (pantallaActual === id) enlace.classList.add('activo');
            menuContainer.appendChild(enlace);
        }
    }
    const separador = document.createElement('hr');
    separador.style.margin = '10px 20px';
    separador.style.border = '0.5px solid rgba(255,255,255,0.1)';
    menuContainer.appendChild(separador);
    const cerrarSesionLink = document.createElement('a');
    cerrarSesionLink.href = '#';
    cerrarSesionLink.innerHTML = '🚪 Cerrar Sesión';
    cerrarSesionLink.onclick = (e) => { e.preventDefault(); cerrarSesion(); toggleMenuTuerca(); };
    menuContainer.appendChild(cerrarSesionLink);
}

// ==========================================
// 13. TOGGLE MENÚ TUERCA
// ==========================================
function toggleMenuTuerca() {
    const menu = document.getElementById('menu-lateral-organico');
    const overlay = document.getElementById('overlay-menu');
    if (menu) menu.classList.toggle('abierto');
    if (overlay) overlay.classList.toggle('activo');
}

// ==========================================
// 14. CARGAR NOMBRE RECORDADO
// ==========================================
function cargarNombreRecordado() {
    let nombreGuardado = cargarDeStorage(STORAGE_KEYS.RECORDAR_USUARIO);
    const spanNombre = document.getElementById('nombre-usuario-login');
    if (nombreGuardado) nombreGuardado = nombreGuardado.replace(/^"|"$/g, '');
    if (nombreGuardado) {
        const campoNombre = document.getElementById('acc-nombre-completo');
        const checkRecordar = document.getElementById('guardar-local');
        if (campoNombre) campoNombre.value = nombreGuardado;
        if (checkRecordar) checkRecordar.checked = true;
        if (spanNombre) spanNombre.innerText = nombreGuardado.split(' ')[0];
    } else { if (spanNombre) spanNombre.innerText = "de nuevo"; }
    const datalist = document.getElementById('lista-usuarios');
    if (datalist) {
        datalist.innerHTML = '';
        baseDatosUsuarios.forEach(u => { const option = document.createElement('option'); option.value = u.nombreCompleto; datalist.appendChild(option); });
    }
    const elementoFrase = document.getElementById('frase-motivacional');
    if (elementoFrase) elementoFrase.innerText = `"${obtenerFraseMotivacional()}"`;
}

// ==========================================
// 15. SALVAR IDENTIDAD (PANTALLA 3)
// ==========================================
function salvarIdentidad() {
    const empresaNombre = document.getElementById('empresa-nombre').value.trim();
    const slogan = document.getElementById('id-slogan').value.trim();
    const mision = document.getElementById('id-mision').value.trim();
    const vision = document.getElementById('id-vision').value.trim();
    const valores = document.getElementById('id-valores').value.trim();
    if (!identidadCorporativa.logo || !empresaNombre || !slogan || !mision || !vision || !valores) {
        mostrarAvisoInmediato("✖ Complete todos los campos, incluyendo el Logo", "error");
        return;
    }
    identidadCorporativa.completada = true;
    identidadCorporativa.completadaPor = usuarioActivo.id;
    identidadCorporativa.nombre = empresaNombre;
    identidadCorporativa.acronimo = document.getElementById('empresa-acronimo').value;
    identidadCorporativa.slogan = slogan;
    identidadCorporativa.mision = mision;
    identidadCorporativa.vision = vision;
    identidadCorporativa.valores = valores.split(',').map(v => v.trim()).filter(v => v !== "");
    identidadCorporativa.colorFondo = configuracionEstetica.colorFondo;
    identidadCorporativa.colorTexto = configuracionEstetica.colorTexto;
    identidadCorporativa.colorBotones = configuracionEstetica.colorBotones;
    guardarEnStorage(STORAGE_KEYS.IDENTIDAD, identidadCorporativa);
    aplicarCambiosVisuales();
    mostrarAvisoInmediato("✓ Identidad corporativa establecida con éxito", "exito");
    aplicarBrandingGlobal();
    iniciarRotacionMensajes();
    setTimeout(() => irAPantalla('pantalla-organigrama'), 1500);
}

// ==========================================
// 16. SALTAR IDENTIDAD
// ==========================================
function saltarIdentidad() {
    mostrarAvisoInmediato("⚠ Accediendo con branding genérico temporal", "advertencia");
    setTimeout(() => irAPantalla('pantalla-organigrama'), 1500);
}

// ==========================================
// 17. APLICAR BRANDING GLOBAL (CORREGIDO - LOGO CARGA CORRECTAMENTE)
// ==========================================
function aplicarBrandingGlobal() {
    const brandingEmpresa = document.getElementById('branding-corporativo');
    const brandingStratos = document.querySelector('.branding');
    const logoImg = document.getElementById('logo-empresa-header');
    const tieneDatosGuardados = identidadCorporativa.logo && identidadCorporativa.logo !== "";
    
    if (tieneDatosGuardados) {
        const root = document.documentElement;
        if (identidadCorporativa.colorFondo) root.style.setProperty('--color-fondo', identidadCorporativa.colorFondo);
        if (identidadCorporativa.colorTexto) root.style.setProperty('--color-texto', identidadCorporativa.colorTexto);
        if (identidadCorporativa.colorBotones) root.style.setProperty('--color-primario', identidadCorporativa.colorBotones);
        if (identidadCorporativa.tipografia) root.style.setProperty('--familia-tipografica', identidadCorporativa.tipografia);
        
        if (brandingEmpresa) brandingEmpresa.style.display = 'flex';
        if (brandingStratos) brandingStratos.style.display = 'none';
        if (logoImg && identidadCorporativa.logo) {
            logoImg.src = identidadCorporativa.logo;
            logoImg.style.display = 'block';
        }
        
        const sloganHeader = document.getElementById('slogan-empresa-header');
        if (sloganHeader && identidadCorporativa.slogan) {
            sloganHeader.innerText = identidadCorporativa.slogan;
            sloganHeader.style.fontFamily = identidadCorporativa.tipografia || "'Segoe UI', sans-serif";
            const est = identidadCorporativa.estiloSlogan || "";
            sloganHeader.style.fontWeight = est.includes('bold') ? 'bold' : 'normal';
            sloganHeader.style.fontStyle = est.includes('italic') ? 'italic' : 'normal';
        }
        
        const fraseHeader = document.getElementById('frase-empresa-header');
        if (fraseHeader) {
            const fuentes = [identidadCorporativa.mision, identidadCorporativa.vision, ...(identidadCorporativa.valores || [])];
            let pool = [];
            fuentes.forEach(f => {
                if (f && typeof f === 'string') {
                    let fragmentos = f.split(/[.,]/).map(s => s.trim()).filter(s => s.length > 0);
                    fragmentos.forEach(frag => {
                        if (frag.length > 140) { let corte = frag.substring(0, 140); pool.push(corte.substring(0, Math.min(corte.length, corte.lastIndexOf(" "))) + "..."); }
                        else pool.push(frag);
                    });
                }
            });
            if (pool.length > 0) fraseHeader.innerText = `"${pool[Math.floor(Math.random() * pool.length)]}"`;
            else if (identidadCorporativa.slogan) fraseHeader.innerText = `"${identidadCorporativa.slogan}"`;
        }
    } else {
        if (brandingEmpresa) brandingEmpresa.style.display = 'none';
        if (brandingStratos) brandingStratos.style.display = 'block';
    }
}

function verificarMensajeIdentidad() {
    const mensajeDiv = document.getElementById('mensaje-personalizado');
    if (!mensajeDiv) return;
    if (identidadCorporativa.completada) {
        mensajeDiv.style.display = 'none';
        return;
    }
    if (usuarioActivo && usuarioActivo.esNo1) {
        mensajeDiv.style.display = 'flex';
    }
}

function cerrarModalContacto() {
    const modal = document.getElementById('modal-contacto');
    if (modal) modal.style.display = 'none';
    contactoEnEdicion = null;
    tipoContactoActual = 'directo';
    const descripcion = document.getElementById('descripcion-tipo-contacto');
    if (descripcion) descripcion.textContent = '';
}

function mostrarModalCambioObligatorio() {
    const modal = document.getElementById('modal-cambio-obligatorio');
    if (modal) modal.style.display = 'flex';
}

function cambiarContrasenaObligatoria() {
    const mensaje = document.getElementById('mensaje-cambio-obligatorio');
    const passNueva = window.claveObligatoriaNueva || '';
    const passConf = window.claveObligatoriaConf || '';
    if (!passNueva || passNueva.length < 6) {
        if (mensaje) {
            mensaje.innerText = '✖ La contraseña debe tener al menos 6 caracteres';
            mensaje.className = 'aviso-letrero texto-error';
            mensaje.style.maxHeight = '40px';
        }
        return;
    }
    if (passNueva !== passConf) {
        if (mensaje) {
            mensaje.innerText = '✖ Las contraseñas no coinciden';
            mensaje.className = 'aviso-letrero texto-error';
            mensaje.style.maxHeight = '40px';
        }
        return;
    }
    if (usuarioActivo) {
        usuarioActivo.contrasena = passNueva;
        usuarioActivo.requiereCambioContrasena = false;
        const idx = baseDatosUsuarios.findIndex(u => u.id === usuarioActivo.id);
        if (idx !== -1) baseDatosUsuarios[idx] = { ...usuarioActivo };
        guardarEnStorage(STORAGE_KEYS.USUARIO_ACTIVO, usuarioActivo);
        guardarEnStorage(STORAGE_KEYS.BASE_USUARIOS, baseDatosUsuarios);
    }
    if (mensaje) {
        mensaje.innerText = '✓ Contraseña actualizada';
        mensaje.className = 'aviso-letrero texto-exito';
        mensaje.style.maxHeight = '40px';
    }
    const modal = document.getElementById('modal-cambio-obligatorio');
    if (modal) modal.style.display = 'none';
    window.claveObligatoriaNueva = '';
    window.claveObligatoriaConf = '';
    const inputNueva = document.getElementById('nueva-pass-obligatoria');
    const inputConf = document.getElementById('conf-pass-obligatoria');
    if (inputNueva) inputNueva.value = '';
    if (inputConf) inputConf.value = '';
    mostrarAvisoInmediato('✓ Contraseña actualizada correctamente', 'exito');
}

// ==========================================
// 18. ANALIZAR COLORES DEL LOGO (CORREGIDO)
// ==========================================
function hexToRgb(hex) {
    hex = hex.replace('#', '');
    return {
        r: parseInt(hex.substring(0, 2), 16),
        g: parseInt(hex.substring(2, 4), 16),
        b: parseInt(hex.substring(4, 6), 16)
    };
}

function rgbToHex(r, g, b) {
    const toHex = (value) => Math.max(0, Math.min(255, value)).toString(16).padStart(2, '0').toUpperCase();
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function distanciaColores(c1, c2) {
    return Math.sqrt(Math.pow(c1.r - c2.r, 2) + Math.pow(c1.g - c2.g, 2) + Math.pow(c1.b - c2.b, 2));
}

function colorEsDistinto(hex, paleta, umbral = 40) {
    const rgb = hexToRgb(hex);
    return !paleta.some(item => distanciaColores(rgb, hexToRgb(item)) < umbral);
}

function obtenerComplementario(hex) {
    const rgb = hexToRgb(hex);
    return rgbToHex(255 - rgb.r, 255 - rgb.g, 255 - rgb.b);
}

function analizarColoresLogoAutomatico() {
    const imgElement = document.getElementById('vista-previa-logo');
    if (!imgElement || !imgElement.src || imgElement.style.display === 'none') return;
    
    if (!imgElement.complete) {
        imgElement.onload = () => analizarColoresLogoAutomatico();
        return;
    }
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 100;
    canvas.height = 100;
    ctx.drawImage(imgElement, 0, 0, 100, 100);
    const data = ctx.getImageData(0, 0, 100, 100).data;
    
    const coloresMap = {};
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];
        if (a < 200) continue;
        
        const rQ = Math.round(r / 16) * 16;
        const gQ = Math.round(g / 16) * 16;
        const bQ = Math.round(b / 16) * 16;
        const hex = rgbToHex(rQ, gQ, bQ);
        coloresMap[hex] = (coloresMap[hex] || 0) + 1;
    }
    
    // Helpers: luminance and contrast (WCAG)
    function hexToRgb(hex) {
        const clean = hex.replace('#', '');
        const num = parseInt(clean.length === 3 ? clean.split('').map(c => c + c).join('') : clean, 16);
        return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
    }
    function linearizeChannel(c) {
        const s = c / 255;
        return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
    }
    function luminance(hex) {
        const { r, g, b } = hexToRgb(hex);
        return 0.2126 * linearizeChannel(r) + 0.7152 * linearizeChannel(g) + 0.0722 * linearizeChannel(b);
    }
    function contrastRatio(a, b) {
        const L1 = luminance(a);
        const L2 = luminance(b);
        const light = Math.max(L1, L2);
        const dark = Math.min(L1, L2);
        return (light + 0.05) / (dark + 0.05);
    }

    // Determine colors detected and select up to 3 logo colors (explicit count)
    let coloresPrincipales = Object.keys(coloresMap)
        .map(hex => ({ hex: hex.toUpperCase(), count: coloresMap[hex] }))
        .sort((a, b) => b.count - a.count)
        .map(item => item.hex);

    const totalColoresDetectados = coloresPrincipales.length;
    const tieneBlanco = coloresPrincipales.includes('#FFFFFF');
    const tieneNegro = coloresPrincipales.includes('#000000');

    // Exclude white/black for selecting logo colors and count remaining
    const coloresFiltrados = coloresPrincipales.filter(hex => hex !== '#FFFFFF' && hex !== '#000000');
    let seleccionLogo = [];
    if (coloresFiltrados.length > 3) {
        seleccionLogo = coloresFiltrados.slice(0, 3);
    } else {
        seleccionLogo = coloresFiltrados.slice(0);
    }

    // Always include white and black as separate entries
    const basePaleta = [...seleccionLogo];

    // Prepare seguridad candidates and score them by contrast against seleccionLogo
    const coloresSeguridad = ["#0f3460", "#16213e", "#00ff88", "#e94560", "#533483", "#ff6b6b", "#4ecdc4", "#ffd166", "#ffa500", "#800080", "#1a1a2e"];

    // If seleccionLogo is empty (logo is only BW or extremely simple), pick 6 seguridad
    let paletaLogo = [];
    if (basePaleta.length === 0) {
        paletaLogo = coloresSeguridad.slice(0, 6);
    } else {
        paletaLogo = [...basePaleta];
        // Score seguridad colors by sum of contrasts against logo colors
        const scored = coloresSeguridad.map(c => {
            const score = basePaleta.reduce((acc, lc) => acc + contrastRatio(c, lc), 0);
            return { color: c, score };
        }).sort((a, b) => b.score - a.score);

        for (let s of scored) {
            if (paletaLogo.length >= 6) break;
            if (!paletaLogo.includes(s.color)) paletaLogo.push(s.color);
        }
    }

    // Final palette: up to 6 logo-based/support colors, then white and black (unique)
    const final = [];
    paletaLogo.forEach(c => { if (!final.includes(c)) final.push(c); });
    if (!final.includes('#FFFFFF')) final.push('#FFFFFF');
    if (!final.includes('#000000')) final.push('#000000');

    // Ensure length 8 by adding remaining seguridad (diversity)
    let idx = 0;
    while (final.length < 8 && idx < coloresSeguridad.length) {
        const c = coloresSeguridad[idx];
        if (!final.includes(c)) final.push(c);
        idx++;
    }

    coloresExtraidos = final.slice(0, 8).map(h => h.toUpperCase());
    generarPaleta();
    mostrarAvisoInmediato("✓ Paleta sugerida con colores de contraste (luminosidad)", "exito");
}

// ==========================================
// 19. GENERAR PALETA DE COLORES (CORREGIDO)
// ==========================================
function generarPaleta() {
    const contenedor = document.getElementById('paleta-colores-centrada');
    if (!contenedor || !Array.isArray(coloresExtraidos)) return;
    
    contenedor.innerHTML = '';
    const coloresUnicos = [...new Set(coloresExtraidos)];
    let paletaFinal = [...coloresUnicos];
    const coloresSeguridad = ["#1a1a2e", "#16213e", "#0f3460", "#e94560", "#533483", "#00ff88", "#ff6b6b", "#4ecdc4", "#ffd166", "#ffa500", "#800080"];
    
    if (!paletaFinal.includes('#FFFFFF')) paletaFinal.push('#FFFFFF');
    if (!paletaFinal.includes('#000000')) paletaFinal.push('#000000');
    
    let coloresNoBW = paletaFinal.filter(color => color !== '#FFFFFF' && color !== '#000000');
    let paletaOrdenada = coloresNoBW.slice(0, 6);
    if (!paletaOrdenada.includes('#FFFFFF')) paletaOrdenada.push('#FFFFFF');
    if (!paletaOrdenada.includes('#000000')) paletaOrdenada.push('#000000');
    
    let i = 0;
    while (paletaOrdenada.length < 8 && i < coloresSeguridad.length) {
        if (!paletaOrdenada.includes(coloresSeguridad[i])) {
            paletaOrdenada.push(coloresSeguridad[i]);
        }
        i++;
    }
    
    paletaOrdenada.forEach(color => {
        const div = document.createElement('div');
        div.className = 'color-cuadro';
        div.style.backgroundColor = color;
        div.title = color;
        div.onclick = (e) => seleccionarColor(color, e.target);
        contenedor.appendChild(div);
    });
    
    coloresExtraidos = paletaOrdenada;
}

// ==========================================
// 20. GUARDAR CONTACTO E INVITAR (CORREGIDO - EVITA DUPLICACIÓN)
// ==========================================
function guardarContacto() {
    const nombre = document.getElementById('modal-nombre').value.trim();
    const puesto = document.getElementById('modal-puesto').value.trim();
    const paisPrefijo = document.getElementById('modal-pais').value;
    const telefono = document.getElementById('modal-tel').value.trim();
    const email = document.getElementById('modal-email').value.trim();
    
    if (!nombre || !puesto || (!telefono && !email)) {
        mostrarAvisoInmediato("✖ Nombre, Puesto y un medio de contacto son obligatorios", "error");
        return;
    }
    
    const nuevoId = generarIdUnico();
    const acronimoContacto = generarAcronimo(puesto, true);
    
    const nuevoContacto = {
        id: nuevoId, nombre: nombre, nombreCompleto: nombre, puesto: puesto, acronimo: acronimoContacto,
        telefono: telefono, email: email, paisPrefijo: paisPrefijo, invitacionEnviada: false, invitacionAceptada: false,
        esObservador: tipoContactoActual === 'observador', esIndirecto: tipoContactoActual === 'indirecto',
        activo: true, hijos: (tipoContactoActual === 'directo') ? [] : undefined
    };
    
    if (tipoContactoActual === 'directo') {
        if (!datosOrganigrama) {
            datosOrganigrama = { id: usuarioActivo.id, nombre: usuarioActivo.nombre, apellidos: usuarioActivo.apellidos, nombreCompleto: usuarioActivo.nombreCompleto, puesto: usuarioActivo.posicion, acronimo: usuarioActivo.acronimo, telefono: usuarioActivo.telefono, email: usuarioActivo.email, idEmpleado: usuarioActivo.idEmpleado, paisPrefijo: usuarioActivo.paisPrefijo, invitacionEnviada: true, invitacionAceptada: true, esObservador: false, esIndirecto: false, activo: true, hijos: [] };
        }
        if (!datosOrganigrama.hijos) datosOrganigrama.hijos = [];
        
        // Verificar si ya existe un contacto con el mismo ID o nombre para evitar duplicados
        const yaExiste = datosOrganigrama.hijos.some(h => h.id === nuevoId || h.nombre === nombre);
        if (!yaExiste) {
            datosOrganigrama.hijos.push(nuevoContacto);
            guardarEnStorage(STORAGE_KEYS.ORGANIGRAMA, datosOrganigrama);
        } else {
            mostrarAvisoInmediato("✖ Este contacto ya existe en el organigrama", "error");
            return;
        }
    } else if (tipoContactoActual === 'indirecto') {
        const yaExiste = contactosIndirectos.some(c => c.id === nuevoId || c.nombre === nombre);
        if (!yaExiste) {
            contactosIndirectos.push(nuevoContacto);
            guardarEnStorage(STORAGE_KEYS.INDIRECTOS, contactosIndirectos);
        } else {
            mostrarAvisoInmediato("✖ Este contacto indirecto ya existe", "error");
            return;
        }
    } else if (tipoContactoActual === 'observador') {
        const yaExiste = observadores.some(c => c.id === nuevoId || c.nombre === nombre);
        if (!yaExiste) {
            observadores.push(nuevoContacto);
            guardarEnStorage(STORAGE_KEYS.OBSERVADORES, observadores);
        } else {
            mostrarAvisoInmediato("✖ Este observador ya existe", "error");
            return;
        }
    }
    
    const codigoInv = generarCodigoInvitacion();
    const invitacion = {
        id: generarIdUnico(), usuarioDestinoId: nuevoId, nombreContacto: nombre, puestoContacto: puesto,
        telefonoContacto: telefono, emailContacto: email, paisPrefijo: paisPrefijo, tipoContacto: tipoContactoActual,
        invitadoPor: usuarioActivo.id, nombreInvitador: usuarioActivo.nombreCompleto, codigoInvitacion: codigoInv,
        linkInvitacion: `${window.location.origin}?inv=${codigoInv}`, fechaInvitacion: new Date(),
        fechaRespuesta: null, tiempoRespuestaMs: null,
        estado: "pendiente", metodoEnvio: telefono ? "whatsapp" : "email"
    };
    invitacionesPendientes.push(invitacion);
    guardarEnStorage(STORAGE_KEYS.INVITACIONES, invitacionesPendientes);
    enviarInvitacion(invitacion);
    mostrarAvisoInmediato(`✓ Invitación enviada a ${nombre}`, "exito");
    cerrarModalContacto();
    renderizarOrganigrama();
}

// ==========================================
// 21. RENDERIZAR ORGANIGRAMA PERSONAL (CORREGIDO - SOLO PRIMERA LÍNEA)
// ==========================================
function renderizarOrganigrama() {
    const contenedor = document.getElementById('lienzo-organigrama');
    if (!contenedor) return;
    contenedor.innerHTML = "";
    
    // Asegurar que exista el nodo del usuario actual
    if (!datosOrganigrama || !datosOrganigrama.id) {
        if (usuarioActivo && usuarioActivo.id) {
            datosOrganigrama = {
                id: usuarioActivo.id,
                nombre: usuarioActivo.nombre,
                apellidos: usuarioActivo.apellidos,
                nombreCompleto: usuarioActivo.nombreCompleto,
                puesto: usuarioActivo.posicion,
                acronimo: usuarioActivo.acronimo,
                telefono: usuarioActivo.telefono,
                email: usuarioActivo.email,
                idEmpleado: usuarioActivo.idEmpleado,
                paisPrefijo: usuarioActivo.paisPrefijo,
                invitacionEnviada: true,
                invitacionAceptada: true,
                esObservador: false,
                esIndirecto: false,
                activo: true,
                hijos: []
            };
            guardarEnStorage(STORAGE_KEYS.ORGANIGRAMA, datosOrganigrama);
        } else {
            contenedor.innerHTML = '<p style="color: rgba(255,255,255,0.6); text-align: center; padding: 40px;">No hay colaboradores aún. Usa el botón "Añadir Colaborador" para comenzar.</p>';
            return;
        }
    }
    
    // Función para dibujar SOLO el nodo principal (usuario actual) y sus colaboradores directos (hijos)
    const dibujarNodoPrincipal = (nodo) => {
        const div = document.createElement('div');
        div.className = 'nodo-container';
        const claseEstado = nodo.invitacionEnviada ? 
            (nodo.invitacionAceptada ? 'estado-activo' : 'estado-invitado') : 'estado-pendiente';
        
        div.innerHTML = `
            <div class="nodo ${claseEstado}" ondblclick="verDetalleContacto('${nodo.id}')">
                <div class="nodo-content-personal">
                    <div class="nombre-nodo-personal">${nodo.nombreCompleto || nodo.nombre}</div>
                    <div class="acronimo-nodo-personal">${nodo.acronimo || '---'}</div>
                </div>
            </div>
            <div class="hijos-container" id="hijos-principales"></div>
        `;
        return div;
    };
    
    // Dibujar el nodo del usuario actual
    const nodoPrincipal = dibujarNodoPrincipal(datosOrganigrama);
    contenedor.appendChild(nodoPrincipal);
    
    // Dibujar SOLO los colaboradores directos (primera línea) sin recursividad
    const hijosContainer = document.getElementById('hijos-principales');
    if (datosOrganigrama.hijos && datosOrganigrama.hijos.length > 0) {
        datosOrganigrama.hijos.forEach(hijo => {
            const divHijo = document.createElement('div');
            divHijo.className = 'nodo-container';
            const claseEstadoHijo = hijo.invitacionEnviada ? 
                (hijo.invitacionAceptada ? 'estado-activo' : 'estado-invitado') : 'estado-pendiente';
            
            divHijo.innerHTML = `
                <div class="nodo ${claseEstadoHijo}" ondblclick="verDetalleContacto('${hijo.id}')">
                    <div class="nodo-content-personal">
                        <div class="nombre-nodo-personal">${hijo.nombreCompleto || hijo.nombre}</div>
                        <div class="acronimo-nodo-personal">${hijo.acronimo || '---'}</div>
                    </div>
                </div>
            `;
            hijosContainer.appendChild(divHijo);
        });
    }
    
    // Sección de Contactos Indirectos (sin cambios)
    if (contactosIndirectos.length > 0) {
        const divIndirectos = document.createElement('div');
        divIndirectos.className = 'seccion-separadora';
        divIndirectos.innerHTML = '<h3 style="color: #00ff88; margin-top: 30px;">Contactos Indirectos</h3>';
        divIndirectos.style.display = 'flex';
        divIndirectos.style.flexWrap = 'wrap';
        divIndirectos.style.gap = '15px';
        contactosIndirectos.forEach(contacto => {
            const nodoIndirecto = document.createElement('div');
            nodoIndirecto.className = 'nodo especial';
            nodoIndirecto.style.cursor = 'pointer';
            nodoIndirecto.setAttribute('ondblclick', `verDetalleContacto('${contacto.id}')`);
            nodoIndirecto.innerHTML = `
                <div class="nodo-content-personal">
                    <div class="nombre-nodo-personal">🔗 ${contacto.nombre}</div>
                    <div class="acronimo-nodo-personal">${contacto.acronimo || '---'}</div>
                </div>
            `;
            divIndirectos.appendChild(nodoIndirecto);
        });
        contenedor.appendChild(divIndirectos);
    }
    
    // Sección de Observadores (sin cambios)
    if (observadores.length > 0) {
        const divObservadores = document.createElement('div');
        divObservadores.className = 'seccion-separadora';
        divObservadores.innerHTML = '<h3 style="color: #00ff88; margin-top: 30px;">Observadores</h3>';
        divObservadores.style.display = 'flex';
        divObservadores.style.flexWrap = 'wrap';
        divObservadores.style.gap = '15px';
        observadores.forEach(contacto => {
            const nodoObservador = document.createElement('div');
            nodoObservador.className = 'nodo especial';
            nodoObservador.style.cursor = 'pointer';
            nodoObservador.setAttribute('ondblclick', `verDetalleContacto('${contacto.id}')`);
            nodoObservador.innerHTML = `
                <div class="nodo-content-personal">
                    <div class="nombre-nodo-personal">👁️ ${contacto.nombre}</div>
                    <div class="acronimo-nodo-personal">${contacto.acronimo || '---'}</div>
                </div>
            `;
            divObservadores.appendChild(nodoObservador);
        });
        contenedor.appendChild(divObservadores);
    }
}

// ==========================================
// FUNCIONES ADICIONALES
// ==========================================
function verDetalleContacto(id) {
    console.log("Ver detalle de contacto:", id);
    let contacto = null;
    let tipoContacto = 'directo';
    
    function buscarEnNodo(nodo) {
        if (nodo.id === id) {
            contacto = nodo;
            return true;
        }
        if (nodo.hijos) {
            for (let hijo of nodo.hijos) {
                if (buscarEnNodo(hijo)) return true;
            }
        }
        return false;
    }
    
    if (datosOrganigrama) {
        buscarEnNodo(datosOrganigrama);
    }
    
    if (!contacto) {
        contacto = contactosIndirectos.find(c => c.id === id);
        if (contacto) tipoContacto = 'indirecto';
    }
    if (!contacto) {
        contacto = observadores.find(c => c.id === id);
        if (contacto) tipoContacto = 'observador';
    }
    
    if (contacto) {
        contactoEnEdicion = contacto;
        tipoContactoActual = tipoContacto;
        const modal = document.getElementById('modal-detalle-contacto');
        const contenido = document.getElementById('contenido-detalle-contacto');
        const footer = document.querySelector('#modal-detalle-contacto .modal-footer');
        if (modal && contenido) {
            if (footer) footer.style.display = 'flex';
            contenido.innerHTML = `
                <p><strong>Nombre:</strong> ${contacto.nombre || contacto.nombreCompleto}</p>
                <p><strong>Puesto:</strong> ${contacto.puesto || 'No especificado'}</p>
                <p><strong>Acrónimo:</strong> ${contacto.acronimo || '---'}</p>
                <p><strong>Teléfono:</strong> ${contacto.telefono || 'No especificado'}</p>
                <p><strong>Email:</strong> ${contacto.email || 'No especificado'}</p>
                <p><strong>Estado:</strong> ${contacto.invitacionAceptada ? 'Aceptado' : (contacto.invitacionEnviada ? 'Invitación enviada' : 'Pendiente')}</p>
            `;
            modal.style.display = 'flex';
        }
    } else {
        mostrarAvisoInmediato("Contacto no encontrado", "error");
    }
}

function verDetalleContactoGeneral(id) {
    console.log("Ver detalle de contacto general:", id);
    const usuario = baseDatosUsuarios.find(u => u.id === id);
    if (usuario) {
        const modal = document.getElementById('modal-detalle-contacto');
        const contenido = document.getElementById('contenido-detalle-contacto');
        const footer = document.querySelector('#modal-detalle-contacto .modal-footer');
        if (modal && contenido) {
            if (footer) footer.style.display = 'none';
            contenido.innerHTML = `
                <p><strong>Nombre:</strong> ${usuario.nombreCompleto}</p>
                <p><strong>ID Empleado:</strong> ${usuario.idEmpleado}</p>
                <p><strong>Puesto:</strong> ${usuario.posicion || 'No especificado'}</p>
                <p><strong>Acrónimo:</strong> ${usuario.acronimo || '---'}</p>
                <p><strong>Teléfono:</strong> ${usuario.telefono || 'No especificado'}</p>
                <p><strong>Email:</strong> ${usuario.email || 'No especificado'}</p>
                <p><strong>Rol:</strong> ${usuario.rol || 'Colaborador'}</p>
            `;
            modal.style.display = 'flex';
        }
    } else {
        mostrarAvisoInmediato("Usuario no encontrado", "error");
    }
}

function editarPerfil() { irAPantalla('registro-invitacion'); }

function guardarConfiguracion() {
    const config = {
        sonido: document.getElementById('config-sonido')?.checked || false,
        vibracion: document.getElementById('config-vibracion')?.checked || false,
        push: document.getElementById('config-push')?.checked || false,
        idioma: document.getElementById('config-idioma')?.value || 'es',
        biometria: document.getElementById('config-biometria')?.checked || false
    };
    configuracionPersonal = config;
    guardarEnStorage(STORAGE_KEYS.CONFIG_PERSONAL, configuracionPersonal);
    mostrarAvisoInmediato("✓ Configuración guardada", "exito");
}

function solicitarRecuperacionContrasena() { mostrarAvisoInmediato("Función de recuperación en desarrollo", "advertencia"); }
function aplicarCambioEstetico(tipo) { asignarDestino(tipo, event?.target); }
function cerrarModalDetalle() { const modal = document.getElementById('modal-detalle-contacto'); if (modal) modal.style.display = 'none'; contactoEnEdicion = null; }

function editarContactoDesdeDetalle() {
    if (!contactoEnEdicion) {
        mostrarAvisoInmediato("No hay contacto seleccionado", "error");
        return;
    }
    const modalDetalle = document.getElementById('modal-detalle-contacto');
    if (modalDetalle) modalDetalle.style.display = 'none';
    const modal = document.getElementById('modal-contacto');
    const titulo = document.getElementById('modal-titulo');
    if (modal && titulo) {
        titulo.innerText = 'Editar Contacto';
        document.getElementById('modal-nombre').value = contactoEnEdicion.nombre || '';
        document.getElementById('modal-puesto').value = contactoEnEdicion.puesto || '';
        document.getElementById('modal-pais').value = contactoEnEdicion.paisPrefijo || '+502';
        document.getElementById('modal-tel').value = contactoEnEdicion.telefono || '';
        document.getElementById('modal-email').value = contactoEnEdicion.email || '';
        const visorAcronimo = document.getElementById('modal-acronimo-preview');
        if (visorAcronimo && contactoEnEdicion.acronimo) visorAcronimo.textContent = contactoEnEdicion.acronimo;
        modal.style.display = 'flex';
    }
}

function eliminarContacto() {
    if (!contactoEnEdicion) {
        mostrarAvisoInmediato("No hay contacto seleccionado", "error");
        return;
    }
    if (!confirm(`¿Está seguro de eliminar a ${contactoEnEdicion.nombre}?`)) return;
    
    if (tipoContactoActual === 'directo') {
        function eliminarDeNodo(nodo) {
            if (nodo.hijos) {
                const index = nodo.hijos.findIndex(h => h.id === contactoEnEdicion.id);
                if (index !== -1) {
                    nodo.hijos.splice(index, 1);
                    return true;
                }
                for (let hijo of nodo.hijos) {
                    if (eliminarDeNodo(hijo)) return true;
                }
            }
            return false;
        }
        if (datosOrganigrama) {
            eliminarDeNodo(datosOrganigrama);
            guardarEnStorage(STORAGE_KEYS.ORGANIGRAMA, datosOrganigrama);
        }
    } else if (tipoContactoActual === 'indirecto') {
        const index = contactosIndirectos.findIndex(c => c.id === contactoEnEdicion.id);
        if (index !== -1) {
            contactosIndirectos.splice(index, 1);
            guardarEnStorage(STORAGE_KEYS.INDIRECTOS, contactosIndirectos);
        }
    } else if (tipoContactoActual === 'observador') {
        const index = observadores.findIndex(c => c.id === contactoEnEdicion.id);
        if (index !== -1) {
            observadores.splice(index, 1);
            guardarEnStorage(STORAGE_KEYS.OBSERVADORES, observadores);
        }
    }
    
    cerrarModalDetalle();
    renderizarOrganigrama();
    mostrarAvisoInmediato(`✓ ${contactoEnEdicion.nombre} ha sido eliminado`, "exito");
    contactoEnEdicion = null;
}

function cerrarSesion() {
    if (confirm("¿Está seguro que desea cerrar sesión?")) {
        if (typeof detenerTemporizadorInactividad === 'function') detenerTemporizadorInactividad();
        sessionStorage.clear();
        usuarioActivo = null;
        datosOrganigrama = null;
        sesionActiva = false;
        const btnTuerca = document.getElementById('boton-tuerca-global');
        if (btnTuerca) btnTuerca.style.display = 'none';
        const menu = document.getElementById('menu-lateral-organico');
        const overlay = document.getElementById('overlay-menu');
        if (menu) menu.classList.remove('abierto');
        if (overlay) overlay.classList.remove('activo');
        irAPantalla('pantalla-acceso');
        const observer = new MutationObserver((mutations, obs) => {
            const pantallaAcceso = document.getElementById('pantalla-acceso');
            if (pantallaAcceso && pantallaAcceso.style.display !== 'none') {
                obs.disconnect();
                inicializarPantallaAcceso();
                mostrarAvisoInmediato("✓ Sesión finalizada correctamente", "exito");
            }
        });
        observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['style'] });
    }
}

// ==========================================
// FUNCIONES DE PERSISTENCIA Y UTILERÍAS
// ==========================================
function generarIdUnico() { return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9); }
function generarCodigoInvitacion() { return 'INV_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6).toUpperCase(); }
function guardarEnStorage(key, data) { try { localStorage.setItem(key, JSON.stringify(data)); return true; } catch (error) { console.error("Error guardando en localStorage:", error); return false; } }
function cargarDeStorage(key) { try { const data = localStorage.getItem(key); return data ? JSON.parse(data) : null; } catch (error) { console.error("Error cargando de localStorage:", error); return null; } }
function enviarInvitacion(invitacion) { console.log("Enviando invitación a:", invitacion.nombreContacto); }
function obtenerFraseMotivacional() { return mensajesMotivacionales[Math.floor(Math.random() * mensajesMotivacionales.length)]; }
function seleccionarColor(color, elemento) { document.querySelectorAll('.color-cuadro').forEach(c => c.classList.remove('seleccionado')); elemento.classList.add('seleccionado'); colorSeleccionado = color; }

function aplicarCambiosVisuales() {
    const root = document.documentElement.style;
    if (configuracionEstetica.colorFondo) root.setProperty('--color-fondo', configuracionEstetica.colorFondo);
    if (configuracionEstetica.colorTexto) root.setProperty('--color-texto', configuracionEstetica.colorTexto);
    if (configuracionEstetica.colorBotones) root.setProperty('--color-primario', configuracionEstetica.colorBotones);
    const appContainer = document.getElementById('app-container');
    if (appContainer) appContainer.style.backgroundColor = configuracionEstetica.colorFondo;
    const textos = document.querySelectorAll('#app-container input, #app-container textarea, #app-container p, #app-container span, #app-container h2, #app-container h3, #app-container label, #app-container .descripcion-app');
    textos.forEach(el => el.style.color = configuracionEstetica.colorTexto);
    const botones = document.querySelectorAll('#app-container .btn-principal, #app-container .btn-secundario, #app-container .btn-opcion, #app-container .btn-accion');
    botones.forEach(btn => {
        btn.style.backgroundColor = configuracionEstetica.colorBotones;
        btn.style.color = configuracionEstetica.colorTexto;
    });
    const previewFondo = document.getElementById('preview-fondo');
    const previewTexto = document.getElementById('preview-texto');
    const previewBotones = document.getElementById('preview-botones');
    if (previewFondo) previewFondo.style.backgroundColor = configuracionEstetica.colorFondo;
    if (previewTexto) previewTexto.style.backgroundColor = configuracionEstetica.colorTexto;
    if (previewBotones) previewBotones.style.backgroundColor = configuracionEstetica.colorBotones;
    const sloganPreview = document.getElementById('vista-previa-slogan');
    if (sloganPreview) {
        sloganPreview.style.color = configuracionEstetica.colorTexto;
        sloganPreview.style.borderColor = configuracionEstetica.colorBotones;
    }
    let style = document.getElementById('dynamic-placeholder-style');
    if (!style) {
        style = document.createElement('style');
        style.id = 'dynamic-placeholder-style';
        document.head.appendChild(style);
    }
    style.textContent = `#app-container input::placeholder, #app-container textarea::placeholder { color: ${configuracionEstetica.colorTexto}80; }`;
}

function asignarDestino(tipo, botonPresionado) {
    if (!colorSeleccionado) {
        mostrarAvisoInmediato("✖ Selecciona un color de la paleta", "error");
        return;
    }
    switch(tipo) {
        case 'texto': configuracionEstetica.colorTexto = colorSeleccionado; break;
        case 'fondo': configuracionEstetica.colorFondo = colorSeleccionado; break;
        case 'botones': configuracionEstetica.colorBotones = colorSeleccionado; break;
    }
    aplicarCambiosVisuales();
    if (botonPresionado) {
        const contenedorPadre = botonPresionado.parentElement;
        contenedorPadre.querySelectorAll('.btn-opcion').forEach(b => b.classList.remove('activo'));
        botonPresionado.classList.add('activo');
    }
    mostrarAvisoInmediato(`✓ Color aplicado al ${tipo}`, "exito");
}

function actualizarVistaPrevia() {
    const slogan = document.getElementById('id-slogan').value;
    const tipografia = document.getElementById('sel-tipografia').value;
    const estilo = document.getElementById('sel-estilo').value;
    const preview = document.getElementById('vista-previa-slogan');
    if (preview) {
        preview.innerText = slogan || 'Vista previa del slogan';
        preview.style.fontFamily = tipografia;
        preview.style.fontWeight = estilo.includes('bold') ? 'bold' : 'normal';
        preview.style.fontStyle = estilo.includes('italic') ? 'italic' : 'normal';
        configuracionEstetica.familiaTipografica = tipografia;
        configuracionEstetica.variacionGlobal = estilo;
        identidadCorporativa.tipografia = tipografia;
        identidadCorporativa.estiloSlogan = estilo;
    }
}

function renderizarOrganigramaGeneral() {
    const contenedor = document.getElementById('lienzo-organigrama-general');
    if (!contenedor) return;
    contenedor.innerHTML = '';

    if (!Array.isArray(baseDatosUsuarios) || baseDatosUsuarios.length === 0) {
        contenedor.innerHTML = '<p style="color: rgba(255,255,255,0.7); text-align: center; padding: 40px;">No hay información de usuarios disponible para mostrar.</p>';
        return;
    }

    const usuariosPorId = {};
    baseDatosUsuarios.forEach(usuario => {
        usuariosPorId[usuario.id] = usuario;
    });

    const nodosRaiz = baseDatosUsuarios.filter(usuario => !usuario.superiorId || usuario.superiorId === null || usuario.superiorId === '' || !usuariosPorId[usuario.superiorId]);

    const crearNodo = (usuario) => {
        const nodo = document.createElement('div');
        // Añadimos la clase `nodo` para que comparta estilos y efectos con los nodos personales
        nodo.className = 'nodo nodo-general';
        nodo.style.cursor = 'pointer';
        nodo.onclick = () => verDetalleContactoGeneral(usuario.id);
        const bandera = usuario.tipoActual === 'Observador' ? '👁️ ' : usuario.tipoActual === 'Indirecto' ? '🔗 ' : '';
        nodo.innerHTML = `
            <div class="nodo-general-contenido">
                <div class="titulo-nodo-general">${bandera}${usuario.nombreCompleto || usuario.nombre}</div>
                <div class="subtitulo-nodo-general">${usuario.posicion || usuario.rol || 'Colaborador'}</div>
                <div class="acronimo-nodo-general">${usuario.acronimo || '---'}</div>
            </div>
        `;
        return nodo;
    };

    const seccion = document.createElement('div');
    seccion.className = 'organigrama-general-grid';

    const ordenarPorJerarquia = [...nodosRaiz].sort((a, b) => {
        if (a.esNo1 && !b.esNo1) return -1;
        if (!a.esNo1 && b.esNo1) return 1;
        return a.nombreCompleto.localeCompare(b.nombreCompleto);
    });

    ordenarPorJerarquia.forEach(usuario => {
        seccion.appendChild(crearNodo(usuario));
        const hijos = baseDatosUsuarios.filter(u => u.superiorId === usuario.id);
        if (hijos.length > 0) {
            const contenedorHijos = document.createElement('div');
            contenedorHijos.className = 'organigrama-general-subgrupo';
            hijos.forEach(hijo => {
                contenedorHijos.appendChild(crearNodo(hijo));
            });
            seccion.appendChild(contenedorHijos);
        }
    });

    contenedor.appendChild(seccion);
}

// ==========================================
// TEMPORIZADOR DE INACTIVIDAD
// ==========================================
function reiniciarTemporizador() { if (temporizadorInactividad) clearTimeout(temporizadorInactividad); temporizadorInactividad = setTimeout(() => cerrarSesionPorInactividad(), TIEMPO_INACTIVIDAD); }
function cerrarSesionPorInactividad() { if (sesionActiva && usuarioActivo && usuarioActivo.id) { mostrarAvisoInmediato("⏰ Sesión cerrada por inactividad de 30 minutos", "advertencia"); cerrarSesion(); } }
function iniciarTemporizadorInactividad() { if (temporizadorInactividad) clearTimeout(temporizadorInactividad); const eventos = ['click', 'mousemove', 'keypress', 'scroll', 'touchstart']; eventos.forEach(evento => document.removeEventListener(evento, reiniciarTemporizador)); eventos.forEach(evento => document.addEventListener(evento, reiniciarTemporizador)); reiniciarTemporizador(); }
function detenerTemporizadorInactividad() { if (temporizadorInactividad) clearTimeout(temporizadorInactividad); const eventos = ['click', 'mousemove', 'keypress', 'scroll', 'touchstart']; eventos.forEach(evento => document.removeEventListener(evento, reiniciarTemporizador)); }

// Nota: las funciones restantes (renderizarOrganigramaGeneral, construirOrganigramaGeneral, etc.) no se modifican y siguen funcionando igual.
