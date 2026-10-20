=== TEMA: Ecuaciones de primer grado ===
=== LECCION: Solución de una ecuación ===
Una **ecuación** es una igualdad con una o más variables, por ejemplo $2x + 10 = 20$. Al valor desconocido se le llama **incógnita**, y al valor que cumple la igualdad, **solución**.

Podemos probar valores de $x$:

| $x$ | $2x + 10$ | ¿Es igual a 20? |
|---|---|---|
| 3 | 16 | No |
| 4 | 18 | No |
| 5 | 20 | **Sí** |

La solución es $x = 5$.

> **Para comprobar** una solución, sustitúyela en la ecuación y revisa que ambos lados den lo mismo.
=== EJERCICIO ===
# Solución de ecuaciones

```pregunta
tipo: numero
enunciado: ¿Cuál es la solución de $2x + 10 = 20$?
respuesta: 5
explicacion: $2 \times 5 + 10 = 20$ ✓
```

```pregunta
tipo: opcion
enunciado: ¿Cuál de estas ecuaciones tiene como solución $x = 2$?
opciones:
- [x] $3x + 1 = 7$
- [ ] $2x + 5 = 11$
- [ ] $-4x + 2 = -8$
explicacion: $3 \times 2 + 1 = 7$ ✓. En las otras: $2 \times 2 + 5 = 9$ y $-4 \times 2 + 2 = -6$.
```

```pregunta
tipo: opcion
enunciado: ¿Cuál de estas ecuaciones tiene como solución $x = -3$?
opciones:
- [x] $-6x - 2 = 16$
- [ ] $4x + 6 = 18$
- [ ] $5x - 2 = 17$
explicacion: $-6 \times (-3) - 2 = 18 - 2 = 16$ ✓
```

```pregunta
tipo: opcion
enunciado: En una ecuación, ¿cómo se llama el valor desconocido representado por una variable?
opciones:
- [x] Incógnita
- [ ] Coeficiente
- [ ] Término
explicacion: Al valor desconocido se le llama incógnita.
```
=== LECCION: Ecuaciones de la forma x − a = b ===
**Resolver** una ecuación es encontrar el valor de $x$. Para despejar $x$ en $x - a = b$, se **suma $a$ en ambos lados**:

$$x - 5 = 10$$
$$x - 5 + 5 = 10 + 5$$
$$x = 15$$

**Comprobación:** $15 - 5 = 10$ ✓

**Otro ejemplo:**

$$-2 + x = 2 \;\Rightarrow\; -2 + 2 + x = 2 + 2 \;\Rightarrow\; x = 4$$

> **Recuerda:** lo que hagas en un lado de la ecuación, hazlo también en el otro.
=== EJERCICIO ===
# Ecuaciones x − a = b

```pregunta
tipo: numero
variables: a = 2..9, b = -5..9
enunciado: Resuelve $x - [[a]] = [[b]]$
respuesta: b + a
explicacion: Se suma [[a]] en ambos lados: $x = [[b]] + [[a]] = [[b+a]]$
```

```pregunta
tipo: numero
enunciado: Resuelve $-3 + x = 2$
respuesta: 5
explicacion: $x = 2 + 3 = 5$
```

```pregunta
tipo: numero
enunciado: Resuelve $x - 11 = 4$
respuesta: 15
explicacion: $x = 4 + 11 = 15$
```

```pregunta
tipo: numero
enunciado: Resuelve $-4 + x = -9$
respuesta: -5
explicacion: $x = -9 + 4 = -5$
```
=== LECCION: Ecuaciones de la forma x + a = b ===
Para despejar $x$ en $x + a = b$, se **resta $a$ en ambos lados**:

$$x + 7 = 4$$
$$x + 7 - 7 = 4 - 7$$
$$x = -3$$

**Comprobación:** $-3 + 7 = 4$ ✓

**Otro ejemplo:**

$$3 + x = -2 \;\Rightarrow\; 3 - 3 + x = -2 - 3 \;\Rightarrow\; x = -5$$
=== EJERCICIO ===
# Ecuaciones x + a = b

```pregunta
tipo: numero
variables: a = 2..9, b = -5..9
enunciado: Resuelve $x + [[a]] = [[b]]$
respuesta: b - a
explicacion: Se resta [[a]] en ambos lados: $x = [[b]] - [[a]] = [[b-a]]$
```

```pregunta
tipo: numero
enunciado: Resuelve $4 + x = -3$
respuesta: -7
explicacion: $x = -3 - 4 = -7$
```

```pregunta
tipo: numero
enunciado: Resuelve $x + 6 = 6$
respuesta: 0
explicacion: $x = 6 - 6 = 0$
```

```pregunta
tipo: numero
enunciado: Resuelve $7 + x = -5$
respuesta: -12
explicacion: $x = -5 - 7 = -12$
```
=== LECCION: Ecuaciones de la forma ax = b ===
Para despejar $x$ en $ax = b$, se **dividen ambos lados entre $a$** (el coeficiente de $x$):

$$9x = -45$$
$$\frac{9x}{9} = \frac{-45}{9}$$
$$x = -5$$

**Otro ejemplo:**

$$-10x = 20 \;\Rightarrow\; x = \frac{20}{-10} = -2$$

> **Recuerda:** al dividir, aplica la regla de los signos.
=== EJERCICIO ===
# Ecuaciones ax = b

```pregunta
tipo: numero
variables: a = 2..9, k = -6..6
enunciado: Resuelve $[[a]]x = [[a*k]]$
respuesta: k
explicacion: Se dividen ambos lados entre [[a]]: $x = \frac{[[a*k]]}{[[a]]} = [[k]]$
```

```pregunta
tipo: numero
enunciado: Resuelve $-5x = 25$
respuesta: -5
explicacion: $x = \frac{25}{-5} = -5$
```

```pregunta
tipo: numero
enunciado: Resuelve $8x = -56$
respuesta: -7
explicacion: $x = \frac{-56}{8} = -7$
```

```pregunta
tipo: numero
enunciado: Resuelve $-7x = -21$
respuesta: 3
explicacion: $x = \frac{-21}{-7} = 3$
```
