// Genera un archivo SQL por plan a partir de las carpetas de contenido.
//   node generar_sql.mjs   → crea sql/1_aritmetica.sql, sql/2_algebra.sql, …
import fs from "node:fs";
import path from "node:path";
import { leerPlanes } from "./leer_contenido.mjs";

const raiz = new URL(".", import.meta.url).pathname;
const salida = path.join(raiz, "sql");
fs.mkdirSync(salida, { recursive: true });

// Texto como literal de MySQL: se escapan \ y ' y los saltos de línea.
const q = (s) => "'" + s.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/\r?\n/g, "\\n") + "'";

for (const plan of leerPlanes(raiz)) {
  const lineas = [
    "-- =====================================================================",
    `-- Plan de estudio: ${plan.nombre}`,
    "-- Fuente: GUATEMÁTICA Primero Básico (MINEDUC). Contenido resumido y adaptado.",
    "-- Generado con contenido_libro/generar_sql.mjs: edita los .md y vuelve a generar.",
    "-- Requiere sugerencias_bd.sql y cambios_pruebas_y_orden.sql (nombres más largos y orden).",
    "-- Cada ejecución crea filas nuevas: ejecútalo una sola vez.",
    "-- =====================================================================",
    "SET NAMES utf8mb4;",
    "START TRANSACTION;",
    "",
    `INSERT INTO Planes_Estudio (Plan_Nombre, Plan_Descripcion) VALUES (${q(plan.nombre)}, ${q(plan.descripcion)});`,
    "SET @plan_id = LAST_INSERT_ID();",
  ];
  plan.temas.forEach((tema, ti) => {
    lineas.push("", `-- Tema ${ti + 1}: ${tema.nombre}`,
      `INSERT INTO Temas (Tema_Nombre, Tema_Orden, Plan_Id) VALUES (${q(tema.nombre)}, ${(ti + 1) * 10}, @plan_id);`,
      "SET @tema_id = LAST_INSERT_ID();");
    tema.lecciones.forEach((l, li) => {
      lineas.push("", `-- Lección ${ti + 1}.${li + 1}: ${l.nombre}`,
        `INSERT INTO Lecciones (Leccion_Nombre, Leccion_Contenido, Leccion_Orden, Tema_Id) VALUES (${q(l.nombre)}, ${q(l.contenido)}, ${(li + 1) * 10}, @tema_id);`,
        `INSERT INTO Ejercicios (Ejercicio_Contenido, Ejercicio_EsPrueba, Leccion_Id) VALUES (${q(l.ejercicio)}, FALSE, LAST_INSERT_ID());`);
    });
  });
  lineas.push("", "COMMIT;", "",
    "SELECT p.Plan_Id, p.Plan_Nombre, COUNT(DISTINCT t.Tema_Id) AS Temas, COUNT(DISTINCT l.Leccion_Id) AS Lecciones, COUNT(e.Ejercicio_Id) AS Ejercicios",
    "FROM Planes_Estudio p JOIN Temas t ON t.Plan_Id = p.Plan_Id JOIN Lecciones l ON l.Tema_Id = t.Tema_Id",
    "LEFT JOIN Ejercicios e ON e.Leccion_Id = l.Leccion_Id WHERE p.Plan_Id = @plan_id GROUP BY p.Plan_Id, p.Plan_Nombre;", "");
  const archivo = path.join(salida, `${plan.carpeta}.sql`);
  fs.writeFileSync(archivo, lineas.join("\n"));
  console.log(`${path.basename(archivo)}: ${plan.temas.length} temas, ${plan.temas.reduce((s, t) => s + t.lecciones.length, 0)} lecciones`);
}
