=== TEMA: Multiplicación de números enteros ===
=== LECCION: Positivo por positivo o negativo ===
Una multiplicación es una suma abreviada:

$$(+4) \times (+2) = (+2) + (+2) + (+2) + (+2) = +8$$
$$(+3) \times (-2) = (-2) + (-2) + (-2) = -6$$

- **Positivo × positivo = positivo**: $(+4) \times (+2) = +(4 \times 2) = +8$
- **Positivo × negativo = negativo**: $(+3) \times (-2) = -(3 \times 2) = -6$

Siempre se multiplican los valores absolutos y se coloca el signo según la regla. Si el resultado es positivo, el signo + se puede omitir: $3 \times 5 = 15$.
=== EJERCICIO ===
# Multiplicación (1)

```pregunta
tipo: numero
variables: a = 2..9, b = 2..9
enunciado: Calcula $(+[[a]]) \times (+[[b]])$
respuesta: a*b
explicacion: Positivo × positivo = positivo: $+([[a]] \times [[b]]) = [[a*b]]$
```

```pregunta
tipo: numero
variables: a = 2..9, b = 2..9
enunciado: Calcula $(+[[a]]) \times (-[[b]])$
respuesta: -a*b
explicacion: Positivo × negativo = negativo: $-([[a]] \times [[b]]) = [[-a*b]]$
```

```pregunta
tipo: numero
enunciado: Calcula $6 \times (-8)$
respuesta: -48
explicacion: $-(6 \times 8) = -48$
```

```pregunta
tipo: opcion
enunciado: Al multiplicar un número positivo por un número negativo, el resultado es…
opciones:
- [ ] Positivo
- [x] Negativo
- [ ] Siempre cero
mezclar: no
explicacion: $(+) \times (-) = (-)$
```
=== LECCION: Negativo por positivo ===
Observa cómo el resultado baja de 2 en 2:

| Operación | Resultado |
|---|---|
| $(+2) \times (+2)$ | $+4$ |
| $(+1) \times (+2)$ | $+2$ |
| $0 \times (+2)$ | $0$ |
| $(-1) \times (+2)$ | $-2$ |
| $(-2) \times (+2)$ | $-4$ |

Al multiplicar un **número negativo por un número positivo**, el resultado es **negativo**. Se coloca el signo − y se multiplican los valores absolutos.

$$(-5) \times 6 = -(5 \times 6) = -30$$
=== EJERCICIO ===
# Multiplicación (2)

```pregunta
tipo: numero
variables: a = 2..9, b = 2..9
enunciado: Calcula $(-[[a]]) \times (+[[b]])$
respuesta: -a*b
explicacion: Negativo × positivo = negativo: $-([[a]] \times [[b]]) = [[-a*b]]$
```

```pregunta
tipo: numero
enunciado: Calcula $(-9) \times 9$
respuesta: -81
explicacion: $-(9 \times 9) = -81$
```

```pregunta
tipo: numero
enunciado: Calcula $(-4) \times 7$
respuesta: -28
explicacion: $-(4 \times 7) = -28$
```

```pregunta
tipo: opcion
enunciado: ¿Qué signo tiene el resultado de $(-) \times (+)$?
opciones:
- [ ] Positivo
- [x] Negativo
mezclar: no
explicacion: Negativo por positivo da negativo.
```
=== LECCION: Multiplicación de dos números negativos ===
Ahora el resultado sube de 2 en 2:

| Operación | Resultado |
|---|---|
| $(+1) \times (-2)$ | $-2$ |
| $0 \times (-2)$ | $0$ |
| $(-1) \times (-2)$ | $+2$ |
| $(-2) \times (-2)$ | $+4$ |
| $(-3) \times (-2)$ | $+6$ |

Al multiplicar **dos números negativos**, el resultado es **positivo**.

$$(-8) \times (-5) = +(8 \times 5) = 40$$

**Resumen de la regla de los signos:**

| | $+$ | $-$ |
|---|---|---|
| $+$ | $+$ | $-$ |
| $-$ | $-$ | $+$ |
=== EJERCICIO ===
# Multiplicación (3)

```pregunta
tipo: numero
variables: a = 2..9, b = 2..9
enunciado: Calcula $(-[[a]]) \times (-[[b]])$
respuesta: a*b
explicacion: Negativo × negativo = positivo: $+([[a]] \times [[b]]) = [[a*b]]$
```

```pregunta
tipo: numero
enunciado: Calcula $(-9) \times (-7)$
respuesta: 63
explicacion: $+(9 \times 7) = 63$
```

```pregunta
tipo: numero
enunciado: Calcula $(-6) \times (-8)$
respuesta: 48
explicacion: $+(6 \times 8) = 48$
```

```pregunta
tipo: opcion
enunciado: ¿Cuál de estas multiplicaciones da un resultado **negativo**?
opciones:
- [x] $(-3) \times (+4)$
- [ ] $(-3) \times (-4)$
- [ ] $(+3) \times (+4)$
explicacion: Solo cuando los signos son diferentes el resultado es negativo: $(-3) \times (+4) = -12$.
```
