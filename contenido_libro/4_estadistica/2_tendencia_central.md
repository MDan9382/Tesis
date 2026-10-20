=== TEMA: Medidas de tendencia central ===
=== LECCION: Media aritmética ===
Una panadería atendió estos clientes en 11 días:

14, 23, 38, 38, 19, 31, 49, 26, 24, 30, 38

Para saber cuántos clientes atiende **en promedio** por día, se suman todos los datos y se divide entre la cantidad de datos:

$$\bar{x} = \frac{330}{11} = 30$$

La **media aritmética** (o **promedio**) se representa con $\bar{x}$:

$$\bar{x} = \frac{\text{suma de todos los datos}}{\text{número de datos}}$$
=== EJERCICIO ===
# Media aritmética

```pregunta
tipo: numero
enunciado: Las notas de un estudiante fueron 70, 80, 90 y 60. ¿Cuál es su media aritmética?
respuesta: 75
explicacion: $\frac{70 + 80 + 90 + 60}{4} = \frac{300}{4} = 75$
```

```pregunta
tipo: numero
variables: k = 10..30, d = 1..9
enunciado: Encuentra la media aritmética de [[k-d]], [[k]] y [[k+d]].
respuesta: k
explicacion: $\frac{[[k-d]] + [[k]] + [[k+d]]}{3} = \frac{[[3*k]]}{3} = [[k]]$
```

```pregunta
tipo: numero
enunciado: Una tienda vendió 13, 22, 24 y 21 refrescos en 4 días. ¿Cuál es el promedio de refrescos vendidos por día?
respuesta: 20
explicacion: $\frac{13 + 22 + 24 + 21}{4} = \frac{80}{4} = 20$
```

```pregunta
tipo: numero
enunciado: La media de 4 datos es 25. ¿Cuánto suman los 4 datos?
respuesta: 100
explicacion: Si $\frac{\text{suma}}{4} = 25$, entonces la suma es $25 \times 4 = 100$.
```
=== LECCION: Mediana ===
La **mediana** es el valor que queda **en el centro** cuando los datos se ordenan de menor a mayor.

**Cantidad impar de datos:** se toma el dato del centro.

14, 19, 23, 24, 26, **30**, 31, 38, 38, 38, 49 → mediana = 30 (hay 11 datos y está en el 6.º lugar).

**Cantidad par de datos:** hay dos datos en el centro; se calcula su promedio.

13, 20, 21, 22, 24, **24**, **28**, 29, 30, 34, 46, 57 → mediana = $\frac{24 + 28}{2} = 26$

> **Recuerda:** ¡siempre ordena los datos primero!
=== EJERCICIO ===
# Mediana

```pregunta
tipo: numero
enunciado: Encuentra la mediana de: 5, 9, 2, 7, 4
respuesta: 5
explicacion: Ordenados: 2, 4, **5**, 7, 9. El dato del centro es 5.
```

```pregunta
tipo: numero
enunciado: Encuentra la mediana de: 3, 8, 6, 10
respuesta: 7
explicacion: Ordenados: 3, **6**, **8**, 10. Promedio de los dos centrales: $\frac{6 + 8}{2} = 7$.
```

```pregunta
tipo: numero
enunciado: Encuentra la mediana de: 14, 23, 38, 38, 19, 31, 49, 26, 24, 30, 38
respuesta: 30
explicacion: Ordenados: 14, 19, 23, 24, 26, **30**, 31, 38, 38, 38, 49. El 6.º dato es 30.
```

```pregunta
tipo: numero
variables: a = 1..9, b = 10|12|14|16|18, c = 20|22|24|26|28, d = 30..39
enunciado: Encuentra la mediana de: [[c]], [[a]], [[d]], [[b]]
respuesta: (b + c) / 2
explicacion: Ordenados: [[a]], **[[b]]**, **[[c]]**, [[d]]. $\frac{[[b]] + [[c]]}{2} = [[(b+c)/2]]$
```
=== LECCION: Moda ===
La **moda** es el valor que **más se repite** en un conjunto de datos (el de mayor frecuencia).

**Ejemplo:** 14, 23, **38**, **38**, 19, 32, 49, 26, 24, 30, **38**

El 38 aparece 3 veces, más que cualquier otro valor. La moda es 38.

> Si todos los datos aparecen la misma cantidad de veces, se dice que **no hay moda**.

**Resumen de las medidas de tendencia central:**

| Medida | Qué es |
|---|---|
| Media | El promedio |
| Mediana | El dato del centro |
| Moda | El dato que más se repite |
=== EJERCICIO ===
# Moda

```pregunta
tipo: numero
enunciado: Ventas en quetzales de una tienda en 15 días: 125, 35, 50, 40, 80, 125, 70, 50, 125, 75, 80, 90, 80, 80, 35. ¿Cuál es la moda?
respuesta: 80
explicacion: El 80 aparece 4 veces; el 125, 3 veces; el resto, menos.
```

```pregunta
tipo: numero
enunciado: Ventas de otra sucursal: 100, 75, 50, 80, 60, 40, 70, 75, 140, 90, 75, 70, 150, 50, 90. ¿Cuál es la moda?
respuesta: 75
explicacion: El 75 aparece 3 veces; el 50, el 70 y el 90 solo 2 veces.
```

```pregunta
tipo: numero
enunciado: ¿Cuál es la moda de: 4, 7, 7, 2, 4, 7?
respuesta: 7
explicacion: El 7 aparece 3 veces y el 4 solo 2.
```

```pregunta
tipo: opcion
enunciado: ¿Cuál es la moda de: 2, 4, 6, 8?
opciones:
- [ ] 2
- [ ] 5
- [ ] 8
- [x] No tiene moda
mezclar: no
explicacion: Todos los datos aparecen una sola vez, así que no hay moda.
```
