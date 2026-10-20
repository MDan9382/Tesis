=== TEMA: Porcentajes ===
=== LECCION: Porcentajes y números decimales ===
Un instituto tiene 200 estudiantes y 80 son de primer grado. ¿Qué porcentaje representan?

$$\frac{80}{200} = 0.40 \qquad 0.40 \times 100 = 40\%$$

- **De decimal a porcentaje:** se multiplica por 100 y se escribe %. $0.35 \to 35\%$
- **De porcentaje a decimal:** se divide entre 100. $25\% \to 0.25$

| Decimal | 0.15 | 0.25 | 0.5 | 0.75 | 1 |
|---|---|---|---|---|---|
| Porcentaje | 15% | 25% | 50% | 75% | 100% |
=== EJERCICIO ===
# Porcentajes

```pregunta
tipo: numero
enunciado: Convierte $0.56$ a porcentaje (escribe solo el número, sin %).
respuesta: 56
explicacion: $0.56 \times 100 = 56\%$
```

```pregunta
tipo: numero
enunciado: Convierte $0.07$ a porcentaje (escribe solo el número, sin %).
respuesta: 7
explicacion: $0.07 \times 100 = 7\%$
```

```pregunta
tipo: numero
variables: n = 1..99
enunciado: Escribe $[[n]]\%$ como número decimal.
respuesta: n / 100
explicacion: Se divide entre 100: $[[n]] \div 100$.
```

```pregunta
tipo: numero
enunciado: En un instituto de 200 estudiantes, 70 son de segundo grado. ¿Qué porcentaje representan? (escribe solo el número)
respuesta: 35
explicacion: $\frac{70}{200} = 0.35$, y $0.35 \times 100 = 35\%$
```
=== LECCION: Porcentaje de una cantidad ===
A un concierto en Cuyotenango podían ir 200 personas, pero solo el 80% compró boleto. ¿Cuántas personas compraron boleto?

Se **multiplica el porcentaje por la cantidad total**. El porcentaje se puede escribir como decimal o como fracción con denominador 100:

$$80\% \times 200 = 0.8 \times 200 = 160$$
$$80\% \times 200 = \frac{80}{100} \times 200 = 160$$

Compraron boleto 160 personas.
=== EJERCICIO ===
# Porcentaje de una cantidad

```pregunta
tipo: numero
enunciado: Un equipo de fútbol jugó 10 partidos y ganó el 70%. ¿Cuántos partidos ganó?
respuesta: 7
explicacion: $0.7 \times 10 = 7$ partidos.
```

```pregunta
tipo: numero
enunciado: Un agricultor tiene $3{,}000$ m² y siembra el 60%. ¿Cuántos m² siembra?
respuesta: 1800
explicacion: $0.6 \times 3{,}000 = 1{,}800$ m².
```

```pregunta
tipo: numero
enunciado: Un instituto tiene 400 alumnos y el 40% son mujeres. ¿Cuántas mujeres hay?
respuesta: 160
explicacion: $0.4 \times 400 = 160$ mujeres.
```

```pregunta
tipo: numero
variables: p = 10|20|25|30|40|50, t = 100|200|300|400|500
enunciado: ¿Cuánto es el $[[p]]\%$ de [[t]]?
respuesta: p * t / 100
explicacion: $\frac{[[p]]}{100} \times [[t]] = [[p*t/100]]$
```
=== LECCION: Descuentos ===
Unas zapatillas cuestan Q200.00 y tienen un **descuento** del 30%.

**1. Se calcula el descuento:**

$$\text{Descuento} = 30\% \times 200 = \frac{30}{100} \times 200 = 60$$

**2. Se resta al precio original:**

$$\text{Precio a pagar} = 200 - 60 = 140$$

Se pagan Q140.00.

> **Fórmulas:**
> Descuento = porcentaje de descuento × precio original
> Precio de venta = precio original − descuento
=== EJERCICIO ===
# Descuentos

```pregunta
tipo: numero
enunciado: A un artículo de Q500.00 se le descuenta el 10%. ¿De cuántos quetzales es el descuento?
respuesta: 50
explicacion: $\frac{10}{100} \times 500 = 50$ quetzales.
```

```pregunta
tipo: numero
enunciado: Una camisa costaba Q350.00 y le hicieron un descuento del 20%. ¿De cuánto fue el descuento?
respuesta: 70
explicacion: $\frac{20}{100} \times 350 = 70$ quetzales.
```

```pregunta
tipo: numero
enunciado: Con el descuento del 20% sobre Q350.00, ¿cuánto se paga por la camisa?
respuesta: 280
explicacion: $350 - 70 = 280$ quetzales.
```

```pregunta
tipo: numero
variables: precio = 100|200|300|400|500, d = 10|20|30|40
enunciado: Un artículo cuesta Q[[precio]].00 y tiene $[[d]]\%$ de descuento. ¿Cuánto se paga? (en quetzales)
respuesta: precio - precio * d / 100
explicacion: Descuento: $\frac{[[d]]}{100} \times [[precio]] = [[precio*d/100]]$. Se paga $[[precio]] - [[precio*d/100]] = [[precio - precio*d/100]]$ quetzales.
```
