// Extracción ligera de texto de documentos Office en el navegador.
// Por ahora solo Word (.docx) vía mammoth; el resto (Excel/PowerPoint) se
// resuelve en la UI con una tarjeta de metadatos + descarga.
import mammoth from 'mammoth/mammoth.browser';

// Convierte un dataURL (base64) en ArrayBuffer para las librerías de Office.
const dataUrlToArrayBuffer = (dataUrl) => {
    const b64 = dataUrl.split(',')[1] || '';
    const bin = atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
    return arr.buffer;
};

/**
 * Extrae el texto plano de un .docx. Devuelve null si no es posible
 * (formato .doc antiguo, archivo corrupto o sin dataUrl).
 * @param {{ name?: string, dataUrl?: string }} archivo
 * @returns {Promise<string|null>}
 */
export async function extraerTextoWord(archivo) {
    if (!archivo?.dataUrl || !/\.docx$/i.test(archivo.name || '')) return null;
    try {
        const arrayBuffer = dataUrlToArrayBuffer(archivo.dataUrl);
        const { value } = await mammoth.extractRawText({ arrayBuffer });
        return value?.trim() || null;
    } catch {
        return null;
    }
}
