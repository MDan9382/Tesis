# Cómo escribir ejercicios y pruebas

`Ejercicio_Contenido` y `Prueba_Contenido` son texto en **Markdown** (igual que las
lecciones) con las preguntas escritas en bloques especiales. El frontend lee esos
bloques, genera los números, muestra las preguntas y califica.

Ejemplos completos: `datos_prueba/ejercicio_fracciones_equivalentes.md` y
`datos_prueba/prueba_fracciones.md`.

## Estructura

````markdown
# Título del ejercicio

Texto de introducción (opcional). En las pruebas se muestra antes de comenzar.

```pregunta
tipo: fraccion
enunciado: Simplifica $\frac{12}{18}$.
numerador: 2
denominador: 3
forma: irreducible
explicacion: Divide arriba y abajo entre 6.
```

```pregunta
...otra pregunta...
```
````

- La primera línea `# ...` es el **título** que aparece en la lista de Prácticas.
- Cada pregunta va entre ` ```pregunta ` y ` ``` `.
- Puede haber texto en Markdown entre las preguntas.
- Cada pregunta vale lo mismo. El puntaje es el porcentaje de aciertos (0 a 100).

## Claves de cada pregunta

| Clave | Para | Descripción |
|---|---|---|
| `tipo` | todas | `opcion`, `fraccion` o `numero` |
| `enunciado` | todas | La pregunta (Markdown y fórmulas). Puede ocupar varias líneas. |
| `explicacion` | todas (opcional) | Se muestra al revisar. Puede ocupar varias líneas. |
| `variables` | todas (opcional) | Números que cambian en cada intento (ver abajo). |
| `opciones` | opcion | Lista de opciones; la correcta lleva `[x]`. |
| `mezclar` | opcion (opcional) | `no` para mantener el orden (útil en Sí/No). Por defecto se mezclan. |
| `numerador`, `denominador` | fraccion | La respuesta (pueden ser expresiones). |
| `forma` | fraccion (opcional) | `equivalente` (por defecto), `irreducible` o `exacta`. |
| `respuesta` | numero | El número correcto (puede ser expresión). |
| `tolerancia` | numero (opcional) | Margen aceptado, p. ej. `0.01`. Por defecto debe ser exacto. |

### Tipo `opcion`

```pregunta
tipo: opcion
enunciado: ¿Cuál es equivalente a $\frac{1}{2}$?
opciones:
- [x] $\frac{2}{4}$
- [ ] $\frac{2}{3}$
- [ ] $\frac{1}{3}$
```

Exactamente una opción debe llevar `[x]`.

### Tipo `fraccion`

El estudiante escribe una fracción como `3/4`. Con `forma` decides qué se acepta:

| forma | Respuesta 6/8 a "¿cuánto es 3/4?" | Úsala para |
|---|---|---|
| `equivalente` | ✓ correcta (vale lo mismo) | "Escribe una fracción equivalente…" |
| `irreducible` | ✗ (hay que simplificar a 3/4) | "Simplifica hasta que sea irreducible" |
| `exacta` | ✗ (debe ser justo 6/8 si se pidió 6/8) | "Amplifica multiplicando por 2" |

### Tipo `numero`

El estudiante escribe un número: `12`, `2.5`, `2,5` o `5/2` (todos se aceptan).

## Números que cambian en cada intento (requisito 13)

```pregunta
tipo: fraccion
variables: a = 1..4, k = 2..6
enunciado: Amplifica $\frac{[[a]]}{7}$ multiplicando por [[k]].
numerador: a*k
denominador: 7*k
forma: exacta
explicacion: $\frac{[[a]] \times [[k]]}{7 \times [[k]]} = \frac{[[a*k]]}{[[7*k]]}$
```

- `variables`: `nombre = mínimo..máximo` o una lista `nombre = 2|3|5`, separadas por comas.
- En los textos, `[[expresión]]` se reemplaza por su resultado: `[[a*k]]` → `6`.
- En `numerador`, `denominador` y `respuesta` se escriben expresiones sin corchetes.
- Operaciones: `+ - * / ^ ( )` y las funciones `mcd(a, b)`, `mcm(a, b)`, `abs(x)`.
  Los cálculos son exactos con fracciones: `1/3 + 1/6` da `1/2`.

Ejemplo con `mcd` (simplificar cualquier fracción):

```
variables: n = 1..4, d = 5..9, k = 2..5
enunciado: Simplifica $\frac{[[n*k]]}{[[d*k]]}$
numerador: n / mcd(n, d)
denominador: d / mcd(n, d)
forma: irreducible
```

## Revisar antes de guardar

Guarda el contenido en un archivo `.md` y ejecuta en la carpeta `mathapp-web`:

```bash
npm run validar -- ruta/al/ejercicio.md
```

Revisa el formato, genera 200 versiones de cada pregunta y confirma que la respuesta
correcta siempre se califica como correcta. Si hay un error, la app también lo muestra
al abrir el ejercicio, con el número de pregunta y qué falta.

## Al guardar en MySQL

Dentro de un `INSERT`, las barras invertidas van dobles (`\\frac`). Si pegas el texto en
el editor de celdas de MySQL Workbench no hace falta duplicarlas.

## Seguridad

Las respuestas correctas viajan al navegador porque el frontend califica. Un estudiante
con conocimientos técnicos podría verlas o enviar un puntaje falso. Para el alcance del
proyecto es aceptable; si se necesitara evitarlo, la calificación tendría que hacerse
en el backend.
