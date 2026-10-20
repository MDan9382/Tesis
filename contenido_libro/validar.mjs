// Valida todos los ejercicios con el mismo motor que usa la app.
import { leerPlanes } from "./leer_contenido.mjs";
import { analizarContenido, instanciar, calificar } from "../mathapp-web/src/practica/formato.js";
import { Racional } from "../mathapp-web/src/practica/racional.js";

let fallos = 0, preguntas = 0;
const planes = leerPlanes(new URL(".", import.meta.url).pathname);
for (const plan of planes) {
  console.log(`\n${plan.nombre} — ${plan.temas.length} temas`);
  for (const tema of plan.temas) {
    console.log(`  ${tema.nombre} (${tema.lecciones.length} lecciones)`);
    for (const l of tema.lecciones) {
      const avisos = [];
      if (l.nombre.length > 100) avisos.push("nombre > 100");
      let a;
      try { a = analizarContenido(l.ejercicio); } catch (e) { avisos.push(e.message); }
      if (a) {
        if (a.preguntas.length > 5) avisos.push(`${a.preguntas.length} preguntas (máximo 5)`);
        if (!a.titulo) avisos.push("ejercicio sin título");
        for (const { numero, def } of a.preguntas) {
          preguntas++;
          for (let i = 0; i < 100; i++) {
            const p = instanciar(def);
            let ok;
            if (p.tipo === "opcion") ok = calificar(p, p.opciones.find((o) => o.correcta).id).correcta
              && new Set(p.opciones.map((o) => o.texto)).size === p.opciones.length;
            else if (p.tipo === "fraccion") { const r = new Racional(p.numerador, p.denominador);
              ok = calificar(p, p.forma === "exacta" ? `${p.numerador}/${p.denominador}` : `${r.n}/${r.d}`).correcta; }
            else ok = calificar(p, p.respuesta.esEntero() ? String(p.respuesta.n) : String(p.respuesta.valor())).correcta;
            if (!ok) { avisos.push(`pregunta ${numero} no se califica bien: ${p.enunciado}`); break; }
          }
        }
      }
      console.log(`    ${avisos.length ? "✗" : "✓"} ${l.nombre}${a ? ` — ${a.preguntas.length} preguntas` : ""}${avisos.length ? "\n      " + avisos.join("\n      ") : ""}`);
      if (avisos.length) fallos++;
    }
  }
}
const n = (f) => planes.reduce((s, p) => s + f(p), 0);
console.log(`\n${planes.length} planes, ${n((p) => p.temas.length)} temas, ${n((p) => p.temas.reduce((s, t) => s + t.lecciones.length, 0))} lecciones, ${preguntas} preguntas`);
console.log(fallos ? `✗ ${fallos} lecciones con problemas` : "✓ Todo válido");
process.exit(fallos ? 1 : 0);
