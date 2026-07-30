// ==========================================
// ADN VISUAL STRATOS - ARCHIVO: datos.js
// Solo Memoria, Variables y Estructuras
// ==========================================

// ==========================================
// 1. USUARIO ACTIVO (Sesión actual)
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
    contrasena: "", // Encriptada en producción
    esNo1: false,
    esPrimeraLinea: false,
    superiorId: null, // ID del jefe directo
    invitadoPor: null, // ID de quien lo invitó
    tipoInvitacion: "", // "directo", "indirecto", "observador" (INMUTABLE - histórico)
    tipoActual: "", // Puede cambiar si alguien más lo invita como colaborador
    fechaRegistro: null,
    ultimoAcceso: null,
    requiereCambioContrasena: false // Flag para contraseña temporal
};

// ==========================================
// 2. ESTADO DE IDENTIDAD CORPORATIVA
// ==========================================
let identidadCorporativa = {
    completada: false,
    completadaPor: null, // ID del No.1 que completó
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
// 3. PALETA DE COLORES (Siempre 8)
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
// 4. CONFIGURACIÓN ESTÉTICA APLICADA
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
// 5. ESTRUCTURA DEL ORGANIGRAMA
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
// 6. LISTA DE CONTACTOS INDIRECTOS
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
// 7. LISTA DE OBSERVADORES
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
// 8. BASE DE DATOS DE USUARIOS (Simulada)
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
// 9. ESTADO DE NAVEGACIÓN (Para la Tuerca)
// ==========================================
let estadoPantallas = {
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
// 10. SEGURIDAD - CONTRASEÑAS REALES
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
// 11. SISTEMA DE RECUPERACIÓN DE CONTRASEÑAS
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
// 12. MENSAJES MOTIVACIONALES
// ==========================================
let mensajesMotivacionales = [
    "La comunicación efectiva es la base del éxito.",
    "Cada mensaje cuenta, cada acción importa.",
    "Tu equipo confía en ti.",
    "Medir es el primer paso para mejorar.",
    "La transparencia genera confianza.",
    "El trabajo en equipo hace la diferencia.",
    "Hoy es un buen día para innovar.",
    "Tu liderazgo inspira a otros."
];

// ==========================================
// 13. CONFIGURACIÓN PERSONAL DEL USUARIO
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
// 14. SISTEMA DE INVITACIONES
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
// 15. DATOS DE INVITACIÓN ACTUAL (simplificado, sin prellenado)
// ==========================================
// Cuando un usuario abre el link de invitación, solo almacenamos
// el código y quién lo invitó. El formulario se muestra en blanco.
let datosInvitacionActual = {
    codigoInvitacion: "",
    invitadoPor: null,
    tipoContacto: "directo"
};

// ==========================================
// 16. ORGANIGRAMA GENERAL (Consulta)
// ==========================================
// Se construye automáticamente de forma orgánica
let organigramaGeneral = null;
/*
Se genera dinámicamente combinando todos los 
organigramas individuales de cada No.1
*/

// ==========================================
// 17. ZOOM DEL ORGANIGRAMA
// ==========================================
let nivelZoomOrganigrama = 1.0;
let minZoom = 0.5;
let maxZoom = 2.0;
let pasoZoom = 0.2;

// ==========================================
// 18. CONTACTO ACTUALMENTE EDITANDO
// ==========================================
// Para saber qué contacto está siendo editado en el modal
let contactoEnEdicion = null;
let tipoContactoActual = "directo"; // directo, indirecto, observador

// ==========================================
// 19. SISTEMA DE TOKENS/SESIÓN
// ==========================================
let tokenSesion = null;
let sesionActiva = false;
let tiempoExpiracionSesion = 3600000; // 1 hora en milisegundos

// ==========================================
// 20. FRASES DE FILOSOFÍA CORPORATIVA
// ==========================================
// Se selecciona aleatoriamente al hacer login
let fraseDelDia = "";

// ==========================================
// 21. HISTORIAL DE NAVEGACIÓN
// ==========================================
let historialPantallas = [];
// Para poder implementar "volver atrás"

// ==========================================
// 22. FLAGS DE CONTROL
// ==========================================
let esPrimeraVezEnApp = true;
let identidadMostrada = false;
let mensajeIdentidadMostrado = false;

// ==========================================
// 23. MODO ACTUAL DE PANTALLA 1
// ==========================================
let modoPantalla1 = "registro"; // "registro" o "edicion"

// ==========================================
// 24. DATOS DE LOCALSTORAGE
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
    TOKEN_SESION: "stratos_token_sesion" // Añadido para guardar el token
};

// ==========================================
// 25. FUNCIONES AUXILIARES DE DATOS
// ==========================================

// Generar ID único
function generarIdUnico() {
    return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Generar código de invitación
function generarCodigoInvitacion() {
    return 'INV_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6).toUpperCase();
}

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

// Obtener frase motivacional aleatoria
function obtenerFraseMotivacional() {
    if (identidadCorporativa.completada && identidadCorporativa.mision) {
        // Si hay misión/visión/valores, usar de allí
        const frases = [];
        if (identidadCorporativa.mision) frases.push(identidadCorporativa.mision);
        if (identidadCorporativa.vision) frases.push(identidadCorporativa.vision);
        if (identidadCorporativa.valores.length > 0) {
            frases.push(...identidadCorporativa.valores);
        }
        return frases[Math.floor(Math.random() * frases.length)];
    } else {
        // Usar mensajes genéricos
        return mensajesMotivacionales[Math.floor(Math.random() * mensajesMotivacionales.length)];
    }
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

// ==========================================
// 26. FUNCIONES DE PERSISTENCIA
// ==========================================

// Guardar en localStorage
function guardarEnStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error("Error guardando en localStorage:", error);
        return false;
    }
}

// Cargar de localStorage
function cargarDeStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error("Error cargando de localStorage:", error);
        return null;
    }
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
});

// ==========================================
// EXPORTAR (Si se usa módulos en el futuro)
// ==========================================
// export { usuarioActivo, identidadCorporativa, datosOrganigrama, etc. };