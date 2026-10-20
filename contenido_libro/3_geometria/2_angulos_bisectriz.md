=== TEMA: Ángulos y bisectriz ===
=== LECCION: Ángulos complementarios y suplementarios ===
- Dos ángulos son **complementarios** si suman **90°**: $\angle a + \angle b = 90°$
- Dos ángulos son **suplementarios** si suman **180°**: $\angle a + \angle b = 180°$

**Ejemplos:**

- $54° + 36° = 90°$: son complementarios.
- $57° + 123° = 180°$: son suplementarios.

**Para encontrar el complemento** de un ángulo se resta de 90°: el complemento de 27° es $90° - 27° = 63°$.

**Para encontrar el suplemento** se resta de 180°: el suplemento de 36° es $180° - 36° = 144°$.
=== EJERCICIO ===
# Complementarios y suplementarios

```pregunta
tipo: numero
variables: b = 10..80
enunciado: $\angle A$ es complementario de $\angle B$ y $\angle B = [[b]]°$. ¿Cuánto mide $\angle A$? (en grados)
respuesta: 90 - b
explicacion: $90° - [[b]]° = [[90-b]]°$
```

```pregunta
tipo: numero
variables: b = 10..170
enunciado: $\angle A$ es suplementario de $\angle B$ y $\angle B = [[b]]°$. ¿Cuánto mide $\angle A$? (en grados)
respuesta: 180 - b
explicacion: $180° - [[b]]° = [[180-b]]°$
```

```pregunta
tipo: opcion
enunciado: ¿Cuál pareja de ángulos es **complementaria**?
opciones:
- [x] 52° y 38°
- [ ] 52° y 48°
- [ ] 42° y 38°
- [ ] 48° y 52°
explicacion: $52° + 38° = 90°$.
```

```pregunta
tipo: opcion
enunciado: ¿Cuál pareja de ángulos es **suplementaria**?
opciones:
- [x] 64° y 116°
- [ ] 64° y 104°
- [ ] 76° y 116°
- [ ] 76° y 14°
explicacion: $64° + 116° = 180°$.
```
=== LECCION: Bisectriz de un ángulo ===
Si un rayo $OP$ divide al $\angle AOB$ en $\angle AOP = 40°$ y $\angle BOP = 20°$, las dos partes son diferentes. Pero si un rayo $OQ$ lo divide en $30°$ y $30°$, las dos partes son **iguales**.

Al rayo que divide un ángulo en **dos partes iguales** se le llama **bisectriz** del ángulo.

$$\text{Cada parte} = \frac{\angle AOB}{2}$$

**Ejemplo:** si $\angle AOB = 70°$, la bisectriz lo divide en dos ángulos de $35°$.
=== EJERCICIO ===
# Bisectriz

```pregunta
tipo: numero
variables: m = 10..85
enunciado: $\angle AOB = [[2*m]]°$ y $OQ$ es su bisectriz. ¿Cuánto mide $\angle AOQ$? (en grados)
respuesta: m
explicacion: La bisectriz divide el ángulo a la mitad: $[[2*m]]° \div 2 = [[m]]°$
```

```pregunta
tipo: numero
enunciado: $OQ$ es la bisectriz de $\angle AOB$ y $\angle AOQ = 30°$. ¿Cuánto mide $\angle AOB$? (en grados)
respuesta: 60
explicacion: Las dos partes son iguales: $30° + 30° = 60°$.
```

```pregunta
tipo: opcion
enunciado: Un rayo divide al $\angle AOB$ en dos ángulos. ¿En cuál caso el rayo es la **bisectriz**?
opciones:
- [x] 45° y 45°
- [ ] 55° y 25°
- [ ] 10° y 45°
- [ ] 30° y 60°
explicacion: Es bisectriz solo cuando las dos partes miden lo mismo.
```
