import { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/cliente";
import { useCarga } from "../api/useCarga";
import Anillo from "../componentes/Anillo";
import EncabezadoPagina from "../componentes/EncabezadoPagina";
import ErrorEnLinea from "../componentes/ErrorEnLinea";
import { Chevron } from "../componentes/Iconos";
import { mejoresPuntajes, tituloDe } from "../practica/titulos";
import "../estilos/plan.css";
import "../estilos/lecciones.css";
import "../estilos/practicas.css";

/** Módulo de Prácticas: ejercicios de cada lección y pruebas de cada tema. */
export default function Practicas() {
  const { datos, error, recargar } = useCarga(async () => {
    const [planes, mios, perfil] = await Promise.all([
      api("/api/planes"), api("/api/yo/planes?soloActivos=true"), api("/api/yo/perfil"),
    ]);
    const ids = new Set(mios.map((m) => m.planId));
    const activos = planes.filter((p) => ids.has(p.id));
    const temas = await Promise.all(activos.map((p) => api(`/api/planes/${p.id}/temas`)));
    return {
      grupos: activos.map((plan, i) => ({ plan, temas: temas[i] })),
      mejoresEj: mejoresPuntajes(perfil.ejercicios, "ejercicioId"),
      mejoresPr: mejoresPuntajes(perfil.pruebas, "pruebaId"),
    };
  }, []);

  return (
    <>
      <EncabezadoPagina
        titulo="Prácticas"
        descripcion="Resuelve ejercicios de cada lección y pon a prueba lo que sabes de cada tema."
      />
      {error && <ErrorEnLinea mensaje={error.message} onReintentar={recargar} />}
      {!error && !datos && <div className="lista-planes" aria-hidden="true">{[0, 1].map((i) => <div key={i} className="plan esqueleto" />)}</div>}
      {datos?.grupos.length === 0 && (
        <div className="tarjeta vacio-tarjeta">
          <p className="vacio-titulo">Aún no tienes planes de estudio activos</p>
          <p className="texto-suave">Activa un plan para ver aquí sus ejercicios y pruebas.</p>
          <Link to="/plan" className="boton boton-primario">Ir a Plan de estudio</Link>
        </div>
      )}
      {datos?.grupos.map(({ plan, temas }) => (
        <section key={plan.id} className="grupo-plan" aria-label={plan.nombre}>
          {datos.grupos.length > 1 && <h2 className="seccion-titulo">{plan.nombre}</h2>}
          {temas.length === 0
            ? <div className="tarjeta"><p className="texto-suave">Este plan todavía no tiene temas.</p></div>
            : <div className="lista-planes">
                {temas.map((t) => <TemaPracticas key={t.id} tema={t} mejoresEj={datos.mejoresEj} mejoresPr={datos.mejoresPr} />)}
              </div>}
        </section>
      ))}
    </>
  );
}

function TemaPracticas({ tema, mejoresEj, mejoresPr }) {
  const [abierto, setAbierto] = useState(false);
  const [datos, setDatos] = useState(null);
  const [error, setError] = useState(null);

  async function cargar() {
    setError(null);
    try {
      const [lecciones, pruebas] = await Promise.all([
        api(`/api/temas/${tema.id}/lecciones`), api(`/api/temas/${tema.id}/pruebas`),
      ]);
      const ejercicios = await Promise.all(lecciones.map((l) => api(`/api/lecciones/${l.id}/ejercicios`)));
      setDatos({ lecciones: lecciones.map((l, i) => ({ ...l, ejercicios: ejercicios[i] })), pruebas });
    } catch (e) {
      setError(e.message);
    }
  }

  function alternar() {
    setAbierto(!abierto);
    if (!abierto && !datos) cargar();
  }

  const conEjercicios = datos?.lecciones.filter((l) => l.ejercicios.length > 0) ?? [];
  const id = `practica-tema-${tema.id}`;

  return (
    <section className="plan">
      <button type="button" className={`tema-tarjeta-header ${abierto ? "abierto" : ""}`}
        onClick={alternar} aria-expanded={abierto} aria-controls={id}>
        <span className="plan-titulo">{tema.nombre}</span>
        <span className={`chevron ${abierto ? "abierto" : ""}`}><Chevron /></span>
      </button>
      {abierto && (
        <div className="tema-contenido" id={id}>
          {error && <div className="plan-aviso"><ErrorEnLinea mensaje={error} onReintentar={cargar} /></div>}
          {!error && !datos && <p className="vacio">Cargando…</p>}
          {datos && conEjercicios.length === 0 && datos.pruebas.length === 0 && (
            <p className="vacio">Este tema todavía no tiene ejercicios ni pruebas.</p>
          )}
          {conEjercicios.map((l) => (
            <div key={l.id} className="practica-leccion">
              <p className="practica-leccion-nombre">{l.nombre}</p>
              <ul>
                {l.ejercicios.map((e, i) => (
                  <li key={e.id}>
                    <Link to={`/practicas/ejercicios/${e.id}`} className="practica-fila">
                      <Anillo puntaje={mejoresEj.get(e.id)} tamano={40} />
                      <span className="practica-fila-textos">
                        <span className="practica-fila-titulo">{tituloDe(e.contenido, `Ejercicio ${i + 1}`)}</span>
                        <span className="practica-fila-meta">
                          {mejoresEj.has(e.id) ? `Mejor puntaje: ${mejoresEj.get(e.id)}` : "Sin intentos"}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {datos?.pruebas.map((p, i) => (
            <Link key={p.id} to={`/practicas/pruebas/${p.id}`} className="prueba-bloque practica-prueba">
              <Anillo puntaje={mejoresPr.get(p.id)} tamano={40} />
              <span className="practica-fila-textos">
                <span className="prueba-label">{tituloDe(p.contenido, `Prueba ${i + 1}: ${tema.nombre}`)}</span>
                <span className="practica-fila-meta">
                  {mejoresPr.has(p.id) ? `Mejor puntaje: ${mejoresPr.get(p.id)}` : "Sin intentos"}
                </span>
              </span>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
