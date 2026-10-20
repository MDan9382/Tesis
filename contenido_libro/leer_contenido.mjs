// Lee las carpetas de contenido: cada carpeta es un plan (plan.txt) y cada .md un tema
// con sus lecciones (=== LECCION: … ===) y ejercicios (=== EJERCICIO ===).
import fs from "node:fs";
import path from "node:path";

export function leerPlanes(raiz) {
  return fs.readdirSync(raiz).filter((d) => /^\d+_/.test(d) && fs.statSync(path.join(raiz, d)).isDirectory()).sort()
    .map((carpeta, i) => {
      const meta = Object.fromEntries(fs.readFileSync(path.join(raiz, carpeta, "plan.txt"), "utf8")
        .split("\n").filter(Boolean).map((l) => [l.slice(0, l.indexOf(":")).trim(), l.slice(l.indexOf(":") + 1).trim()]));
      const temas = fs.readdirSync(path.join(raiz, carpeta)).filter((f) => f.endsWith(".md")).sort()
        .map((archivo) => leerTema(path.join(raiz, carpeta, archivo)));
      return { carpeta, orden: (i + 1) * 10, nombre: meta.nombre, descripcion: meta.descripcion, temas };
    });
}

function leerTema(ruta) {
  const texto = fs.readFileSync(ruta, "utf8");
  const mTema = /^=== TEMA: (.+?) ===\s*$/m.exec(texto);
  if (!mTema) throw new Error(`${ruta}: falta la línea "=== TEMA: … ==="`);
  const lecciones = [];
  const partes = texto.split(/^=== LECCION: (.+?) ===\s*$/m).slice(1);
  for (let i = 0; i < partes.length; i += 2) {
    const [contenido, ejercicio] = partes[i + 1].split(/^=== EJERCICIO ===\s*$/m);
    if (ejercicio === undefined) throw new Error(`${ruta}: la lección "${partes[i]}" no tiene "=== EJERCICIO ==="`);
    lecciones.push({ nombre: partes[i].trim(), contenido: contenido.trim(), ejercicio: ejercicio.trim() });
  }
  return { archivo: path.basename(ruta), nombre: mTema[1].trim(), lecciones };
}
