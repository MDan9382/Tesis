// Revisa un ejercicio o prueba escrito en Markdown ANTES de guardarlo en la base de datos.
//   npm run validar -- ruta/al/archivo.md
// Comprueba el formato, genera 200 versiones de cada pregunta con números al azar
// y verifica que la respuesta correcta siempre se califique como correcta.
import fs from "node:fs";
import { analizarContenido, instanciar, calificar } from "../src/practica/formato.js";
import { Racional } from "../src/practica/racional.js";

const archivo = process.argv[2];
if (!archivo) {
  console.error("Uso: npm run validar -- archivo.md");
  process.exit(2);
}

let analisis;
try {
  analisis = analizarContenido(fs.readFileSync(archivo, "utf8"));
} catch (e) {
  console.error(`✗ Error de formato: ${e.message}`);
  process.exit(1);
}

console.log(`Título: ${analisis.titulo ?? "(sin título: agrega una línea '# Título' al inicio)"}`);
console.log(`Preguntas: ${analisis.preguntas.length}\n`);
let problemas = 0;

for (const { numero, def } of analisis.preguntas) {
  const versiones = new Set();
  let fallos = 0;
  for (let i = 0; i < 200; i++) {
    const p = instanciar(def);
    versiones.add(p.enunciado + JSON.stringify(p.opciones?.map((o) => o.texto).sort()));
    let correcta;
    if (p.tipo === "opcion") {
      correcta = p.opciones.find((o) => o.correcta).id;
      if (new Set(p.opciones.map((o) => o.texto)).size !== p.opciones.length) {
        console.log(`  ⚠ Pregunta ${numero}: con algunos valores dos opciones se ven iguales.`);
        fallos++;
      }
    } else if (p.tipo === "fraccion") {
      const r = new Racional(p.numerador, p.denominador);
      correcta = p.forma === "exacta" ? `${p.numerador}/${p.denominador}` : `${r.n}/${r.d}`;
    } else {
      correcta = p.respuesta.toString();
    }
    if (!calificar(p, correcta).correcta) fallos++;
  }
  const ejemplo = instanciar(def);
  const resp = ejemplo.tipo === "opcion" ? ejemplo.opciones.find((o) => o.correcta).texto
    : ejemplo.tipo === "fraccion" ? `${ejemplo.numerador}/${ejemplo.denominador}` : ejemplo.respuesta.toString();
  console.log(`${fallos ? "✗" : "✓"} Pregunta ${numero} (${def.tipo}) — ${versiones.size} versiones distintas`);
  console.log(`    Ejemplo: ${ejemplo.enunciado.replace(/\n/g, " ")}`);
  console.log(`    Respuesta: ${resp}`);
  if (fallos) problemas++;
}
console.log(problemas ? `\n✗ ${problemas} pregunta(s) con problemas.` : "\n✓ Todo listo para guardarse en la base de datos.");
process.exit(problemas ? 1 : 0);
