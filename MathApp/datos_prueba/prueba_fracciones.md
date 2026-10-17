# Prueba: Fracciones equivalentes

Responde las 7 preguntas y presiona **Entregar** al terminar. Si se acaba el tiempo, la prueba se entrega sola.

```pregunta
tipo: fraccion
variables: a = 1..3, b = 4..7, k = 2..4
enunciado: Escribe una fracción equivalente a $\frac{[[a]]}{[[b]]}$ cuyo denominador sea [[b*k]].
numerador: a*k
denominador: b*k
forma: exacta
explicacion: Como $[[b]] \times [[k]] = [[b*k]]$, multiplicamos también el numerador por [[k]]: $\frac{[[a*k]]}{[[b*k]]}$
```

```pregunta
tipo: fraccion
variables: n = 2|3|5, d = 7|9|11, k = 2..6
enunciado: Simplifica $\frac{[[n*k]]}{[[d*k]]}$ hasta que sea **irreducible**.
numerador: n / mcd(n, d)
denominador: d / mcd(n, d)
forma: irreducible
explicacion: Dividimos arriba y abajo entre [[k*mcd(n, d)]] y obtenemos $\frac{[[n/mcd(n, d)]]}{[[d/mcd(n, d)]]}$
```

```pregunta
tipo: numero
variables: a = 1..5, b = 6..9, k = 2..5
enunciado: Completa para que las fracciones sean equivalentes: $\frac{[[a]]}{[[b]]} = \frac{\square}{[[b*k]]}$
respuesta: a*k
explicacion: El denominador se multiplicó por [[k]], así que el numerador también: $[[a]] \times [[k]] = [[a*k]]$
```

```pregunta
tipo: opcion
enunciado: ¿Cuál de estas fracciones **no** es equivalente a $\frac{1}{2}$?
opciones:
- [ ] $\frac{3}{6}$
- [ ] $\frac{5}{10}$
- [x] $\frac{4}{6}$
- [ ] $\frac{7}{14}$
explicacion: $\frac{4}{6}$ se simplifica a $\frac{2}{3}$, no a $\frac{1}{2}$. Las demás sí son la mitad.
```

```pregunta
tipo: opcion
enunciado: María comió $\frac{2}{8}$ de un pastel y Pedro comió $\frac{1}{4}$ de otro pastel del mismo tamaño. ¿Quién comió más?
opciones:
- [ ] María
- [ ] Pedro
- [x] Comieron lo mismo
mezclar: no
explicacion: $\frac{2}{8}$ se simplifica dividiendo entre 2: $\frac{2 \div 2}{8 \div 2} = \frac{1}{4}$. Comieron la misma cantidad.
```

```pregunta
tipo: opcion
enunciado: Para comprobar si $\frac{4}{6}$ y $\frac{10}{15}$ son equivalentes con productos cruzados, ¿qué resultados obtienes?
opciones:
- [x] $4 \times 15 = 60$ y $6 \times 10 = 60$
- [ ] $4 \times 10 = 40$ y $6 \times 15 = 90$
- [ ] $4 \times 6 = 24$ y $10 \times 15 = 150$
explicacion: Se multiplica en equis: el numerador de una por el denominador de la otra. Como los dos dan 60, **sí** son equivalentes.
```

```pregunta
tipo: numero
variables: k = 2..9
enunciado: ¿Por qué número se multiplicaron el numerador y el denominador de $\frac{3}{4}$ para obtener $\frac{[[3*k]]}{[[4*k]]}$?
respuesta: k
explicacion: $3 \times [[k]] = [[3*k]]$ y $4 \times [[k]] = [[4*k]]$
```
