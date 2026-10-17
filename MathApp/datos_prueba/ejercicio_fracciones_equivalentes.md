# Practica: fracciones equivalentes

Responde las 4 preguntas. Cada vez que lo intentes, los números cambian.

```pregunta
tipo: fraccion
variables: a = 1..4, b = 5..9, k = 2..6
enunciado: Amplifica $\frac{[[a]]}{[[b]]}$ multiplicando el numerador y el denominador por [[k]]. ¿Qué fracción obtienes?
numerador: a*k
denominador: b*k
forma: exacta
explicacion: $\frac{[[a]] \times [[k]]}{[[b]] \times [[k]]} = \frac{[[a*k]]}{[[b*k]]}$
```

```pregunta
tipo: fraccion
variables: n = 1..4, d = 5..9, k = 2..5
enunciado: Simplifica $\frac{[[n*k]]}{[[d*k]]}$ hasta que sea **irreducible**.
numerador: n / mcd(n, d)
denominador: d / mcd(n, d)
forma: irreducible
explicacion: Divide el numerador y el denominador entre [[k*mcd(n, d)]]: $\frac{[[n*k]] \div [[k*mcd(n, d)]]}{[[d*k]] \div [[k*mcd(n, d)]]} = \frac{[[n/mcd(n, d)]]}{[[d/mcd(n, d)]]}$
```

```pregunta
tipo: opcion
variables: k = 2..5
enunciado: ¿Cuál de estas fracciones es equivalente a $\frac{2}{3}$?
opciones:
- [x] $\frac{[[2*k]]}{[[3*k]]}$
- [ ] $\frac{[[2+k]]}{[[3+k]]}$
- [ ] $\frac{[[2*k]]}{3}$
- [ ] $\frac{3}{2}$
explicacion: Multiplicando arriba y abajo por [[k]]: $\frac{2 \times [[k]]}{3 \times [[k]]} = \frac{[[2*k]]}{[[3*k]]}$. Sumar el mismo número arriba y abajo **no** da una fracción equivalente.
```

```pregunta
tipo: opcion
variables: k = 2..5
enunciado: ¿Son equivalentes $\frac{3}{5}$ y $\frac{[[3*k]]}{[[5*k+1]]}$?
opciones:
- [ ] Sí
- [x] No
mezclar: no
explicacion: Con productos cruzados: $3 \times [[5*k+1]] = [[3*(5*k+1)]]$ y $5 \times [[3*k]] = [[15*k]]$. Los resultados son diferentes, entonces **no** son equivalentes.
```
