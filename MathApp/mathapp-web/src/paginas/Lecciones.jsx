import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/cliente";
import { useCarga } from "../api/useCarga";
import EncabezadoPagina from "../componentes/EncabezadoPagina";
import ErrorEnLinea from "../componentes/ErrorEnLinea";
import { Check, Chevron } from "../componentes/Iconos";
import "../estilos/plan.css";
import "../estilos/lecciones.css";

/**
 * Módulo de Lecciones: temas de los planes activos del estudiante, con sus
 * lecciones, ejercicios y prueba; y un buscador sobre todas las lecciones.
 */
export default function Lecciones() {
  const [busqueda, setBusqueda] = useState("");
  const buscando = busqueda.trim().length >= 2;

  return (
    <>
      <EncabezadoPagina
        titulo="Lecciones"
        descripcion="Selecciona un tema para ver sus lecciones y ejercicios disponibles."
      />
      <div className="buscador">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="search"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar lección por nombre"
          aria-label="Buscar lección por nombre"
          maxLength={50}
        />
      </div>
      {buscando ? <ResultadosBusqueda texto={busqueda.trim()} /> : <TemasDePlanesActivos />}
    </>
  );
}

/** Búsqueda en todas las lecciones (requisito 8), con espera para no llamar en cada tecla. */
function ResultadosBusqueda({ texto }) {
  const [consulta, setConsulta] = useState(texto);
  useEffect(() => {
    const t = setTimeout(() => setConsulta(texto), 300);
    return () => clearTimeout(t);
  }, [texto]);

  const { datos, error, recargar } = useCarga(
    () => api(`/api/lecciones/buscar?q=${encodeURIComponent(consulta)}`),
    [consulta],
  );

  if (error) return <ErrorEnLinea mensaje={error.message} onReintentar={recargar} />;
  if (!datos) return <p className="texto-suave" role="status">Buscando…</p>;
  if (datos.length === 0) {
    return <div className="tarjeta"><p className="texto-suave">No encontramos lecciones con “{consulta}”.</p></div>;
  }
  return (
    <div className="tarjeta resultados" role="region" aria-label="Resultados de búsqueda">
      <p className="seccion-titulo">{datos.length} {datos.length === 1 ? "resultado" : "resultados"}</p>
      <ul>
        {datos.map((l) => (
          <li key={l.id}>
            <Link to={`/lecciones/${l.id}`} className="resultado">
              <span className="dot" aria-hidden="true" />
              <span>{l.nombre}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TemasDePlanesActivos() {
  const { datos, error, recargar } = useCarga(async () => {
    const [planes, mios] = await Promise.all([api("/api/planes"), api("/api/yo/planes?soloActivos=true")]);
    const idsActivos = new Set(mios.map((m) => m.planId));
    const activos = planes.filter((p) => idsActivos.has(p.id));
    const temas = await Promise.all(activos.map((p) => api(`/api/planes/${p.id}/temas`)));
    return activos.map((plan, i) => ({ plan, temas: temas[i] }));
  }, []);

  if (error) return <ErrorEnLinea mensaje={error.message} onReintentar={recargar} />;
  if (!datos) return <div className="lista-planes" aria-hidden="true">{[0, 1, 2].map((i) => <div key={i} className="plan esqueleto" />)}</div>;

  if (datos.length === 0) {
    return (
      <div className="tarjeta vacio-tarjeta">
        <p className="vacio-titulo">Aún no tienes planes de estudio activos</p>
        <p className="texto-suave">Activa un plan para ver aquí sus temas y lecciones.</p>
        <Link to="/plan" className="boton boton-primario">Ir a Plan de estudio</Link>
      </div>
    );
  }

  const variosPlanes = datos.length > 1;
  return datos.map(({ plan, temas }) => (
    <section key={plan.id} className="grupo-plan" aria-label={plan.nombre}>
      {variosPlanes && <h2 className="seccion-titulo">{plan.nombre}</h2>}
      {temas.length === 0 ? (
        <div className="tarjeta"><p className="texto-suave">Este plan todavía no tiene temas.</p></div>
      ) : (
        <div className="lista-planes">
          {temas.map((t) => <TarjetaTema key={t.id} tema={t} />)}
        </div>
      )}
    </section>
  ));
}

function TarjetaTema({ tema }) {
  const [abierto, setAbierto] = useState(false);
  const [datos, setDatos] = useState(null);
  const [error, setError] = useState(null);

  async function cargar() {
    setError(null);
    try {
      const [lecciones, pruebas] = await Promise.all([
        api(`/api/temas/${tema.id}/lecciones`),
        api(`/api/temas/${tema.id}/pruebas`),
      ]);
      const ejercicios = await Promise.all(lecciones.map((l) => api(`/api/lecciones/${l.id}/ejercicios`)));
      setDatos({ lecciones, pruebas, ejercicios: ejercicios.map((e) => e.length) });
    } catch (e) {
      setError(e.message);
    }
  }

  function alternar() {
    setAbierto(!abierto);
    if (!abierto && !datos) cargar();
  }

  const completadas = datos?.lecciones.filter((l) => l.completada).length ?? 0;
  const id = `tema-${tema.id}-contenido`;

  return (
    <section className="plan">
      <button type="button" className={`tema-tarjeta-header ${abierto ? "abierto" : ""}`}
        onClick={alternar} aria-expanded={abierto} aria-controls={id}>
        <span className="plan-titulo">{tema.nombre}</span>
        <span className="tema-derecha">
          {datos?.lecciones.length > 0 && <span className="tema-conteo">{completadas}/{datos.lecciones.length}</span>}
          <span className={`chevron ${abierto ? "abierto" : ""}`}><Chevron /></span>
        </span>
      </button>

      {abierto && (
        <div className="tema-contenido" id={id}>
          {error && <div className="plan-aviso"><ErrorEnLinea mensaje={error} onReintentar={cargar} /></div>}
          {!error && !datos && <p className="vacio">Cargando lecciones…</p>}
          {datos?.lecciones.length === 0 && <p className="vacio">Este tema todavía no tiene lecciones.</p>}
          {datos?.lecciones.length > 0 && (
            <ul>
              {datos.lecciones.map((l, i) => (
                <li key={l.id}>
                  <Link to={`/lecciones/${l.id}`} className={`leccion-enlace ${l.completada ? "completada" : ""}`}>
                    {l.completada
                      ? <span className="marca-completada" aria-hidden="true"><Check /></span>
                      : <span className="dot" aria-hidden="true" />}
                    <span className="leccion-enlace-textos">
                      <span className="leccion-enlace-nombre">{l.nombre}</span>
                      {datos.ejercicios[i] > 0 && (
                        <span className="ejercicio-label">
                          {datos.ejercicios[i]} {datos.ejercicios[i] === 1 ? "ejercicio" : "ejercicios"} de práctica
                        </span>
                      )}
                    </span>
                    {l.completada && <span className="sr-only">(completada)</span>}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {datos?.pruebas.length > 0 && (
            <Link to={datos.pruebas.length === 1 ? `/practicas/pruebas/${datos.pruebas[0].id}` : "/practicas"} className="prueba-bloque">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
              </svg>
              <span className="prueba-label">
                {datos.pruebas.length === 1 ? `Prueba: ${tema.nombre}` : `${datos.pruebas.length} pruebas de ${tema.nombre}`}
              </span>
            </Link>
          )}
        </div>
      )}
    </section>
  );
}
