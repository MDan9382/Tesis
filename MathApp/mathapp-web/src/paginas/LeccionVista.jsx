import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../api/cliente";
import { useCarga } from "../api/useCarga";
import ContenidoMarkdown from "../componentes/ContenidoMarkdown";
import ErrorEnLinea from "../componentes/ErrorEnLinea";
import { Check } from "../componentes/Iconos";
import PantallaCarga from "../componentes/PantallaCarga";
import "../estilos/lecciones.css";

/**
 * Tiempo mínimo en la lección antes de marcarla como completada. Evita que una
 * lección corta (cuyo final se ve sin desplazarse) se complete con solo abrirla.
 */
const TIEMPO_MINIMO_MS = 8000;

/** La ruta /lecciones/:id: se reinicia por completo al cambiar de lección. */
export default function LeccionVista() {
  const { id } = useParams();
  return <Leccion key={id} id={Number(id)} />;
}

function Leccion({ id }) {
  const { datos, error, recargar } = useCarga(async () => {
    const leccion = await api(`/api/lecciones/${id}`);
    const [tema, ruta, ejercicios] = await Promise.all([
      api(`/api/temas/${leccion.temaId}`),
      api(`/api/temas/${leccion.temaId}/lecciones`),
      api(`/api/lecciones/${id}/ejercicios`),
    ]);
    return { leccion, tema, ruta, ejercicios };
  }, [id]);

  if (error?.estado === 404) {
    return (
      <div className="tarjeta vacio-tarjeta">
        <p className="vacio-titulo">No encontramos esta lección</p>
        <Link to="/lecciones" className="boton boton-primario">Volver a Lecciones</Link>
      </div>
    );
  }
  if (error) return <ErrorEnLinea mensaje={error.message} onReintentar={recargar} />;
  if (!datos) return <PantallaCarga texto="Cargando lección…" />;

  return <LeccionCargada {...datos} />;
}

function LeccionCargada({ leccion, tema, ruta, ejercicios }) {
  const posicion = ruta.findIndex((l) => l.id === leccion.id);
  const anterior = posicion > 0 ? ruta[posicion - 1] : null;
  const siguiente = posicion >= 0 && posicion < ruta.length - 1 ? ruta[posicion + 1] : null;
  const yaCompletada = ruta[posicion]?.completada ?? false;

  const completado = useCompletarAlTerminar(leccion.id);
  const estaCompletada = yaCompletada || completado.listo;

  useEffect(() => {
    document.title = `${leccion.nombre} · MatemáticaApp`;
    window.scrollTo(0, 0);
    return () => { document.title = "MatemáticaApp"; };
  }, [leccion.nombre]);

  return (
    <article className="leccion">
      <nav className="migas" aria-label="Ubicación">
        <Link to="/lecciones">Lecciones</Link>
        <span aria-hidden="true">/</span>
        <span>{tema.nombre}</span>
      </nav>

      <header className="leccion-cabecera">
        <h1>{leccion.nombre}</h1>
        <div className="leccion-meta">
          {posicion >= 0 && <span>Lección {posicion + 1} de {ruta.length}</span>}
          {estaCompletada && (
            <span className="pastilla-completada"><Check tamano={11} /> Completada</span>
          )}
        </div>
      </header>

      <div className="tarjeta leccion-cuerpo">
        <ContenidoMarkdown texto={leccion.contenido} />
        <div ref={completado.refFinal} aria-hidden="true" />
      </div>

      <div className={`aviso-final ${estaCompletada ? "hecho" : ""}`} role="status">
        {completado.error ? (
          <ErrorEnLinea mensaje={completado.error} onReintentar={completado.reintentar} />
        ) : estaCompletada ? (
          <>
            <span className="marca-completada grande" aria-hidden="true"><Check /></span>
            <span>{completado.listo ? "¡Lección completada! Ya aparece en tu progreso." : "Ya completaste esta lección. Puedes repasarla cuando quieras."}</span>
          </>
        ) : (
          <span>Lee la lección hasta el final para marcarla como completada.</span>
        )}
      </div>

      {ejercicios.length > 0 && (
        <Link to={ejercicios.length === 1 ? `/practicas/ejercicios/${ejercicios[0].id}` : "/practicas"} className="tarjeta practicar">
          <span>
            <span className="practicar-titulo">Practica lo aprendido</span>
            <span className="texto-suave">
              {ejercicios.length} {ejercicios.length === 1 ? "ejercicio" : "ejercicios"} de esta lección
            </span>
          </span>
          <span className="practicar-flecha" aria-hidden="true">→</span>
        </Link>
      )}

      <nav className="leccion-navegacion" aria-label="Otras lecciones del tema">
        {anterior ? (
          <Link to={`/lecciones/${anterior.id}`} className="nav-leccion">
            <span className="nav-leccion-etiqueta">← Anterior</span>
            <span className="nav-leccion-nombre">{anterior.nombre}</span>
          </Link>
        ) : <span />}
        {siguiente && (
          <Link to={`/lecciones/${siguiente.id}`} className="nav-leccion siguiente">
            <span className="nav-leccion-etiqueta">Siguiente →</span>
            <span className="nav-leccion-nombre">{siguiente.nombre}</span>
          </Link>
        )}
      </nav>
    </article>
  );
}

/**
 * Marca la lección como completada automáticamente (requisito 9) cuando el
 * estudiante llega al final del contenido y lleva al menos TIEMPO_MINIMO_MS en ella.
 * Si ya estaba completada, vuelve a registrarla (repaso, requisito 12).
 */
function useCompletarAlTerminar(leccionId) {
  const refFinal = useRef(null);
  const [vioFinal, setVioFinal] = useState(false);
  const [tiempoCumplido, setTiempoCumplido] = useState(false);
  const [listo, setListo] = useState(false);
  const [error, setError] = useState(null);
  const enviado = useRef(false);

  useEffect(() => {
    const t = setTimeout(() => setTiempoCumplido(true), TIEMPO_MINIMO_MS);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const nodo = refFinal.current;
    if (!nodo) return;
    const observador = new IntersectionObserver(([e]) => e.isIntersecting && setVioFinal(true));
    observador.observe(nodo);
    return () => observador.disconnect();
  }, []);

  async function completar() {
    enviado.current = true;
    setError(null);
    try {
      await api(`/api/lecciones/${leccionId}/completar`, { metodo: "POST" });
      setListo(true);
    } catch (e) {
      enviado.current = false;
      setError(`No se pudo guardar tu avance. ${e.message}`);
    }
  }

  useEffect(() => {
    if (vioFinal && tiempoCumplido && !enviado.current) completar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vioFinal, tiempoCumplido]);

  return { refFinal, listo, error, reintentar: completar };
}
