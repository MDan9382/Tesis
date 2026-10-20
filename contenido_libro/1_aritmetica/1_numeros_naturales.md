=== TEMA: Números naturales ===
=== LECCION: Números primos y compuestos ===
Un número es **divisor** de otro cuando al dividir el residuo es cero. Contar los divisores de un número nos dice qué tipo de número es.

| Número | Divisores | Cantidad |
|---|---|---|
| 3 | 1, 3 | 2 |
| 4 | 1, 2, 4 | 3 |
| 22 | 1, 2, 11, 22 | 4 |
| 23 | 1, 23 | 2 |

- Un **número primo** solo se divide entre 1 y entre sí mismo: tiene **exactamente 2 divisores**. Ejemplos: 3, 11, 23.
- Un **número compuesto** tiene **más de 2 divisores**. Ejemplos: 4, 22, 32.

> **Recuerda:** el 1 no es primo ni compuesto, porque solo tiene un divisor.
=== EJERCICIO ===
# Primos y compuestos

```pregunta
tipo: opcion
enunciado: ¿Cuál de estos números es **primo**?
opciones:
- [x] 37
- [ ] 21
- [ ] 77
- [ ] 51
explicacion: 37 solo se divide entre 1 y 37. En cambio $21 = 3 \times 7$, $77 = 7 \times 11$ y $51 = 3 \times 17$.
```

```pregunta
tipo: opcion
enunciado: ¿Cuál de estos números es **compuesto**?
opciones:
- [x] 91
- [ ] 17
- [ ] 29
- [ ] 67
explicacion: $91 = 7 \times 13$, así que tiene más de 2 divisores. Los demás son primos.
```

```pregunta
tipo: numero
enunciado: ¿Cuántos divisores tiene el número 12?
respuesta: 6
explicacion: Los divisores de 12 son 1, 2, 3, 4, 6 y 12: son 6.
```

```pregunta
tipo: numero
enunciado: ¿Cuántos divisores tiene cualquier número primo?
respuesta: 2
explicacion: Un número primo solo tiene dos divisores: el 1 y él mismo.
```

```pregunta
tipo: opcion
enunciado: El número 1 es…
opciones:
- [ ] Primo
- [ ] Compuesto
- [x] Ni primo ni compuesto
mezclar: no
explicacion: El 1 tiene un solo divisor, por eso no es primo ni compuesto.
```
=== LECCION: Descomposición en factores primos ===
Un **factor primo** es un número primo que divide exactamente a otro número. **Descomponer en factores primos** es escribir un número como una multiplicación de números primos.

**Ejemplo:** descomponer 24.

| Número | Divide entre |
|---|---|
| 24 | 2 |
| 12 | 2 |
| 6 | 2 |
| 3 | 3 |
| 1 | |

Se divide entre el menor primo posible hasta llegar a 1. Entonces:

$$24 = 2 \times 2 \times 2 \times 3$$

**Otro ejemplo:** $45 = 3 \times 3 \times 5$

> **Recuerda:** prueba primero con 2, luego con 3, 5, 7… y sigue hasta obtener 1.
=== EJERCICIO ===
# Descomposición en factores primos

```pregunta
tipo: opcion
enunciado: ¿Cuál es la descomposición en factores primos de 36?
opciones:
- [x] $2 \times 2 \times 3 \times 3$
- [ ] $4 \times 9$
- [ ] $2 \times 3 \times 6$
- [ ] $2 \times 2 \times 2 \times 3$
explicacion: $36 \div 2 = 18$, $18 \div 2 = 9$, $9 \div 3 = 3$, $3 \div 3 = 1$. Entonces $36 = 2 \times 2 \times 3 \times 3$. El 4, el 9 y el 6 no son primos.
```

```pregunta
tipo: opcion
enunciado: ¿Cuál es la descomposición en factores primos de 72?
opciones:
- [x] $2 \times 2 \times 2 \times 3 \times 3$
- [ ] $8 \times 9$
- [ ] $2 \times 2 \times 2 \times 9$
- [ ] $2 \times 2 \times 3 \times 3 \times 3$
explicacion: $72 = 2 \times 36 = 2 \times 2 \times 18 = 2 \times 2 \times 2 \times 9 = 2 \times 2 \times 2 \times 3 \times 3$.
```

```pregunta
tipo: numero
variables: p = 2|3|5, q = 3|5|7, r = 2|3|11
enunciado: ¿Qué número tiene como descomposición en factores primos $[[p]] \times [[q]] \times [[r]]$?
respuesta: p*q*r
explicacion: Se multiplican los factores: $[[p]] \times [[q]] \times [[r]] = [[p*q*r]]$.
```

```pregunta
tipo: numero
enunciado: ¿Cuál es el menor factor primo de 105?
respuesta: 3
explicacion: 105 no se divide entre 2 (es impar), pero sí entre 3: $105 \div 3 = 35$.
```
=== LECCION: Mínimo común múltiplo (MCM) ===
Los **múltiplos** de un número se obtienen al multiplicarlo por 1, 2, 3, 4… El **mínimo común múltiplo (MCM)** de dos números es el **menor múltiplo que tienen en común**.

**Forma 1. Enumerando múltiplos** de 6 y 8:

- Múltiplos de 6: 6, 12, 18, **24**, 30, 36…
- Múltiplos de 8: 8, 16, **24**, 32, 40…

El menor común es 24, entonces MCM(6, 8) = 24.

**Forma 2. Con factores primos:** se multiplican los factores **comunes y no comunes**, tomando cada uno las veces que más aparece.

$$6 = 2 \times 3 \qquad 8 = 2 \times 2 \times 2$$
$$\text{MCM}(6, 8) = 2 \times 2 \times 2 \times 3 = 24$$
=== EJERCICIO ===
# Mínimo común múltiplo

```pregunta
tipo: numero
variables: a = 4|6|8|10, b = 9|12|15
enunciado: Encuentra el MCM de [[a]] y [[b]].
respuesta: mcm(a, b)
explicacion: El menor número que es múltiplo de [[a]] y de [[b]] a la vez es [[mcm(a, b)]].
```

```pregunta
tipo: numero
enunciado: Encuentra el MCM de 15 y 20.
respuesta: 60
explicacion: $15 = 3 \times 5$ y $20 = 2 \times 2 \times 5$. MCM $= 2 \times 2 \times 3 \times 5 = 60$.
```

```pregunta
tipo: numero
enunciado: Encuentra el MCM de 7 y 14.
respuesta: 14
explicacion: 14 ya es múltiplo de 7 ($7 \times 2 = 14$), así que el MCM es 14.
```

```pregunta
tipo: numero
enunciado: Un bus sale de la terminal cada 6 minutos y otro cada 8 minutos. Si salen juntos ahora, ¿dentro de cuántos minutos volverán a salir juntos?
respuesta: 24
explicacion: Se busca el MCM de 6 y 8, que es 24 minutos.
```
=== LECCION: Máximo común divisor (MCD) ===
El **máximo común divisor (MCD)** de dos números es el **mayor divisor que tienen en común**.

**Forma 1. Enumerando divisores** de 8 y 12:

- Divisores de 8: 1, 2, **4**, 8
- Divisores de 12: 1, 2, 3, **4**, 6, 12

El mayor común es 4, entonces MCD(8, 12) = 4.

**Forma 2. Con factores primos:** se multiplican **solo los factores comunes**.

$$8 = 2 \times 2 \times 2 \qquad 12 = 2 \times 2 \times 3$$
$$\text{MCD}(8, 12) = 2 \times 2 = 4$$

> **Diferencia con el MCM:** el MCM usa factores comunes y no comunes; el MCD solo los comunes.
=== EJERCICIO ===
# Máximo común divisor

```pregunta
tipo: numero
variables: a = 12|18|24, b = 30|36|42
enunciado: Encuentra el MCD de [[a]] y [[b]].
respuesta: mcd(a, b)
explicacion: El mayor número que divide exactamente a [[a]] y a [[b]] es [[mcd(a, b)]].
```

```pregunta
tipo: numero
enunciado: Encuentra el MCD de 18 y 27.
respuesta: 9
explicacion: $18 = 2 \times 3 \times 3$ y $27 = 3 \times 3 \times 3$. Factores comunes: $3 \times 3 = 9$.
```

```pregunta
tipo: numero
enunciado: Encuentra el MCD de 25 y 30.
respuesta: 5
explicacion: Divisores de 25: 1, 5, 25. Divisores de 30: 1, 2, 3, 5, 6, 10, 15, 30. El mayor común es 5.
```

```pregunta
tipo: numero
enunciado: Se tienen 24 manzanas y 36 naranjas. Se quieren repartir en bolsas iguales, sin que sobre fruta y con la mayor cantidad posible de bolsas. ¿Cuántas bolsas se pueden hacer?
respuesta: 12
explicacion: Se busca el MCD de 24 y 36, que es 12. Cada bolsa lleva 2 manzanas y 3 naranjas.
```
