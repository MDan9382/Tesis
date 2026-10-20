=== TEMA: Cuadriláteros ===
=== LECCION: Perímetro de cuadriláteros ===
El **perímetro** es la suma de las longitudes de todos los lados de una figura.

En un cuadrilátero de lados $a$, $b$, $c$ y $d$:

$$P = a + b + c + d$$

**Ejemplo:** un cuadrilátero con lados de 3 cm, 2 cm, 4 cm y 5 cm tiene

$$P = 3 + 2 + 4 + 5 = 14 \text{ cm}$$

> **Atajos:** en un cuadrado de lado $l$, $P = 4 \times l$. En un rectángulo, $P = 2 \times (\text{base} + \text{altura})$.
=== EJERCICIO ===
# Perímetro

```pregunta
tipo: numero
variables: a = 2..9, b = 2..9, c = 2..9, d = 2..9
enunciado: Un cuadrilátero tiene lados de [[a]] cm, [[b]] cm, [[c]] cm y [[d]] cm. ¿Cuál es su perímetro? (en cm)
respuesta: a + b + c + d
explicacion: $[[a]] + [[b]] + [[c]] + [[d]] = [[a+b+c+d]]$ cm
```

```pregunta
tipo: numero
variables: l = 2..12
enunciado: ¿Cuál es el perímetro de un cuadrado de [[l]] cm de lado? (en cm)
respuesta: 4 * l
explicacion: $4 \times [[l]] = [[4*l]]$ cm
```

```pregunta
tipo: numero
variables: b = 3..12, h = 2..9
enunciado: ¿Cuál es el perímetro de un rectángulo de [[b]] cm de base y [[h]] cm de altura? (en cm)
respuesta: 2 * (b + h)
explicacion: $2 \times ([[b]] + [[h]]) = [[2*(b+h)]]$ cm
```

```pregunta
tipo: numero
enunciado: Un cuadrilátero tiene lados de 7 cm, 4 cm, 5 cm y 6 cm. ¿Cuál es su perímetro? (en cm)
respuesta: 22
explicacion: $7 + 4 + 5 + 6 = 22$ cm
```
=== LECCION: Área de rectángulos y cuadrados ===
El **área** mide cuánto espacio ocupa una figura. Se expresa en unidades cuadradas, como cm².

Un rectángulo de 6 cm de base y 3 cm de altura se puede llenar con $6 \times 3 = 18$ cuadritos de 1 cm². Su área es 18 cm².

$$\text{Área del rectángulo} = \text{base} \times \text{altura}$$

Como el cuadrado tiene sus cuatro lados iguales:

$$\text{Área del cuadrado} = \text{lado} \times \text{lado}$$
=== EJERCICIO ===
# Área de rectángulos y cuadrados

```pregunta
tipo: numero
variables: b = 3..15, h = 2..10
enunciado: ¿Cuál es el área de un rectángulo de [[b]] cm de base y [[h]] cm de altura? (en cm²)
respuesta: b * h
explicacion: $[[b]] \times [[h]] = [[b*h]]$ cm²
```

```pregunta
tipo: numero
variables: l = 2..12
enunciado: ¿Cuál es el área de un cuadrado de [[l]] cm de lado? (en cm²)
respuesta: l * l
explicacion: $[[l]] \times [[l]] = [[l*l]]$ cm²
```

```pregunta
tipo: numero
enunciado: ¿Cuál es el área de un rectángulo de 12 cm de base y 5 cm de altura? (en cm²)
respuesta: 60
explicacion: $12 \times 5 = 60$ cm²
```

```pregunta
tipo: numero
enunciado: Un rectángulo tiene un área de 36 cm² y una base de 9 cm. ¿Cuánto mide su altura? (en cm)
respuesta: 4
explicacion: $\text{altura} = 36 \div 9 = 4$ cm
```
=== LECCION: Área de paralelogramos ===
Un **paralelogramo** se puede transformar en un rectángulo: se corta un triángulo de un lado y se pega en el otro. El área no cambia.

$$\text{Área del paralelogramo} = \text{base} \times \text{altura}$$

La **altura** es el segmento **perpendicular** a la base (forma un ángulo recto con ella), no el lado inclinado.

**Ejemplo:** base 4 cm y altura 3 cm: $4 \times 3 = 12$ cm².
=== EJERCICIO ===
# Área de paralelogramos

```pregunta
tipo: numero
variables: b = 3..15, h = 2..10
enunciado: ¿Cuál es el área de un paralelogramo de [[b]] cm de base y [[h]] cm de altura? (en cm²)
respuesta: b * h
explicacion: $[[b]] \times [[h]] = [[b*h]]$ cm²
```

```pregunta
tipo: numero
enunciado: Un paralelogramo tiene 10 cm de base, 7 cm de altura y su lado inclinado mide 8 cm. ¿Cuál es su área? (en cm²)
respuesta: 70
explicacion: Se usa la altura, no el lado inclinado: $10 \times 7 = 70$ cm².
```

```pregunta
tipo: opcion
enunciado: Para calcular el área de un paralelogramo, ¿qué medida se usa como altura?
opciones:
- [x] El segmento perpendicular a la base
- [ ] El lado inclinado
- [ ] La suma de los dos lados
explicacion: La altura siempre es perpendicular a la base.
```
=== LECCION: Área de trapecios ===
Un **trapecio** tiene dos lados paralelos: la **base mayor** y la **base menor**. La **altura** es la distancia perpendicular entre ellas.

Dos trapecios iguales forman un paralelogramo de base (base mayor + base menor). Por eso, el área de un trapecio es la mitad:

$$\text{Área del trapecio} = \frac{(\text{base mayor} + \text{base menor}) \times \text{altura}}{2}$$

**Ejemplo:** base mayor 5 cm, base menor 2 cm y altura 4 cm:

$$\frac{(5 + 2) \times 4}{2} = \frac{28}{2} = 14 \text{ cm}^2$$
=== EJERCICIO ===
# Área de trapecios

```pregunta
tipo: numero
variables: B = 6..12, b = 2..5, h = 2|4|6|8
enunciado: Un trapecio tiene base mayor de [[B]] cm, base menor de [[b]] cm y altura de [[h]] cm. ¿Cuál es su área? (en cm²)
respuesta: (B + b) * h / 2
explicacion: $\frac{([[B]] + [[b]]) \times [[h]]}{2} = \frac{[[(B+b)*h]]}{2} = [[(B+b)*h/2]]$ cm²
```

```pregunta
tipo: numero
enunciado: Un trapecio tiene base mayor de 8 cm, base menor de 3 cm y altura de 6 cm. ¿Cuál es su área? (en cm²)
respuesta: 33
explicacion: $\frac{(8 + 3) \times 6}{2} = \frac{66}{2} = 33$ cm²
```

```pregunta
tipo: opcion
enunciado: ¿Cuál es la fórmula del área de un trapecio?
opciones:
- [x] $\frac{(\text{base mayor} + \text{base menor}) \times \text{altura}}{2}$
- [ ] $\text{base mayor} \times \text{base menor}$
- [ ] $(\text{base mayor} + \text{base menor}) \times \text{altura}$
explicacion: Se suman las bases, se multiplica por la altura y se divide entre 2.
```
