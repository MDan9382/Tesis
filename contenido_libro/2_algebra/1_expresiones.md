=== TEMA: Expresiones algebraicas ===
=== LECCION: Escritura de productos con variables ===
Una **variable** es una letra que representa un número. El área de un rectángulo de base $x$ y altura 5 es $x \times 5$.

**Para escribir un producto con variables:**

1. Se **omite** el signo de multiplicación $\times$.
2. Se escribe **primero el número** y después la variable.
3. Las variables se ordenan **alfabéticamente**.

| Producto | Se escribe |
|---|---|
| $x \times 5$ | $5x$ |
| $b \times a$ | $ab$ |
| $c \times a$ | $ac$ |
| $d \times (-3) \times c$ | $-3cd$ |
=== EJERCICIO ===
# Productos con variables

```pregunta
tipo: opcion
enunciado: ¿Cómo se escribe correctamente $3 \times b \times a$?
opciones:
- [x] $3ab$
- [ ] $3ba$
- [ ] $ab3$
- [ ] $a3b$
explicacion: Primero el número y luego las variables en orden alfabético: $3ab$.
```

```pregunta
tipo: opcion
enunciado: ¿Cómo se escribe correctamente $x \times 4 \times y$?
opciones:
- [x] $4xy$
- [ ] $x4y$
- [ ] $4yx$
- [ ] $xy4$
explicacion: El número va primero: $4xy$.
```

```pregunta
tipo: opcion
enunciado: ¿Cómo se escribe correctamente $b \times (-5) \times c$?
opciones:
- [x] $-5bc$
- [ ] $b(-5)c$
- [ ] $5bc$
- [ ] $-5cb$
explicacion: El número con su signo va primero y luego $b$ y $c$ en orden: $-5bc$.
```

```pregunta
tipo: opcion
enunciado: ¿Cómo se escribe correctamente $-6 \times y \times x$?
opciones:
- [x] $-6xy$
- [ ] $-6yx$
- [ ] $6xy$
- [ ] $xy - 6$
explicacion: Las variables se ordenan alfabéticamente: $-6xy$.
```
=== LECCION: Valor numérico de una expresión ===
Jimena necesita $3x + 3$ clavos para instalar $x$ láminas en su techo. ¿Cuántos clavos necesita para 6 láminas?

Se **sustituye** $x$ por 6:

$$3x + 3 = 3 \times 6 + 3 = 18 + 3 = 21$$

Necesita 21 clavos.

**Sustituir** es reemplazar la variable por un número. Al resultado se le llama **valor numérico** de la expresión.

> **Recuerda:** primero se multiplica y después se suma o resta.
=== EJERCICIO ===
# Valor numérico

```pregunta
tipo: numero
variables: a = 2..9
enunciado: Encuentra el valor numérico de $5a - 4$ cuando $a = [[a]]$.
respuesta: 5*a - 4
explicacion: $5 \times [[a]] - 4 = [[5*a]] - 4 = [[5*a-4]]$
```

```pregunta
tipo: numero
variables: x = 1..5
enunciado: Encuentra el valor numérico de $12 - 4x$ cuando $x = [[x]]$.
respuesta: 12 - 4*x
explicacion: $12 - 4 \times [[x]] = 12 - [[4*x]] = [[12-4*x]]$
```

```pregunta
tipo: numero
variables: x = -5..-1
enunciado: Encuentra el valor numérico de $2x + 7$ cuando $x = [[x]]$.
respuesta: 2*x + 7
explicacion: $2 \times ([[x]]) + 7 = [[2*x]] + 7 = [[2*x+7]]$
```

```pregunta
tipo: numero
enunciado: Jimena necesita $3x + 3$ clavos para instalar $x$ láminas. ¿Cuántos clavos necesita para 8 láminas?
respuesta: 27
explicacion: $3 \times 8 + 3 = 24 + 3 = 27$ clavos.
```
=== LECCION: Términos y coeficientes ===
Cada parte de una expresión que está unida por signos de suma se llama **término**. Al número que multiplica a la variable se le llama **coeficiente**.

**Ejemplo 1:** $3x + 5$ tiene los términos $3x$ y $5$. El coeficiente de $x$ es 3.

**Ejemplo 2:** $a - 5b - 7 = a + (-5b) + (-7)$

- Términos: $a$, $-5b$ y $-7$.
- El coeficiente de $a$ es 1 y el de $b$ es $-5$.

> **Recuerda:** si la variable no tiene número, su coeficiente es 1 (o $-1$ si tiene signo menos): $-b = -1 \times b$.
=== EJERCICIO ===
# Términos y coeficientes

```pregunta
tipo: numero
enunciado: En la expresión $-7x - 5$, ¿cuál es el coeficiente de $x$?
respuesta: -7
explicacion: $-7x - 5 = (-7x) + (-5)$. El número que multiplica a $x$ es $-7$.
```

```pregunta
tipo: numero
enunciado: En la expresión $2a - b + 3$, ¿cuál es el coeficiente de $b$?
respuesta: -1
explicacion: $-b = -1 \times b$, entonces el coeficiente es $-1$.
```

```pregunta
tipo: opcion
enunciado: ¿Cuáles son los términos de $x - 2y - 10$?
opciones:
- [x] $x$, $-2y$ y $-10$
- [ ] $x$, $2y$ y $10$
- [ ] $x - 2y$ y $-10$
- [ ] $x$ y $y$
explicacion: $x - 2y - 10 = x + (-2y) + (-10)$, los términos conservan su signo.
```

```pregunta
tipo: numero
variables: a = 2..9, b = 2..9
enunciado: En la expresión $-[[a]]y + [[b]]z + 1$, ¿cuál es el coeficiente de $y$?
respuesta: -a
explicacion: El número que multiplica a $y$ es $-[[a]]$.
```
=== LECCION: Reducción de términos semejantes ===
Los **términos semejantes** tienen las mismas variables con los mismos exponentes, como $7x$ y $-4x$. Se pueden **reducir** sumando sus coeficientes. Los números sin variable también se reducen entre sí.

**Ejemplo:**

$$7x + 3 - 4x + 2 = 7x - 4x + 3 + 2 = (7 - 4)x + 5 = 3x + 5$$

**Otro ejemplo:**

$$-10z - 4 - 3 - 5z = (-10 - 5)z - 7 = -15z - 7$$

> **Recuerda:** primero junta los términos con la misma variable, luego los números.
=== EJERCICIO ===
# Reducción de términos semejantes

```pregunta
tipo: opcion
enunciado: Reduce $3x - 4 + 2x - 5$
opciones:
- [x] $5x - 9$
- [ ] $5x - 1$
- [ ] $x - 9$
- [ ] $-4x$
explicacion: $3x + 2x = 5x$ y $-4 - 5 = -9$, entonces $5x - 9$.
```

```pregunta
tipo: opcion
enunciado: Reduce $-3 + 2x + 5 - 8x$
opciones:
- [x] $-6x + 2$
- [ ] $10x + 2$
- [ ] $-6x - 8$
- [ ] $6x + 2$
explicacion: $2x - 8x = -6x$ y $-3 + 5 = 2$, entonces $-6x + 2$.
```

```pregunta
tipo: numero
variables: a = 2..9, b = 2..9, c = 1..9
enunciado: Al reducir $[[a]]x + [[c]] + [[b]]x$, ¿cuál es el coeficiente de $x$?
respuesta: a + b
explicacion: $[[a]]x + [[b]]x = ([[a]] + [[b]])x = [[a+b]]x$
```

```pregunta
tipo: numero
enunciado: Al reducir $6 + 7x - 4x - 2x - 4$, ¿cuál es el término sin variable?
respuesta: 2
explicacion: Los números: $6 - 4 = 2$. (La expresión reducida es $x + 2$.)
```
