// Números racionales exactos (fracciones) y evaluador de expresiones.
// Se usan para calcular respuestas sin errores de redondeo: 1/3 + 1/6 = 1/2 exacto.

export function mcd(a, b) {
  a = Math.abs(a); b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a;
}

export class Racional {
  constructor(n, d = 1) {
    if (d === 0) throw new Error("División entre cero");
    if (!Number.isInteger(n) || !Number.isInteger(d)) throw new Error("Racional requiere enteros");
    if (d < 0) { n = -n; d = -d; }
    const g = mcd(n, d) || 1;
    this.n = n / g;
    this.d = d / g;
  }
  static de(valor) {
    if (valor instanceof Racional) return valor;
    if (Number.isInteger(valor)) return new Racional(valor, 1);
    throw new Error(`No es un número entero: ${valor}`);
  }
  /** "2.5" → 5/2 ; "3" → 3/1 */
  static desdeDecimal(texto) {
    const m = /^(-?)(\d+)(?:\.(\d+))?$/.exec(texto);
    if (!m) throw new Error(`Número no válido: ${texto}`);
    const dec = m[3] ?? "";
    const n = Number(m[2] + dec) * (m[1] ? -1 : 1);
    return new Racional(n, 10 ** dec.length);
  }
  suma(o) { return new Racional(this.n * o.d + o.n * this.d, this.d * o.d); }
  resta(o) { return new Racional(this.n * o.d - o.n * this.d, this.d * o.d); }
  por(o) { return new Racional(this.n * o.n, this.d * o.d); }
  entre(o) {
    if (o.n === 0) throw new Error("División entre cero");
    return new Racional(this.n * o.d, this.d * o.n);
  }
  potencia(o) {
    if (o.d !== 1) throw new Error("Solo se permiten potencias enteras");
    const e = o.n;
    const r = new Racional(this.n ** Math.abs(e), this.d ** Math.abs(e));
    return e < 0 ? new Racional(1).entre(r) : r;
  }
  igual(o) { return this.n === o.n && this.d === o.d; }
  esEntero() { return this.d === 1; }
  valor() { return this.n / this.d; }
  toString() { return this.d === 1 ? String(this.n) : `${this.n}/${this.d}`; }
}

const FUNCIONES = {
  mcd: (a, b) => new Racional(mcd(entero(a), entero(b))),
  mcm: (a, b) => new Racional(Math.abs(entero(a) * entero(b)) / mcd(entero(a), entero(b))),
  abs: (a) => new Racional(Math.abs(a.n), a.d),
};
function entero(r) {
  if (!r.esEntero()) throw new Error("mcd y mcm solo aceptan enteros");
  return r.n;
}

/**
 * Evalúa una expresión aritmética con variables, de forma segura (sin eval).
 * Soporta + - * / ^ ( ), × ÷, decimales y las funciones mcd, mcm, abs.
 *   evaluar("3*k / (5*k)", { k: 2 })  →  Racional 3/5
 */
export function evaluar(expresion, variables = {}) {
  const tokens = tokenizar(expresion);
  let i = 0;
  const ver = () => tokens[i];
  const tomar = (esperado) => {
    const t = tokens[i++];
    if (esperado && t?.v !== esperado) throw new Error(`Se esperaba "${esperado}" en: ${expresion}`);
    return t;
  };

  function expr() {
    let r = term();
    while (ver()?.v === "+" || ver()?.v === "-") r = tomar().v === "+" ? r.suma(term()) : r.resta(term());
    return r;
  }
  function term() {
    let r = factor();
    while (ver()?.v === "*" || ver()?.v === "/") r = tomar().v === "*" ? r.por(factor()) : r.entre(factor());
    return r;
  }
  function factor() {
    if (ver()?.v === "-") { tomar(); return new Racional(0).resta(factor()); }
    if (ver()?.v === "+") { tomar(); return factor(); }
    const base = atomo();
    if (ver()?.v === "^") { tomar(); return base.potencia(factor()); }
    return base;
  }
  function atomo() {
    const t = tomar();
    if (!t) throw new Error(`Expresión incompleta: ${expresion}`);
    if (t.tipo === "num") return Racional.desdeDecimal(t.v);
    if (t.tipo === "id") {
      if (ver()?.v === "(") {
        const f = FUNCIONES[t.v];
        if (!f) throw new Error(`Función desconocida "${t.v}"`);
        tomar("(");
        const args = [expr()];
        while (ver()?.v === ",") { tomar(); args.push(expr()); }
        tomar(")");
        return f(...args);
      }
      if (!(t.v in variables)) throw new Error(`Variable sin definir "${t.v}"`);
      return Racional.de(variables[t.v]);
    }
    if (t.v === "(") { const r = expr(); tomar(")"); return r; }
    throw new Error(`Símbolo inesperado "${t.v}" en: ${expresion}`);
  }

  const resultado = expr();
  if (i < tokens.length) throw new Error(`Sobra "${tokens[i].v}" en: ${expresion}`);
  return resultado;
}

function tokenizar(texto) {
  const tokens = [];
  const re = /\s*(?:(\d+(?:\.\d+)?)|([A-Za-zÁÉÍÓÚáéíóúñÑ_]\w*)|([-+*/^(),×÷]))/y;
  let m;
  let pos = 0;
  while (pos < texto.length) {
    re.lastIndex = pos;
    if (/^\s*$/.test(texto.slice(pos))) break;
    m = re.exec(texto);
    if (!m) throw new Error(`Carácter no válido en: ${texto}`);
    if (m[1]) tokens.push({ tipo: "num", v: m[1] });
    else if (m[2]) tokens.push({ tipo: "id", v: m[2] });
    else tokens.push({ tipo: "op", v: m[3] === "×" ? "*" : m[3] === "÷" ? "/" : m[3] });
    pos = re.lastIndex;
  }
  return tokens;
}
