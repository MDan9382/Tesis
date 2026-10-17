/**
 * Anillo de puntaje (0–100), como en el prototipo de Progreso.
 * Sin puntaje muestra un guion.
 */
export default function Anillo({ puntaje, tamano = 52, grosor = 4 }) {
  const r = (tamano - grosor) / 2 - 1;
  const circ = 2 * Math.PI * r;
  const pct = puntaje == null ? 0 : Math.max(0, Math.min(100, puntaje)) / 100;
  const color = puntaje == null ? "var(--gris-linea)" : puntaje >= 70 ? "var(--verde-claro)" : puntaje >= 40 ? "#F59E0B" : "#EF4444";
  return (
    <div className="anillo" style={{ width: tamano, height: tamano }}
      role="img" aria-label={puntaje == null ? "Sin intentos" : `Puntaje ${puntaje} de 100`}>
      <svg width={tamano} height={tamano} viewBox={`0 0 ${tamano} ${tamano}`} aria-hidden="true">
        <circle cx={tamano / 2} cy={tamano / 2} r={r} fill="none" stroke="var(--gris-linea)" strokeWidth={grosor} />
        <circle cx={tamano / 2} cy={tamano / 2} r={r} fill="none" stroke={color} strokeWidth={grosor}
          strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={circ * (1 - pct)}
          transform={`rotate(-90 ${tamano / 2} ${tamano / 2})`} style={{ transition: "stroke-dashoffset 0.5s ease" }} />
      </svg>
      <span className="anillo-texto" style={{ fontSize: tamano * 0.29 }}>{puntaje ?? "–"}</span>
    </div>
  );
}
