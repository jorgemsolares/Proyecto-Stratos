// ==========================================
// ADN VISUAL STRATOS - ARCHIVO: logica.js
// Procesamiento, Validaciones e Interacción
// ==========================================

// ==========================================
// 1. VARIABLES GLOBALES Y ESTADO INICIAL (estado de navegación, cola de mensajes y temporizadores)
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
// 2. FUNCIÓN PARA MOSTRAR AVISO INMEDIATO (muestra un aviso global temporal y reanuda los mensajes)
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
// 3. FUNCIÓN PARA FRAGMENTAR MISIÓN, VISIÓN Y VALORES (PUNTO 3)
// Segmentos: ideal 51-200 caracteres, máx 250. Delimitadores: coma (,), punto (.)
// y punto y coma (;). Un segmento corto (<51) se une al ANTERIOR si venía de coma,
// o al SIGUIENTE si venía de punto / punto y coma. Filtro: sin guiones ni números solos.
// ==========================================
function obtenerFragmentosMisionVisionValores() {
    const IDEAL_MIN = 51, IDEAL_MAX = 200, MAX = 250;
    const textos = [
        identidadCorporativa.mision,
        identidadCorporativa.vision,
        ...(identidadCorporativa.valores || [])
    ];
    let fragmentos = [];
    textos.forEach(texto => {
        if (!texto) return;
        fragmentos = fragmentos.concat(segmentarTextoEnOraciones(texto, IDEAL_MIN, IDEAL_MAX, MAX));
    });
    return fragmentos.filter(esFragmentoValido);
}

// Descartar fragmentos que no sean oraciones completas (guiones, números solos, vacíos).
function esFragmentoValido(fragmento) {
    if (!fragmento) return false;
    const t = fragmento.trim();
    if (t.length === 0) return false;
    if (!/[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]/.test(t)) return false;      // debe tener letras
    if (/^[\s\-–—_.·•*]+$/.test(t)) return false;               // solo guiones/signos
    if (/^[\d\s.,;:\-–—%$#°]+$/.test(t)) return false;          // solo números/símbolos
    return true;
}

// Segmenta un texto en oraciones completas según las reglas del PUNTO 3.
function segmentarTextoEnOraciones(texto, idealMin, idealMax, max) {
    // 1) Tokeniza conservando el delimitador que cierra cada parte
    const partes = [];
    let buffer = '';
    for (const ch of texto) {
        if (ch === ',' || ch === '.' || ch === ';') {
            buffer += ch;
            partes.push({ texto: buffer.trim(), delimitador: ch });
            buffer = '';
        } else {
            buffer += ch;
        }
    }
    if (buffer.trim()) partes.push({ texto: buffer.trim(), delimitador: null });

    // 2) Une las partes cortas (< idealMin) según su delimitador
    const salida = [];
    let pendiente = ''; // corto que debe unirse al SIGUIENTE (punto / punto y coma)
    partes.forEach(parte => {
        let t = parte.texto;
        if (!t) return;
        if (pendiente) { t = `${pendiente} ${t}`.trim(); pendiente = ''; }
        if (t.length < idealMin) {
            if ((parte.delimitador === ',' || parte.delimitador === null) && salida.length > 0) {
                salida[salida.length - 1] = `${salida[salida.length - 1]} ${t}`.trim(); // al ANTERIOR
            } else {
                pendiente = t; // punto / punto y coma → al SIGUIENTE
            }
        } else {
            salida.push(t);
        }
    });
    if (pendiente) {
        if (salida.length > 0) salida[salida.length - 1] = `${salida[salida.length - 1]} ${pendiente}`.trim();
        else salida.push(pendiente);
    }

    // 3) Corta lo que exceda el máximo (respetando límites de palabra)
    const finales = [];
    salida.forEach(seg => {
        let resto = (seg || '').trim();
        while (resto.length > max) {
            let corte = resto.lastIndexOf(' ', max);
            if (corte < idealMin) corte = max;
            finales.push(resto.slice(0, corte).trim());
            resto = resto.slice(corte).trim();
        }
        if (resto) finales.push(resto);
    });
    return finales;
}

// ==========================================
// 3.2 PREPARACIÓN PARA LA IA (PUNTO 3)
// El sistema NO entiende el texto: hoy corta con reglas y, cuando la IA esté
// implementada, le pasará el texto completo con sus parámetros.
// ==========================================
function pasarTextoALaIA(textoCompleto) {
    const texto = textoCompleto || [
        identidadCorporativa.mision,
        identidadCorporativa.vision,
        ...(identidadCorporativa.valores || [])
    ].filter(Boolean).join('. ');
    const paquete = {
        texto: texto,
        tamanoPermitido: { ideal: [51, 200], maximo: 250 },
        nivelPrioridad: 'media',   // PUNTO 3: anuncio motivacional = Media
        tiempoRotacion: 6000,      // PUNTO 3: 6 segundos
        destino: 'cartelera'
    };
    // PENDIENTE: aquí se enviará a la IA cuando esté implementada; ella devolverá
    // los fragmentos en oraciones completas para la cartelera.
    console.log('pasarTextoALaIA (preparado, sin IA conectada):', paquete);
    return paquete;
}

// ==========================================
// 3.1 PRIORIDAD Y DURACIÓN DE LOS AVISOS (PUNTO 2)
// La clasificación la hace el SISTEMA (no el usuario).
// Tabla: alta = 10 s | media = 6 s | baja = 4 s.
// ==========================================
// Prioridad según el remitente (compara con superiorId en baseDatosUsuarios).
function clasificarPrioridadPorRemitente(emisorId, options) {
    options = options || {};
    // Atención inmediata (acción en menos de 1 hora, correo prioritario) → alta
    if (typeof options.horas === 'number' && options.horas < 1) return 'alta';
    if (emisorId && usuarioActivo && usuarioActivo.id) {
        const superiorId = usuarioActivo.superiorId;
        if (superiorId && emisorId === superiorId) return 'alta'; // viene de su superior
        const emisor = (typeof baseDatosUsuarios !== 'undefined') ? baseDatosUsuarios.find(u => u.id === emisorId) : null;
        if (emisor && emisor.esNo1) return 'alta'; // el No.1 siempre es superior
    }
    if (options.deSuperior) return 'alta';
    if (emisorId) return 'media'; // colega o subalterno
    if (typeof options.horas === 'number' && options.horas <= 24) return 'media';
    return 'baja'; // informativo o acción lejana
}

// Duración en milisegundos de un mensaje de cartelera según su prioridad.
function duracionMensajeCartelera(mensaje) {
    if (mensaje && typeof mensaje.duracion === 'number') return mensaje.duracion;
    const prioridad = (mensaje && mensaje.prioridad) || 'media';
    const segundos = (typeof DURACION_PRIORIDAD_CARTELERA !== 'undefined' && DURACION_PRIORIDAD_CARTELERA[prioridad])
        ? DURACION_PRIORIDAD_CARTELERA[prioridad] : 6;
    return segundos * 1000;
}

// ==========================================
// 4. FUNCIÓN PARA CONSTRUIR LA COLA DE MENSAJES (arma la lista de avisos y frases motivacionales a mostrar)
// ==========================================
function construirColaMensajes() {
    colaMensajes = [];
    // PUNTO 2: el jefe ve en CARTELERA sus solicitudes de contraseña pendientes
    // (prioridad ALTA) y la sugerencia de la IA por reincidencia de errores (PUNTO 48).
    if (usuarioActivo && usuarioActivo.id) {
        const solicitudes = (typeof solicitudesRecuperacion !== 'undefined')
            ? solicitudesRecuperacion.filter(s => s.solicitadoA === usuarioActivo.id && s.estado === 'pendiente')
            : [];
        solicitudes.forEach(s => {
            colaMensajes.push({
                texto: `🔑 Solicitud de contraseña (prioridad ALTA): ${s.nombreUsuario}`,
                tipo: 'mensaje',
                prioridad: 'alta',
                fechaInicio: new Date(),
                resuelto: false
            });
        });
        if (typeof erroresUltimaSemana === 'function' && erroresUltimaSemana(usuarioActivo) > 6) {
            colaMensajes.push({
                texto: `🔐 ${nombreAsistenteIA()} te sugiere cambiar tu contraseña (errores esta semana)`,
                tipo: 'mensaje',
                prioridad: 'media',
                fechaInicio: new Date(),
                resuelto: false
            });
        }
    }
    // Saludo en la cartelera: solo la PRIMERA VEZ del día (estadística de horario de trabajo — PUNTO 6)
    if (usuarioActivo && usuarioActivo.nombreCompleto) {
        const hoySaludo = new Date().toDateString();
        if (localStorage.getItem(STORAGE_KEYS.ULTIMO_SALUDO) !== hoySaludo) {
            localStorage.setItem(STORAGE_KEYS.ULTIMO_SALUDO, hoySaludo);
            colaMensajes.push({
                texto: `👋 Hola, ${usuarioActivo.nombre}`,
                tipo: 'saludo',
                prioridad: 'baja',
                fechaInicio: new Date(),
                resuelto: false
            });
        }
    }
    if (!identidadCorporativa.completada) {
        const no1 = baseDatosUsuarios.find(u => u.esNo1);
        const nombreNo1 = no1 ? no1.nombre : "El administrador";
        colaMensajes.push({
            texto: `⚠️ Aviso: ${nombreNo1} aún no ha definido toda la Identidad Corporativa.`,
            tipo: 'aviso',
            prioridad: 'baja',
            fechaInicio: new Date(),
            resuelto: false
        });
    }
    if (identidadCorporativa.completada) {
        const hoy = new Date().toDateString();
        const fragmentos = obtenerFragmentosMisionVisionValores();
        const textoGuardado = localStorage.getItem('ultimo_mensaje_texto');
        let mensajeMotivacional = null;
        // El mensaje del día se rifa una sola vez; si el texto guardado ya no existe
        // en la identidad actual (textos editados), se rifa uno nuevo de inmediato.
        if (localStorage.getItem('ultimo_mensaje_fecha') !== hoy || !textoGuardado || !fragmentos.includes(textoGuardado)) {
            if (fragmentos.length > 0) {
                const nuevoIndice = Math.floor(Math.random() * fragmentos.length);
                mensajeMotivacional = fragmentos[nuevoIndice];
                localStorage.setItem('ultimo_mensaje_fecha', hoy);
                localStorage.setItem('ultimo_mensaje_indice', nuevoIndice);
                localStorage.setItem('ultimo_mensaje_texto', mensajeMotivacional);
            }
        } else {
            mensajeMotivacional = textoGuardado;
        }
        if (mensajeMotivacional) {
            colaMensajes.push({
                texto: mensajeMotivacional,
                tipo: 'motivacional',
                prioridad: 'media', // PUNTO 3: anuncio motivacional diario = Media (6 s)
                fechaInicio: new Date(),
                resuelto: false
            });
        }
    }
    indiceMensajeActual = 0;
}

// ==========================================
// 5. FUNCIÓN PARA INICIAR LA ROTACIÓN DE MENSAJES (rota automáticamente los avisos cada cierto tiempo)
// ==========================================
function iniciarRotacionMensajes() {
    if (intervaloRotacionMensajes) {
        clearTimeout(intervaloRotacionMensajes);
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
    programarSiguienteMensaje(); // PUNTO 2: cada mensaje dura según su prioridad (10/6/4 s)
}

// PUNTO 2: programa el paso al siguiente mensaje usando la DURACIÓN de su prioridad.
function programarSiguienteMensaje() {
    if (intervaloRotacionMensajes) {
        clearTimeout(intervaloRotacionMensajes);
        intervaloRotacionMensajes = null;
    }
    if (colaMensajes.length === 0) return;
    const actual = colaMensajes[indiceMensajeActual];
    intervaloRotacionMensajes = setTimeout(() => {
        mostrarSiguienteMensaje();
        programarSiguienteMensaje();
    }, duracionMensajeCartelera(actual));
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
        } else if (mensaje.tipo === 'saludo') {
            mensajeDiv.classList.add('exito');
        } else if (mensaje.tipo === 'aviso') {
            mensajeDiv.classList.add('advertencia');
        }
        mensajeDiv.dataset.prioridad = mensaje.prioridad || 'media'; // PUNTO 2
        textoMensaje.innerText = mensaje.texto;
        mensajeDiv.style.display = 'flex';
    }
}

// ==========================================
// 6. FUNCIÓN GLOBAL PARA CARGAR SUGERENCIAS (carga los nombres guardados del dispositivo como autocompletado)
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
// 7. NAVEGACIÓN ENTRE PANTALLAS (muestra/oculta pantallas, registra el historial y activa cada módulo)
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
    // El botón de IA aparece en todas las pantallas excepto Login (PUNTO 7)
    mostrarBotonIA(id !== 'pantalla-acceso');
    ajustarLayoutAdaptativo();
    if (typeof estadoPantallas !== 'undefined' && estadoPantallas[id]) {
        estadoPantallas[id].visitada = true;
    }
    if (typeof historialPantallas !== 'undefined') {
        historialPantallas.push(id);
    }
    if (id === 'registro-invitacion' && usuarioActivo?.id) { cargarDatosPantalla1(); actualizarEstadoEnrolamiento(); }
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
// 8. INICIALIZACIÓN AL CARGAR (carga los datos guardados, valida invitaciones y prepara la app al abrir)
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
        campoNombre.addEventListener('input', () => { cargarSugerencias(); campoNombre.setAttribute('list', 'lista-usuarios'); actualizarSaludoLogin(); });
        campoNombre.addEventListener('focus', () => { cargarSugerencias(); campoNombre.setAttribute('list', 'lista-usuarios'); });
    }
    // El saludo arranca con el último usuario del sistema (PUNTO 6)
    actualizarSaludoLogin();
    // Las opciones biométricas se habilitan o no según el dispositivo (PUNTO 6)
    inicializarBiometria();
}

window.addEventListener('resize', ajustarLayoutAdaptativo);

// ==========================================
// 9. CARGAR DATOS PANTALLA 1 (PERFIL) (rellena el formulario con los datos del usuario activo)
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
// 10. CARGAR DATOS PANTALLA 3 (IDENTIDAD) (carga logo, slogan, misión, visión, valores y colores corporativos)
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
    // Datos trasladados a datos.js (TIPOS_IMAGEN_VALIDOS): formatos permitidos para el logo
    const tipoValido = TIPOS_IMAGEN_VALIDOS;
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
// 11. SEGURIDAD: EFECTO LETRA-PUNTO (enmascara las contraseñas con puntos y guarda el valor real)
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
// 12. GENERACIÓN DE ACRÓNIMOS (genera acrónimos a partir de nombres o puestos)
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

/* ==========================================
   12.1 RECONSTRUIR ORGANIGRAMA (reconstruye la jerarquía desde un usuario; trasladado de datos.js a logica.js)
   ========================================== */
// Reconstruir organigrama desde un usuario existente
function reconstruirOrganigramaDesdeUsuario(usuarioBase) {
    if (!usuarioBase || !usuarioBase.id) return null;

    const construirSubordinados = (padreId) => {
        return baseDatosUsuarios
            .filter(u => u.superiorId === padreId && u.activo)
            .map(u => ({
                id: u.id,
                nombre: u.nombre || '',
                apellidos: u.apellidos || '',
                nombreCompleto: u.nombreCompleto || `${u.nombre || ''} ${u.apellidos || ''}`.trim(),
                puesto: u.posicion || u.rol || '',
                acronimo: u.acronimo || generarAcronimo(u.posicion || u.nombre || '', true),
                telefono: u.telefono || '',
                email: u.email || '',
                idEmpleado: u.idEmpleado || '',
                paisPrefijo: u.paisPrefijo || '+502',
                invitacionEnviada: true,
                invitacionAceptada: true,
                esObservador: u.rol === 'Observador' || u.esObservador || false,
                esIndirecto: u.rol === 'Indirecto' || u.esIndirecto || false,
                activo: u.activo !== false,
                hijos: []
            }))
            .map(hijo => {
                hijo.hijos = construirSubordinados(hijo.id);
                return hijo;
            });
    };

    const raiz = {
        id: usuarioBase.id,
        nombre: usuarioBase.nombre || '',
        apellidos: usuarioBase.apellidos || '',
        nombreCompleto: usuarioBase.nombreCompleto || `${usuarioBase.nombre || ''} ${usuarioBase.apellidos || ''}`.trim(),
        puesto: usuarioBase.posicion || usuarioBase.rol || 'No. 1',
        acronimo: usuarioBase.acronimo || generarAcronimo(usuarioBase.posicion || usuarioBase.nombre || '', true),
        telefono: usuarioBase.telefono || '',
        email: usuarioBase.email || '',
        idEmpleado: usuarioBase.idEmpleado || '',
        paisPrefijo: usuarioBase.paisPrefijo || '+502',
        invitacionEnviada: true,
        invitacionAceptada: true,
        esObservador: usuarioBase.rol === 'Observador' || usuarioBase.esObservador || false,
        esIndirecto: usuarioBase.rol === 'Indirecto' || usuarioBase.esIndirecto || false,
        activo: usuarioBase.activo !== false,
        hijos: construirSubordinados(usuarioBase.id)
    };

    return raiz;
}
/* ==========================================
   12.2 INFRAESTRUCTURA DE USUARIOS Y SESIÓN (búsqueda por contacto/ID, roles, superior y limpieza; trasladado de datos.js a logica.js)
   ========================================== */

// Buscar usuario por teléfono o email
function buscarUsuarioPorContacto(telefono, email) {
    return baseDatosUsuarios.find(u => 
        (telefono && u.telefono === telefono) || 
        (email && u.email === email)
    );
}

// Buscar usuario por ID de empleado
function buscarUsuarioPorIdEmpleado(idEmpleado) {
    return baseDatosUsuarios.find(u => u.idEmpleado === idEmpleado);
}

// Verificar si usuario es No.1
function esUsuarioNo1(usuarioId) {
    const usuario = baseDatosUsuarios.find(u => u.id === usuarioId);
    return usuario ? usuario.esNo1 : false;
}

// Verificar si usuario es Primera Línea
function esUsuarioPrimeraLinea(usuarioId) {
    const usuario = baseDatosUsuarios.find(u => u.id === usuarioId);
    return usuario ? usuario.esPrimeraLinea : false;
}

// Obtener superior directo
function obtenerSuperiorDirecto(usuarioId) {
    const usuario = baseDatosUsuarios.find(u => u.id === usuarioId);
    if (!usuario || !usuario.superiorId) return null;
    return baseDatosUsuarios.find(u => u.id === usuario.superiorId);
}

// Obtener subordinados directos
function obtenerSubordinados(usuarioId) {
    return baseDatosUsuarios.filter(u => u.superiorId === usuarioId && u.activo);
}

// Limpiar sesión (corregido con los IDs correctos)
function limpiarSesion() {
    tokenSesion = null;
    sesionActiva = false;
    
    // 1. Resetear objeto de usuario
    usuarioActivo = {
        nombre: "", apellidos: "", nombreCompleto: "", rol: "",
        idEmpleado: "", paisPrefijo: "+502", telefono: "", email: "",
        posicion: "", acronimo: "", contrasena: "", esNo1: false,
        esPrimeraLinea: false, superiorId: null, invitadoPor: null,
        tipoInvitacion: "", tipoActual: "",
        fechaRegistro: null, ultimoAcceso: null, requiereCambioContrasena: false
    };

    // 2. Limpiar variables de seguridad reales
    claveReal = "";
    claveConfReal = "";
    
    // 3. Limpiar físicamente los campos de la interfaz para evitar que queden visibles
    const campoId = document.getElementById('acc-id');
    const campoPass = document.getElementById('acc-pass');
    const avisoLetrero = document.getElementById('mensaje-acceso');

    if (campoId) campoId.value = "";
    if (campoPass) campoPass.value = "";
    if (avisoLetrero) {
        avisoLetrero.textContent = "";
        avisoLetrero.className = "aviso-letrero";
    }
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
// 13. VALIDACIÓN DE CONTACTO (valida el formato de email y teléfono del formulario de perfil)
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
// 14. VALIDACIÓN DE CONTRASEÑAS (comprueba longitud y que las contraseñas coincidan)
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
// 15. PROCESAR REGISTRO O EDICIÓN (da de alta a un usuario nuevo o actualiza uno existente)
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
                    // PUNTO 31: el organigrama general reconoce a sus superiores,
                    // iguales y subalternos previos y se actualiza solo.
                    aplicarCrecimientoOrganigramaGeneral(usuarioExistente);
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
    // PUNTO 31 (3.4 y 3.6): el organigrama general crece solo. Si el que entra es
    // No.1 y ya había uno, el anterior pasa a ser su subordinado.
    aplicarCrecimientoOrganigramaGeneral(nuevoUsuario);
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
// 16. VALIDAR ENTRADA (LOGIN) (verifica las credenciales y abre la sesión del usuario)
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
        registrarErrorLogin(null, 'nombre'); // PUNTO 48: error de tipeo (usuario/ID no encontrado)
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
        registrarErrorLogin(usuario, 'contrasena'); // PUNTO 48: error de contraseña de ESTE usuario
        if (aviso) { aviso.innerText = "✖ Contraseña incorrecta"; aviso.className = "aviso-letrero texto-error"; aviso.style.maxHeight = "40px"; }
        window.claveAccesoReal = "";
        if (campoPass) { campoPass.value = ""; manejarMascara(campoPass); }
        const btnOlvido = document.getElementById('btn-olvidaste-pass');
        if (intentosLogin >= maxIntentosLogin && btnOlvido) btnOlvido.style.display = 'block';
        return;
    }
    intentosLogin = 0;
    // PUNTO 48: al entrar correctamente se reinicia el contador de errores de ESTE usuario
    usuario.intentosLoginFallidos = 0;
    const _idxReset = baseDatosUsuarios.findIndex(u => u.id === usuario.id);
    if (_idxReset !== -1) baseDatosUsuarios[_idxReset] = { ...usuario };
    guardarEnStorage(STORAGE_KEYS.BASE_USUARIOS, baseDatosUsuarios);
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
    guardarEnStorage(STORAGE_KEYS.ULTIMO_USUARIO, nombreCompleto);
    // El saludo cambia a este usuario ANTES de entrar (PUNTO 6)
    actualizarSaludoLogin();
    window.claveAccesoReal = "";
    if (campoPass) campoPass.value = "";
    // PUNTO 48: se registra la hora de entrada (primera del día) y el intento exitoso
    registrarHoraEntrada(usuario);
    registrarIncidenteLogin(usuario, 'login', 'exitoso');
    // PUNTO 34: banco de datos — permisos del usuario y actividad de la sesión
    actualizarPermisosBancoDatos(usuario);
    registrarActividadBancoDatos(usuario.id, 'sesion', 'Inicio de sesión');
    if (usuario.requiereCambioContrasena) {
        // Entró con contraseña temporal: cambio obligatorio y registro del incidente
        usuario.ultimaContrasenaTemporal = new Date();
        registrarIncidenteLogin(usuario, 'contrasena_temporal', 'exitoso');
        mostrarModalCambioObligatorio();
        return;
    }
    mostrarAvisoInmediato(`✓ Hola, ${usuario.nombre}`, "exito");
    // PUNTO 2: las solicitudes al jefe (prioridad ALTA) y la sugerencia de la IA se
    // muestran en la CARTELERA (se arma en construirColaMensajes al entrar a pantalla).
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
// 17. ACTUALIZAR INTENTOS RESTANTES (muestra cuántos intentos de login quedan antes de bloquear)
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
// 16.1 ASISTENCIA Y ERRORES DE LOGIN (PUNTO 48)
// Registro de hora (primera entrada / última salida, con cruce de medianoche),
// errores de tipeo POR USUARIO, aviso al jefe al agotar los intentos y
// sugerencia de la IA por reincidencia de errores. Histórico: 5 años.
// ==========================================
const ANIOS_HISTORICO = 5; // Histórico de asistencia y errores (5 años)

function _dosDigitos(n) { return String(n).padStart(2, '0'); }
function _fechaISO(d) { return `${d.getFullYear()}-${_dosDigitos(d.getMonth() + 1)}-${_dosDigitos(d.getDate())}`; }
function _horaHM(d) { return `${_dosDigitos(d.getHours())}:${_dosDigitos(d.getMinutes())}`; }

// Elimina registros de asistencia/errores con más de 5 años de antigüedad.
function depurarHistoricos() {
    const limite = new Date();
    limite.setFullYear(limite.getFullYear() - ANIOS_HISTORICO);
    const isoLimite = _fechaISO(limite);
    registrosAsistencia = registrosAsistencia.filter(r => (r.diaLaboral || '') >= isoLimite);
    incidentesLogin = incidentesLogin.filter(i => (i.fecha || '') >= isoLimite);
    // PUNTO 34: depura también el histórico del banco de datos (se conserva la ficha)
    if (typeof bancoDatos === 'object' && bancoDatos) {
        Object.values(bancoDatos).forEach(f => {
            if (Array.isArray(f.diasSesiones)) f.diasSesiones = f.diasSesiones.filter(d => (d.diaLaboral || '') >= isoLimite);
            if (Array.isArray(f.actividad)) f.actividad = f.actividad.filter(a => (a.fecha || '') >= isoLimite);
        });
    }
}

// Guarda la PRIMERA entrada del día (si ya existe un registro de hoy, no la cambia).
function registrarHoraEntrada(usuario) {
    if (!usuario || !usuario.id) return;
    const ahora = new Date();
    const hoy = _fechaISO(ahora);
    let registro = registrosAsistencia.find(r => r.usuarioId === usuario.id && r.diaLaboral === hoy);
    if (!registro) {
        registro = {
            id: generarIdUnico(),
            usuarioId: usuario.id,
            nombreUsuario: usuario.nombreCompleto || usuario.nombre || '',
            diaLaboral: hoy,
            horaEntrada: _horaHM(ahora),
            fechaEntrada: ahora.toISOString(),
            horaSalida: null,
            fechaSalida: null,
            salidaTrasMedianoche: false
        };
        registrosAsistencia.push(registro);
    }
    guardarEnStorage(STORAGE_KEYS.REGISTROS_ASISTENCIA, registrosAsistencia);
    registrarDiaSesionBancoDatos(usuario.id, registro); // PUNTO 34
}

// Guarda la ÚLTIMA salida del día. Si el cierre cruza la medianoche, pertenece
// al día de la ENTRADA abierta más reciente (regla del PUNTO 48).
function registrarHoraSalida(usuario) {
    if (!usuario || !usuario.id) return;
    const ahora = new Date();
    let registro = null;
    for (let i = registrosAsistencia.length - 1; i >= 0; i--) {
        const r = registrosAsistencia[i];
        if (r.usuarioId === usuario.id && !r.horaSalida) { registro = r; break; }
    }
    if (!registro) {
        const hoy = _fechaISO(ahora);
        registro = registrosAsistencia.find(r => r.usuarioId === usuario.id && r.diaLaboral === hoy);
    }
    if (!registro) return;
    registro.horaSalida = _horaHM(ahora);
    registro.fechaSalida = ahora.toISOString();
    registro.salidaTrasMedianoche = (_fechaISO(ahora) !== registro.diaLaboral);
    guardarEnStorage(STORAGE_KEYS.REGISTROS_ASISTENCIA, registrosAsistencia);
    registrarDiaSesionBancoDatos(usuario.id, registro); // PUNTO 34
}

// Registra un intento de login (fallido o exitoso) en el perfil del usuario.
function registrarIncidenteLogin(usuario, tipo, resultado) {
    const ahora = new Date();
    incidentesLogin.push({
        id: generarIdUnico(),
        usuarioId: usuario ? usuario.id : null,
        nombreUsuario: usuario ? (usuario.nombreCompleto || usuario.nombre || '') : '',
        fecha: _fechaISO(ahora),
        hora: _horaHM(ahora),
        tipo: tipo, // "nombre" | "id" | "contrasena" | "contrasena_temporal" | "login"
        resultado: resultado || 'fallido' // "fallido" | "exitoso"
    });
    depurarHistoricos();
    guardarEnStorage(STORAGE_KEYS.INCIDENTES_LOGIN, incidentesLogin);
    if (usuario && usuario.id) actualizarErroresBancoDatos(usuario.id); // PUNTO 34
}

// Registra un error de login (por usuario) y avisa al jefe al agotar los intentos.
function registrarErrorLogin(usuario, tipo) {
    registrarIncidenteLogin(usuario, tipo, 'fallido');
    if (!usuario) return;
    usuario.intentosLoginFallidos = (usuario.intentosLoginFallidos || 0) + 1;
    const idx = baseDatosUsuarios.findIndex(u => u.id === usuario.id);
    if (idx !== -1) baseDatosUsuarios[idx] = { ...usuario };
    guardarEnStorage(STORAGE_KEYS.BASE_USUARIOS, baseDatosUsuarios);
    if (usuario.intentosLoginFallidos >= maxIntentosLogin) notificarJefeBloqueo(usuario);
}

// Crea (si no existe) la solicitud de recuperación dirigida al jefe directo.
function notificarJefeBloqueo(usuario) {
    if (!usuario) return null;
    const pendiente = solicitudesRecuperacion.find(s => s.usuarioId === usuario.id && s.estado === 'pendiente');
    if (pendiente) return pendiente;
    const solicitud = {
        id: generarIdUnico(),
        usuarioId: usuario.id,
        nombreUsuario: usuario.nombreCompleto || usuario.nombre || '',
        solicitadoA: usuario.superiorId || null, // jefe directo
        nombreSuperior: '',
        quienAyudo: '',
        nombreQuienAyudo: '',
        fechaSolicitud: new Date(),
        fechaResolucion: null,
        estado: 'pendiente',
        contrasenaTemporalGenerada: ''
    };
    solicitudesRecuperacion.push(solicitud);
    guardarEnStorage(STORAGE_KEYS.SOLICITUDES_RECUPERACION, solicitudesRecuperacion);
    return solicitud;
}

// Cuenta los errores (fallidos) de un usuario en los últimos 7 días.
function erroresUltimaSemana(usuario) {
    if (!usuario || !usuario.id) return 0;
    const limite = new Date();
    limite.setDate(limite.getDate() - 7);
    return incidentesLogin.filter(inc => {
        if (inc.usuarioId !== usuario.id || inc.resultado !== 'fallido') return false;
        return new Date(`${inc.fecha}T${inc.hora || '00:00'}:00`) >= limite;
    }).length;
}

// La IA sugiere cambiar la contraseña si hay más de 6 errores en una semana (7 en 7 días).
function revisarSugerenciaContrasena(usuario) {
    if (!usuario) return;
    const errores = erroresUltimaSemana(usuario);
    if (errores > 6) {
        // El aviso va a cartelera (aquí se muestra como aviso inmediato al iniciar sesión).
        mostrarAvisoInmediato(`🔐 ${nombreAsistenteIA()} te sugiere cambiar tu contraseña (${errores} errores esta semana)`, "advertencia");
    }
}

// El jefe ve (prioridad ALTA) las solicitudes de contraseña pendientes a su cargo.
function mostrarSolicitudesPendientesJefe(usuario) {
    if (!usuario || !usuario.id) return;
    const pendientes = solicitudesRecuperacion.filter(s => s.solicitadoA === usuario.id && s.estado === 'pendiente');
    if (pendientes.length === 0) return;
    const nombres = pendientes.map(s => s.nombreUsuario).join(', ');
    mostrarAvisoInmediato(`🔑 Solicitud de contraseña (prioridad ALTA): ${nombres}`, "advertencia");
}

// ==========================================
// 16.2 BANCO DE DATOS POR USUARIO (PUNTO 34)
// Ficha aparte por usuario con bloques: días/sesiones, errores, permisos,
// invitaciones, actividad y campos libres. Histórico: 5 años.
// ==========================================
// Ficha nueva con valores por defecto.
function fichaBancoDatosPorDefecto(usuario) {
    return {
        usuarioId: usuario ? usuario.id : null,
        nombreCompleto: usuario ? (usuario.nombreCompleto || usuario.nombre || '') : '',
        creado: new Date().toISOString(),
        actualizado: new Date().toISOString(),
        diasSesiones: [],
        errores: { id: 0, contrasena: 0, nombre: 0, total: 0, ultimo: null },
        permisos: { modulos: [] },
        invitaciones: { invitoA: [], invitadoPor: usuario ? (usuario.invitadoPor || null) : null },
        actividad: [],
        camposLibres: {}
    };
}

// Devuelve (creando si hace falta) la ficha del usuario.
function fichaBancoDatos(usuarioId) {
    if (!usuarioId) return null;
    if (!bancoDatos[usuarioId]) {
        const usuario = (typeof baseDatosUsuarios !== 'undefined') ? baseDatosUsuarios.find(u => u.id === usuarioId) : null;
        bancoDatos[usuarioId] = fichaBancoDatosPorDefecto(usuario);
    }
    return bancoDatos[usuarioId];
}

function guardarBancoDatos() {
    guardarEnStorage(STORAGE_KEYS.BANCO_DATOS, bancoDatos);
}

// Rellena los campos nuevos con valores por defecto SIN borrar lo existente.
function completarFichaBancoDatos(ficha, usuario) {
    const def = fichaBancoDatosPorDefecto(usuario);
    if (!Array.isArray(ficha.diasSesiones)) ficha.diasSesiones = [];
    if (!Array.isArray(ficha.actividad)) ficha.actividad = [];
    if (!ficha.errores || typeof ficha.errores !== 'object') ficha.errores = def.errores;
    else ficha.errores = { ...def.errores, ...ficha.errores };
    if (!ficha.permisos || typeof ficha.permisos !== 'object') ficha.permisos = def.permisos;
    else ficha.permisos = { ...def.permisos, ...ficha.permisos };
    if (!ficha.invitaciones || typeof ficha.invitaciones !== 'object') ficha.invitaciones = def.invitaciones;
    else ficha.invitaciones = { ...def.invitaciones, ...ficha.invitaciones };
    if (!ficha.camposLibres || typeof ficha.camposLibres !== 'object') ficha.camposLibres = {};
    if (!ficha.usuarioId && usuario) ficha.usuarioId = usuario.id;
    if (!ficha.creado) ficha.creado = def.creado;
    ficha.actualizado = new Date().toISOString();
    return ficha;
}

// Calcula los minutos trabajados de un registro de asistencia.
function calcularMinutosTrabajados(registro) {
    if (!registro || !registro.fechaEntrada || !registro.fechaSalida) return 0;
    const ms = new Date(registro.fechaSalida) - new Date(registro.fechaEntrada);
    return ms > 0 ? Math.round(ms / 60000) : 0;
}

// Bloque "Días/Sesiones": alta/actualización de un día del usuario (sin guardar).
function _upsertDiaSesionBancoDatos(ficha, registro) {
    let dia = ficha.diasSesiones.find(d => d.registroId === registro.id);
    if (!dia) {
        dia = { registroId: registro.id, diaLaboral: registro.diaLaboral, entrada: registro.horaEntrada, salida: null, minutosTrabajados: 0 };
        ficha.diasSesiones.push(dia);
    }
    if (registro.horaSalida) {
        dia.salida = registro.horaSalida;
        dia.minutosTrabajados = calcularMinutosTrabajados(registro);
    }
    return ficha;
}

function registrarDiaSesionBancoDatos(usuarioId, registro) {
    const ficha = fichaBancoDatos(usuarioId);
    if (!ficha || !registro) return;
    _upsertDiaSesionBancoDatos(ficha, registro);
    ficha.actualizado = new Date().toISOString();
    guardarBancoDatos();
}

// Bloque "Errores": recalcula desde incidentesLogin (idempotente).
function actualizarErroresBancoDatos(usuarioId, guardar) {
    const ficha = fichaBancoDatos(usuarioId);
    if (!ficha) return;
    const fallidos = incidentesLogin.filter(i => i.usuarioId === usuarioId && i.resultado === 'fallido');
    const errores = { id: 0, contrasena: 0, nombre: 0, total: fallidos.length, ultimo: null };
    fallidos.forEach(i => {
        if (errores[i.tipo] !== undefined) errores[i.tipo]++;
        errores.ultimo = `${i.fecha} ${i.hora}`;
    });
    ficha.errores = errores;
    ficha.actualizado = new Date().toISOString();
    if (guardar !== false) guardarBancoDatos();
}

// Bloque "Permisos": qué módulos puede ver el usuario.
function actualizarPermisosBancoDatos(usuario) {
    if (!usuario || !usuario.id) return;
    const ficha = fichaBancoDatos(usuario.id);
    if (!ficha) return;
    const modulos = [];
    for (const [id, info] of Object.entries(estadoPantallas)) {
        if (info.visiblePara.includes('todos') ||
            info.visiblePara.includes(usuario.rol) ||
            (usuario.esNo1 && info.visiblePara.includes('No.1')) ||
            (usuario.esPrimeraLinea && info.visiblePara.includes('PrimeraLinea'))) {
            modulos.push(id);
        }
    }
    ficha.permisos = { modulos };
    ficha.actualizado = new Date().toISOString();
    guardarBancoDatos();
}

// Bloque "Invitaciones": a quién invitó el usuario.
function registrarInvitacionBancoDatos(usuarioId, destinoNombre) {
    const ficha = fichaBancoDatos(usuarioId);
    if (!ficha) return;
    const ahora = new Date();
    ficha.invitaciones.invitoA.push({ nombre: destinoNombre || '', fecha: _fechaISO(ahora), hora: _horaHM(ahora) });
    ficha.actualizado = ahora.toISOString();
    guardarBancoDatos();
}

// Bloque "Actividad": qué hizo el usuario (correos, chats, tareas, etc.).
function registrarActividadBancoDatos(usuarioId, tipo, detalle) {
    const ficha = fichaBancoDatos(usuarioId);
    if (!ficha) return;
    const ahora = new Date();
    ficha.actividad.push({ fecha: _fechaISO(ahora), hora: _horaHM(ahora), tipo: tipo || '', detalle: detalle || '' });
    ficha.actualizado = ahora.toISOString();
    guardarBancoDatos();
}

// Respaldo previo de TODOS los datos del navegador antes de migrar.
function respaldarDatosNavegador() {
    const copia = {};
    Object.values(STORAGE_KEYS).forEach(k => { copia[k] = localStorage.getItem(k); });
    guardarEnStorage(STORAGE_KEYS.RESPALDO_MIGRACION, { fecha: new Date().toISOString(), datos: copia });
}

// Migración al cargar: respaldo + relleno de fichas sin borrar nada.
function migrarBancoDatos() {
    try { respaldarDatosNavegador(); } catch (e) {}
    baseDatosUsuarios.forEach(u => {
        if (!u || !u.id) return;
        bancoDatos[u.id] = completarFichaBancoDatos(bancoDatos[u.id] || fichaBancoDatosPorDefecto(u), u);
    });
    // Se conservan fichas cuyo usuario ya no exista (no se borra nada)
    Object.values(bancoDatos).forEach(f => completarFichaBancoDatos(f, null));
    // Sembrar días/sesiones y errores ya existentes (se guarda UNA sola vez al final)
    registrosAsistencia.forEach(r => {
        if (!r.usuarioId) return;
        const ficha = fichaBancoDatos(r.usuarioId);
        if (ficha) _upsertDiaSesionBancoDatos(ficha, r);
    });
    Object.keys(bancoDatos).forEach(id => actualizarErroresBancoDatos(id, false));
    guardarBancoDatos();
}

// ==========================================
// 18. ACTUALIZAR MENÚ DE LA TUERCA (construye las opciones del menú según el rol del usuario)
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
            const nombreTrad = traducirTexto('menu_' + id) || info.nombre;
            enlace.innerHTML = `${info.icono} ${nombreTrad}`;
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
    cerrarSesionLink.innerHTML = `🚪 ${traducirTexto('menu_cerrar_sesion') || 'Cerrar Sesión'}`;
    cerrarSesionLink.onclick = (e) => { e.preventDefault(); cerrarSesion(); toggleMenuTuerca(); };
    menuContainer.appendChild(cerrarSesionLink);
}

// ==========================================
// 19. TOGGLE MENÚ TUERCA (abre o cierra el menú lateral de la tuerca)
// ==========================================
function toggleMenuTuerca() {
    const menu = document.getElementById('menu-lateral-organico');
    const overlay = document.getElementById('overlay-menu');
    if (menu) menu.classList.toggle('abierto');
    if (overlay) overlay.classList.toggle('activo');
}

// ==========================================
// 20. CARGAR NOMBRE RECORDADO (rellena el campo de usuario con el nombre guardado en el dispositivo)
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
    } else {
        // Sin "recordar": el saludo usa el último usuario del sistema, si existe (PUNTO 6)
        const ultimoUsuario = localStorage.getItem(STORAGE_KEYS.ULTIMO_USUARIO);
        if (spanNombre) {
            spanNombre.innerText = ultimoUsuario ? ultimoUsuario.replace(/^"|"$/g, '').split(' ')[0] : "de nuevo";
        }
    }
    const datalist = document.getElementById('lista-usuarios');
    if (datalist) {
        datalist.innerHTML = '';
        baseDatosUsuarios.forEach(u => { const option = document.createElement('option'); option.value = u.nombreCompleto; datalist.appendChild(option); });
    }
    const elementoFrase = document.getElementById('frase-motivacional');
    if (elementoFrase) elementoFrase.innerText = `"${obtenerFraseMotivacional()}"`;
}

// ==========================================
// 20.1 SALUDO DEL LOGIN (actualiza el "Hola [Nombre]" en vivo; usa el último usuario del sistema si el campo está vacío — PUNTO 6)
// ==========================================
function actualizarSaludoLogin() {
    const spanNombre = document.getElementById('nombre-usuario-login');
    if (!spanNombre) return;
    const campoNombre = document.getElementById('acc-nombre-completo');
    const texto = campoNombre ? campoNombre.value.trim().replace(/^"|"$/g, '') : '';
    if (texto) {
        spanNombre.innerText = texto.split(' ')[0];
    } else {
        const ultimoUsuario = localStorage.getItem(STORAGE_KEYS.ULTIMO_USUARIO);
        spanNombre.innerText = ultimoUsuario ? ultimoUsuario.replace(/^"|"$/g, '').split(' ')[0] : "de nuevo";
    }
}

// ==========================================
// 20.2 AUTENTICACIÓN BIOMÉTRICA (LOGIN Y ENROLAMIENTO — PUNTOS 6 y 9-10-11)
// Iconos SVG de trazo fino (verde Stratos). Cada botón intenta su propio proceso
// (facial / patrón / huella) usando WebAuthn (navigator.credentials).
// La opción se inscribe en la pantalla de Perfil y, desde ahí en adelante,
// sirve para entrar SOLO con la biometría (sin nombre, ID ni contraseña).
// ==========================================
const METODOS_BIOMETRICOS = ['facial', 'patron', 'huella'];
const NOMBRE_METODO_BIOMETRICO = { facial: 'rostro', patron: 'patrón', huella: 'huella' };

// Pregunta al dispositivo si ofrece autenticador de plataforma (WebAuthn).
function verificarDispositivoBiometrico() {
    const soportado = window.PublicKeyCredential && typeof PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable === 'function';
    if (!soportado) return Promise.resolve(false);
    return PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable().catch(() => false);
}

// ¿El usuario dejó habilitada la biometría en Configuración?
function biometriaHabilitada() { return !!(configuracionPersonal && configuracionPersonal.biometria); }

// Texto de un aviso ya traducido (si la clave no existe, se usa el texto en español).
function _bioTexto(clave, porDefecto) {
    const t = typeof traducirTexto === 'function' ? traducirTexto(clave) : '';
    return t || porDefecto;
}

// ---------- Utilidades de bytes para WebAuthn (base64url, CBOR/COSE y DER) ----------
function _bioConcatenarBytes() {
    const partes = Array.prototype.slice.call(arguments);
    const total = partes.reduce((suma, p) => suma + p.length, 0);
    const salida = new Uint8Array(total);
    let posicion = 0;
    partes.forEach(p => { salida.set(p, posicion); posicion += p.length; });
    return salida;
}

function _bioBufferABase64Url(buffer) {
    const bytes = new Uint8Array(buffer);
    let binario = '';
    for (let i = 0; i < bytes.length; i++) binario += String.fromCharCode(bytes[i]);
    return btoa(binario).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function _bioBase64UrlABuffer(texto) {
    let base64 = String(texto || '').replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) base64 += '=';
    const binario = atob(base64);
    const bytes = new Uint8Array(binario.length);
    for (let i = 0; i < binario.length; i++) bytes[i] = binario.charCodeAt(i);
    return bytes;
}

// Desafío aleatorio de un solo uso (WebAuthn exige uno distinto en cada operación).
function _bioDesafioAleatorio() { return crypto.getRandomValues(new Uint8Array(32)); }

// Decodifica una clave COSE (CBOR) en un objeto plano.
function _bioDecodificarCose(base64Url) {
    const bytes = _bioBase64UrlABuffer(base64Url);
    const vista = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    let posicion = 0;
    function leerCabecera() {
        const inicial = vista.getUint8(posicion++);
        const tipo = inicial >> 5;
        const info = inicial & 0x1f;
        let longitud = info;
        if (info === 24) longitud = vista.getUint8(posicion++);
        else if (info === 25) { longitud = vista.getUint16(posicion); posicion += 2; }
        else if (info === 26) { longitud = vista.getUint32(posicion); posicion += 4; }
        return { tipo: tipo, info: info, longitud: longitud };
    }
    function leerValor() {
        const cab = leerCabecera();
        const largo = cab.longitud;
        if (cab.tipo === 0) return largo;
        if (cab.tipo === 1) return -1 - largo;
        if (cab.tipo === 2) { const v = bytes.slice(posicion, posicion + largo); posicion += largo; return v; }
        if (cab.tipo === 3) { const v = new TextDecoder().decode(bytes.slice(posicion, posicion + largo)); posicion += largo; return v; }
        if (cab.tipo === 4) { const v = []; for (let i = 0; i < largo; i++) v.push(leerValor()); return v; }
        if (cab.tipo === 5) { const v = {}; for (let i = 0; i < largo; i++) { const k = leerValor(); v[k] = leerValor(); } return v; }
        if (cab.tipo === 7) return cab.info === 20 ? false : (cab.info === 21 ? true : null);
        throw new Error('CBOR: tipo no soportado (' + cab.tipo + ')');
    }
    return leerValor();
}

// Longitud DER (usa bytes extra cuando el largo pasa de 127).
function _bioDer(longitud) {
    if (longitud < 0x80) return new Uint8Array([longitud]);
    const bytes = [];
    let n = longitud;
    while (n > 0) { bytes.unshift(n & 0xff); n = Math.floor(n / 256); }
    return new Uint8Array([0x80 | bytes.length].concat(bytes));
}

function _bioSecuenciaDer() {
    const cuerpo = _bioConcatenarBytes.apply(null, arguments);
    return _bioConcatenarBytes(new Uint8Array([0x30]), _bioDer(cuerpo.length), cuerpo);
}

// Convierte la clave pública COSE al formato SPKI que entiende crypto.subtle.
// Cubre lo que usan los autenticadores de plataforma: EC2/P-256 (ES256) y RSA (RS256).
function _bioCoseASpki(cose) {
    if (cose.kty === 2) {
        const algoritmo = _bioSecuenciaDer(
            new Uint8Array([0x06, 0x07, 0x2a, 0x86, 0x48, 0xce, 0x3d, 0x02, 0x01]),
            new Uint8Array([0x06, 0x08, 0x2a, 0x86, 0x48, 0xce, 0x3d, 0x03, 0x01, 0x07])
        );
        const punto = _bioConcatenarBytes(new Uint8Array([0x04]), cose.x, cose.y);
        const bits = _bioConcatenarBytes(new Uint8Array([0x00]), punto);
        return {
            spki: _bioSecuenciaDer(algoritmo, new Uint8Array([0x03]), _bioDer(bits.length), bits),
            importar: { name: 'ECDSA', namedCurve: 'P-256' },
            verificar: { name: 'ECDSA', hash: 'SHA-256' }
        };
    }
    if (cose.kty === 3) {
        const algoritmo = _bioSecuenciaDer(
            new Uint8Array([0x06, 0x09, 0x2a, 0x86, 0x48, 0x86, 0xf7, 0x0d, 0x01, 0x01, 0x01]),
            new Uint8Array([0x05, 0x00])
        );
        // INTEGER de DER: etiqueta 0x02 + longitud + contenido. Si el bit mas alto
        // esta activo se antepone un 0x00, porque si no el entero se leeria como
        // negativo (pasa siempre con modulos RSA).
        const entero = (bytes) => {
            const conCero = (bytes.length && (bytes[0] & 0x80))
                ? _bioConcatenarBytes(new Uint8Array([0x00]), bytes)
                : bytes;
            return _bioConcatenarBytes(new Uint8Array([0x02]), _bioDer(conCero.length), conCero);
        };
        const bits = _bioConcatenarBytes(new Uint8Array([0x00]), _bioSecuenciaDer(entero(cose.n), entero(cose.e)));
        return {
            spki: _bioSecuenciaDer(algoritmo, new Uint8Array([0x03]), _bioDer(bits.length), bits),
            importar: { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
            verificar: { name: 'RSASSA-PKCS1-v1_5' }
        };
    }
    throw new Error('Biometría: algoritmo de clave no soportado');
}

// Verifica la aserción que devuelve el dispositivo: origen, desafío, usuario
// verificado y firma criptográfica. Si el contador no avanza, el autenticador
// fue clonado y la aserción se rechaza.
async function _bioVerificarAsercion(registro, asercion, desafio) {
    const respuesta = asercion.response;
    const datosCliente = JSON.parse(new TextDecoder().decode(respuesta.clientDataJSON));
    if (datosCliente.type !== 'webauthn.get') return false;
    if (datosCliente.challenge !== _bioBufferABase64Url(desafio)) return false;
    if (datosCliente.origin !== window.location.origin) return false;
    const datosAutenticador = new Uint8Array(respuesta.authenticatorData);
    if (!(datosAutenticador[32] & 0x01)) return false; // bit UP: el usuario fue verificado
    const hashCliente = new Uint8Array(await crypto.subtle.digest('SHA-256', respuesta.clientDataJSON));
    const firmado = _bioConcatenarBytes(datosAutenticador, hashCliente);
    const clave = _bioCoseASpki(_bioDecodificarCose(registro.publicKey));
    const llave = await crypto.subtle.importKey('spki', clave.spki, clave.importar, false, ['verify']);
    const esFirmaValida = await crypto.subtle.verify(clave.verificar, llave, respuesta.signature, firmado);
    const contadorNuevo = new DataView(datosAutenticador.buffer, datosAutenticador.byteOffset + 33, 4).getUint32(0);
    if (esFirmaValida && registro.contador && contadorNuevo <= registro.contador) return false;
    if (esFirmaValida) {
        registro.contador = contadorNuevo;
        const mapa = leerMapaBiometria();
        if (mapa[registro.usuarioId]) { mapa[registro.usuarioId].contador = contadorNuevo; guardarEnStorage(STORAGE_KEYS.BIOMETRIA, mapa); }
    }
    return esFirmaValida;
}

// Enrolamiento biométrico guardado en ESTE dispositivo: { [usuarioId]: {…} }.
function leerMapaBiometria() { return cargarDeStorage(STORAGE_KEYS.BIOMETRIA) || {}; }

// El usuario inscribe (enrola) su biometría desde la pantalla de Perfil (PUNTO 9-10-11).
// El dispositivo genera la clave; aquí solo se guarda la clave PÚBLICA y el id de la
// credencial en ESTE dispositivo (el secreto nunca sale del equipo).
function enrolarBiometria(metodo) {
    const mensaje = document.getElementById('mensaje-biometria-perfil');
    const info = (texto, clase) => {
        if (!mensaje) return;
        mensaje.innerText = texto;
        mensaje.className = 'aviso-letrero' + (clase ? ' ' + clase : '');
        mensaje.style.maxHeight = '60px';
    };
    if (!usuarioActivo || !usuarioActivo.id) {
        mostrarAvisoInmediato("✖ Inicia sesión para inscribir tu biometría", "advertencia");
        return;
    }
    if (!METODOS_BIOMETRICOS.includes(metodo)) return;
    if (!window.PublicKeyCredential || !navigator.credentials) {
        info(_bioTexto('bio_sin_webauthn', 'Este navegador no admite autenticación biométrica.'), 'texto-error');
        return;
    }
    if (!window.crypto || !crypto.subtle) {
        info(_bioTexto('bio_contexto_seguro', 'Abre la app con Live Server o desde una dirección https para usar la biometría.'), 'texto-error');
        return;
    }

    verificarDispositivoBiometrico().then(async disponible => {
        if (!disponible) {
            const aviso = _bioTexto('bio_sin_dispositivo', 'Este dispositivo no ofrece autenticación biométrica.');
            info(aviso, 'texto-advertencia');
            mostrarAvisoInmediato("✖ " + aviso, "advertencia");
            return;
        }
        const idUsuarioHash = new Uint8Array(await crypto.subtle.digest(
            'SHA-256', new TextEncoder().encode(usuarioActivo.id)
        ));
        let credencial = null;
        try {
            credencial = await navigator.credentials.create({
                publicKey: {
                    challenge: _bioDesafioAleatorio(),
                    rp: { name: 'Stratos' },
                    user: {
                        id: idUsuarioHash,
                        name: usuarioActivo.nombreCompleto || usuarioActivo.id,
                        displayName: usuarioActivo.nombreCompleto || usuarioActivo.id
                    },
                    pubKeyCredParams: [{ type: 'public-key', alg: -7 }, { type: 'public-key', alg: -257 }],
                    authenticatorSelection: { authenticatorAttachment: 'platform', userVerification: 'required', residentKey: 'discouraged' },
                    attestation: 'none',
                    timeout: 60000
                }
            });
        } catch (error) {
            const aviso = (error && error.name === 'NotAllowedError')
                ? _bioTexto('bio_cancelada', 'Inscripción cancelada.')
                : _bioTexto('bio_error_inscribir', 'No se pudo inscribir la biometría en este dispositivo.');
            info(aviso, 'texto-error');
            return;
        }
        if (!credencial || !credencial.response || !credencial.response.publicKey) {
            info(_bioTexto('bio_error_inscribir', 'No se pudo inscribir la biometría en este dispositivo.'), 'texto-error');
            return;
        }
        const mapa = leerMapaBiometria();
        mapa[usuarioActivo.id] = {
            usuarioId: usuarioActivo.id,
            nombreCompleto: usuarioActivo.nombreCompleto,
            idEmpleado: usuarioActivo.idEmpleado,
            metodo: metodo,
            credencialId: _bioBufferABase64Url(credencial.rawId),
            publicKey: _bioBufferABase64Url(credencial.response.publicKey),
            transports: (typeof credencial.response.getTransports === 'function') ? credencial.response.getTransports() : [],
            contador: 0,
            fecha: new Date().toISOString()
        };
        guardarEnStorage(STORAGE_KEYS.BIOMETRIA, mapa);
        // Al inscribir, la biometría queda habilitada en Configuración.
        if (!biometriaHabilitada()) {
            configuracionPersonal.biometria = true;
            guardarEnStorage(STORAGE_KEYS.CONFIG_PERSONAL, configuracionPersonal);
            const casilla = document.getElementById('config-biometria');
            if (casilla) casilla.checked = true;
        }
        actualizarEstadoEnrolamiento();
        registrarActividadBancoDatos(usuarioActivo.id, 'biometria',
            'Inscribió biometría de ' + (NOMBRE_METODO_BIOMETRICO[metodo] || metodo));
        mostrarAvisoInmediato(`✓ Biometría de ${NOMBRE_METODO_BIOMETRICO[metodo] || metodo} inscrita en este dispositivo`, "exito");
    }).catch(() => {
        info(_bioTexto('bio_error_inscribir', 'No se pudo inscribir la biometría en este dispositivo.'), 'texto-error');
    });
}

// Pinta el estado de la inscripción: resalta el método inscrito, atenúa los
// botones si el dispositivo no tiene autenticador y explica qué falta (PUNTO 6-B.5).
function actualizarEstadoEnrolamiento() {
    const usuario = (usuarioActivo && usuarioActivo.id) ? usuarioActivo : null;
    const enrolada = usuario ? leerMapaBiometria()[usuario.id] : null;

    METODOS_BIOMETRICOS.forEach(metodo => {
        const boton = document.getElementById('perfil-bio-' + metodo);
        if (boton) boton.classList.toggle('enrolado', !!(enrolada && enrolada.metodo === metodo));
    });

    verificarDispositivoBiometrico().then(disponible => {
        const contenedorPerfil = document.getElementById('opciones-biometria-perfil');
        if (contenedorPerfil) contenedorPerfil.classList.toggle('no-disponible', !disponible);
        const mensaje = document.getElementById('mensaje-biometria-perfil');
        if (!mensaje) return;
        mensaje.style.maxHeight = '60px';
        if (!disponible) {
            mensaje.innerText = _bioTexto('bio_sin_dispositivo', 'Este dispositivo no ofrece autenticación biométrica.');
            mensaje.className = 'aviso-letrero texto-advertencia';
        } else if (enrolada) {
            mensaje.innerText = _bioTexto('bio_ya_inscrita', 'Ya tienes inscrita tu biometría de')
                + ' ' + (NOMBRE_METODO_BIOMETRICO[enrolada.metodo] || enrolada.metodo) + '.';
            mensaje.className = 'aviso-letrero texto-exito';
        } else {
            mensaje.innerText = _bioTexto('bio_sin_inscribir', 'Aún no has inscrito ninguna biometría en este dispositivo.');
            mensaje.className = 'aviso-letrero';
        }
    });

    actualizarEstadoBiometriaLogin();
}

// Estado visual de los botones del Login (atenúa si no se puede usar y resalta
// el método que el usuario de este dispositivo tiene inscrito).
function actualizarEstadoBiometriaLogin() {
    const contenedor = document.getElementById('opciones-biometria');
    if (!contenedor) return;
    const seleccion = biometriaParaLogin();
    const metodoInscrito = seleccion.registro ? seleccion.registro.metodo : null;
    METODOS_BIOMETRICOS.forEach(metodo => {
        const boton = document.getElementById('bio-' + metodo);
        if (boton) boton.classList.toggle('enrolado', metodo === metodoInscrito);
    });
    verificarDispositivoBiometrico().then(disponible => {
        contenedor.classList.toggle('no-disponible', !(disponible && biometriaHabilitada()));
    });
}

// Punto de entrada desde el Login (PUNTO 6): comprueba el dispositivo.
function inicializarBiometria() { actualizarEstadoBiometriaLogin(); }

// Elige con qué credencial se va a entrar: la del usuario escrito en el Login,
// o la del último usuario de este dispositivo si el campo está vacío.
function biometriaParaLogin() {
    const mapa = leerMapaBiometria();
    const registros = Object.keys(mapa)
        .map(clave => mapa[clave])
        .filter(registro => registro && registro.credencialId);
    if (registros.length === 0) return { registro: null, motivo: 'nadie_inscrito' };
    const campoNombre = document.getElementById('acc-nombre-completo');
    const escrito = campoNombre ? campoNombre.value.trim().replace(/^"|"$/g, '') : '';
    if (escrito) {
        const encontrado = registros.find(r => (r.nombreCompleto || '').toLowerCase() === escrito.toLowerCase());
        return encontrado ? { registro: encontrado, motivo: null } : { registro: null, motivo: 'usuario_no_inscrito' };
    }
    const ultimoNombre = localStorage.getItem(STORAGE_KEYS.ULTIMO_USUARIO);
    if (ultimoNombre) {
        const porUltimo = registros.find(r => r.nombreCompleto === ultimoNombre);
        if (porUltimo) return { registro: porUltimo, motivo: null };
    }
    return { registro: registros[0], motivo: null };
}

// Intenta entrar SOLO con la biometría: sustituye nombre + ID + contraseña
// (PUNTO 9-10-11, puntos 4 a 6). Cada botón va a su propio proceso.
function intentarBiometria(metodo) {
    if (!METODOS_BIOMETRICOS.includes(metodo)) return;
    const mensajeLogin = document.getElementById('mensaje-acceso');
    const avisar = (texto) => {
        if (mensajeLogin) {
            mensajeLogin.innerText = texto;
            mensajeLogin.className = 'aviso-letrero texto-error';
            mensajeLogin.style.maxHeight = '60px';
        }
        mostrarAvisoInmediato("✖ " + texto, "advertencia");
    };

    if (!window.PublicKeyCredential || !navigator.credentials) {
        avisar(_bioTexto('bio_sin_webauthn', 'Este navegador no admite autenticación biométrica.'));
        return;
    }
    if (!window.crypto || !crypto.subtle) {
        avisar(_bioTexto('bio_contexto_seguro', 'Abre la app con Live Server o desde una dirección https para usar la biometría.'));
        return;
    }
    if (!biometriaHabilitada()) {
        avisar(_bioTexto('bio_desactivada', 'Activa "Habilitar autenticación biométrica" en Configuración.'));
        return;
    }

    const seleccion = biometriaParaLogin();
    if (!seleccion.registro) {
        avisar(seleccion.motivo === 'usuario_no_inscrito'
            ? _bioTexto('bio_usuario_no_inscrito', 'Ese usuario no tiene biometría inscrita en este dispositivo.')
            : _bioTexto('bio_nadie_inscrito', 'Todavía no hay biometría inscrita. Inscríbela desde tu Perfil.'));
        return;
    }
    const registro = seleccion.registro;
    if (registro.metodo !== metodo) {
        avisar(_bioTexto('bio_metodo_inscrito', 'La opción que tienes inscrita es:')
            + ' ' + (NOMBRE_METODO_BIOMETRICO[registro.metodo] || registro.metodo));
        return;
    }
    const usuario = baseDatosUsuarios.find(u => u.id === registro.usuarioId);
    if (!usuario) {
        avisar(_bioTexto('bio_usuario_no_inscrito', 'Ese usuario no tiene biometría inscrita en este dispositivo.'));
        return;
    }

    const desafio = _bioDesafioAleatorio();
    verificarDispositivoBiometrico().then(async disponible => {
        if (!disponible) {
            avisar(_bioTexto('bio_sin_dispositivo', 'Este dispositivo no ofrece autenticación biométrica.'));
            return;
        }
        let asercion = null;
        try {
            asercion = await navigator.credentials.get({
                publicKey: {
                    challenge: desafio,
                    allowCredentials: [{ type: 'public-key', id: _bioBase64UrlABuffer(registro.credencialId) }],
                    userVerification: 'required',
                    timeout: 60000
                }
            });
        } catch (error) {
            avisar((error && error.name === 'NotAllowedError')
                ? _bioTexto('bio_cancelada', 'Biometría cancelada.')
                : _bioTexto('bio_error_verificar', 'No se pudo verificar la biometría.'));
            return;
        }
        let esValida = false;
        try {
            esValida = await _bioVerificarAsercion(registro, asercion, desafio);
        } catch (error) {
            esValida = false;
            console.warn('Biometría: fallo al verificar la aserción', error);
        }
        if (!esValida) {
            registrarIncidenteLogin(usuario, 'biometria', 'fallido');
            avisar(_bioTexto('bio_error_verificar', 'No se pudo verificar la biometría.'));
            return;
        }
        // Contraseña temporal pendiente: la biometría no omite el cambio obligatorio.
        if (usuario.requiereCambioContrasena) {
            mostrarAvisoInmediato("⚠ Debes cambiar tu contraseña temporal antes de entrar", "advertencia");
            return;
        }
        iniciarSesionBiometrica(usuario);
    }).catch(() => {
        avisar(_bioTexto('bio_error_verificar', 'No se pudo verificar la biometría.'));
    });
}

// Abre la sesión tras una verificación biométrica correcta. Reutiliza el mismo
// camino que `validarEntrada` para no dejar fuera ningún registro (PUNTO 48/34).
function iniciarSesionBiometrica(usuario) {
    if (!usuario || !usuario.id) return;
    usuario.intentosLoginFallidos = 0;
    usuario.ultimoAcceso = new Date();
    const indiceUsuario = baseDatosUsuarios.findIndex(u => u.id === usuario.id);
    if (indiceUsuario !== -1) baseDatosUsuarios[indiceUsuario] = { ...usuario };
    guardarEnStorage(STORAGE_KEYS.BASE_USUARIOS, baseDatosUsuarios);

    usuarioActivo = usuario;
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

    guardarEnStorage(STORAGE_KEYS.ULTIMO_USUARIO, usuario.nombreCompleto);
    guardarEnStorage(STORAGE_KEYS.RECORDAR_USUARIO, usuario.nombreCompleto);
    let usuariosDispositivo = localStorage.getItem('usuarios_del_dispositivo');
    usuariosDispositivo = usuariosDispositivo ? JSON.parse(usuariosDispositivo) : [];
    if (!usuariosDispositivo.includes(usuario.nombreCompleto)) {
        usuariosDispositivo.push(usuario.nombreCompleto);
        localStorage.setItem('usuarios_del_dispositivo', JSON.stringify(usuariosDispositivo));
    }
    const casillaRecordar = document.getElementById('guardar-local');
    if (casillaRecordar) casillaRecordar.checked = true;
    const campoNombre = document.getElementById('acc-nombre-completo');
    if (campoNombre) campoNombre.value = usuario.nombreCompleto;
    const aviso = document.getElementById('mensaje-acceso');
    if (aviso) { aviso.innerText = ''; aviso.style.maxHeight = '0'; }
    const divIntentos = document.getElementById('intentos-restantes');
    if (divIntentos) divIntentos.style.display = 'none';
    actualizarSaludoLogin();

    registrarHoraEntrada(usuario);
    registrarIncidenteLogin(usuario, 'biometria', 'exitoso');
    actualizarPermisosBancoDatos(usuario);
    registrarActividadBancoDatos(usuario.id, 'sesion', 'Inicio de sesión con biometría');
    mostrarAvisoInmediato(`✓ ${_bioTexto('bio_bienvenida', 'Hola')}, ${usuario.nombre}`, "exito");
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
// 21. SALVAR IDENTIDAD (PANTALLA 3) (guarda la identidad corporativa definida por el No.1)
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
// 22. SALTAR IDENTIDAD (omite flag y permite continuar sin completar la identidad)
// ==========================================
function saltarIdentidad() {
    mostrarAvisoInmediato("⚠ Accediendo con branding genérico temporal", "advertencia");
    setTimeout(() => irAPantalla('pantalla-organigrama'), 1500);
}

// ==========================================
// 23. APLICAR BRANDING GLOBAL (muestra el logo y slogan de la empresa en toda la app)
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
// 24. ANALIZAR COLORES DEL LOGO (extrae los colores del logotipo y selecciona hasta 3 para la paleta)
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
    
    // Helpers: luminancia y contraste (WCAG)
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

    // Determina los colores detectados y selecciona hasta 3 colores del logo (conteo exacto)
    let coloresPrincipales = Object.keys(coloresMap)
        .map(hex => ({ hex: hex.toUpperCase(), count: coloresMap[hex] }))
        .sort((a, b) => b.count - a.count)
        .map(item => item.hex);

    const totalColoresDetectados = coloresPrincipales.length;
    const tieneBlanco = coloresPrincipales.includes('#FFFFFF');
    const tieneNegro = coloresPrincipales.includes('#000000');

    // Excluye blanco/negro al elegir los colores del logo y cuenta las restantes
    const coloresFiltrados = coloresPrincipales.filter(hex => hex !== '#FFFFFF' && hex !== '#000000');
    let seleccionLogo = [];
    if (coloresFiltrados.length > 3) {
        seleccionLogo = coloresFiltrados.slice(0, 3);
    } else {
        seleccionLogo = coloresFiltrados.slice(0);
    }

    // Incluye siempre blanco y negro como entradas separadas
    const basePaleta = [...seleccionLogo];

    // Prepara los candidatos de seguridad y los puntúa por contraste contra los colores del logo
    // coloresTrasladado a datos.js -> COLORES_SEGURIDAD_ANALISIS
    const coloresSeguridad = COLORES_SEGURIDAD_ANALISIS;

    // Si la selección del logo está vacía (logo solo blanco/negro o muy simple), toma 6 colores de seguridad
    let paletaLogo = [];
    if (basePaleta.length === 0) {
        paletaLogo = coloresSeguridad.slice(0, 6);
    } else {
        paletaLogo = [...basePaleta];
        // Puntúa los colores de seguridad por la suma de contrastes contra los colores del logo
        const scored = coloresSeguridad.map(c => {
            const score = basePaleta.reduce((acc, lc) => acc + contrastRatio(c, lc), 0);
            return { color: c, score };
        }).sort((a, b) => b.score - a.score);

        for (let s of scored) {
            if (paletaLogo.length >= 6) break;
            if (!paletaLogo.includes(s.color)) paletaLogo.push(s.color);
        }
    }

    // Paleta final: hasta 6 colores del logo/de apoyo, luego blanco y negro (únicos)
    const final = [];
    paletaLogo.forEach(c => { if (!final.includes(c)) final.push(c); });
    if (!final.includes('#FFFFFF')) final.push('#FFFFFF');
    if (!final.includes('#000000')) final.push('#000000');

    // Asegura un total de 8 agregando los colores de seguridad restantes (diversidad)
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
// 25. GENERAR PALETA DE COLORES (construye y muestra la paleta final de 8 colores)
// ==========================================
function generarPaleta() {
    const contenedor = document.getElementById('paleta-colores-centrada');
    if (!contenedor || !Array.isArray(coloresExtraidos)) return;
    
    contenedor.innerHTML = '';
    const coloresUnicos = [...new Set(coloresExtraidos)];
    let paletaFinal = [...coloresUnicos];
    // lista trasladada a datos.js -> COLORES_SEGURIDAD_PALETA
    const coloresSeguridad = COLORES_SEGURIDAD_PALETA;
    
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
// 26. GUARDAR CONTACTO (versión unificada)
// La lógica única de guardar/actualizar contactos vive en la sección 32.
// Esta declaración duplicada se eliminó para evitar conflicto de definiciones.// 27. RENDERIZAR ORGANIGRAMA PERSONAL (dibuja el nodo del usuario y su primera línea de colaboradores)
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
// 28. FUNCIONES ADICIONALES (detalles de contacto, perfil, configuración y recuperación de contraseña)
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
        nombreAsistente: (document.getElementById('config-nombre-asistente')?.value || '').trim() || 'Vero',
        idioma: document.getElementById('config-idioma')?.value || 'es',
        biometria: document.getElementById('config-biometria')?.checked || false
    };
    configuracionPersonal = config;
    guardarEnStorage(STORAGE_KEYS.CONFIG_PERSONAL, configuracionPersonal);
    aplicarIdioma(config.idioma);
    actualizarEstadoBiometriaLogin(); // PUNTO 9-10-11: refleja la casilla en el Login
    if (typeof actualizarMenuTuerca === 'function') actualizarMenuTuerca();
    mostrarAvisoInmediato("✓ Configuración guardada", "exito");
}

// Devuelve el texto traducido de una clave según el idioma actual.
function traducirTexto(clave) {
    const codigo = (configuracionPersonal && configuracionPersonal.idioma === 'en') ? 'en' : 'es';
    const trad = TRADUCCIONES && TRADUCCIONES[clave];
    return trad ? trad[codigo] : '';
}

// Aplica el idioma elegido a los textos fijos de la interfaz (los que el usuario lee, no los que escribe).
function aplicarIdioma(idioma) {
    const codigo = (idioma === 'en') ? 'en' : 'es';
    // Textos alternativos (title) de los botones, p. ej. los biométricos.
    document.querySelectorAll('[data-i18n-title]').forEach(function(el) {
        const claveTitulo = el.getAttribute('data-i18n-title');
        const tradTitulo = TRADUCCIONES && TRADUCCIONES[claveTitulo];
        if (tradTitulo) el.setAttribute('title', tradTitulo[codigo]);
    });
    document.querySelectorAll('[data-i18n]').forEach(function(el) {
        const clave = el.getAttribute('data-i18n');
        const trad = TRADUCCIONES && TRADUCCIONES[clave];
        if (!trad) return;
        const texto = trad[codigo];
        // Si tiene hijos con estructura (spans, strong, etc.) se omite para no romper el layout.
        const tieneHijosElemento = Array.from(el.children).some(c => c.nodeType === 1);
        if (el.hasAttribute('placeholder')) {
            el.setAttribute('placeholder', texto);
        } else if (el.tagName !== 'INPUT' && el.tagName !== 'TEXTAREA' && el.tagName !== 'SELECT' && !tieneHijosElemento) {
            el.textContent = texto;
        }
    });
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
        titulo.innerText = traducirTexto('mod_editar') || 'Editar Contacto';
        // Modo edición: `contactoEnEdicion` y `tipoContactoActual` ya quedaron fijados
        // arriba, así que NO hace falta ningún campo oculto (PUNTO 33, 2.5).
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
        if (usuarioActivo && usuarioActivo.id) registrarHoraSalida(usuarioActivo); // PUNTO 48: última salida del día
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
// 29. FUNCIONES DE PERSISTENCIA Y UTILERÍAS (IDs, storage, invitaciones y gestión visual de colores)
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

// ==========================================
// 29.1 ORGANIGRAMA GENERAL: RECURSIVO, PERSISTENTE Y CON UN SOLO No.1 (PUNTO 31)
// Antes solo dibujaba 2 niveles y no guardaba nada. Ahora:
//   - se construye con TODOS los niveles,
//   - se guarda en localStorage y se recupera al abrir la app,
//   - deja un solo No.1 en todo el sistema,
//   - se rehace solo cuando alguien se inscribe o cambia de jefe.
// ==========================================

// Normaliza la jerarquía: un ÚNICO No.1 en todo el sistema (3.3).
// Se queda el No.1 más antiguo; los demás pasan a ser colaboradores.
function normalizarUnicoNo1() {
    const marcados = baseDatosUsuarios.filter(u => u.esNo1);
    if (marcados.length <= 1) return null;
    const ganador = marcados.slice().sort((a, b) => {
        const fa = a.fechaRegistro ? new Date(a.fechaRegistro).getTime() : 0;
        const fb = b.fechaRegistro ? new Date(b.fechaRegistro).getTime() : 0;
        return fa - fb;
    })[0];
    let huboCambios = false;
    marcados.forEach(usuario => {
        if (usuario.id === ganador.id) return;
        usuario.esNo1 = false;
        if (!usuario.superiorId) usuario.superiorId = ganador.id; // pasa a subordinado
        huboCambios = true;
    });
    ganador.esNo1 = true;
    if (huboCambios) guardarEnStorage(STORAGE_KEYS.BASE_USUARIOS, baseDatosUsuarios);
    return ganador;
}

// Construye el organigrama general con TODOS los niveles (3.1).
function construirOrganigramaGeneral() {
    const usuarios = (Array.isArray(baseDatosUsuarios) ? baseDatosUsuarios : [])
        .filter(u => u && u.id);
    if (usuarios.length === 0) {
        return { raices: [], nodos: {}, generadoEn: new Date().toISOString(), totalUsuarios: 0 };
    }
    const nodos = {};
    usuarios.forEach(u => {
        nodos[u.id] = {
            id: u.id,
            superiorId: u.superiorId || null,
            nivel: null,
            esNo1: !!u.esNo1,
            activo: u.activo !== false
        };
    });

    // Hijos de cada uno (para no repetir usuarios en el dibujo).
    const hijosDe = {};
    Object.keys(nodos).forEach(id => { hijosDe[id] = []; });
    Object.keys(nodos).forEach(id => {
        const jefe = nodos[id].superiorId;
        if (!jefe || !nodos[jefe] || jefe === id) return; // nadie es su propio jefe
        hijosDe[jefe].push(id);
    });

    // Raíces: sin jefe, o con un jefe que ya no existe.
    const raices = Object.keys(nodos).filter(id => {
        const jefe = nodos[id].superiorId;
        return !jefe || !nodos[jefe];
    });

    // Recorrido en anchura: asigna el nivel de cada nodo y detecta ciclos.
    const cola = raices.slice();
    raices.forEach(id => { nodos[id].nivel = 0; });
    while (cola.length > 0) {
        const actual = cola.shift();
        const nivel = nodos[actual].nivel || 0;
        (hijosDe[actual] || []).forEach(idHijo => {
            if (nodos[idHijo].nivel === null) {
                nodos[idHijo].nivel = nivel + 1;
                cola.push(idHijo);
            }
        });
    }
    // Ciclo (A->B->A): quien quedó sin nivel pasa a ser raíz.
    Object.keys(nodos).forEach(id => {
        if (nodos[id].nivel === null) {
            nodos[id].nivel = 0;
            raices.push(id);
        }
    });

    // El No.1 siempre va primero.
    const idNo1 = Object.keys(nodos).find(id => nodos[id].esNo1);
    if (idNo1 && raices.indexOf(idNo1) === -1) raices.unshift(idNo1);

    return {
        raices: raices,
        nodos: nodos,
        generadoEn: new Date().toISOString(),
        totalUsuarios: usuarios.length
    };
}

// Guarda el organigrama general ya construido (3.2).
function guardarOrganigramaGeneral() {
    organigramaGeneral = construirOrganigramaGeneral();
    guardarEnStorage(STORAGE_KEYS.ORGANIGRAMA_GENERAL, organigramaGeneral);
    return organigramaGeneral;
}

// Recupera el organigrama general guardado; si no existe o quedó desactualizado
// (cambió la cantidad de usuarios), lo vuelve a construir (3.2).
function cargarOrganigramaGeneral(forzar) {
    const guardado = cargarDeStorage(STORAGE_KEYS.ORGANIGRAMA_GENERAL);
    const usuariosActuales = (Array.isArray(baseDatosUsuarios) ? baseDatosUsuarios : [])
        .filter(u => u && u.id).length;
    if (!forzar && guardado && guardado.nodos && guardado.totalUsuarios === usuariosActuales) {
        organigramaGeneral = guardado;
        return organigramaGeneral;
    }
    return guardarOrganigramaGeneral();
}

// Enlaza como subordinados a los usuarios que YA habían sido invitados por este
// usuario pero que todavía no tenían jefe (3.4).
function enlazarSubordinadosPrevios(usuarioId) {
    let cambios = 0;
    baseDatosUsuarios.forEach(usuario => {
        if (usuario.id === usuarioId) return;
        if (!usuario.superiorId && usuario.invitadoPor === usuarioId) {
            usuario.superiorId = usuarioId;
            cambios++;
        }
    });
    if (cambios > 0) guardarEnStorage(STORAGE_KEYS.BASE_USUARIOS, baseDatosUsuarios);
    return cambios;
}

// Crecimiento automático (3.4 y 3.6): se llama cuando alguien se inscribe.
//   - reconoce a sus subordinados previos,
//   - si el que entra es No.1 y ya había un No.1, lo deja subordinado,
//   - y en ambos casos rehace y guarda el organigrama general.
function aplicarCrecimientoOrganigramaGeneral(usuarioNuevo) {
    if (!usuarioNuevo || !usuarioNuevo.id) return;
    normalizarUnicoNo1();

    const anteriorNo1 = baseDatosUsuarios.find(u => u.esNo1 && u.id !== usuarioNuevo.id);
    let huboCambioDeNo1 = false;
    if (usuarioNuevo.esNo1 && anteriorNo1) {
        // 3.6: el nuevo No.1 desplaza al anterior, que pasa a subordinado suyo.
        anteriorNo1.esNo1 = false;
        if (!anteriorNo1.superiorId || anteriorNo1.superiorId === usuarioNuevo.id) {
            anteriorNo1.superiorId = usuarioNuevo.id;
        }
        usuarioNuevo.esPrimeraLinea = true;
        huboCambioDeNo1 = true;
        guardarEnStorage(STORAGE_KEYS.BASE_USUARIOS, baseDatosUsuarios);
    }

    enlazarSubordinadosPrevios(usuarioNuevo.id);
    guardarOrganigramaGeneral();

    if (huboCambioDeNo1) {
        mostrarAvisoInmediato(
            `👑 ${usuarioNuevo.nombre} es ahora el No.1. ${anteriorNo1.nombre || anteriorNo1.nombreCompleto} queda como su subordinado.`,
            "exito"
        );
    }
}

// Dibuja el organigrama general con TODOS los niveles (3.1).
function renderizarOrganigramaGeneral() {
    const contenedor = document.getElementById('lienzo-organigrama-general');
    if (!contenedor) return;
    contenedor.innerHTML = '';

    const vacio = `<p style="color: rgba(255,255,255,0.7); text-align: center; padding: 40px;">${_tr('org_vacio', 'No hay información de usuarios disponible para mostrar.')}</p>`;
    if (!Array.isArray(baseDatosUsuarios) || baseDatosUsuarios.length === 0) {
        contenedor.innerHTML = vacio;
        return;
    }

    // Un solo No.1 y organigrama guardado (o recién construido si cambió algo).
    normalizarUnicoNo1();
    const arbol = cargarOrganigramaGeneral();
    if (!arbol || !arbol.nodos || Object.keys(arbol.nodos).length === 0) {
        contenedor.innerHTML = vacio;
        return;
    }

    const porId = {};
    baseDatosUsuarios.forEach(usuario => { if (usuario && usuario.id) porId[usuario.id] = usuario; });

    const crearNodo = (usuario) => {
        const nodo = document.createElement('div');
        nodo.className = 'nodo nodo-general';
        nodo.style.cursor = 'pointer';
        nodo.onclick = () => verDetalleContactoGeneral(usuario.id);
        const bandera = usuario.tipoActual === 'Observador' ? '👁️ '
            : usuario.tipoActual === 'Indirecto' ? '🔗 '
            : (usuario.esNo1 ? '👑 ' : '');
        nodo.innerHTML = `
            <div class="nodo-general-contenido">
                <div class="titulo-nodo-general">${bandera}${usuario.nombreCompleto || usuario.nombre}</div>
                <div class="subtitulo-nodo-general">${usuario.posicion || usuario.rol || 'Colaborador'}</div>
                <div class="acronimo-nodo-general">${usuario.acronimo || '---'}</div>
            </div>
        `;
        return nodo;
    };

    // Hijos de cada nodo (para no repetir usuarios en el dibujo).
    const hijosDe = {};
    Object.keys(arbol.nodos).forEach(id => { hijosDe[id] = []; });
    Object.keys(arbol.nodos).forEach(id => {
        const jefe = arbol.nodos[id].superiorId;
        if (jefe && hijosDe[jefe] && jefe !== id) hijosDe[jefe].push(id);
    });

    // Cada rama: un nodo y, debajo, TODOS sus descendientes con un conector.
    const dibujarRama = (id, nivel) => {
        const usuario = porId[id];
        if (!usuario) return null; // el nodo existe pero el usuario ya no
        const fila = document.createElement('div');
        fila.className = 'org-general-rama';
        fila.style.marginLeft = (nivel * 24) + 'px';
        fila.appendChild(crearNodo(usuario));
        (hijosDe[id] || []).forEach(idHijo => {
            const conector = document.createElement('div');
            conector.className = 'org-general-conector';
            fila.appendChild(conector);
            const hijo = dibujarRama(idHijo, nivel + 1);
            if (hijo) fila.appendChild(hijo);
        });
        return fila;
    };

    const arbolHtml = document.createElement('div');
    arbolHtml.className = 'organigrama-general-arbol';
    (arbol.raices || []).forEach(idRaiz => {
        const rama = dibujarRama(idRaiz, 0);
        if (rama) arbolHtml.appendChild(rama);
    });
    contenedor.appendChild(arbolHtml);
}

// ==========================================
// 30. TEMPORIZADOR DE INACTIVIDAD (cierra la sesión automáticamente tras 30 minutos sin actividad)
// ==========================================
function reiniciarTemporizador() { if (temporizadorInactividad) clearTimeout(temporizadorInactividad); temporizadorInactividad = setTimeout(() => cerrarSesionPorInactividad(), TIEMPO_INACTIVIDAD); }
function cerrarSesionPorInactividad() { if (sesionActiva && usuarioActivo && usuarioActivo.id) { mostrarAvisoInmediato("⏰ Sesión cerrada por inactividad de 30 minutos", "advertencia"); cerrarSesion(); } }
function iniciarTemporizadorInactividad() { if (temporizadorInactividad) clearTimeout(temporizadorInactividad); const eventos = ['click', 'mousemove', 'keypress', 'scroll', 'touchstart']; eventos.forEach(evento => document.removeEventListener(evento, reiniciarTemporizador)); eventos.forEach(evento => document.addEventListener(evento, reiniciarTemporizador)); reiniciarTemporizador(); }
function detenerTemporizadorInactividad() { if (temporizadorInactividad) clearTimeout(temporizadorInactividad); const eventos = ['click', 'mousemove', 'keypress', 'scroll', 'touchstart']; eventos.forEach(evento => document.removeEventListener(evento, reiniciarTemporizador)); }

// ==========================================
// 31. FUNCIÓN PARA ABRIR EL FORMULARIO DE NUEVO CONTACTO (limpia y muestra el modal según el tipo)
// ==========================================
function mostrarFormularioContacto(tipo) {
    const modal = document.getElementById('modal-contacto');
    if (!modal) {
        mostrarAvisoInmediato("Error: Modal de contacto no encontrado", "error");
        return;
    }

    // Limpiar el formulario
    document.getElementById('modal-nombre').value = '';
    document.getElementById('modal-puesto').value = '';
    document.getElementById('modal-pais').value = '+502';
    document.getElementById('modal-tel').value = '';
    document.getElementById('modal-email').value = '';
    document.getElementById('modal-acronimo-preview').textContent = '---';
    // Sin campo oculto (PUNTO 33, 2.5): el tipo elegido y el contacto en edición
    // viven en `tipoContactoActual` y `contactoEnEdicion` (datos.js 3.7).
    contactoEnEdicion = null;
    tipoContactoActual = tipo;

    // Cambiar el título según el tipo
    const titulo = document.getElementById('modal-titulo');
    if (titulo) {
        if (tipo === 'directo') titulo.innerText = traducirTexto('mod_nuevo_col') || 'Nuevo Colaborador';
        else if (tipo === 'indirecto') titulo.innerText = traducirTexto('mod_nuevo_ind') || 'Nuevo Indirecto';
        else if (tipo === 'observador') titulo.innerText = traducirTexto('mod_nuevo_obs') || 'Nuevo Observador';
    }

    // Mostrar el modal
    modal.style.display = 'flex';
}

// ==========================================
// 32. GUARDAR CONTACTO (NUEVO O EDITADO) (persiste el contacto en organigrama o listas según su tipo)
// ==========================================
function guardarContacto() {
    const nombre = document.getElementById('modal-nombre').value.trim();
    const puesto = document.getElementById('modal-puesto').value.trim();
    const pais = document.getElementById('modal-pais').value;
    const telefono = document.getElementById('modal-tel').value.trim();
    const email = document.getElementById('modal-email').value.trim();
    const acronimo = document.getElementById('modal-acronimo-preview').textContent;

    // El tipo y el contacto en edición ya NO viajan en un campo oculto (PUNTO 33, 2.5):
    // se leen de `tipoContactoActual` y `contactoEnEdicion` (datos.js 3.7).
    const tipo = tipoContactoActual || 'directo';
    const enEdicion = contactoEnEdicion;

    if (!nombre || !puesto) {
        mostrarAvisoInmediato("✖ Complete el nombre y el puesto", "error");
        return;
    }

    // 2.6 — Teléfono y email son opcionales, pero AL MENOS UNO es obligatorio.
    if (!telefono && !email) {
        mostrarVentanaAviso(
            _tr('aviso_titulo_falta', 'Faltan datos de contacto'),
            _tr('aviso_texto_falta', 'Necesitas un teléfono o un email para enviar la invitación. Por favor, agrega al menos uno.'),
            false
        );
        return;
    }

    // ---------- MODO EDICIÓN: actualiza el contacto tal cual ----------
    if (enEdicion) {
        const datosActualizados = {
            nombre: nombre, nombreCompleto: nombre, puesto: puesto,
            acronimo: (acronimo && acronimo !== '---') ? acronimo : generarAcronimo(puesto, true),
            telefono: telefono, email: email, paisPrefijo: pais
        };
        let lista = null;
        if (tipo === 'directo') lista = (datosOrganigrama && datosOrganigrama.hijos) || [];
        else if (tipo === 'indirecto') lista = contactosIndirectos;
        else if (tipo === 'observador') lista = observadores;

        const indice = (lista || []).findIndex(c => c.id === enEdicion.id);
        if (indice !== -1) {
            lista[indice] = Object.assign({}, lista[indice], datosActualizados);
            if (tipo === 'directo') guardarEnStorage(STORAGE_KEYS.ORGANIGRAMA, datosOrganigrama);
            else if (tipo === 'indirecto') guardarEnStorage(STORAGE_KEYS.INDIRECTOS, contactosIndirectos);
            else if (tipo === 'observador') guardarEnStorage(STORAGE_KEYS.OBSERVADORES, observadores);
            cerrarModalContacto();
            renderizarOrganigrama();
            mostrarAvisoInmediato("✓ Contacto actualizado correctamente", "exito");
            return;
        }
    }

    // ---------- MODO NUEVO: cruce de datos antes de crear (PUNTO 33, 2.1) ----------
    const duplicado = buscarContactoDuplicado({ nombre: nombre, puesto: puesto, telefono: telefono, email: email });
    if (duplicado) {
        // 3.5 del PUNTO 31: si ya está en OTRA rama, no puede registrarse en dos posiciones.
        if (duplicado.otraRama && duplicado.nombreSuperior) {
            mostrarVentanaAviso(
                _tr('aviso_titulo_registrado', 'Ya está registrado'),
                _tr('aviso_texto_registrado', 'Este usuario ya está registrado en otra rama, debajo de')
                    + ' ' + duplicado.nombreSuperior + '. '
                    + _tr('aviso_texto_registrado_2', 'No se puede registrar en dos posiciones ni ser contacto directo de dos superiores.'),
                false
            );
            return;
        }
        // 2.3 del PUNTO 33: si solo hay datos iguales, se pregunta si se continúa.
        mostrarVentanaAviso(
            _tr('aviso_titulo_duplicado', 'Contacto repetido'),
            _tr('aviso_texto_duplicado', 'Ese contacto ya existe. El banco de datos ya tiene registrado datos iguales a los que acabas de teclear. ¿Continuar con la invitación?'),
            true,
            function () { continuarCreacionContacto(nombre, puesto, pais, telefono, email, acronimo, tipo); },
            function () { /* No: se queda en el modal de contacto para editar los datos */ }
        );
        return;
    }

    continuarCreacionContacto(nombre, puesto, pais, telefono, email, acronimo, tipo);
}

// Crea el contacto, lo guarda y lanza la invitación (final de `guardarContacto`).
function continuarCreacionContacto(nombre, puesto, pais, telefono, email, acronimo, tipo) {
    const acronimoContacto = (acronimo && acronimo !== '---') ? acronimo : generarAcronimo(puesto, true);
    const nuevoContacto = {
        id: generarIdUnico(),
        nombre: nombre, nombreCompleto: nombre, puesto: puesto,
        paisPrefijo: pais, telefono: telefono, email: email,
        acronimo: acronimoContacto,
        invitacionEnviada: false, invitacionAceptada: false,
        esObservador: tipo === 'observador', esIndirecto: tipo === 'indirecto',
        activo: true, hijos: tipo === 'directo' ? [] : undefined
    };

    if (tipo === 'directo') {
        if (!datosOrganigrama) {
            datosOrganigrama = {
                id: usuarioActivo.id, nombre: usuarioActivo.nombre, apellidos: usuarioActivo.apellidos,
                nombreCompleto: usuarioActivo.nombreCompleto, puesto: usuarioActivo.posicion, acronimo: usuarioActivo.acronimo,
                telefono: usuarioActivo.telefono, email: usuarioActivo.email, idEmpleado: usuarioActivo.idEmpleado,
                paisPrefijo: usuarioActivo.paisPrefijo, invitacionEnviada: true, invitacionAceptada: true,
                esObservador: false, esIndirecto: false, activo: true, hijos: []
            };
        }
        if (!datosOrganigrama.hijos) datosOrganigrama.hijos = [];
        datosOrganigrama.hijos.push(nuevoContacto);
        guardarEnStorage(STORAGE_KEYS.ORGANIGRAMA, datosOrganigrama);
    } else if (tipo === 'indirecto') {
        contactosIndirectos.push(nuevoContacto);
        guardarEnStorage(STORAGE_KEYS.INDIRECTOS, contactosIndirectos);
    } else if (tipo === 'observador') {
        observadores.push(nuevoContacto);
        guardarEnStorage(STORAGE_KEYS.OBSERVADORES, observadores);
    }

    // Invitación del contacto recién creado
    const codigoInv = generarCodigoInvitacion();
    const invitacion = {
        id: generarIdUnico(), destinoUsuarioId: nuevoContacto.id, nombreContacto: nombre, puestoContacto: puesto,
        telefonoContacto: telefono, emailContacto: email, paisPrefijo: pais, tipoContacto: tipo,
        invitadoPor: (usuarioActivo && usuarioActivo.id) || null, nombreInvitador: (usuarioActivo && usuarioActivo.nombreCompleto) || '',
        codigoInvitacion: codigoInv, linkInvitacion: `${window.location.origin}?inv=${codigoInv}`,
        fechaInvitacion: new Date(), fechaRespuesta: null, tiempoRespuestaMs: null,
        estado: 'pendiente', metodoEnvio: telefono ? 'whatsapp' : 'email'
    };
    invitacionesPendientes.push(invitacion);
    guardarEnStorage(STORAGE_KEYS.INVITACIONES, invitacionesPendientes);
    enviarInvitacion(invitacion);
    // PUNTO 34: banco de datos — invitación enviada y actividad
    if (usuarioActivo && usuarioActivo.id) {
        registrarInvitacionBancoDatos(usuarioActivo.id, nombre);
        registrarActividadBancoDatos(usuarioActivo.id, 'invitacion', `Invitó a ${nombre} (${tipo})`);
    }

    cerrarModalContacto();
    renderizarOrganigrama();
    mostrarAvisoInmediato(`✓ Contacto ${nombre} guardado`, "exito");
}

// ==========================================
// 32.1 CRUCE DE DATOS Y VENTANA DE AVISO (PUNTO 33)
// Al guardar un contacto se cruzan nombre + puesto + teléfono + email contra
// TODAS las listas (usuarios registrados, organigrama, indirectos y observadores).
// La IA habla el mismo texto que aparece en la ventana.
// ==========================================

// Texto traducido con valor por defecto en español.
function _tr(clave, porDefecto) {
    const t = typeof traducirTexto === 'function' ? traducirTexto(clave) : '';
    return t || porDefecto;
}

// Para comparar nombres: SOLO se ignoran mayúsculas y espacios de sobra.
// Las tildes y los apostrofos se respetan (decisión del Arquitecto 04/10/2026): no se
// quitan al comparar, porque "O'Brien" y "Obrien" son personas distintas.
function normalizarParaComparar(texto) {
    return String(texto == null ? '' : texto)
        .toLowerCase()
        .replace(/\s+/g, ' ')
        .trim();
}

// Recorre TODOS los niveles del organigrama personal (directos, nietos, etc.).
function recorrerContactos(nodo, lista) {
    if (!nodo) return [];
    const salida = Array.isArray(lista) ? lista : [];
    salida.push(nodo);
    (nodo.hijos || []).forEach(hijo => recorrerContactos(hijo, salida));
    return salida;
}

// Devuelve el registro que coincide con los datos tecleados, o null.
// "Coincide" = mismo teléfono, o mismo email, o mismo nombre Y mismo puesto.
function buscarContactoDuplicado(datos) {
    const nombre = normalizarParaComparar(datos.nombre);
    const puesto = normalizarParaComparar(datos.puesto);
    const telefono = normalizarParaComparar(datos.telefono);
    const email = normalizarParaComparar(datos.email);
    const enEdicion = (contactoEnEdicion && contactoEnEdicion.id) ? contactoEnEdicion.id : null;

    const coincide = (registro) => {
        if (!registro) return false;
        if (registro.id && registro.id === enEdicion) return false; // no se compara consigo mismo
        const rNombre = normalizarParaComparar(registro.nombreCompleto || registro.nombre);
        const rPuesto = normalizarParaComparar(registro.puesto || registro.posicion);
        const rTel = normalizarParaComparar(registro.telefono);
        const rMail = normalizarParaComparar(registro.email);
        if (telefono && rTel && telefono === rTel) return true;
        if (email && rMail && email === rMail) return true;
        if (nombre && rNombre && nombre === rNombre && puesto && rPuesto && puesto === rPuesto) return true;
        return false;
    };

    // 1) Usuarios ya registrados en la app.
    for (let i = 0; i < baseDatosUsuarios.length; i++) {
        const usuario = baseDatosUsuarios[i];
        if (!coincide(usuario)) continue;
        const superior = usuario.superiorId
            ? baseDatosUsuarios.find(u => u.id === usuario.superiorId)
            : null;
        // Si su jefe NO es quien está invitando, está en otra rama (PUNTO 31, 3.5).
        const otraRama = !!(usuario.superiorId && usuario.superiorId !== (usuarioActivo && usuarioActivo.id));
        return {
            registro: usuario,
            otraRama: otraRama,
            nombreSuperior: (otraRama && superior) ? (superior.nombreCompleto || superior.nombre) : null
        };
    }

    // 2) Contactos del propio organigrama (TODOS los niveles).
    const delOrganigrama = recorrerContactos(datosOrganigrama, []);
    for (let i = 0; i < delOrganigrama.length; i++) {
        if (coincide(delOrganigrama[i])) {
            return { registro: delOrganigrama[i], otraRama: false, nombreSuperior: null };
        }
    }

    // 3) Contactos indirectos y observadores.
    const otrasListas = (typeof contactosIndirectos !== 'undefined' ? contactosIndirectos : [])
        .concat(typeof observadores !== 'undefined' ? observadores : []);
    for (let i = 0; i < otrasListas.length; i++) {
        if (coincide(otrasListas[i])) {
            return { registro: otrasListas[i], otraRama: false, nombreSuperior: null };
        }
    }

    return null;
}

let ventanaAvisoConfirmar = null;
let ventanaAvisoCancelar = null;
let ventanaAvisoEsSiNo = false;

// Muestra la ventana de aviso con los MISMOS colores y diseño del modal de
// contacto. Si `pideSiNo` es false, es informativa: el botón verde dice "Entendido".
function mostrarVentanaAviso(titulo, texto, pideSiNo, alConfirmar, alCancelar) {
    const ventana = document.getElementById('ventana-aviso-contacto');
    if (!ventana) return;
    const campoTitulo = document.getElementById('ventana-aviso-titulo');
    const campoTexto = document.getElementById('ventana-aviso-texto');
    const botonSi = document.getElementById('ventana-aviso-si');
    const botonNo = document.getElementById('ventana-aviso-no');
    if (campoTitulo) campoTitulo.innerText = titulo;
    if (campoTexto) campoTexto.innerText = texto;
    if (botonSi) botonSi.innerText = pideSiNo ? _tr('aviso_si', 'SÍ') : _tr('aviso_entendido', 'ENTENDIDO');
    if (botonNo) botonNo.innerText = pideSiNo ? _tr('aviso_no', 'NO') : _tr('aviso_cancelar', 'CERRAR');
    ventanaAvisoConfirmar = alConfirmar || null;
    ventanaAvisoCancelar = alCancelar || null;
    ventanaAvisoEsSiNo = !!pideSiNo;
    ventana.style.display = 'flex';
    hablarTextoIA(texto); // la IA habla lo mismo que se muestra
}

function cerrarVentanaAviso() {
    const ventana = document.getElementById('ventana-aviso-contacto');
    if (ventana) ventana.style.display = 'none';
    ventanaAvisoConfirmar = null;
    ventanaAvisoCancelar = null;
}

// Botones verde (Sí) y rojo (No) de la ventana de aviso.
function responderVentanaAviso(afirmativo) {
    const eraSiNo = ventanaAvisoEsSiNo;
    const alConfirmar = ventanaAvisoConfirmar;
    const alCancelar = ventanaAvisoCancelar;
    cerrarVentanaAviso();
    if (afirmativo) {
        if (alConfirmar) alConfirmar();
    } else if (alCancelar) {
        alCancelar();
    } else if (!eraSiNo) {
        // Aviso informativo: el botón rojo (CERRAR) cierra también el modal de contacto.
        cerrarModalContacto();
    }
}

// La IA habla un texto suelto (sin abrir su ventana ni cerrar sola).
function hablarTextoIA(texto) {
    if (!texto || !iaSintesis) return;
    try {
        iaSintesis.cancel();
        const voz = new SpeechSynthesisUtterance(texto);
        voz.lang = (configuracionPersonal && configuracionPersonal.idioma === 'en') ? 'en-US' : 'es-ES';
        voz.rate = 1.05;
        iaSintesis.speak(voz);
    } catch (e) {}
}

// Nota: las funciones restantes (renderizarOrganigramaGeneral, construirOrganigramaGeneral, etc.) no se modifican y siguen funcionando igual.

// ==========================================
// 33. ASISTENTE DE IA (BOTÓN FLOTANTE, VOZ Y VENTANA EMERGENTE — PUNTO 7)
// ==========================================

// Estado interno del asistente
let iaActiva = false;            // hay sesión de asistente abierta
let iaEnPausa = false;           // el usuario puso PAUSA para corregir
let iaReconocimiento = null;     // instancia de SpeechRecognition
let iaPasoConfirmacion = false;  // ya se confirmó con "Hola [nombre]"
let iaTemporizadorCierre = null; // cierre automático de la ventana
let iaSintesis = window.speechSynthesis || null;

function nombreAsistenteIA() {
    return (configuracionPersonal && configuracionPersonal.nombreAsistente) ? configuracionPersonal.nombreAsistente : "Vero";
}

// Muestra u oculta el botón flotante (no existe en Login)
function mostrarBotonIA(visible) {
    const btn = document.getElementById('boton-ia-flotante');
    if (btn) btn.style.display = visible ? 'flex' : 'none';
    if (!visible) cerrarVentanaIA();
}

// Se activa al presionar la esfera: sonido + micrófono + ventana
function activarBotonIA() {
    if (iaActiva) { cerrarVentanaIA(); return; }
    iaActiva = true;
    iaEnPausa = false;
    iaPasoConfirmacion = false;
    const ventana = document.getElementById('ventana-ia');
    const textoUsuario = document.getElementById('ventana-ia-texto-usuario');
    const textoRespuesta = document.getElementById('ventana-ia-texto-respuesta');
    if (textoUsuario) textoUsuario.innerText = '';
    if (textoRespuesta) textoRespuesta.innerText = '';
    if (ventana) ventana.style.display = 'flex';
    const btn = document.getElementById('boton-ia-flotante');
    if (btn) btn.classList.add('ia-presionado');
    // Sonido de activación (pitido local, sin archivos de audio)
    reproducirPitidoIA();
    // La ventana se auto-cierra sola tras el tiempo calculado
    programarCierreAutomaticoIA();
    // Escuchar
    iniciarEscuchaIA();
}

// Pitido con WebAudio (sin archivos de audio)
function reproducirPitidoIA() {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const vol = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = 880;
        vol.gain.setValueAtTime(0.08, ctx.currentTime);
        vol.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);
        osc.connect(vol); vol.connect(ctx.destination);
        osc.start(); osc.stop(ctx.currentTime + 0.35);
    } catch (e) { /* sin audio disponible: continuar en silencio */ }
}

// Micrófono (Web Speech API); si no existe, ofrece escritura
function iniciarEscuchaIA() {
    const estado = document.getElementById('ventana-ia-estado');
    const hayMicro = Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);
    if (estado) estado.innerText = hayMicro ? traducirTexto('ia_escuchando') : traducirTexto('ia_sin_micro');
    if (!hayMicro) { mostrarEntradaTextoIA(); return; }
    try {
        const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
        iaReconocimiento = new SR();
        iaReconocimiento.lang = (configuracionPersonal && configuracionPersonal.idioma === 'en') ? 'en-US' : 'es-ES';
        iaReconocimiento.interimResults = true;
        iaReconocimiento.continuous = false;
        const textoUsuario = document.getElementById('ventana-ia-texto-usuario');
        iaReconocimiento.onresult = (evento) => {
            let parcial = '';
            for (const res of evento.results) parcial += res[0].transcript;
            if (textoUsuario) textoUsuario.innerText = parcial;
            if (evento.results[evento.results.length - 1].isFinal) procesarComandoIA(parcial.trim());
        };
        iaReconocimiento.onerror = () => { mostrarEntradaTextoIA(); };
        iaReconocimiento.start();
    } catch (e) { mostrarEntradaTextoIA(); }
}

// PAUSA: el usuario corrige manualmente lo que dijo
function alternarPausaIA() {
    iaEnPausa = !iaEnPausa;
    const estado = document.getElementById('ventana-ia-estado');
    const btnPausa = document.getElementById('btn-ia-pausa');
    if (iaEnPausa) {
        if (iaReconocimiento) { try { iaReconocimiento.stop(); } catch (e) {} }
        if (estado) estado.innerText = traducirTexto('ia_pausa');
        if (btnPausa) btnPausa.innerText = '▶';
        mostrarEntradaTextoIA();
    } else {
        if (btnPausa) btnPausa.innerText = '⏸';
        iniciarEscuchaIA();
    }
}

function mostrarEntradaTextoIA() {
    const input = document.getElementById('ventana-ia-input');
    if (input) { input.style.display = 'block'; input.focus(); }
}

// Editar (✏️): corrige el texto enviado manualmente
function editarTextoIA() {
    mostrarEntradaTextoIA();
    const input = document.getElementById('ventana-ia-input');
    const textoUsuario = document.getElementById('ventana-ia-texto-usuario');
    if (input && textoUsuario) input.value = textoUsuario.innerText;
}

function enviarTextoIA() {
    const input = document.getElementById('ventana-ia-input');
    if (!input || !input.value.trim()) return;
    const texto = input.value.trim();
    input.value = '';
    procesarComandoIA(texto);
}

// Cerrar (✕) o auto-cierre
function cerrarVentanaIA() {
    iaActiva = false;
    iaEnPausa = false;
    iaPasoConfirmacion = false;
    if (iaTemporizadorCierre) { clearTimeout(iaTemporizadorCierre); iaTemporizadorCierre = null; }
    if (iaReconocimiento) { try { iaReconocimiento.stop(); } catch (e) {} iaReconocimiento = null; }
    if (iaSintesis) iaSintesis.cancel();
    const ventana = document.getElementById('ventana-ia');
    if (ventana) ventana.style.display = 'none';
    const btn = document.getElementById('boton-ia-flotante');
    if (btn) btn.classList.remove('ia-presionado');
}

// La ventana se cierra sola: (número de palabras / 3.5) + 0.75 segundos
function programarCierreAutomaticoIA() {
    if (iaTemporizadorCierre) clearTimeout(iaTemporizadorCierre);
    const textoRespuesta = document.getElementById('ventana-ia-texto-respuesta');
    const palabras = textoRespuesta ? (textoRespuesta.innerText.trim().split(/\s+/).filter(Boolean).length) : 0;
    const segundos = (palabras / 3.5) + 0.75;
    iaTemporizadorCierre = setTimeout(() => {
        if (iaActiva && !iaEnPausa && textoRespuesta && textoRespuesta.innerText.trim()) cerrarVentanaIA();
        else if (iaActiva) programarCierreAutomaticoIA();
    }, Math.max(segundos * 1000, 1500));
}

// Procesa lo dicho por el usuario (voz o teclado)
function procesarComandoIA(texto) {
    const textoUsuario = document.getElementById('ventana-ia-texto-usuario');
    if (textoUsuario) textoUsuario.innerText = texto;
    if (!iaPasoConfirmacion) {
        // Confirmación obligatoria: "Hola [nombre del asistente]"
        const nombre = nombreAsistenteIA().toLowerCase();
        if (texto.toLowerCase().includes('hola') && texto.toLowerCase().includes(nombre)) {
            iaPasoConfirmacion = true;
            responderIA(`¡Hola! Soy ${nombreAsistenteIA()}, tu asistente. ¿En qué te ayudo?`);
        } else {
            responderIA(`Di "Hola ${nombreAsistenteIA()}" para confirmar.`);
        }
        return;
    }
    // Comandos locales (sin servidor): navegación, hora y frase
    const t = texto.toLowerCase();
    if (t.includes('abrir') || t.includes('ir a') || t.includes('muestra')) {
        const mapa = [
            ['comunicacion', 'pantalla-comunicacion'], ['organigrama general', 'pantalla-organigrama-general'],
            ['organigrama', 'pantalla-organigrama'], ['configuracion', 'pantalla-configuracion'],
            ['identidad', 'pantalla-identidad'], ['perfil', 'registro-invitacion']
        ];
        for (const [clave, pantalla] of mapa) {
            if (t.includes(clave)) { irAPantalla(pantalla); responderIA(`Abriendo ${clave}.`); return; }
        }
    }
    if (t.includes('hora')) {
        responderIA(`Son las ${new Date().toLocaleTimeString('es', { hour: 'numeric', minute: '2-digit' })}.`);
        return;
    }
    if (t.includes('frase') || t.includes('motiva')) {
        responderIA(obtenerFraseMotivacional());
        return;
    }
    responderIA("Aún estoy aprendiendo ese comando. Prueba: abrir Configuración, abrir Organigrama, ¿qué hora es?, dame una frase.");
}

// Responde: texto en la ventana, voz del asistente y auto-cierre
function responderIA(texto) {
    const estado = document.getElementById('ventana-ia-estado');
    const textoRespuesta = document.getElementById('ventana-ia-texto-respuesta');
    if (textoRespuesta) textoRespuesta.innerText = texto;
    if (estado) estado.innerText = traducirTexto('ia_respondiendo');
    if (iaSintesis) {
        try {
            iaSintesis.cancel();
            const voz = new SpeechSynthesisUtterance(texto);
            voz.lang = (configuracionPersonal && configuracionPersonal.idioma === 'en') ? 'en-US' : 'es-ES';
            voz.rate = 1.05;
            voz.onend = () => { if (estado) estado.innerText = traducirTexto('ia_escuchando'); };
            iaSintesis.speak(voz);
        } catch (e) {}
    }
    programarCierreAutomaticoIA();
}