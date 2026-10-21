// Reporte de progreso en PDF, generado en el navegador (no pasa por el backend).
// jsPDF se importa al presionar el botón, así no pesa en la carga de la página.

const AZUL_NAV = [29, 78, 216];
const AZUL_TITULO = [30, 58, 138];
const AZUL_BORDE = [219, 234, 254];
const AZUL_FONDO = [239, 246, 255];
const GRIS_TEXTO = [107, 114, 128];
const GRIS_LINEA = [229, 231, 235];
const VERDE = [22, 163, 74];
const VERDE_FONDO = [220, 252, 231];
const AMBAR = [217, 119, 6];
const ROJO = [220, 38, 38];

/**
 * Genera y descarga el PDF.
 * @param {object} progreso respuesta de GET /api/yo/progreso
 * @param {{nombre?: string, correo?: string}} estudiante
 */
export async function descargarReporte(progreso, estudiante, ahora = new Date()) {
  const doc = await crearReporte(progreso, estudiante, ahora);
  doc.save(`reporte-progreso-${fechaArchivo(ahora)}.pdf`);
}

export async function crearReporte({ totales, planes, historial }, estudiante = {}, ahora = new Date()) {
  const [{ jsPDF }, { autoTable }] = await Promise.all([import("jspdf"), import("jspdf-autotable")]);
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const ancho = doc.internal.pageSize.getWidth();
  const M = 16; // margen
  const util = ancho - 2 * M;
  doc.setProperties({ title: "Reporte de progreso", subject: "MatemáticaApp", author: estudiante.nombre ?? "" });

  // Encabezado
  doc.setFillColor(...AZUL_NAV);
  doc.rect(0, 0, ancho, 26, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold").setFontSize(16);
  doc.text("MatemáticaApp", M, 12);
  doc.setFont("helvetica", "normal").setFontSize(10);
  doc.text("Reporte de progreso y estadísticas", M, 19);
  doc.text(`Generado: ${fechaLarga(ahora)}`, ancho - M, 19, { align: "right" });

  // Estudiante
  let y = 38;
  doc.setTextColor(...AZUL_TITULO).setFont("helvetica", "bold").setFontSize(14);
  doc.text(limpiar(estudiante.nombre || "Estudiante"), M, y);
  if (estudiante.correo) {
    doc.setFont("helvetica", "normal").setFontSize(10).setTextColor(...GRIS_TEXTO);
    doc.text(limpiar(estudiante.correo), M, y + 6);
    y += 6;
  }

  // Indicadores
  y += 8;
  const tiles = [
    ["Lecciones completadas", String(totales.leccionesCompletadas), ""],
    ["Prácticas realizadas", String(totales.practicasRealizadas), ""],
    ["Puntaje promedio", totales.puntajePromedio != null ? String(totales.puntajePromedio) : "–", totales.puntajePromedio != null ? "/100" : ""],
  ];
  const sep = 5, wTile = (util - 2 * sep) / 3, hTile = 22;
  tiles.forEach(([etiqueta, valor, sufijo], i) => {
    const x = M + i * (wTile + sep);
    doc.setFillColor(255, 255, 255).setDrawColor(...AZUL_BORDE).setLineWidth(0.3);
    doc.roundedRect(x, y, wTile, hTile, 2.5, 2.5, "FD");
    doc.setFont("helvetica", "normal").setFontSize(9).setTextColor(...GRIS_TEXTO);
    doc.text(etiqueta, x + 5, y + 7);
    doc.setFont("helvetica", "bold").setFontSize(20).setTextColor(...AZUL_TITULO);
    doc.text(valor, x + 5, y + 17);
    if (sufijo) {
      const w = doc.getTextWidth(valor);
      doc.setFont("helvetica", "normal").setFontSize(10).setTextColor(...GRIS_TEXTO);
      doc.text(sufijo, x + 6 + w, y + 17);
    }
  });
  y += hTile + 12;

  // Avance por plan
  y = tituloSeccion(doc, "Plan de estudio", M, y);
  if (planes.length === 0) {
    doc.setFont("helvetica", "normal").setFontSize(10).setTextColor(...GRIS_TEXTO);
    doc.text("No tienes planes activos.", M, y + 2);
    y += 10;
  } else {
    for (const p of planes) {
      y = saltoSiHaceFalta(doc, y, 18);
      doc.setFont("helvetica", "bold").setFontSize(10.5).setTextColor(...AZUL_TITULO);
      doc.text(limpiar(p.nombre), M, y);
      doc.text(`${p.porcentaje}%`, ancho - M, y, { align: "right" });
      y += 3;
      doc.setFillColor(...VERDE_FONDO).roundedRect(M, y, util, 3.5, 1.75, 1.75, "F");
      if (p.porcentaje > 0) doc.setFillColor(...VERDE).roundedRect(M, y, Math.max(3.5, util * p.porcentaje / 100), 3.5, 1.75, 1.75, "F");
      y += 8;
      doc.setFont("helvetica", "normal").setFontSize(9).setTextColor(...GRIS_TEXTO);
      doc.text(p.totalLecciones === 0
        ? "Este plan todavía no tiene lecciones."
        : `${p.leccionesCompletadas} de ${p.totalLecciones} ${p.totalLecciones === 1 ? "lección completada" : "lecciones completadas"}`, M, y);
      y += 9;
    }
  }

  // Historial
  y = saltoSiHaceFalta(doc, y + 2, 30);
  y = tituloSeccion(doc, "Ejercicios y pruebas completados", M, y);
  if (historial.length === 0) {
    doc.setFont("helvetica", "normal").setFontSize(10).setTextColor(...GRIS_TEXTO);
    doc.text("Todavía no has resuelto ejercicios.", M, y + 2);
  } else {
    const filas = [...historial]
      .sort((a, b) => tiempo(b) - tiempo(a))
      .map((r) => [
        fechaCorta(r.fecha),
        r.tipo === "prueba" ? "Prueba" : "Ejercicio",
        limpiar(r.titulo ?? (r.tipo === "prueba" ? `Prueba: ${r.contexto}` : `Ejercicio de ${r.contexto}`)),
        limpiar(r.contexto),
        r.puntaje ?? "–",
      ]);
    autoTable(doc, {
      startY: y - 2,
      margin: { left: M, right: M, top: 20, bottom: 18 },
      head: [["Fecha", "Tipo", "Actividad", "Tema / lección", "Puntaje"]],
      body: filas,
      theme: "grid",
      styles: { font: "helvetica", fontSize: 9, cellPadding: 2.2, textColor: [55, 65, 81], lineColor: GRIS_LINEA, lineWidth: 0.2, valign: "middle" },
      headStyles: { fillColor: AZUL_FONDO, textColor: AZUL_TITULO, fontStyle: "bold", lineColor: AZUL_BORDE },
      columnStyles: { 0: { cellWidth: 30 }, 1: { cellWidth: 20 }, 4: { cellWidth: 18, halign: "center", fontStyle: "bold" } },
      didParseCell: (d) => {
        if (d.section === "body" && d.column.index === 4) {
          const n = Number(d.cell.raw);
          d.cell.styles.textColor = Number.isNaN(n) ? GRIS_TEXTO : n >= 70 ? VERDE : n >= 40 ? AMBAR : ROJO;
        }
      },
    });
  }

  // Pie con número de página
  const paginas = doc.getNumberOfPages();
  const alto = doc.internal.pageSize.getHeight();
  for (let i = 1; i <= paginas; i++) {
    doc.setPage(i);
    doc.setDrawColor(...GRIS_LINEA).setLineWidth(0.2).line(M, alto - 12, ancho - M, alto - 12);
    doc.setFont("helvetica", "normal").setFontSize(8).setTextColor(...GRIS_TEXTO);
    doc.text(`MatemáticaApp · ${limpiar(estudiante.nombre || "Estudiante")}`, M, alto - 7);
    doc.text(`Página ${i} de ${paginas}`, ancho - M, alto - 7, { align: "right" });
  }
  return doc;
}

function tituloSeccion(doc, texto, x, y) {
  doc.setFont("helvetica", "bold").setFontSize(12).setTextColor(...AZUL_TITULO);
  doc.text(texto, x, y);
  return y + 8;
}

function saltoSiHaceFalta(doc, y, necesario) {
  if (y + necesario <= doc.internal.pageSize.getHeight() - 18) return y;
  doc.addPage();
  return 24;
}

const tiempo = (r) => (r.fecha ? new Date(r.fecha).getTime() : 0);

/**
 * Las fuentes estándar del PDF solo tienen caracteres latinos (bien para
 * el español). Se quitan fórmulas LaTeX y símbolos fuera de ese rango.
 */
export function limpiar(texto = "") {
  return String(texto)
    .replace(/[\u00A0\u202F]/g, " ")
    .replace(/\\d?frac\{([^{}]*)\}\{([^{}]*)\}/g, "$1/$2")
    .replace(/\\times/g, "×").replace(/\\div/g, "÷").replace(/\\cdot/g, "·")
    .replace(/\\[a-zA-Z]+/g, "").replace(/[$*_{}]/g, "")
    .replace(/[−–—]/g, (c) => (c === "−" ? "-" : c))
    .replace(/[^\u0000-ÿ–—‘’“”•…€™]/g, "")
    .replace(/\s+/g, " ").trim();
}

const espacios = (s) => s.replace(/[\u00A0\u202F]/g, " ");
function fechaLarga(d) {
  return espacios(d.toLocaleDateString("es-GT", { day: "numeric", month: "long", year: "numeric" }) +
    ", " + d.toLocaleTimeString("es-GT", { hour: "numeric", minute: "2-digit" }));
}
function fechaCorta(iso) {
  if (!iso) return "Sin fecha";
  const d = new Date(iso);
  return espacios(d.toLocaleDateString("es-GT", { day: "2-digit", month: "short", year: "numeric" }).replace(".", "") +
    " " + d.toLocaleTimeString("es-GT", { hour: "2-digit", minute: "2-digit", hour12: false }));
}
function fechaArchivo(d) {
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}
