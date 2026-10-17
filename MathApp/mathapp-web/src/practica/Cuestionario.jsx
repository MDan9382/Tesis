import { useState } from "react";
import katex from "katex";
import ContenidoMarkdown from "../componentes/ContenidoMarkdown";
import { Check } from "../componentes/Iconos";
import { calificar, instanciar, leerNumero, puntaje } from "./formato";

/**
 * Muestra las preguntas de un ejercicio o prueba, recoge las respuestas y,
 * al entregar, las califica. Cada vez que se monta genera números nuevos.
 *
 * props:
 *  - analisis: resultado de analizarContenido()
 *  - revisado: si true, muestra resultados (lo controla el padre)
 *  - onCalificado({ correctas, total, puntaje }): al entregar
 *  - etiquetaEntregar: texto del botón
 *  - ocultarBoton: el padre muestra su propio botón (pruebas con tiempo)
 *  - refEntregar: el padre puede llamar a refEntregar.current(forzar)
 */
export default function Cuestionario({ analisis, revisado, onCalificado, etiquetaEntregar = "Comprobar respuestas", ocultarBoton, refEntregar }) {
  // Los números se eligen una sola vez por intento (el padre cambia la "key" para otro intento).
  const [instancias] = useState(() => analisis.preguntas.map((p) => instanciar(p.def)));
  const [respuestas, setRespuestas] = useState({});
  const [aviso, setAviso] = useState(null);
  const [resultados, setResultados] = useState(null);

  const sinResponder = instancias.filter((_, i) => respuestas[i] === undefined || respuestas[i] === "").length;

  function entregar(forzar = false) {
    if (sinResponder > 0 && !forzar) {
      setAviso(sinResponder);
      return false;
    }
    setAviso(null);
    const res = instancias.map((p, i) => calificar(p, respuestas[i]));
    const correctas = res.filter((r) => r.correcta).length;
    setResultados(res);
    onCalificado({ correctas, total: instancias.length, puntaje: puntaje(correctas, instancias.length) });
    return true;
  }
  if (refEntregar) refEntregar.current = entregar;

  let indice = -1;
  return (
    <div className="cuestionario">
      {analisis.partes.map((parte, k) => {
        if (parte.tipo === "texto") {
          return <div key={k} className="cuestionario-texto"><ContenidoMarkdown texto={parte.markdown} /></div>;
        }
        indice += 1;
        const i = indice;
        return (
          <Pregunta
            key={k}
            numero={i + 1}
            pregunta={instancias[i]}
            respuesta={respuestas[i]}
            onResponder={(v) => { setRespuestas((r) => ({ ...r, [i]: v })); setAviso(null); }}
            resultado={revisado ? resultados?.[i] : null}
          />
        );
      })}

      {!revisado && aviso !== null && (
        <div className="aviso-faltan" role="alert">
          <span>Te {aviso === 1 ? "falta 1 pregunta" : `faltan ${aviso} preguntas`} por responder.</span>
          <button type="button" className="enlace" onClick={() => entregar(true)}>Entregar de todos modos</button>
        </div>
      )}
      {!revisado && !ocultarBoton && (
        <button type="button" className="boton boton-primario boton-ancho" onClick={() => entregar()}>
          {etiquetaEntregar}
        </button>
      )}
    </div>
  );
}

function Pregunta({ numero, pregunta: p, respuesta, onResponder, resultado }) {
  const estado = resultado ? (resultado.correcta ? "correcta" : "incorrecta") : "";
  const nombre = `pregunta-${numero}`;
  return (
    <fieldset className={`tarjeta pregunta ${estado}`}>
      <legend className="sr-only">Pregunta {numero}</legend>
      <div className="pregunta-cabecera">
        <span className="pregunta-numero">{numero}</span>
        <div className="pregunta-enunciado"><ContenidoMarkdown texto={p.enunciado} fraccionesGrandes /></div>
      </div>

      {p.tipo === "opcion" ? (
        <div className="opciones" role="radiogroup" aria-label={`Opciones de la pregunta ${numero}`}>
          {p.opciones.map((o) => {
            const elegida = respuesta === o.id;
            const marca = resultado && (o.correcta ? "es-correcta" : elegida ? "es-incorrecta" : "");
            return (
              <label key={o.id} className={`opcion ${elegida ? "elegida" : ""} ${marca}`}>
                <input type="radio" name={nombre} checked={elegida} disabled={!!resultado}
                  onChange={() => onResponder(o.id)} />
                <span className="opcion-texto"><ContenidoMarkdown texto={o.texto} fraccionesGrandes /></span>
              </label>
            );
          })}
        </div>
      ) : (
        <CampoNumero tipo={p.tipo} valor={respuesta ?? ""} onCambiar={onResponder} bloqueado={!!resultado} id={nombre} />
      )}

      {resultado && (
        <div className={`retro ${estado}`} role="status">
          <p className="retro-titulo">
            {resultado.correcta
              ? <><span className="marca-completada" aria-hidden="true"><Check /></span> ¡Correcto!</>
              : <>✗ Incorrecto</>}
          </p>
          {!resultado.correcta && (
            <div className="retro-correcta">
              <span>Respuesta correcta:</span>
              <ContenidoMarkdown texto={resultado.respuestaCorrecta} fraccionesGrandes />
            </div>
          )}
          {p.explicacion && <div className="retro-explicacion"><ContenidoMarkdown texto={p.explicacion} fraccionesGrandes /></div>}
        </div>
      )}
    </fieldset>
  );
}

/** Campo para escribir una fracción o un número, con vista previa de la fracción. */
function CampoNumero({ tipo, valor, onCambiar, bloqueado, id }) {
  const lectura = valor ? leerNumero(valor, { soloFraccion: tipo === "fraccion" }) : null;
  let vista = null;
  if (lectura && !lectura.error && lectura.d !== undefined && lectura.d !== 1) {
    vista = katex.renderToString(`\\frac{${lectura.n}}{${lectura.d}}`, { throwOnError: false });
  }
  return (
    <div className="campo-respuesta">
      <label htmlFor={id} className="sr-only">Tu respuesta</label>
      <input
        id={id}
        type="text"
        inputMode={tipo === "fraccion" ? "text" : "decimal"}
        autoComplete="off"
        value={valor}
        disabled={bloqueado}
        placeholder={tipo === "fraccion" ? "Escribe la fracción, ej. 3/4" : "Escribe tu respuesta"}
        onChange={(e) => onCambiar(e.target.value)}
        maxLength={20}
      />
      {vista && <span className="vista-fraccion" aria-hidden="true" dangerouslySetInnerHTML={{ __html: vista }} />}
      {lectura?.error && !bloqueado && <p className="campo-ayuda">{lectura.error}</p>}
    </div>
  );
}
