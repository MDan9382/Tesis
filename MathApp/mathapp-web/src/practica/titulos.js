import { analizarContenido } from "./formato.js";

/** Título del contenido (# Título) o un texto por defecto si no tiene o tiene errores. */
export function tituloDe(contenido, porDefecto) {
  try {
    return analizarContenido(contenido).titulo ?? porDefecto;
  } catch {
    return porDefecto;
  }
}

/** Mejor puntaje por id a partir de una lista de resultados. */
export function mejoresPuntajes(resultados, campoId) {
  const mejores = new Map();
  for (const r of resultados) {
    if (r.puntaje == null) continue;
    const id = r[campoId];
    mejores.set(id, Math.max(mejores.get(id) ?? -1, r.puntaje));
  }
  return mejores;
}
