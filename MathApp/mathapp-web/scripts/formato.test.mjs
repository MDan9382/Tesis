import { Racional, evaluar } from "../src/practica/racional.js";
import { analizarContenido, instanciar, calificar, leerNumero, puntaje, ErrorFormato } from "../src/practica/formato.js";
let f = 0; const ok = (c, m) => { console.log((c ? "OK   " : "FAIL ") + m); if (!c) f++; };
const lanza = (fn, re) => { try { fn(); return false; } catch (e) { return re ? re.test(e.message) : true; } };

// Evaluador
ok(evaluar("3*k / (5*k)", { k: 2 }).toString() === "3/5", "3k/5k = 3/5");
ok(evaluar("1/3 + 1/6").toString() === "1/2", "1/3 + 1/6 = 1/2 exacto");
ok(evaluar("2^3 - -1").toString() === "9", "potencias y menos unario");
ok(evaluar("12 ÷ 4 × 3").toString() === "9", "símbolos × y ÷");
ok(evaluar("mcd(12, 18) + mcm(4, 6)").toString() === "18", "mcd 6 + mcm 12");
ok(evaluar("2.5 * 2").toString() === "5", "decimales");
ok(evaluar("(1 + 2) * (3 - 1)").toString() === "6", "paréntesis");
ok(lanza(() => evaluar("1/0"), /cero/), "división entre cero");
ok(lanza(() => evaluar("x + 1"), /sin definir/), "variable sin definir");
ok(lanza(() => evaluar("alert(1)"), /desconocida/), "funciones arbitrarias rechazadas");
ok(lanza(() => evaluar("2 +")), "expresión incompleta");
ok(lanza(() => evaluar("2 ; 3")), "carácter inválido");

// Lectura de respuestas
ok(leerNumero(" 6 / 10 ").valor.toString() === "3/5", "lee '6 / 10'");
ok(leerNumero("2,5").valor.toString() === "5/2", "lee coma decimal");
ok(leerNumero("3/0").error, "denominador 0 es error");
ok(leerNumero("abc").error && leerNumero("", {}) === null, "texto no numérico");
ok(leerNumero("2.5", { soloFraccion: true }).error, "fracción no acepta decimal");

// Parser
const contenido = `# Mi ejercicio

Intro en **Markdown**.

\`\`\`pregunta
tipo: fraccion
variables: a = 1..4, k = 2|3
enunciado: Amplifica $\\frac{[[a]]}{7}$ por [[k]].
numerador: a*k
denominador: 7*k
forma: exacta
explicacion: Da $\\frac{[[a*k]]}{[[7*k]]}$
\`\`\`

Texto entre preguntas.

\`\`\`pregunta
tipo: opcion
enunciado: ¿Cuál es equivalente a $\\frac{1}{2}$?
Piensa: multiplica arriba y abajo.
opciones:
- [x] $\\frac{2}{4}$
- [ ] $\\frac{2}{3}$
- $\\frac{1}{3}$
mezclar: no
\`\`\`

\`\`\`pregunta
tipo: numero
variables: k = 2..5
enunciado: Completa $\\frac{2}{5} = \\frac{?}{[[5*k]]}$
respuesta: 2*k
\`\`\`
`;
const r = analizarContenido(contenido);
ok(r.titulo === "Mi ejercicio", "título desde # encabezado");
ok(r.preguntas.length === 3 && r.partes.filter((p) => p.tipo === "texto").length === 2, "3 preguntas y 2 textos en orden");
ok(r.preguntas[1].def.enunciado.includes("Piensa: multiplica"), "enunciado de varias líneas (con ':' dentro)");

const q1 = instanciar(r.preguntas[0].def, () => 0); // a=1, k=2
ok(q1.enunciado === "Amplifica $\\frac{1}{7}$ por 2." && q1.explicacion === "Da $\\frac{2}{14}$", "sustituye [[...]]");
ok(calificar(q1, "2/14").correcta, "exacta: 2/14 correcta");
ok(!calificar(q1, "1/7").correcta, "exacta: 1/7 (equivalente pero no amplificada) incorrecta");
ok(!calificar(q1, "4/28").correcta, "exacta: 4/28 incorrecta");
ok(calificar(q1, "-2/-14").correcta, "exacta acepta signos dobles");
ok(calificar(q1, "1/7").respuestaCorrecta === "$\\frac{2}{14}$", "muestra respuesta correcta");

const q2 = instanciar(r.preguntas[1].def, Math.random);
ok(q2.opciones.map((o) => o.id).join() === "0,1,2", "mezclar: no conserva el orden");
ok(calificar(q2, 0).correcta && !calificar(q2, 1).correcta && !calificar(q2, 2).correcta, "opción correcta por id");

const q3 = instanciar(r.preguntas[2].def, () => 0.999); // k=5
ok(q3.enunciado.includes("\\frac{?}{25}"), "variable al máximo del rango");
ok(calificar(q3, "10").correcta && !calificar(q3, "9").correcta && calificar(q3, "20/2").correcta, "número: 10 = 20/2");

// Irreducible / equivalente
const irr = analizarContenido("```pregunta\ntipo: fraccion\nenunciado: Simplifica 12/18\nnumerador: 12\ndenominador: 18\nforma: irreducible\n```").preguntas[0].def;
const qi = instanciar(irr);
ok(calificar(qi, "2/3").correcta && !calificar(qi, "4/6").correcta && !calificar(qi, "12/18").correcta, "irreducible: solo 2/3");
ok(calificar(qi, "4/6").respuestaCorrecta === "$\\frac{2}{3}$", "irreducible muestra 2/3");
const eq = instanciar(analizarContenido("```pregunta\ntipo: fraccion\nenunciado: x\nnumerador: 1\ndenominador: 2\n```").preguntas[0].def);
ok(calificar(eq, "3/6").correcta && calificar(eq, "1/2").correcta && !calificar(eq, "1/3").correcta, "equivalente: 3/6 vale");
ok(!calificar(eq, "").correcta && !calificar(eq, "hola").correcta, "vacío o texto = incorrecta");

// Tolerancia
const tol = instanciar(analizarContenido("```pregunta\ntipo: numero\nenunciado: π aprox\nrespuesta: 3.1416\ntolerancia: 0.01\n```").preguntas[0].def);
ok(calificar(tol, "3.14").correcta && !calificar(tol, "3.1").correcta, "tolerancia 0.01");

// Mezcla al azar cambia el orden alguna vez
const def4 = analizarContenido("```pregunta\ntipo: opcion\nenunciado: x\nopciones:\n- [x] a\n- [ ] b\n- [ ] c\n- [ ] d\n```").preguntas[0].def;
const ordenes = new Set(Array.from({ length: 30 }, () => instanciar(def4).opciones.map((o) => o.id).join()));
ok(ordenes.size > 1, `las opciones se mezclan (${ordenes.size} órdenes distintos)`);

// Errores de formato
const malo = (t) => { try { analizarContenido(t); return null; } catch (e) { return e instanceof ErrorFormato ? e.message : "OTRO:" + e.message; } };
ok(/tipo/.test(malo("```pregunta\nenunciado: x\n```")), "falta tipo → " + malo("```pregunta\nenunciado: x\n```"));
ok(/exactamente 1/.test(malo("```pregunta\ntipo: opcion\nenunciado: x\nopciones:\n- [x] a\n- [x] b\n```")), "dos correctas → error");
ok(/sin definir/.test(malo("```pregunta\ntipo: numero\nenunciado: x\nrespuesta: z+1\n```")), "variable sin definir → " + malo("```pregunta\ntipo: numero\nenunciado: x\nrespuesta: z+1\n```"));
ok(/denominador da 0|cero/.test(malo("```pregunta\ntipo: fraccion\nvariables: k = 0..3\nenunciado: x\nnumerador: 1\ndenominador: k\n```")), "denominador 0 con algún valor → error");
ok(/clave desconocida "respuestta"/.test(malo("```pregunta\ntipo: numero\nrespuestta: 2\n```")), "clave mal escrita → error claro");
ok(/sin cerrar/.test(malo("```pregunta\ntipo: numero\nenunciado: x\nrespuesta: 1")), "bloque sin cerrar → error");
ok(/rango/.test(malo("```pregunta\ntipo: numero\nvariables: k = 5..2\nenunciado: x\nrespuesta: k\n```")), "rango al revés → error");
ok(/clave desconocida "explicasion"/.test(malo("```pregunta\ntipo: numero\nenunciado: x\nexplicasion: y\nrespuesta: 1\n```")), "clave mal escrita tras enunciado → error");
ok(malo("```pregunta\ntipo: numero\nenunciado: Lee:\nNota: usa enteros.\nrespuesta: 1\n```") === null, "'Nota:' dentro del enunciado se permite");
ok(puntaje(3, 4) === 75 && puntaje(2, 3) === 67 && puntaje(0, 0) === 0, "puntaje 0-100");
console.log(f === 0 ? "TODO OK" : f + " FALLOS"); process.exit(f);
