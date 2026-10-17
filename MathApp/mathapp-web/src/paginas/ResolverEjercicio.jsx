import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../api/cliente";
import { useCarga } from "../api/useCarga";
import Anillo from "../componentes/Anillo";
import ErrorEnLinea from "../componentes/ErrorEnLinea";
import PantallaCarga from "../componentes/PantallaCarga";
import Cuestionario from "../practica/Cuestionario";
import ErrorDeFormato from "../practica/ErrorDeFormato";
import { analizarContenido } from "../practica/formato";
import "../estilos/lecciones.css";
import "../estilos/practicas.css";

export default function ResolverEjercicio() {
  const { id } = useParams();
  const { datos, error, recargar } = useCarga(async () => {
    const ejercicio = await api(`/api/ejercicios/${id}`);
    const [leccion, previos] = await Promise.all([
      api(`/api/lecciones/${ejercicio.leccionId}`), api(`/api/ejercicios/${id}/resultados`),
    ]);
    return { ejercicio, leccion, mejorPrevio: previos.mejorPuntaje };
  }, [id]);

  if (error?.estado === 404) return <NoEncontrado />;
  if (error) return <ErrorEnLinea mensaje={error.message} onReintentar={recargar} />;
  if (!datos) return <PantallaCarga texto="Cargando ejercicio…" />;
  return <Ejercicio key={id} {...datos} />;
}

function Ejercicio({ ejercicio, leccion, mejorPrevio }) {
  const [analisis] = useState(() => {
    try { return analizarContenido(ejercicio.contenido); } catch (e) { return { error: e.message }; }
  });
  const [intento, setIntento] = useState(0);
  const [resultado, setResultado] = useState(null);
  const [guardado, setGuardado] = useState(null); // "ok" | mensaje de error
  const [mejor, setMejor] = useState(mejorPrevio);

  useEffect(() => { window.scrollTo(0, 0); }, [intento]);

  async function alCalificar(r) {
    setResultado(r);
    setGuardado(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
    try {
      await api(`/api/ejercicios/${ejercicio.id}/resultados`, { metodo: "POST", cuerpo: { puntaje: r.puntaje } });
      setGuardado("ok");
      setMejor((m) => Math.max(m ?? 0, r.puntaje));
    } catch (e) {
      setGuardado(`Tu puntaje no se pudo guardar: ${e.message}`);
    }
  }

  function otraVez() {
    setResultado(null);
    setGuardado(null);
    setIntento((n) => n + 1);
  }

  const titulo = analisis.titulo ?? "Ejercicio";
  return (
    <article className="practica">
      <nav className="migas" aria-label="Ubicación">
        <Link to="/practicas">Prácticas</Link><span aria-hidden="true">/</span>
        <Link to={`/lecciones/${leccion.id}`}>{leccion.nombre}</Link>
      </nav>
      <header className="leccion-cabecera">
        <h1>{titulo}</h1>
        <div className="leccion-meta">
          {!analisis.error && <span>{analisis.preguntas.length} preguntas</span>}
          <span>{mejor != null ? `Mejor puntaje: ${mejor}` : "Primer intento"}</span>
        </div>
      </header>

      {analisis.error ? <ErrorDeFormato mensaje={analisis.error} /> : (
        <>
          {resultado && <Resumen resultado={resultado} guardado={guardado} onOtraVez={otraVez} leccionId={leccion.id} />}
          <Cuestionario key={intento} analisis={analisis} revisado={!!resultado} onCalificado={alCalificar} />
          {resultado && (
            <div className="fila-botones fila-final">
              <button className="boton boton-primario" onClick={otraVez}>Intentar de nuevo</button>
              <Link className="boton boton-secundario" to="/practicas">Volver a Prácticas</Link>
            </div>
          )}
        </>
      )}
    </article>
  );
}

export function Resumen({ resultado, guardado, onOtraVez, leccionId, mensajeExtra }) {
  const { correctas, total, puntaje } = resultado;
  const frase = puntaje === 100 ? "¡Excelente, todo correcto!" : puntaje >= 70 ? "¡Muy bien!" : puntaje >= 40 ? "Vas por buen camino" : "Sigue practicando";
  return (
    <div className="tarjeta resumen" role="status" aria-live="polite">
      <Anillo puntaje={puntaje} tamano={72} grosor={6} />
      <div className="resumen-textos">
        {mensajeExtra && <p className="resumen-extra">{mensajeExtra}</p>}
        <p className="resumen-titulo">{frase}</p>
        <p className="texto-suave">{correctas} de {total} respuestas correctas. Revisa abajo las explicaciones.</p>
        {guardado === "ok" && <p className="resumen-guardado">Puntaje guardado en tu progreso.</p>}
        {guardado && guardado !== "ok" && <p className="resumen-error">{guardado}</p>}
        <div className="fila-botones">
          {onOtraVez && <button className="boton boton-primario" onClick={onOtraVez}>Intentar de nuevo</button>}
          {leccionId && <Link className="boton boton-secundario" to={`/lecciones/${leccionId}`}>Repasar la lección</Link>}
        </div>
      </div>
    </div>
  );
}

export function NoEncontrado() {
  return (
    <div className="tarjeta vacio-tarjeta">
      <p className="vacio-titulo">No encontramos esta práctica</p>
      <Link to="/practicas" className="boton boton-primario">Volver a Prácticas</Link>
    </div>
  );
}
