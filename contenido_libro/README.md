# Contenido del libro GUATEMÁTICA Primero Básico

Contenido resumido y adaptado del texto **GUATEMÁTICA, Primero Básico (MINEDUC)** para la
app: 4 planes de estudio (unidades del libro), 14 temas (secciones), 44 lecciones (clases)
y un ejercicio por lección (máximo 5 preguntas).

## Cargar en la base de datos

Ejecuta en MySQL Workbench, **una sola vez cada uno** (cada ejecución crea filas nuevas):

1. `sql/1_aritmetica.sql`
2. `sql/2_algebra.sql`
3. `sql/3_geometria.sql`
4. `sql/4_estadistica.sql`

Necesitan que antes se hayan aplicado `sugerencias_bd.sql` (nombres de tema y lección más
largos) y `cambios_pruebas_y_orden.sql` (columnas de orden). Cada script usa una transacción:
si algo falla, no se guarda nada a medias. Al final muestra cuántos temas, lecciones y
ejercicios creó.

## Contenido

| Plan | Temas (secciones del libro) | Lecciones |
|---|---|---|
| Aritmética (Unidad 1) | Números naturales · Números positivos y negativos · Suma y resta de enteros · Multiplicación de enteros | 14 |
| Álgebra (Unidad 2) | Expresiones algebraicas · Ecuaciones de primer grado · Razones y proporciones · Porcentajes | 14 |
| Geometría (Unidad 5) | Elementos de línea y ángulo · Ángulos y bisectriz · Cuadriláteros · Triángulos | 11 |
| Estadística (Unidad 6) | Organización de datos · Medidas de tendencia central | 5 |

No se incluyeron Función (Unidad 3), Etnomatemática (Unidad 4) ni Lógica (Unidad 7) porque
dependen de gráficas, diagramas o del ábaco maya, que la app todavía no muestra.

## Editar el contenido

Cada carpeta es un plan (`plan.txt` tiene nombre y descripción) y cada `.md` es un tema:

```
=== TEMA: Nombre del tema ===
=== LECCION: Nombre de la lección ===
(contenido de la lección en Markdown)
=== EJERCICIO ===
(ejercicio en el formato de mathapp-web/docs/FORMATO_PREGUNTAS.md)
=== LECCION: Siguiente lección ===
…
```

Después de editar, en esta carpeta:

```bash
node validar.mjs       # revisa formato y que cada respuesta correcta se califique bien
node generar_sql.mjs   # vuelve a generar los archivos de sql/
```
