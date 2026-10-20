import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/cliente";
import { useCarga } from "../api/useCarga";
import Anillo from "../componentes/Anillo";
import EncabezadoPagina from "../componentes/EncabezadoPagina";
import ErrorEnLinea from "../componentes/ErrorEnLinea";
import "../estilos/lecciones.css";
import "../estilos/progreso.css";

const ORDENES = {
  recientes: { texto: "Más recientes primero", comparar: (a, b) => fecha(b) - fecha(a) },
  antiguos: { texto: "Más antiguos primero", comparar: (a, b) => fecha(a) - fecha(b) },
  alta: { texto: "Puntuación más alta primero", comparar: (a, b) => (b.puntaje ?? -1) - (a.puntaje ?? -1) || fecha(b) - fecha(a) },
  baja: { texto: "Puntuación más baja primero", comparar: (a, b) => (a.puntaje ?? 101) - (b.puntaje ?? 101) || fecha(b) - fecha(a) },
};
const fecha = (r) => (r.fecha ? new Date(r.fecha).getTime() : 0);
const POR_PAGINA = 20;

/** Módulo de Progreso y estadísticas (requisito 7). */
export default function Progreso() {
  const { datos, error, recargar } = useCarga(() => api("/api/yo/progreso"), []);

  return (
    <>
      <EncabezadoPagina
        titulo="Progreso y estadísticas"
        descripcion="Revisa tu avance en el plan de estudio y los ejercicios completados."
      />
      {error && <ErrorEnLinea mensaje={error.message} onReintentar={recargar} />}
      {!error && !datos && <div className="esqueleto-progreso" aria-hidden="true" />}
      {datos && (
        <>
          <Totales totales={datos.totales} />
          <AvancePlanes planes={datos.planes} />
          <Historial historial={datos.historial} />
        </>
      )}
    </>
  );
}

function Totales({ totales }) {
  const tiles = [
    { etiqueta: "Lecciones completadas", valor: totales.leccionesCompletadas },
    { etiqueta: "Prácticas realizadas", valor: totales.practicasRealizadas },
    { etiqueta: "Puntaje promedio", valor: totales.puntajePromedio ?? "–", sufijo: totales.puntajePromedio != null ? "/100" : "" },
  ];
  return (
    <section className="indicadores" aria-label="Resumen">
      {tiles.map((t) => (
        <div key={t.etiqueta} className="indicador">
          <p className="indicador-etiqueta">{t.etiqueta}</p>
          <p className="indicador-valor">
            {t.valor}{t.sufijo && <span className="indicador-sufijo">{t.sufijo}</span>}
          </p>
        </div>
      ))}
    </section>
  );
}

function AvancePlanes({ planes }) {
  return (
    <section className="seccion" aria-labelledby="titulo-planes">
      <h2 id="titulo-planes" className="seccion-titulo">Plan de estudio</h2>
      <div className="tarjeta">
        {planes.length === 0 ? (
          <p className="texto-suave">
            No tienes planes activos. <Link to="/plan">Activa un plan</Link> para ver tu avance.
          </p>
        ) : (
          planes.map((p) => (
            <div key={p.planId} className="avance-plan">
              <div className="plan-label">
                <span className="avance-nombre">{p.nombre}</span>
                <span className="avance-pct">{p.porcentaje}%</span>
              </div>
              <div className="barra-fondo" role="progressbar" aria-label={`Avance en ${p.nombre}`}
                aria-valuemin={0} aria-valuemax={100} aria-valuenow={p.porcentaje}>
                <div className="barra-fill" style={{ width: `${p.porcentaje}%` }} />
              </div>
              <p className="avance-detalle">
                {p.totalLecciones === 0
                  ? "Este plan todavía no tiene lecciones."
                  : `${p.leccionesCompletadas} de ${p.totalLecciones} ${p.totalLecciones === 1 ? "lección completada" : "lecciones completadas"}`}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

function Historial({ historial }) {
  const [orden, setOrden] = useState("recientes");
  const [visibles, setVisibles] = useState(POR_PAGINA);
  const ordenado = useMemo(() => [...historial].sort(ORDENES[orden].comparar), [historial, orden]);

  return (
    <section className="seccion" aria-labelledby="titulo-historial">
      <div className="ejercicios-header">
        <h2 id="titulo-historial" className="seccion-titulo">Ejercicios y pruebas completados</h2>
        {historial.length > 1 && (
          <label className="selector-orden">
            <span className="sr-only">Ordenar</span>
            <select value={orden} onChange={(e) => { setOrden(e.target.value); setVisibles(POR_PAGINA); }}>
              {Object.entries(ORDENES).map(([k, o]) => <option key={k} value={k}>{o.texto}</option>)}
            </select>
          </label>
        )}
      </div>
      <div className="tarjeta">
        {historial.length === 0 ? (
          <p className="texto-suave">
            Todavía no has resuelto ejercicios. <Link to="/practicas">Ve a Prácticas</Link> para empezar.
          </p>
        ) : (
          <>
            <ul className="lista-historial">
              {ordenado.slice(0, visibles).map((r) => (
                <li key={`${r.tipo}-${r.resultadoId}`}>
                  <Link className="ejercicio-item"
                    to={`/practicas/${r.tipo === "prueba" ? "pruebas" : "ejercicios"}/${r.elementoId}`}>
                    <Anillo puntaje={r.puntaje} />
                    <span className="ejercicio-info">
                      <span className="ejercicio-nombre">
                        {r.titulo ?? (r.tipo === "prueba" ? `Prueba: ${r.contexto}` : `Ejercicio de ${r.contexto}`)}
                      </span>
                      <span className="ejercicio-meta">
                        <span className={`etiqueta-tipo ${r.tipo}`}>{r.tipo === "prueba" ? "Prueba" : "Ejercicio"}</span>
                        {r.contexto} · {fechaAmigable(r.fecha)}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            {visibles < ordenado.length && (
              <button type="button" className="boton boton-secundario boton-ancho ver-mas"
                onClick={() => setVisibles((v) => v + POR_PAGINA)}>
                Ver más ({ordenado.length - visibles} restantes)
              </button>
            )}
          </>
        )}
      </div>
    </section>
  );
}

/** "Hoy, 10:24 a. m.", "Ayer, 3:15 p. m.", "lun, 9:00 a. m." o "12 oct 2026". */
export function fechaAmigable(iso, ahora = new Date()) {
  if (!iso) return "Sin fecha";
  const f = new Date(iso);
  const hora = f.toLocaleTimeString("es-GT", { hour: "numeric", minute: "2-digit" });
  const inicioDia = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  const dias = Math.round((inicioDia(ahora) - inicioDia(f)) / 86_400_000);
  if (dias === 0) return `Hoy, ${hora}`;
  if (dias === 1) return `Ayer, ${hora}`;
  if (dias > 1 && dias < 7) {
    const dia = f.toLocaleDateString("es-GT", { weekday: "short" }).replace(".", "");
    return `${dia.charAt(0).toUpperCase()}${dia.slice(1)}, ${hora}`;
  }
  return f.toLocaleDateString("es-GT", { day: "numeric", month: "short", year: "numeric" }).replace(".", "");
}
