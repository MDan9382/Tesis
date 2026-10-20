=== TEMA: Triángulos ===
=== LECCION: Clasificación de triángulos por sus ángulos ===
Según la medida de sus ángulos internos, un triángulo puede ser:

| Tipo | Característica | Ejemplo |
|---|---|---|
| **Acutángulo** | Sus tres ángulos miden menos de 90° | 60°, 80°, 40° |
| **Rectángulo** | Tiene un ángulo de 90° | 40°, 90°, 50° |
| **Obtusángulo** | Tiene un ángulo mayor que 90° | 30°, 50°, 100° |

> Los triángulos **equiláteros** (tres lados iguales, cada ángulo de 60°) son acutángulos.
=== EJERCICIO ===
# Clasificación por ángulos

```pregunta
tipo: opcion
enunciado: Un triángulo tiene ángulos de 30°, 50° y 100°. ¿Qué tipo de triángulo es?
opciones:
- [ ] Acutángulo
- [ ] Rectángulo
- [x] Obtusángulo
mezclar: no
explicacion: Tiene un ángulo mayor que 90° (100°).
```

```pregunta
tipo: opcion
enunciado: Un triángulo tiene ángulos de 60°, 80° y 40°. ¿Qué tipo de triángulo es?
opciones:
- [x] Acutángulo
- [ ] Rectángulo
- [ ] Obtusángulo
mezclar: no
explicacion: Los tres ángulos son menores que 90°.
```

```pregunta
tipo: opcion
enunciado: Un triángulo tiene ángulos de 45°, 90° y 45°. ¿Qué tipo de triángulo es?
opciones:
- [ ] Acutángulo
- [x] Rectángulo
- [ ] Obtusángulo
mezclar: no
explicacion: Tiene un ángulo de 90°.
```

```pregunta
tipo: opcion
enunciado: Un triángulo equilátero es…
opciones:
- [x] Acutángulo
- [ ] Rectángulo
- [ ] Obtusángulo
mezclar: no
explicacion: Sus tres ángulos miden 60°, todos menores que 90°.
```
=== LECCION: Ángulos internos y externos de un triángulo ===
Los tres ángulos que se forman **dentro** de un triángulo son sus **ángulos internos**, y siempre suman 180°:

$$\angle a + \angle b + \angle c = 180°$$

Si se prolonga un lado, se forma un **ángulo externo** $\angle d$ junto a $\angle c$. Como juntos forman un ángulo llano, $\angle c + \angle d = 180°$. Por eso:

$$\angle d = \angle a + \angle b$$

**El ángulo externo es igual a la suma de los dos ángulos internos que no están junto a él.**

**Ejemplo:** si $\angle a = 50°$ y $\angle b = 60°$, entonces $\angle c = 70°$ y el ángulo externo $\angle d = 110°$.
=== EJERCICIO ===
# Ángulos internos y externos

```pregunta
tipo: numero
variables: a = 30..80, b = 20..70
enunciado: Dos ángulos internos de un triángulo miden [[a]]° y [[b]]°. ¿Cuánto mide el tercer ángulo? (en grados)
respuesta: 180 - a - b
explicacion: $180° - [[a]]° - [[b]]° = [[180-a-b]]°$
```

```pregunta
tipo: numero
variables: a = 30..80, b = 20..70
enunciado: Dos ángulos internos de un triángulo miden [[a]]° y [[b]]°. ¿Cuánto mide el ángulo externo junto al tercer ángulo? (en grados)
respuesta: a + b
explicacion: El ángulo externo es la suma de los dos internos no adyacentes: $[[a]]° + [[b]]° = [[a+b]]°$
```

```pregunta
tipo: numero
enunciado: ¿Cuánto suman los tres ángulos internos de cualquier triángulo? (en grados)
respuesta: 180
explicacion: La suma de los ángulos internos de un triángulo siempre es 180°.
```

```pregunta
tipo: numero
variables: c = 40..140
enunciado: Un ángulo interno de un triángulo mide [[c]]°. ¿Cuánto mide el ángulo externo que está junto a él? (en grados)
respuesta: 180 - c
explicacion: Juntos forman un ángulo llano: $180° - [[c]]° = [[180-c]]°$
```
=== LECCION: Área de triángulos ===
Dos triángulos iguales forman un paralelogramo. Por eso, el área de un triángulo es la **mitad** del área del paralelogramo:

$$\text{Área del triángulo} = \frac{\text{base} \times \text{altura}}{2}$$

**Ejemplo:** base 4 cm y altura 3 cm:

$$\frac{4 \times 3}{2} = \frac{12}{2} = 6 \text{ cm}^2$$

> **Recuerda:** la altura es perpendicular a la base.
=== EJERCICIO ===
# Área de triángulos

```pregunta
tipo: numero
variables: b = 2|4|6|8|10|12, h = 3..9
enunciado: ¿Cuál es el área de un triángulo de [[b]] cm de base y [[h]] cm de altura? (en cm²)
respuesta: b * h / 2
explicacion: $\frac{[[b]] \times [[h]]}{2} = \frac{[[b*h]]}{2} = [[b*h/2]]$ cm²
```

```pregunta
tipo: numero
enunciado: ¿Cuál es el área de un triángulo de 10 cm de base y 6 cm de altura? (en cm²)
respuesta: 30
explicacion: $\frac{10 \times 6}{2} = 30$ cm²
```

```pregunta
tipo: numero
enunciado: ¿Cuál es el área de un triángulo de 3 cm de base y 4 cm de altura? (en cm²)
respuesta: 6
explicacion: $\frac{3 \times 4}{2} = 6$ cm²
```

```pregunta
tipo: opcion
enunciado: ¿Cuál es la fórmula del área de un triángulo?
opciones:
- [x] $\frac{\text{base} \times \text{altura}}{2}$
- [ ] $\text{base} \times \text{altura}$
- [ ] $\text{base} + \text{altura}$
explicacion: El triángulo es la mitad de un paralelogramo con la misma base y altura.
```
