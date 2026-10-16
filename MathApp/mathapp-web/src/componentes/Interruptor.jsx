/** Interruptor encendido/apagado accesible (se anuncia como "switch"). */
export default function Interruptor({ activo, onCambiar, deshabilitado, etiqueta }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={activo}
      aria-label={etiqueta}
      disabled={deshabilitado}
      className={`interruptor ${activo ? "encendido" : ""}`}
      onClick={() => onCambiar(!activo)}
    >
      <span className="interruptor-perilla" />
    </button>
  );
}
