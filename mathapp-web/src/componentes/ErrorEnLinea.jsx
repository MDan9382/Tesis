/** Mensaje de error dentro de una sección, con botón para reintentar. */
export default function ErrorEnLinea({ mensaje, onReintentar }) {
  return (
    <div className="error-en-linea" role="alert">
      <span>{mensaje}</span>
      {onReintentar && (
        <button type="button" className="enlace" onClick={onReintentar}>Reintentar</button>
      )}
    </div>
  );
}
