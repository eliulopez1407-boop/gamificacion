export function RespuestaIA({ respuesta }) {
    return (
        <textarea value={respuesta} readOnly rows={10} cols={50}  />
    );
}