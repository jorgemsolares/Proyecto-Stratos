// ==========================================
// ADN VISUAL STRATOS - ARCHIVO: datos.js
// Solo Memoria, Variables y Estructuras
// ==========================================

/* ==========================================
   ÍNDICE DE GRUPOS (SOLO NAVEGACIÓN; mantiene el orden físico)
   GRUPO 1 - USUARIO, SEGURIDAD Y SESIÓN: 1.1 a 1.5
   GRUPO 2 - IDENTIDAD, ESTÉTICA Y PALETA: 2.1 a 2.3 (+ DATOS DE CONFIGURACIÓN)
   GRUPO 3 - ORGANIGRAMA Y CONTACTOS: 3.1 a 3.7
   GRUPO 4 - INVITACIONES: 4.1, 4.2
   GRUPO 5 - CONFIGURACIÓN Y ESTADO INTERNO: 5.1 a 5.7
   ========================================== */
// ==========================================
// DATOS DE CONFIGURACIÓN (trasladados de logica.js)
// ==========================================
// Colores de seguridad usados al analizar el logo (orden y contenido originales, sin modificar)
const COLORES_SEGURIDAD_ANALISIS = ["#0f3460", "#16213e", "#00ff88", "#e94560", "#533483", "#ff6b6b", "#4ecdc4", "#ffd166", "#ffa500", "#800080", "#1a1a2e"];
// Colores de seguridad usados al generar la paleta visible (orden y contenido originales, sin modificar)
const COLORES_SEGURIDAD_PALETA = ["#1a1a2e", "#16213e", "#0f3460", "#e94560", "#533483", "#00ff88", "#ff6b6b", "#4ecdc4", "#ffd166", "#ffa500", "#800080"];
// Formatos de imagen permitidos para el logo
const TIPOS_IMAGEN_VALIDOS = ['image/jpeg', 'image/jpg', 'image/png'];

// ==========================================
// 1.1 USUARIO ACTIVO (Sesión actual)
// ==========================================
let usuarioActivo = {
    nombre: "",
    apellidos: "",
    nombreCompleto: "",
    rol: "", // "No.1", "Colaborador", "Observador", "Indirecto"
    idEmpleado: "",
    paisPrefijo: "+502", // Predeterminado Guatemala
    telefono: "",
    email: "",
    posicion: "",
    acronimo: "",
    contrasena: "", // Encriptada en producciÃ³n
    esNo1: false,
    esPrimeraLinea: false,
    superiorId: null, // ID del jefe directo
    invitadoPor: null, // ID de quien lo invitÃ³
    tipoInvitacion: "", // "directo", "indirecto", "observador" (INMUTABLE - histÃ³rico)
    tipoActual: "", // Puede cambiar si alguien mÃ¡s lo invita como colaborador
    fechaRegistro: null,
    ultimoAcceso: null,
    requiereCambioContrasena: false // Flag para contraseÃ±a temporal
};

// ==========================================
// 2.1 ESTADO DE IDENTIDAD CORPORATIVA — GRUPO 2
// ==========================================
let identidadCorporativa = {
    completada: false,
    completadaPor: null, // ID del No.1 que completÃ³
    logo: "", // Base64
    slogan: "",
    mision: "",
    vision: "",
    valores: [], // Array de valores
    tipografia: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    estiloSlogan: "normal", // normal, bold, italic, bold italic
    colorFondo: "#0b0f19",
    colorTexto: "#ffffff",
    colorBotones: "#00ff88"
};

// ==========================================
// 2.2 PALETA DE COLORES (Siempre 8) — GRUPO 2
// ==========================================
let coloresExtraidos = [
    '#000000', // Negro
    '#FFFFFF', // Blanco
    '#1a1a2e', 
    '#16213e', 
    '#0f3460', 
    '#e94560', 
    '#533483', 
    '#00ff88' // Color primario STRATOS
];
let colorSeleccionado = ""; // Color actualmente seleccionado

// ==========================================
// 2.3 CONFIGURACIÓN ESTÉTICA APLICADA
// ==========================================
let configuracionEstetica = {
    familiaTipografica: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    variacionGlobal: "normal", // Afecta slogan y nodos
    colorFondo: "#0b0f19",
    colorTexto: "#ffffff",
    colorBotones: "#00ff88",
    logoBase64: "" // Para persistencia al navegar
};

// ==========================================
// 3.1 ESTRUCTURA DEL ORGANIGRAMA — GRUPO 3
// ==========================================
let datosOrganigrama = {
    id: "1",
    nombre: "", // Se llena con el No.1
    apellidos: "",
    nombreCompleto: "",
    puesto: "No. 1",
    acronimo: "N1",
    telefono: "",
    email: "",
    idEmpleado: "",
    paisPrefijo: "+502",
    invitacionEnviada: true, // El No.1 siempre es true
    invitacionAceptada: true,
    esObservador: false,
    esIndirecto: false,
    activo: true,
    hijos: []
    /*  
    Estructura recursiva de hijos:
    {
        id: "generado_unico",
        nombre: "",
        apellidos: "",
        nombreCompleto: "",
        puesto: "",
        acronimo: "",
        telefono: "",
        email: "",
        idEmpleado: "",
        paisPrefijo: "+502",
        invitacionEnviada: false,
        invitacionAceptada: false,
        esObservador: false,
        esIndirecto: false,
        activo: true,
        hijos: []
    }
    */
};

// ==========================================
// 3.2 LISTA DE CONTACTOS INDIRECTOS — GRUPO 3
// ==========================================
// Contactos que no están en la jerarquía directa
let contactosIndirectos = [];
/*
Estructura:
{
    id: "generado_unico",
    nombre: "",
    apellidos: "",
    nombreCompleto: "",
    puesto: "",
    acronimo: "",
    telefono: "",
    email: "",
    idEmpleado: "",
    paisPrefijo: "+502",
    invitadoPor: "id_usuario", // Quién lo invitó
    invitacionEnviada: false,
    invitacionAceptada: false,
    activo: true
}
*/

// ==========================================
// 3.3 LISTA DE OBSERVADORES — GRUPO 3
// ==========================================
// Usuarios que solo pueden ver estadísticas sin editar
let observadores = [];
/*
Estructura similar a contactosIndirectos:
{
    id: "generado_unico",
    nombre: "",
    nombreCompleto: "",
    puesto: "",
    telefono: "",
    email: "",
    invitadoPor: "id_usuario",
    puedeVer: ["estadisticas", "organigrama", "comunicacion"],
    activo: true
}
*/

// ==========================================
// 3.4 BASE DE DATOS DE USUARIOS (Simulada) — GRUPO 3
// ==========================================
// En producción esto estaría en una base de datos real
let baseDatosUsuarios = [];
/*
Estructura:
{
    id: "unico",
    nombre: "",
    apellidos: "",
    nombreCompleto: "",
    idEmpleado: "",
    telefono: "",
    email: "",
    posicion: "",
    acronimo: "",
    contrasena: "", // Hash en producción
    rol: "No.1" | "Colaborador" | "Observador" | "Indirecto",
    superiorId: null,
    invitadoPor: null, // INMUTABLE - quién lo invitó originalmente
    tipoInvitacion: "", // INMUTABLE - tipo original de invitación
    tipoActual: "", // MUTABLE - puede cambiar
    esNo1: false,
    esPrimeraLinea: false,
    activo: true,
    requiereCambioContrasena: false,
    fechaRegistro: Date,
    ultimoAcceso: Date
}
*/

// ==========================================
// 5.1 ESTADO DE NAVEGACIÓN (Para la Tuerca)
// ==========================================
estadoPantallas = {
    "registro-invitacion": { 
        visitada: false, 
        nombre: "Mi Perfil",
        icono: "👤",
        visiblePara: ["todos"]
    },
    "pantalla-acceso": { 
        visitada: false, 
        nombre: "Acceso",
        icono: "🔐",
        visiblePara: ["ninguno"] // No se muestra en menú
    },
    "pantalla-identidad": { 
        visitada: false, 
        nombre: "Identidad Corporativa",
        icono: "🏢",
        visiblePara: ["No.1", "PrimeraLinea"]
    },
    "pantalla-organigrama": { 
        visitada: false, 
        nombre: "Mi Organigrama",
        icono: "📊",
        visiblePara: ["No.1", "Colaborador"]
    },
    "pantalla-organigrama-general": { 
        visitada: false, 
        nombre: "Organigrama General",
        icono: "🌐",
        visiblePara: ["todos"]
    },
    "pantalla-comunicacion": { 
        visitada: false, 
        nombre: "Comunicación",
        icono: "💬",
        visiblePara: ["todos"]
    },
    "pantalla-configuracion": { 
        visitada: false, 
        nombre: "Configuración",
        icono: "⚙️",
        visiblePara: ["todos"]
    }
};

// ==========================================
// 1.2 SEGURIDAD - CONTRASEÑAS REALES
// ==========================================
// Variables globales para manejar contraseñas sin mostrarlas (cambiadas a var para ser accesibles desde window)
var claveReal = "";
var claveConfReal = "";
var claveAccesoReal = "";

// Variables para cambio de contraseña en Pantalla 1 (edición)
var claveEditActual = "";
var claveEditNueva = "";
var claveEditConf = "";

// Variables para recuperación de contraseñas
var claveRecuperacion = "";
var claveRecuperacionConf = "";

// Variables para cambio obligatorio
var claveObligatoriaNueva = "";
var claveObligatoriaConf = "";

// ==========================================
// 1.3 SISTEMA DE RECUPERACIÓN DE CONTRASEÑAS
// ==========================================
let intentosLogin = 0;
let maxIntentosLogin = 7; // Cambiado de 3 a 7
let bloqueadoHasta = null;
let solicitudesRecuperacion = [];
/*
Estructura:
{
    id: "unico",
    usuarioId: "",
    nombreUsuario: "",
    solicitadoA: "id_superior",
    nombreSuperior: "",
    quienAyudo: "", // ID de quien realmente generó la contraseña (trazabilidad)
    nombreQuienAyudo: "",
    fechaSolicitud: Date,
    fechaResolucion: Date,
    estado: "pendiente" | "completada" | "rechazada",
    contrasenaTemporalGenerada: ""
}
*/

// ==========================================
// 5.2 MENSAJES MOTIVACIONALES — GRUPO 5
// ==========================================
let mensajesMotivacionales = [
    "La comunicaciÃ³n efectiva es la base del Ã©xito.",
    "Cada mensaje cuenta, cada acciÃ³n importa.",
    "Tu equipo confÃ­a en ti.",
    "Medir es el primer paso para mejorar.",
    "La transparencia genera confianza.",
    "El trabajo en equipo hace la diferencia.",
    "Hoy es un buen dÃ­a para innovar.",
    "Tu liderazgo inspira a otros."
];

// ==========================================
// 5.3 CONFIGURACIÓN PERSONAL DEL USUARIO
// ==========================================
let configuracionPersonal = {
    notificaciones: {
        sonido: true,
        vibracion: true,
        push: true
    },
    idioma: "es", // es, en
    biometria: false,
    temaOscuro: true // Siempre true (definido por No.1)
};

// ==========================================
// 5.3.1 DICCIONARIO DE TRADUCCIONES (textos que lee el usuario)
// Los textos fijos de la interfaz se traducen según el idioma de Configuración.
// Cada clave debe coincidir con el atributo data-i18n de un elemento visible.
// ==========================================
const TRADUCCIONES = {
    // CABECERA / BRANDING
    "branding_cabecera": { es: "HERRAMIENTA MULTIFUNCIONAL", en: "MULTIFUNCTIONAL TOOL" },
    // CONFIGURACIÓN
    "cfg_titulo": { es: "Mi Configuración", en: "My Settings" },
    "cfg_desc": { es: "Personaliza tu experiencia", en: "Customize your experience" },
    "cfg_notif": { es: "Notificaciones", en: "Notifications" },
    "cfg_sonido": { es: "Sonido", en: "Sound" },
    "cfg_vibracion": { es: "Vibración", en: "Vibration" },
    "cfg_push": { es: "Notificaciones Push", en: "Push Notifications" },
    "cfg_idioma": { es: "Idioma", en: "Language" },
    "cfg_seguridad": { es: "Seguridad", en: "Security" },
    "cfg_biometria": { es: "Habilitar autenticación biométrica", en: "Enable biometric authentication" },
    "cfg_rec": { es: "Recuperación de Contraseñas", en: "Password Recovery" },
    "cfg_rec_desc": { es: "Ayuda a cualquier usuario a recuperar su contraseña.", en: "Help any user recover their password." },
    "cfg_rec_traz": { es: "La solicitud quedará registrada con fines de trazabilidad.", en: "The request is recorded for traceability purposes." },
    "cfg_rec_dest": { es: "Email o Teléfono del usuario *", en: "User Email or Phone *" },
    "cfg_rec_temp": { es: "Contraseña temporal *", en: "Temporary password *" },
    "cfg_rec_conf": { es: "Confirmar contraseña *", en: "Confirm password *" },
    "cfg_rec_enviar": { es: "ENVIAR CONTRASEÑA", en: "SEND PASSWORD" },
    "cfg_acciones": { es: "Acciones Rápidas", en: "Quick Actions" },
    "cfg_editar": { es: "Editar Mi Perfil", en: "Edit My Profile" },
    "cfg_verorg": { es: "Ver Organigrama General", en: "View General Organization Chart" },
    "cfg_guardar": { es: "GUARDAR CAMBIOS", en: "SAVE CHANGES" },
    // MENÚ DE LA TUERCA (nombres de pantalla)
    "menu_registro-invitacion": { es: "Mi Perfil", en: "My Profile" },
    "menu_pantalla-acceso": { es: "Acceso", en: "Access" },
    "menu_pantalla-identidad": { es: "Identidad Corporativa", en: "Corporate Identity" },
    "menu_pantalla-organigrama": { es: "Mi Organigrama", en: "My Organization Chart" },
    "menu_pantalla-organigrama-general": { es: "Organigrama General", en: "General Organization Chart" },
    "menu_pantalla-comunicacion": { es: "Comunicación", en: "Communication" },
    "menu_pantalla-configuracion": { es: "Configuración", en: "Settings" },
    "menu_cerrar_sesion": { es: "Cerrar Sesión", en: "Log Out" },
    // PANTALLA 1 - REGISTRO / PERFIL
    "reg_titulo": { es: "Bienvenido", en: "Welcome" },
    "reg_desc": { es: "Configura tu perfil de acceso único.", en: "Set up your single access profile." },
    "reg_nombres": { es: "Nombres *", en: "First Name(s) *" },
    "reg_apellidos": { es: "Apellidos", en: "Last Name(s)" },
    "reg_id": { es: "ID Empleado *", en: "Employee ID *" },
    "reg_tel": { es: "Teléfono", en: "Phone" },
    "reg_email": { es: "Email", en: "Email" },
    "reg_posicion": { es: "Posición *", en: "Position *" },
    "reg_leyenda_acronimo": { es: "El acrónimo se forma con las mayúsculas y números de tu posición", en: "The acronym is formed from the capitals and numbers of your position" },
    "reg_pass": { es: "Contraseña *", en: "Password *" },
    "reg_pass_conf": { es: "Confirmar Contraseña *", en: "Confirm Password *" },
    "reg_cambiar_pass": { es: "🔐 Cambiar mi contraseña (opcional)", en: "🔐 Change my password (optional)" },
    "reg_pass_actual": { es: "Contraseña Actual", en: "Current Password" },
    "reg_pass_nueva": { es: "Nueva Contraseña", en: "New Password" },
    "reg_pass_nueva_conf": { es: "Confirmar Nueva Contraseña", en: "Confirm New Password" },
    "reg_obligatorios": { es: "* Campos obligatorios", en: "* Required fields" },
    "reg_salvar": { es: "SALVAR", en: "SAVE" },
    // PANTALLA 2 - ACCESO / LOGIN
    "acc_hola": { es: "Hola", en: "Hi" },
    "acc_nombre": { es: "Nombre Completo", en: "Full Name" },
    "acc_recordar": { es: "Recordar mi nombre en este dispositivo", en: "Remember my name on this device" },
    "acc_id": { es: "ID Empleado", en: "Employee ID" },
    "acc_pass": { es: "Contraseña", en: "Password" },
    "acc_entrar": { es: "ENTRAR", en: "LOG IN" },
    "acc_olvidaste": { es: "¿Olvidaste tu contraseña?", en: "Forgot your password?" },
    // PANTALLA 3 - IDENTIDAD CORPORATIVA
    "id_titulo": { es: "Identidad Corporativa", en: "Corporate Identity" },
    "id_desc": { es: "Define la identidad visual de tu organización", en: "Define the visual identity of your organization" },
    "id_empresa": { es: "Nombre de la Empresa *", en: "Company Name *" },
    "id_acronimo": { es: "Acrónimo (opcional)", en: "Acronym (optional)" },
    "id_cargar_logo": { es: "📤 Cargar Logo", en: "📤 Upload Logo" },
    "id_prev_logo": { es: "Vista previa del logo", en: "Logo preview" },
    "id_asignar": { es: "Asignar color seleccionado a:", en: "Assign selected color to:" },
    "id_fondo": { es: "Fondo", en: "Background" },
    "id_letras": { es: "Letras", en: "Text" },
    "id_botones": { es: "Botones", en: "Buttons" },
    "id_slogan": { es: "Slogan de la Empresa *", en: "Company Slogan *" },
    "id_tipografia": { es: "Tipografía:", en: "Typography:" },
    "id_estilo": { es: "Estilo:", en: "Style:" },
    "id_estilo_normal": { es: "Normal", en: "Normal" },
    "id_estilo_negrita": { es: "Negrita", en: "Bold" },
    "id_estilo_cursiva": { es: "Cursiva", en: "Italic" },
    "id_estilo_neg_curs": { es: "Negrita Cursiva", en: "Bold Italic" },
    "id_prev_slogan": { es: "Vista previa del slogan", en: "Slogan preview" },
    "id_mision": { es: "Misión *", en: "Mission *" },
    "id_vision": { es: "Visión *", en: "Vision *" },
    "id_valores": { es: "Valores (Separados por coma) *", en: "Values (comma separated) *" },
    "id_salvar_cont": { es: "SALVAR Y CONTINUAR", en: "SAVE AND CONTINUE" },
    "id_cont_sin": { es: "CONTINUAR SIN COMPLETAR", en: "CONTINUE WITHOUT COMPLETING" },
    // PANTALLA 4 - ORGANIGRAMA PERSONAL
    "org_titulo": { es: "TU ORGANIGRAMA", en: "YOUR ORGANIZATION CHART" },
    "org_desc": { es: "Construye tu red de comunicación directa", en: "Build your direct communication network" },
    "org_anadir_col": { es: "+ AÑADIR COLABORADOR", en: "+ ADD COLLABORATOR" },
    "org_anadir_ind": { es: "+ AÑADIR INDIRECTO", en: "+ ADD INDIRECT" },
    "org_anadir_obs": { es: "+ AÑADIR OBSERVADOR", en: "+ ADD OBSERVER" },
    "org_continuar": { es: "CONTINUAR A COMUNICACIÓN", en: "CONTINUE TO COMMUNICATION" },
    // PANTALLA 5 - COMUNICACIÓN
    "com_titulo": { es: "Centro de Comunicación", en: "Communication Center" },
    "com_desc": { es: "Módulo de comunicación en desarrollo", en: "Communication module under development" },
    "com_disponible": { es: "Este módulo estará disponible próximamente", en: "This module will be available soon" },
    // MODAL AGREGAR / EDITAR CONTACTO
    "mod_titulo": { es: "Agregar Contacto", en: "Add Contact" },
    "mod_nombre": { es: "Nombre (como tú lo conoces) *", en: "Name (as you know them) *" },
    "mod_puesto": { es: "Puesto *", en: "Position *" },
    "mod_acronimo": { es: "Acrónimo:", en: "Acronym:" },
    "mod_tel": { es: "Teléfono", en: "Phone" },
    "mod_email": { es: "Email", en: "Email" },
    "mod_salvar_inv": { es: "💾 SALVAR E INVITAR", en: "💾 SAVE AND INVITE" },
    "mod_cancelar": { es: "CANCELAR", en: "CANCEL" },
    "mod_nuevo_col": { es: "Nuevo Colaborador", en: "New Collaborator" },
    "mod_nuevo_ind": { es: "Nuevo Indirecto", en: "New Indirect" },
    "mod_nuevo_obs": { es: "Nuevo Observador", en: "New Observer" },
    "mod_editar": { es: "Editar Contacto", en: "Edit Contact" },
    // MODAL DETALLE CONTACTO
    "det_titulo": { es: "Detalles del Contacto", en: "Contact Details" },
    "det_editar": { es: "✏️ EDITAR", en: "✏️ EDIT" },
    "det_eliminar": { es: "🗑️ ELIMINAR", en: "🗑️ DELETE" },
    "det_cerrar": { es: "CERRAR", en: "CLOSE" },
    // MODAL CAMBIO OBLIGATORIO DE CONTRASEÑA
    "cambio_titulo": { es: "⚠️ Cambio de Contraseña Obligatorio", en: "⚠️ Mandatory Password Change" },
    "cambio_nueva": { es: "Nueva Contraseña *", en: "New Password *" },
    "cambio_conf": { es: "Confirmar Contraseña *", en: "Confirm Password *" },
    "cambio_boton": { es: "🔒 CAMBIAR CONTRASEÑA Y CONTINUAR", en: "🔒 CHANGE PASSWORD AND CONTINUE" }
};

// ==========================================
// 4.1 SISTEMA DE INVITACIONES - GRUPO 4
// ==========================================
let invitacionesPendientes = [];
/*
Estructura:
{
    id: "unico",
    nombreContacto: "",
    puestoContacto: "",
    telefonoContacto: "",
    emailContacto: "",
    idEmpleadoContacto: "",
    paisPrefijo: "+502",
    tipoContacto: "directo" | "indirecto" | "observador",
    invitadoPor: "id_usuario",
    nombreInvitador: "",
    codigoInvitacion: "generado_unico",
    linkInvitacion: "url_unica",
    fechaInvitacion: Date,
    fechaExpiracion: Date,
    estado: "pendiente" | "aceptada" | "expirada" | "cancelada",
    metodioEnvio: "whatsapp" | "sms" | "email"
}
*/

// ==========================================
// 4.2 DATOS DE INVITACIÓN ACTUAL (simplificado, sin prellenado)
// ==========================================
// Cuando un usuario abre el link de invitación, solo almacenamos
// el código y quién lo invitó. El formulario se muestra en blanco.
let datosInvitacionActual = {
    codigoInvitacion: "",
    invitadoPor: null,
    tipoContacto: "directo"
};

// ==========================================
// 3.5 ORGANIGRAMA GENERAL (Consulta) - GRUPO 3
// ==========================================
// Se construye automáticamente de forma orgánica
let organigramaGeneral = null;
/*
Se genera dinámicamente combinando todos los 
organigramas individuales de cada No.1
*/

// ==========================================
// 3.6 ZOOM DEL ORGANIGRAMA - GRUPO 3
// ==========================================
let nivelZoomOrganigrama = 1.0;
let minZoom = 0.5;
let maxZoom = 2.0;
let pasoZoom = 0.2;

// ==========================================
// 3.7 CONTACTO ACTUALMENTE EDITANDO - GRUPO 3
// ==========================================
// Para saber qué contacto está siendo editado en el modal
let contactoEnEdicion = null;
let tipoContactoActual = "directo"; // directo, indirecto, observador

// ==========================================
// 1.4 SISTEMA DE TOKENS/SESIÓN
// ==========================================
let tokenSesion = null;
let sesionActiva = false;
let tiempoExpiracionSesion = 3600000; // 1 hora en milisegundos

// ==========================================
// 5.4 FRASES DE FILOSOFÍA CORPORATIVA
// ==========================================
// Se selecciona aleatoriamente al hacer login
let fraseDelDia = "";

// ==========================================
// 5.5 HISTORIAL DE NAVEGACIÓN
// ==========================================
let historialPantallas = [];
// Para poder implementar "volver atrás"

// ==========================================
// 5.6 FLAGS DE CONTROL - GRUPO 5
// ==========================================
let esPrimeraVezEnApp = true;
let identidadMostrada = false;
let mensajeIdentidadMostrado = false;

// ==========================================
// 1.5 MODO ACTUAL DE PANTALLA 1 - GRUPO 1
// ==========================================
let modoPantalla1 = "registro"; // "registro" o "edicion"

// ==========================================
// 5.7 DATOS DE LOCALSTORAGE - GRUPO 5
// ==========================================
// Keys para guardar en localStorage
const STORAGE_KEYS = {
    USUARIO_ACTIVO: "stratos_usuario_activo",
    IDENTIDAD: "stratos_identidad",
    ORGANIGRAMA: "stratos_organigrama",
    INDIRECTOS: "stratos_indirectos",
    OBSERVADORES: "stratos_observadores",
    BASE_USUARIOS: "stratos_base_usuarios",
    CONFIG_PERSONAL: "stratos_config_personal",
    RECORDAR_USUARIO: "stratos_recordar",
    INVITACIONES: "stratos_invitaciones",
    SOLICITUDES_RECUPERACION: "stratos_solicitudes_recuperacion",
    TOKEN_SESION: "stratos_token_sesion" // AÃ±adido para guardar el token
};

// ==========================================
// INICIALIZACIÓN AL CARGAR
// ==========================================
window.addEventListener('DOMContentLoaded', function() {
    // Cargar datos guardados si existen
    const usuarioGuardado = cargarDeStorage(STORAGE_KEYS.USUARIO_ACTIVO);
    const identidadGuardada = cargarDeStorage(STORAGE_KEYS.IDENTIDAD);
    const organigramaGuardado = cargarDeStorage(STORAGE_KEYS.ORGANIGRAMA);
    const baseUsuariosGuardada = cargarDeStorage(STORAGE_KEYS.BASE_USUARIOS);
    const solicitudesGuardadas = cargarDeStorage(STORAGE_KEYS.SOLICITUDES_RECUPERACION);
    const indirectosGuardados = cargarDeStorage(STORAGE_KEYS.INDIRECTOS);
    const observadoresGuardados = cargarDeStorage(STORAGE_KEYS.OBSERVADORES);
    const invitacionesGuardadas = cargarDeStorage(STORAGE_KEYS.INVITACIONES);
    
    if (usuarioGuardado) {
        usuarioActivo = usuarioGuardado;
    }
    
    if (identidadGuardada) {
        identidadCorporativa = identidadGuardada;
    }
    
    if (organigramaGuardado) {
        datosOrganigrama = organigramaGuardado;
    }
    
    if (baseUsuariosGuardada) {
        baseDatosUsuarios = baseUsuariosGuardada;
    }
    
    if (solicitudesGuardadas) {
        solicitudesRecuperacion = solicitudesGuardadas;
    }
    
    if (indirectosGuardados) {
        contactosIndirectos = indirectosGuardados;
    }
    
    if (observadoresGuardados) {
        observadores = observadoresGuardados;
    }
    
    if (invitacionesGuardadas) {
        invitacionesPendientes = invitacionesGuardadas;
    }

    // Cargar la configuración personal guardada (incluye el idioma) y aplicarla
    const configuracionGuardada = cargarDeStorage(STORAGE_KEYS.CONFIG_PERSONAL);
    if (configuracionGuardada) {
        configuracionPersonal = configuracionGuardada;
        const selectorIdioma = document.getElementById('config-idioma');
        if (selectorIdioma && configuracionGuardada.idioma) selectorIdioma.value = configuracionGuardada.idioma;
    }
    if (typeof aplicarIdioma === 'function') aplicarIdioma(configuracionPersonal.idioma || 'es');
});

// ==========================================
// EXPORTAR (Si se usa módulos en el futuro)
// ==========================================
// export { usuarioActivo, identidadCorporativa, datosOrganigrama, etc. };
