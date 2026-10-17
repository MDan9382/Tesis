import { Racional, evaluar, mcd } from "./racional.js";

/*
 * FORMATO DE EJERCICIOS Y PRUEBAS
 * ===============================
 * Ejercicio_Contenido y Prueba_Contenido son Markdown normal. Cada pregunta se
 * escribe en un bloque que empieza con ```pregunta y termina con ```:
 *
 *   ```pregunta
 *   tipo: fraccion
 *   variables: a = 1..4, k = 2..6
 *   enunciado: Amplifica $\frac{[[a]]}{7}$ multiplicando por [[k]].
 *   numerador: a*k
 *   denominador: 7*k
 *   forma: exacta
 *   explicacion: $\frac{[[a]] \times [[k]]}{7 \times [[k]]} = \frac{[[a*k]]}{[[7*k]]}$
 *   ```
 *
 * Ver docs/FORMATO_PREGUNTAS.md para todos los tipos y opciones.
 */

export class ErrorFormato extends Error {}

const TIPOS = ["opcion", "fraccion", "numero"];
const FORMAS = ["equivalente", "irreducible", "exacta"];
const MULTILINEA = ["enunciado", "explicacion"];
// Una línea "palabra: ..." sin espacios antes, con una palabra parecida a una clave
// (p. ej. "respuestta:") se reporta como error en vez de unirse al texto.
const esClaveProbable = (palabra) => CLAVES.some((c) => distancia(c, palabra.toLowerCase()) <= 2);
function distancia(a, b) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
}
const CLAVES = ["tipo", "variables", "enunciado", "opciones", "numerador", "denominador", "respuesta",
  "forma", "tolerancia", "explicacion", "mezclar"];

/**
 * Separa el contenido en título, bloques de texto y definiciones de preguntas.
 * Lanza ErrorFormato con un mensaje claro si algo está mal escrito.
 */
export function analizarContenido(texto) {
  let resto = (texto ?? "").replace(/\r\n/g, "\n");
  let titulo = null;
  const mTitulo = /^\s*#\s+(.+)\n?/.exec(resto);
  if (mTitulo) {
    titulo = mTitulo[1].trim();
    resto = resto.slice(mTitulo[0].length);
  }

  const partes = [];
  const re = /^```pregunta[ \t]*\n([\s\S]*?)^```[ \t]*$/gm;
  let ultimo = 0;
  let m;
  let numero = 0;
  while ((m = re.exec(resto))) {
    const antes = resto.slice(ultimo, m.index).trim();
    if (antes) partes.push({ tipo: "texto", markdown: antes });
    numero += 1;
    partes.push({ tipo: "pregunta", numero, def: analizarPregunta(m[1], numero) });
    ultimo = re.lastIndex;
  }
  const final = resto.slice(ultimo).trim();
  if (final) partes.push({ tipo: "texto", markdown: final });
  if (/```pregunta/.test(final)) throw new ErrorFormato("Hay un bloque ```pregunta sin cerrar (falta ``` al final).");

  return { titulo, partes, preguntas: partes.filter((p) => p.tipo === "pregunta") };
}

function analizarPregunta(bloque, numero) {
  const error = (msg) => new ErrorFormato(`Pregunta ${numero}: ${msg}`);
  const def = { opciones: [] };
  let clave = null;

  for (const linea of bloque.split("\n")) {
    const mClave = /^([a-záéíóú]+):\s?(.*)$/i.exec(linea);
    const mOpcion = /^\s*-\s+(?:\[([ xX])\]\s+)?(.*)$/.exec(linea);
    if (mClave && CLAVES.includes(mClave[1].toLowerCase())) {
      clave = mClave[1].toLowerCase();
      if (clave !== "opciones") def[clave] = mClave[2].trim();
    } else if (clave === "opciones" && mOpcion) {
      def.opciones.push({ texto: mOpcion[2].trim(), correcta: (mOpcion[1] ?? "").toLowerCase() === "x" });
    } else if (MULTILINEA.includes(clave) && linea.trim() !== "" && !(mClave && !mOpcion && /^\S/.test(linea) && esClaveProbable(mClave[1]))) {
      def[clave] += "\n" + linea; // continuación de un valor de varias líneas
    } else if (linea.trim() !== "") {
      throw error(mClave
        ? `clave desconocida "${mClave[1]}". Las válidas son: ${CLAVES.join(", ")}.`
        : `no se entiende la línea "${linea.trim()}".`);
    }
  }

  def.tipo = (def.tipo ?? "").toLowerCase();
  if (!TIPOS.includes(def.tipo)) throw error(`"tipo" debe ser ${TIPOS.join(", ")}.`);
  if (!def.enunciado) throw error(`falta "enunciado".`);
  def.variables = analizarVariables(def.variables ?? "", error);
  def.forma = (def.forma ?? "equivalente").toLowerCase();
  def.mezclar = (def.mezclar ?? "si").toLowerCase() !== "no";

  if (def.tipo === "opcion") {
    if (def.opciones.length < 2) throw error("necesita al menos 2 opciones.");
    const correctas = def.opciones.filter((o) => o.correcta).length;
    if (correctas !== 1) throw error(`debe tener exactamente 1 opción marcada con [x] (tiene ${correctas}).`);
  }
  if (def.tipo === "fraccion") {
    if (!def.numerador || !def.denominador) throw error(`falta "numerador" o "denominador".`);
    if (!FORMAS.includes(def.forma)) throw error(`"forma" debe ser ${FORMAS.join(", ")}.`);
  }
  if (def.tipo === "numero") {
    if (!def.respuesta) throw error(`falta "respuesta".`);
    def.tolerancia = def.tolerancia ? Number(def.tolerancia.replace(",", ".")) : 0;
    if (Number.isNaN(def.tolerancia)) throw error(`"tolerancia" debe ser un número.`);
  }

  // Prueba de que todas las expresiones se pueden calcular con valores de ejemplo.
  for (const fijo of [0, 0.25, 0.5, 0.75, 0.999]) {
    try {
      instanciar(def, () => fijo);
    } catch (e) {
      throw error(e.message);
    }
  }
  return def;
}

/** "a = 1..4, k = 2|3|5" → { a: [1,2,3,4], k: [2,3,5] } */
function analizarVariables(texto, error) {
  const vars = {};
  if (!texto.trim()) return vars;
  for (const parte of texto.split(",")) {
    const m = /^\s*([A-Za-z_]\w*)\s*=\s*(.+?)\s*$/.exec(parte);
    if (!m) throw error(`variable mal escrita: "${parte.trim()}". Usa por ejemplo "k = 2..6" o "k = 2|3|5".`);
    const [, nombre, rango] = m;
    let valores;
    const mRango = /^(-?\d+)\s*\.\.\s*(-?\d+)$/.exec(rango);
    if (mRango) {
      const [a, b] = [Number(mRango[1]), Number(mRango[2])];
      if (a > b) throw error(`el rango de "${nombre}" está al revés (${rango}).`);
      valores = Array.from({ length: b - a + 1 }, (_, i) => a + i);
    } else if (/^-?\d+(\s*\|\s*-?\d+)*$/.test(rango)) {
      valores = rango.split("|").map((v) => Number(v.trim()));
    } else {
      throw error(`valores de "${nombre}" no válidos: "${rango}".`);
    }
    vars[nombre] = valores;
  }
  return vars;
}

function sustituir(texto, valores) {
  return (texto ?? "").replace(/\[\[([^\]]+)\]\]/g, (_, expr) => evaluar(expr, valores).toString());
}

function mezclarArreglo(arreglo, azar) {
  const a = [...arreglo];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(azar() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Genera una versión concreta de la pregunta: elige valores para las
 * variables, sustituye [[...]] en los textos y calcula la respuesta correcta.
 */
export function instanciar(def, azar = Math.random) {
  const valores = {};
  for (const [nombre, lista] of Object.entries(def.variables)) {
    valores[nombre] = lista[Math.floor(azar() * lista.length)];
  }
  const p = {
    tipo: def.tipo,
    forma: def.forma,
    enunciado: sustituir(def.enunciado, valores),
    explicacion: def.explicacion ? sustituir(def.explicacion, valores) : null,
  };
  if (def.tipo === "opcion") {
    const opciones = def.opciones.map((o, i) => ({ id: i, texto: sustituir(o.texto, valores), correcta: o.correcta }));
    p.opciones = def.mezclar ? mezclarArreglo(opciones, azar) : opciones;
  } else if (def.tipo === "fraccion") {
    const n = evaluar(def.numerador, valores);
    const d = evaluar(def.denominador, valores);
    if (!n.esEntero() || !d.esEntero()) throw new Error("numerador y denominador deben dar números enteros.");
    if (d.n === 0) throw new Error("el denominador da 0 con algunos valores.");
    p.numerador = n.n;
    p.denominador = d.n;
  } else {
    p.respuesta = evaluar(def.respuesta, valores);
    p.tolerancia = def.tolerancia;
  }
  return p;
}

/** Interpreta lo que escribió el estudiante: "3/4", "-2", "2.5", "2,5". */
export function leerNumero(texto, { soloFraccion = false } = {}) {
  const t = (texto ?? "").trim().replace(/\s+/g, "").replace(",", ".");
  if (!t) return null;
  const mf = /^(-?\d+)\/(-?\d+)$/.exec(t);
  if (mf) {
    const [n, d] = [Number(mf[1]), Number(mf[2])];
    if (d === 0) return { error: "El denominador no puede ser 0." };
    return { n, d, valor: new Racional(n, d) };
  }
  if (/^-?\d+$/.test(t)) return { n: Number(t), d: 1, valor: new Racional(Number(t)) };
  if (!soloFraccion && /^-?\d+\.\d+$/.test(t)) return { valor: Racional.desdeDecimal(t) };
  return { error: soloFraccion ? "Escribe la fracción así: 3/4" : "Escribe un número, por ejemplo 12, 2.5 o 3/4." };
}

/** Califica una respuesta. Devuelve { correcta, respuestaCorrecta (texto para mostrar) }. */
export function calificar(p, respuesta) {
  if (p.tipo === "opcion") {
    const correcta = p.opciones.find((o) => o.correcta);
    return { correcta: respuesta === correcta.id, respuestaCorrecta: correcta.texto };
  }
  if (p.tipo === "fraccion") {
    const esperada = new Racional(p.numerador, p.denominador);
    const textoEsperado = p.forma === "exacta"
      ? `$\\frac{${p.numerador}}{${p.denominador}}$`
      : `$\\frac{${esperada.n}}{${esperada.d}}$`;
    const r = leerNumero(respuesta, { soloFraccion: true });
    if (!r || r.error) return { correcta: false, respuestaCorrecta: textoEsperado };
    let correcta = r.valor.igual(esperada);
    if (correcta && p.forma === "irreducible") correcta = mcd(r.n, r.d) === 1;
    if (correcta && p.forma === "exacta") {
      const signo = r.d < 0 ? -1 : 1;
      correcta = r.n * signo === p.numerador && r.d * signo === p.denominador;
    }
    return { correcta, respuestaCorrecta: textoEsperado };
  }
  const r = leerNumero(respuesta);
  const texto = p.respuesta.esEntero() ? String(p.respuesta.n) : `$\\frac{${p.respuesta.n}}{${p.respuesta.d}}$`;
  if (!r || r.error) return { correcta: false, respuestaCorrecta: texto };
  const correcta = p.tolerancia > 0
    ? Math.abs(r.valor.valor() - p.respuesta.valor()) <= p.tolerancia + 1e-12
    : r.valor.igual(p.respuesta);
  return { correcta, respuestaCorrecta: texto };
}

/** Puntaje de 0 a 100 a partir de cuántas preguntas fueron correctas. */
export function puntaje(correctas, total) {
  return total === 0 ? 0 : Math.round((correctas / total) * 100);
}
