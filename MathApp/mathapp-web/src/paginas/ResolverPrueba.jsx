import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../api/cliente";
import { useCarga } from "../api/useCarga";
import ContenidoMarkdown from "../componentes/ContenidoMarkdown";
import ErrorEnLinea from "../componentes/ErrorEnLinea";
import PantallaCarga from "../componentes/PantallaCarga";
import { TIEMPO_PRUEBA_MINUTOS } from "../config";
import Cuestionario from "../practica/Cuestionario";
import ErrorDeFormato from "../practica/ErrorDeFormato";
import { analizarContenido } from "../practica/formato";
import { NoEncontrado, Resumen } from "./ResolverEjercicio";
import "../estilos/lecciones.css";
import "../estilos/practicas.css";

export default function ResolverPrueba() {
  const { id } = useParams();
  const { datos, error, recargar } = useCarga(async () => {
    const prueba = await api(`/api/pruebas/${id}`);
    const [tema, previos] = await Promise.all([
      api(`/api/temas/${prueba.temaId}`), api(`/api/pruebas/${id}/resultados`),
    ]);
    return { prueba, tema, previos };
  }, [id]);

  if (error?.estado === 404) return <NoEncontrado />;
  if (error) return <ErrorEnLinea mensaje={error.message} onReintentar={recargar} />;
  if (!datos) return <PantallaCarga texto="Cargando prueba…" />;
  return <Prueba key={id} {...datos} />;
}

function Prueba({ prueba, tema, previos }) {
  const [analisis] = useState(() => {
    try { return analizarContenido(prueba.contenido); } catch (e) { return { error: e.message }; }
  });
  // fase: "inicio" → "en-curso" → "terminada"
  const [fase, setFase] = useState("inicio");
  const [intento, setIntento] = useState(0);
  const [fin, setFin] = useState(null);
  const [resultado, setResultado] = useState(null);
  const [porTiempo, setPorTiempo] = useState(false);
  const [guardado, setGuardado] = useState(null);
  const [mejor, setMejor] = useState(previos.mejorPuntaje);
  const refEntregar = useRef(null);

  const titulo = analisis.titulo ?? `Prueba: ${tema.nombre}`;
  // El texto antes de la primera pregunta se muestra en la pantalla de inicio.
  const [{ introduccion, analisisSinIntro }] = useState(() => {
    const intro = analisis.partes?.[0]?.tipo === "texto" ? analisis.partes[0].markdown : null;
    return { introduccion: intro, analisisSinIntro: intro ? { ...analisis, partes: analisis.partes.slice(1) } : analisis };
  });

  function comenzar() {
    setResultado(null);
    setGuardado(null);
    setPorTiempo(false);
    setIntento((n) => n + 1);
    setFin(Date.now() + TIEMPO_PRUEBA_MINUTOS * 60_000);
    setFase("en-curso");
    window.scrollTo(0, 0);
  }

  async function alCalificar(r) {
    setResultado(r);
    setFase("terminada");
    window.scrollTo({ top: 0, behavior: "smooth" });
    try {
      await api(`/api/pruebas/${prueba.id}/resultados`, { metodo: "POST", cuerpo: { puntaje: r.puntaje } });
      setGuardado("ok");
      setMejor((m) => Math.max(m ?? 0, r.puntaje));
    } catch (e) {
      setGuardado(`Tu puntaje no se pudo guardar: ${e.message}`);
    }
  }

  const tiempoAgotado = useCallback(() => {
    setPorTiempo(true);
    refEntregar.current?.(true);
  }, []);

  // Aviso del navegador si intenta cerrar o recargar a mitad de la prueba.
  useEffect(() => {
    if (fase !== "en-curso") return;
    const avisar = (e) => { e.preventDefault(); e.returnValue = ""; };
    window.addEventListener("beforeunload", avisar);
    return () => window.removeEventListener("beforeunload", avisar);
  }, [fase]);

  return (
    <article className="practica">
      <nav className="migas" aria-label="Ubicación">
        <Link to="/practicas">Prácticas</Link><span aria-hidden="true">/</span><span>{tema.nombre}</span>
      </nav>
      <header className="leccion-cabecera">
        <h1>{titulo}</h1>
        <div className="leccion-meta">
          {!analisis.error && <span>{analisis.preguntas.length} preguntas</span>}
          <span>{TIEMPO_PRUEBA_MINUTOS} minutos</span>
          {mejor != null && <span>Mejor puntaje: {mejor}</span>}
        </div>
      </header>

      {analisis.error && <ErrorDeFormato mensaje={analisis.error} />}

      {!analisis.error && fase === "inicio" && (
        <div className="tarjeta inicio-prueba">
          {introduccion && <ContenidoMarkdown texto={introduccion} />}
          <ul className="datos-prueba">
            <li><strong>{analisis.preguntas.length}</strong> preguntas</li>
            <li><strong>{TIEMPO_PRUEBA_MINUTOS}</strong> minutos para terminar</li>
            <li>Tus respuestas se revisan al <strong>entregar</strong></li>
          </ul>
          <button className="boton boton-primario boton-ancho" onClick={comenzar}>
            {previos.intentos.length > 0 ? "Intentar de nuevo" : "Comenzar prueba"}
          </button>
        </div>
      )}

      {!analisis.error && fase !== "inicio" && (
        <>
          {resultado && (
            <Resumen resultado={resultado} guardado={guardado} onOtraVez={comenzar}
              mensajeExtra={porTiempo ? "Se acabó el tiempo: la prueba se entregó automáticamente." : null} />
          )}
          <Cuestionario key={intento} analisis={analisisSinIntro} revisado={fase === "terminada"}
            onCalificado={alCalificar} ocultarBoton refEntregar={refEntregar} />
          {fase === "en-curso" && (
            <BarraTiempo fin={fin} onAgotado={tiempoAgotado} onEntregar={() => refEntregar.current?.()} />
          )}
          {fase === "terminada" && (
            <div className="fila-botones fila-final">
              <button className="boton boton-primario" onClick={comenzar}>Intentar de nuevo</button>
              <Link className="boton boton-secundario" to="/practicas">Volver a Prácticas</Link>
            </div>
          )}
        </>
      )}
    </article>
  );
}

/** Barra fija abajo con el tiempo restante y el botón Entregar. */
function BarraTiempo({ fin, onAgotado, onEntregar }) {
  const [restante, setRestante] = useState(() => Math.max(0, fin - Date.now()));
  const avisado = useRef(false);

  useEffect(() => {
    const t = setInterval(() => {
      const r = Math.max(0, fin - Date.now());
      setRestante(r);
      if (r === 0 && !avisado.current) {
        avisado.current = true;
        onAgotado();
      }
    }, 250);
    return () => clearInterval(t);
  }, [fin, onAgotado]);

  const seg = Math.ceil(restante / 1000);
  const texto = `${Math.floor(seg / 60)}:${String(seg % 60).padStart(2, "0")}`;
  const poco = seg <= 60;
  return (
    <div className="barra-tiempo" role="region" aria-label="Tiempo de la prueba">
      <div className="barra-tiempo-interior">
        <span className={`reloj ${poco ? "poco" : ""}`} role="timer" aria-live={poco ? "polite" : "off"}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="13" r="8" /><path d="M12 9v4l2 2M9 2h6" /></svg>
          {texto}
        </span>
        <button className="boton boton-primario" onClick={onEntregar}>Entregar</button>
      </div>
    </div>
  );
}
