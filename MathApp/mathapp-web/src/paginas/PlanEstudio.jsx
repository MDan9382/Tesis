import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/cliente";
import EncabezadoPagina from "../componentes/EncabezadoPagina";
import ErrorEnLinea from "../componentes/ErrorEnLinea";
import Interruptor from "../componentes/Interruptor";
import { Check, Chevron } from "../componentes/Iconos";
import "../estilos/plan.css";

/**
 * Módulo de Plan de estudio: el estudiante activa los planes que quiere trabajar
 * y explora sus temas y lecciones (en el orden de la ruta de aprendizaje).
 */
export default function PlanEstudio() {
  const [planes, setPlanes] = useState(null);
  const [activos, setActivos] = useState(new Set());
  const [error, setError] = useState(null);

  const cargar = useCallback(async () => {
    setError(null);
    try {
      const [todos, mios] = await Promise.all([api("/api/planes"), api("/api/yo/planes?soloActivos=true")]);
      setPlanes(todos);
      setActivos(new Set(mios.map((up) => up.planId)));
    } catch (e) {
      setError(e.message);
    }
  }, []);

  useEffect(() => { cargar(); }, [cargar]);

  return (
    <>
      <EncabezadoPagina
        titulo="Plan de estudio"
        descripcion="Activa los planes que deseas trabajar y explora sus temas y lecciones."
      />

      {error && <ErrorEnLinea mensaje={error} onReintentar={cargar} />}
      {!error && planes === null && <Esqueleto />}
      {planes?.length === 0 && (
        <div className="tarjeta"><p className="texto-suave">Todavía no hay planes de estudio disponibles.</p></div>
      )}

      {planes?.length > 0 && (
        <div className="lista-planes">
          {planes.map((plan) => (
            <TarjetaPlan
              key={plan.id}
              plan={plan}
              activo={activos.has(plan.id)}
              onCambioActivo={(valor) =>
                setActivos((prev) => {
                  const nuevo = new Set(prev);
                  valor ? nuevo.add(plan.id) : nuevo.delete(plan.id);
                  return nuevo;
                })
              }
            />
          ))}
        </div>
      )}
    </>
  );
}

function TarjetaPlan({ plan, activo, onCambioActivo }) {
  const [abierto, setAbierto] = useState(false);
  const [temas, setTemas] = useState(null);
  const [errorTemas, setErrorTemas] = useState(null);
  const [guardando, setGuardando] = useState(false);
  const [errorActivar, setErrorActivar] = useState(null);

  const cargarTemas = useCallback(async () => {
    setErrorTemas(null);
    try {
      setTemas(await api(`/api/planes/${plan.id}/temas`));
    } catch (e) {
      setErrorTemas(e.message);
    }
  }, [plan.id]);

  function alternar() {
    const abrir = !abierto;
    setAbierto(abrir);
    if (abrir && temas === null) cargarTemas(); // los temas se piden solo la primera vez
  }

  async function cambiarActivo(valor) {
    setErrorActivar(null);
    setGuardando(true);
    onCambioActivo(valor); // se refleja de inmediato; si falla se revierte
    try {
      await api(`/api/yo/planes/${plan.id}`, { metodo: valor ? "POST" : "DELETE" });
    } catch (e) {
      onCambioActivo(!valor);
      setErrorActivar(valor ? "No se pudo activar el plan. Inténtalo de nuevo." : "No se pudo desactivar el plan. Inténtalo de nuevo.");
    } finally {
      setGuardando(false);
    }
  }

  const idContenido = `plan-${plan.id}-contenido`;

  return (
    <section className="plan">
      <div className={`plan-header ${abierto ? "abierto" : ""}`}>
        <button
          type="button"
          className="plan-expandir"
          onClick={alternar}
          aria-expanded={abierto}
          aria-controls={idContenido}
        >
          <span className={`chevron ${abierto ? "abierto" : ""}`}><Chevron /></span>
          <span className="plan-textos">
            <span className="plan-titulo">{plan.nombre}</span>
            <span className="plan-descripcion">{plan.descripcion}</span>
          </span>
        </button>
        <div className="toggle-wrap">
          <span className={`toggle-label ${activo ? "activo" : ""}`} aria-hidden="true">
            {activo ? "Activo" : "Inactivo"}
          </span>
          <Interruptor
            activo={activo}
            deshabilitado={guardando}
            onCambiar={cambiarActivo}
            etiqueta={`Activar ${plan.nombre}`}
          />
        </div>
      </div>

      {errorActivar && <div className="plan-aviso"><ErrorEnLinea mensaje={errorActivar} /></div>}

      {abierto && (
        <div className="plan-contenido" id={idContenido}>
          {errorTemas && <div className="plan-aviso"><ErrorEnLinea mensaje={errorTemas} onReintentar={cargarTemas} /></div>}
          {!errorTemas && temas === null && <p className="vacio">Cargando temas…</p>}
          {temas?.length === 0 && <p className="vacio">Este plan todavía no tiene temas.</p>}
          {temas?.map((tema) => <FilaTema key={tema.id} tema={tema} />)}
        </div>
      )}
    </section>
  );
}

function FilaTema({ tema }) {
  const [abierto, setAbierto] = useState(false);
  const [lecciones, setLecciones] = useState(null);
  const [error, setError] = useState(null);

  const cargar = useCallback(async () => {
    setError(null);
    try {
      setLecciones(await api(`/api/temas/${tema.id}/lecciones`));
    } catch (e) {
      setError(e.message);
    }
  }, [tema.id]);

  function alternar() {
    const abrir = !abierto;
    setAbierto(abrir);
    if (abrir && lecciones === null) cargar();
  }

  const completadas = lecciones?.filter((l) => l.completada).length ?? 0;
  const idLista = `tema-${tema.id}-lecciones`;

  return (
    <div className="tema-wrap">
      <button
        type="button"
        className={`tema-header ${abierto ? "abierto" : ""}`}
        onClick={alternar}
        aria-expanded={abierto}
        aria-controls={idLista}
      >
        <span className="tema-titulo">{tema.nombre}</span>
        <span className="tema-derecha">
          {lecciones?.length > 0 && (
            <span className="tema-conteo">{completadas}/{lecciones.length}</span>
          )}
          <span className={`tema-chevron ${abierto ? "abierto" : ""}`}><Chevron tamano={14} /></span>
        </span>
      </button>

      {abierto && (
        <div className="lecciones-lista" id={idLista}>
          {error && <div className="plan-aviso"><ErrorEnLinea mensaje={error} onReintentar={cargar} /></div>}
          {!error && lecciones === null && <p className="vacio vacio-leccion">Cargando lecciones…</p>}
          {lecciones?.length === 0 && <p className="vacio vacio-leccion">Este tema todavía no tiene lecciones.</p>}
          {lecciones?.length > 0 && (
            <ul>
              {lecciones.map((l) => (
                <li key={l.id} className={`leccion-fila ${l.completada ? "completada" : ""}`}>
                  {l.completada ? (
                    <span className="marca-completada" aria-hidden="true"><Check /></span>
                  ) : (
                    <span className="dot" aria-hidden="true" />
                  )}
                  <Link to={`/lecciones/${l.id}`} className="leccion-nombre">{l.nombre}</Link>
                  {l.completada && <span className="sr-only">(completada)</span>}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

function Esqueleto() {
  return (
    <div className="lista-planes" aria-hidden="true">
      {[0, 1, 2].map((i) => <div key={i} className="plan esqueleto" />)}
    </div>
  );
}
