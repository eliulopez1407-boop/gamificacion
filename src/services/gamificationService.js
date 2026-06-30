// Servicio central de gamificación (XP y Logros).
//
// Por ahora la persistencia es local (localStorage) pero toda la app consume
// SOLO esta interfaz, de modo que migrar a un backend real implique reescribir
// únicamente este archivo, sin tocar componentes.

const KEY_XP = 'edu_xpTotal';
const KEY_LOGROS = 'edu_logrosObtenidos';
const KEY_ACTIVIDADES = 'edu_actividades';

// Cada nivel cuesta esta cantidad de XP. El nivel se deriva del XP total.
export const XP_POR_NIVEL = 1000;
// XP que otorga cada respuesta correcta en un quiz.
export const PUNTOS_POR_ACIERTO = 100;

// Catálogo único de logros. Los componentes mapean el icono por `id`.
export const CATALOGO_LOGROS = [
    { id: 'primer-quiz', titulo: 'Primer Quiz', desc: 'Completaste tu primer quiz' },
    { id: 'maestro-materia', titulo: 'Maestro de la Materia', desc: 'Lograste 100% en un quiz' },
    { id: 'racha-7', titulo: 'Racha de 7 días', desc: 'Estudiaste una semana seguida' },
    { id: 'estrella-aula', titulo: 'Estrella del aula', desc: 'Top 3 del ranking semanal' },
    { id: 'explorador', titulo: 'Explorador', desc: 'Revisa material de 5 materias' }
];

const logroPorId = (id) => CATALOGO_LOGROS.find((l) => l.id === id);

// ---- Lectura/escritura segura de localStorage ----
const leer = (key, fallback) => {
    try {
        const raw = localStorage.getItem(key);
        return raw === null ? fallback : JSON.parse(raw);
    } catch {
        return fallback;
    }
};

const escribir = (key, valor) => {
    try {
        localStorage.setItem(key, JSON.stringify(valor));
    } catch {
        // Ignorar errores de cuota/persistencia.
    }
};

// ---- XP y niveles ----
export const getXP = () => {
    const xp = Number(leer(KEY_XP, 0));
    return Number.isFinite(xp) ? xp : 0;
};

export const sumarXP = (cantidad) => {
    const suma = Number(cantidad) || 0;
    const total = Math.max(0, getXP() + suma);
    escribir(KEY_XP, total);
    return total;
};

export const getNivel = () => Math.floor(getXP() / XP_POR_NIVEL) + 1;

// Resumen del progreso de nivel, listo para pintar barras de XP.
export const getProgresoNivel = () => {
    const xp = getXP();
    const xpActual = xp % XP_POR_NIVEL;
    return {
        xp,
        nivel: Math.floor(xp / XP_POR_NIVEL) + 1,
        xpActual,
        xpNecesario: XP_POR_NIVEL,
        porcentaje: Math.round((xpActual / XP_POR_NIVEL) * 100)
    };
};

// ---- Logros ----
export const getLogros = () => {
    const logros = leer(KEY_LOGROS, []);
    return Array.isArray(logros) ? logros : [];
};

export const tieneLogro = (id) => getLogros().includes(id);

const otorgarLogro = (obtenidos, nuevos, id) => {
    if (!obtenidos.includes(id) && logroPorId(id)) {
        obtenidos.push(id);
        nuevos.push(logroPorId(id));
    }
};

// Contador de actividades por tipo (p. ej. cuántos quizzes ha resuelto).
const getActividades = (tipo) => {
    const data = leer(KEY_ACTIVIDADES, {});
    return Number(data?.[tipo]) || 0;
};

const registrarActividad = (tipo) => {
    const data = leer(KEY_ACTIVIDADES, {}) || {};
    const total = (Number(data[tipo]) || 0) + 1;
    escribir(KEY_ACTIVIDADES, { ...data, [tipo]: total });
    return total;
};

// Evalúa qué logros desbloquea una actividad completada, los persiste y
// devuelve SOLO los nuevos (para mostrarlos en pantalla).
// actividad: { tipo: 'quiz', aciertos: number, total: number }
export const verificarLogros = (actividad = {}) => {
    const obtenidos = getLogros();
    const nuevos = [];

    if (actividad.tipo === 'quiz') {
        const quizzesResueltos = registrarActividad('quiz');
        if (quizzesResueltos === 1) otorgarLogro(obtenidos, nuevos, 'primer-quiz');
        if (actividad.total > 0 && actividad.aciertos === actividad.total) {
            otorgarLogro(obtenidos, nuevos, 'maestro-materia');
        }
    }

    if (nuevos.length) escribir(KEY_LOGROS, obtenidos);
    return nuevos;
};

// Snapshot completo para los dashboards.
export const getResumen = () => ({
    ...getProgresoNivel(),
    logros: getLogros(),
    totalLogros: getLogros().length
});

const gamificationService = {
    XP_POR_NIVEL,
    PUNTOS_POR_ACIERTO,
    CATALOGO_LOGROS,
    getXP,
    sumarXP,
    getNivel,
    getProgresoNivel,
    getLogros,
    tieneLogro,
    verificarLogros,
    getResumen
};

export default gamificationService;
