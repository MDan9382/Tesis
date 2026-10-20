=== TEMA: Razones y proporciones ===
=== LECCION: Razones ===
Rosa usa 2 cucharadas de azúcar y 3 de leche en polvo para su café. La relación entre azúcar y leche se escribe:

$$2 : 3 \quad \text{y se lee "dos es a tres"}$$

Una **razón** compara dos cantidades **con la misma unidad de medida**. Se escribe $a : b$.

- Al primer término $a$ se le llama **antecedente**.
- Al segundo término $b$ se le llama **consecuente**.

**Ejemplo:** la razón de 9 m a 300 cm. Primero se usa la misma unidad: $9 \text{ m} = 900 \text{ cm}$. La razón es $900 : 300$.

El **valor de razón** es el resultado de dividir $a \div b$: el valor de $2 : 3$ es $\frac{2}{3}$.
=== EJERCICIO ===
# Razones

```pregunta
tipo: opcion
enunciado: Rosa usa 2 cucharadas de azúcar y 3 de leche. ¿Cuál es la razón de azúcar a leche?
opciones:
- [x] $2 : 3$
- [ ] $3 : 2$
- [ ] $2 : 5$
- [ ] $5 : 3$
explicacion: El azúcar va primero (antecedente) y la leche después (consecuente): $2 : 3$.
```

```pregunta
tipo: opcion
enunciado: En la razón $9 : 3$, ¿cuál es el antecedente?
opciones:
- [x] 9
- [ ] 3
- [ ] 12
mezclar: no
explicacion: El antecedente es el primer término de la razón.
```

```pregunta
tipo: opcion
enunciado: ¿Cuál es la razón de 12 km a 36,000 m?
opciones:
- [x] $12{,}000 : 36{,}000$
- [ ] $12 : 36{,}000$
- [ ] $36{,}000 : 12$
- [ ] $12{,}000 : 36$
explicacion: Se usa la misma unidad: $12 \text{ km} = 12{,}000 \text{ m}$. La razón es $12{,}000 : 36{,}000$ (que también es $12 : 36$ en km).
```

```pregunta
tipo: fraccion
enunciado: En un grupo hay 10 hombres y 15 mujeres. ¿Cuál es el valor de la razón de hombres a mujeres? (escríbelo como fracción, ej. 2/5)
numerador: 10
denominador: 15
forma: equivalente
explicacion: $10 \div 15 = \frac{10}{15} = \frac{2}{3}$
```
=== LECCION: Razones equivalentes ===
Ana mezcla 2 dL de concentrado de horchata con 24 dL de agua en un pichel, y 3 dL con 36 dL en otro.

$$\text{Pichel A: } \frac{2}{24} = \frac{1}{12} \qquad \text{Pichel B: } \frac{3}{36} = \frac{1}{12}$$

Los valores de razón son iguales, entonces las razones son **equivalentes**: $2 : 24 = 3 : 36$.

- Dos razones con el mismo valor de razón son **razones equivalentes**.
- A la igualdad entre dos razones equivalentes se le llama **proporción**.

> **Para saber si son equivalentes**, simplifica los valores de razón y compáralos.
=== EJERCICIO ===
# Razones equivalentes

```pregunta
tipo: opcion
enunciado: ¿Son equivalentes las razones $6 : 8$ y $9 : 12$?
opciones:
- [x] Sí
- [ ] No
mezclar: no
explicacion: $\frac{6}{8} = \frac{3}{4}$ y $\frac{9}{12} = \frac{3}{4}$. Tienen el mismo valor.
```

```pregunta
tipo: opcion
enunciado: ¿Son equivalentes las razones $8 : 12$ y $20 : 24$?
opciones:
- [ ] Sí
- [x] No
mezclar: no
explicacion: $\frac{8}{12} = \frac{2}{3}$ pero $\frac{20}{24} = \frac{5}{6}$. Son diferentes.
```

```pregunta
tipo: fraccion
variables: a = 1..5, k = 2..9
enunciado: ¿Cuál es el valor de la razón $[[a]] : [[a*k + 1]]$? (escríbelo como fracción)
numerador: a
denominador: a*k + 1
forma: equivalente
explicacion: El valor de razón es $[[a]] \div [[a*k+1]] = \frac{[[a]]}{[[a*k+1]]}$
```

```pregunta
tipo: opcion
enunciado: El edificio A mide 8 m y proyecta una sombra de 6 m; el edificio B mide 12 m y su sombra es de 9 m. ¿La razón de las alturas ($8 : 12$) es equivalente a la de las sombras ($6 : 9$)?
opciones:
- [x] Sí
- [ ] No
mezclar: no
explicacion: $\frac{8}{12} = \frac{2}{3}$ y $\frac{6}{9} = \frac{2}{3}$. Son equivalentes.
```
=== LECCION: Proporciones ===
Si $x : 3 = 10 : 15$, ¿cuánto vale $x$?

En la proporción $a : b = c : d$, a $a$ y $d$ se les llama **términos extremos**, y a $b$ y $c$, **términos medios**. Se cumple que:

$$\text{(producto de extremos)} = \text{(producto de medios)} \qquad ad = bc$$

**Ejemplo:** $x : 3 = 10 : 15$

$$15x = 3 \times 10$$
$$15x = 30$$
$$x = 2$$

**Comprobación:** $2 : 3$ y $10 : 15$ valen $\frac{2}{3}$ ✓
=== EJERCICIO ===
# Proporciones

```pregunta
tipo: numero
variables: v = 1..9, b = 2..6, k = 2..5
enunciado: Encuentra el valor de $x$: $x : [[b]] = [[v*k]] : [[b*k]]$
respuesta: v
explicacion: $[[b*k]]x = [[b]] \times [[v*k]] = [[b*v*k]]$, entonces $x = [[b*v*k]] \div [[b*k]] = [[v]]$
```

```pregunta
tipo: numero
enunciado: Encuentra el valor de $x$: $3 : x = 2 : 6$
respuesta: 9
explicacion: $3 \times 6 = 2x$, entonces $18 = 2x$ y $x = 9$.
```

```pregunta
tipo: numero
enunciado: Encuentra el valor de $x$: $9 : 6 = 12 : x$
respuesta: 8
explicacion: $9x = 6 \times 12 = 72$, entonces $x = 8$.
```

```pregunta
tipo: numero
enunciado: Encuentra el valor de $x$: $15 : 12 = 10 : x$
respuesta: 8
explicacion: $15x = 12 \times 10 = 120$, entonces $x = 8$.
```
