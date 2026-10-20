=== TEMA: Suma y resta de números enteros ===
=== LECCION: Suma de números con signos iguales ===
Si un movimiento al Este es positivo y al Oeste es negativo:

- Juan avanza 3 km al Este y luego 2 km más al Este: $(+3) + (+2) = +5$. Está 5 km al Este.
- Mario avanza 1 km al Oeste y luego 2 km más al Oeste: $(-1) + (-2) = -3$. Está 3 km al Oeste.

**Para sumar dos números con el mismo signo:**

1. Se escribe el **signo común**.
2. Se **suman los valores absolutos**.

$$(+3) + (+5) = +(3 + 5) = +8 \qquad (-3) + (-5) = -(3 + 5) = -8$$
=== EJERCICIO ===
# Suma con signos iguales

```pregunta
tipo: numero
variables: a = 2..9, b = 2..9
enunciado: Calcula $(+[[a]]) + (+[[b]])$
respuesta: a + b
explicacion: Signo común +, y se suman: $+([[a]] + [[b]]) = +[[a+b]]$
```

```pregunta
tipo: numero
variables: a = 2..9, b = 2..9
enunciado: Calcula $(-[[a]]) + (-[[b]])$
respuesta: -(a + b)
explicacion: Signo común −, y se suman: $-([[a]] + [[b]]) = -[[a+b]]$
```

```pregunta
tipo: numero
enunciado: Calcula $(-8) + (-9)$
respuesta: -17
explicacion: $-(8 + 9) = -17$
```

```pregunta
tipo: numero
enunciado: Mario camina 1 km hacia el Oeste y luego 2 km más hacia el Oeste. Si el Este es positivo, ¿en qué posición queda? (escribe el número con su signo)
respuesta: -3
explicacion: $(-1) + (-2) = -3$: queda 3 km al Oeste.
```
=== LECCION: Suma de números con signos diferentes ===
Carlos viaja 8 km al Este y regresa 2 km al Oeste: $(+8) + (-2) = +6$.
Karina viaja 3 km al Este y regresa 7 km al Oeste: $(+3) + (-7) = -4$.

**Para sumar dos números con signos diferentes:**

1. Se escribe el signo del número con **mayor valor absoluto**.
2. Se **resta** el menor valor absoluto del mayor.

$$(-9) + (+4) = -(9 - 4) = -5$$
$$(-3) + (+5) = +(5 - 3) = +2$$

> **Recuerda:** gana el signo del número "más grande" sin contar su signo.
=== EJERCICIO ===
# Suma con signos diferentes

```pregunta
tipo: numero
variables: a = 2..9, b = 10..15
enunciado: Calcula $(+[[a]]) + (-[[b]])$
respuesta: a - b
explicacion: $|-[[b]]|$ es mayor, entonces el signo es −: $-([[b]] - [[a]]) = [[a-b]]$
```

```pregunta
tipo: numero
variables: a = 2..9, b = 10..15
enunciado: Calcula $(-[[a]]) + (+[[b]])$
respuesta: b - a
explicacion: $|+[[b]]|$ es mayor, entonces el signo es +: $+([[b]] - [[a]]) = +[[b-a]]$
```

```pregunta
tipo: numero
enunciado: Calcula $(+8) + (-2)$
respuesta: 6
explicacion: $+(8 - 2) = +6$
```

```pregunta
tipo: numero
enunciado: Karina sale de su casa, avanza 3 km al Este y luego regresa 7 km al Oeste. Si el Este es positivo, ¿en qué posición queda?
respuesta: -4
explicacion: $(+3) + (-7) = -(7 - 3) = -4$: queda 4 km al Oeste de su casa.
```
=== LECCION: Resta de números enteros ===
Restar un número es lo mismo que **sumar su opuesto**. Se cambia la resta por suma y se cambia el signo del número que se resta (sustraendo).

$$(+3) - (+2) = (+3) + (-2) = +1$$
$$(+2) - (+4) = (+2) + (-4) = -2$$

**Pasos:**

1. Cambia la resta por una suma.
2. Cambia el signo del sustraendo.
3. Resuelve la suma como ya aprendiste.

**Ejemplo:** $(+4) - (+7) = (+4) + (-7) = -(7 - 4) = -3$
=== EJERCICIO ===
# Resta de enteros

```pregunta
tipo: numero
variables: a = 2..9, b = 10..15
enunciado: Calcula $(+[[a]]) - (+[[b]])$
respuesta: a - b
explicacion: $(+[[a]]) + (-[[b]]) = -([[b]] - [[a]]) = [[a-b]]$
```

```pregunta
tipo: numero
enunciado: Calcula $(+10) - (+6)$
respuesta: 4
explicacion: $(+10) + (-6) = +(10 - 6) = +4$
```

```pregunta
tipo: opcion
enunciado: ¿A qué suma es igual $(+4) - (+7)$?
opciones:
- [x] $(+4) + (-7)$
- [ ] $(+4) + (+7)$
- [ ] $(-4) + (+7)$
- [ ] $(-4) + (-7)$
explicacion: Se cambia la resta por suma y el signo del sustraendo: $(+4) + (-7)$.
```

```pregunta
tipo: numero
enunciado: Calcula $(+5) - (+15)$
respuesta: -10
explicacion: $(+5) + (-15) = -(15 - 5) = -10$
```
