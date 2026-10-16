-- =====================================================================
-- Datos de prueba: un plan, un tema y una lección completa.
-- Ejecutar después de los scripts del esquema. Se puede ejecutar más de
-- una vez: cada ejecución crea filas nuevas.
-- =====================================================================
SET NAMES utf8mb4;

INSERT INTO Planes_Estudio (Plan_Nombre, Plan_Descripcion)
VALUES ('Primero Básico', 'Números, fracciones y operaciones para primero básico');
SET @plan_id = LAST_INSERT_ID();

INSERT INTO Temas (Tema_Nombre, Tema_Orden, Plan_Id)
VALUES ('Fracciones', 10, @plan_id);
SET @tema_id = LAST_INSERT_ID();

-- El contenido está en Markdown; las fórmulas usan sintaxis LaTeX ($...$).
-- Las barras invertidas van dobles (\\frac) porque MySQL las usa como escape.
INSERT INTO Lecciones (Leccion_Nombre, Leccion_Contenido, Leccion_Orden, Tema_Id)
VALUES ('Fracciones equivalentes', 'Imagina que tu familia compra una pizza para compartir. Si te comes **la mitad**, no importa si la pizza estaba cortada en 2, en 4 o en 8 porciones: comiste la misma cantidad. A eso le llamamos **fracciones equivalentes**.\n\n## ¿Qué es una fracción equivalente?\n\nDos fracciones son **equivalentes** cuando representan **la misma cantidad**, aunque se escriban con números diferentes.\n\n| Pizza cortada en | Porciones que comes | Fracción |\n|---|---|---|\n| 2 porciones | 1 | $\\frac{1}{2}$ |\n| 4 porciones | 2 | $\\frac{2}{4}$ |\n| 8 porciones | 4 | $\\frac{4}{8}$ |\n\nEn los tres casos comiste media pizza, entonces:\n\n$$\\frac{1}{2} = \\frac{2}{4} = \\frac{4}{8}$$\n\n## Cómo encontrar fracciones equivalentes\n\nHay dos formas, y las dos siguen la misma idea:\n\n> **Regla de oro:** lo que hagas con el numerador (arriba), hazlo también con el denominador (abajo).\n\n### 1. Amplificar: multiplicar\n\nMultiplica el numerador y el denominador **por el mismo número** (que no sea cero):\n\n$$\\frac{a}{b} = \\frac{a \\times k}{b \\times k}$$\n\n**Ejemplo:** busquemos una fracción equivalente a $\\frac{2}{3}$ multiplicando por 4.\n\n$$\\frac{2}{3} = \\frac{2 \\times 4}{3 \\times 4} = \\frac{8}{12}$$\n\n### 2. Simplificar: dividir\n\nDivide el numerador y el denominador **por un mismo número** que divida exactamente a los dos:\n\n**Ejemplo:** simplifiquemos $\\frac{12}{18}$. El 12 y el 18 se pueden dividir entre 6.\n\n$$\\frac{12}{18} = \\frac{12 \\div 6}{18 \\div 6} = \\frac{2}{3}$$\n\nCuando ya no hay ningún número (mayor que 1) que divida a los dos, decimos que la fracción es **irreducible**. $\\frac{2}{3}$ es irreducible.\n\n## ¿Cómo saber si dos fracciones son equivalentes?\n\nUsa los **productos cruzados**: multiplica en forma de equis. Si los resultados son iguales, las fracciones son equivalentes.\n\n$$\\frac{a}{b} = \\frac{c}{d} \\quad \\text{si} \\quad a \\times d = b \\times c$$\n\n**Ejemplo 1:** ¿son equivalentes $\\frac{3}{4}$ y $\\frac{9}{12}$?\n\n- $3 \\times 12 = 36$\n- $4 \\times 9 = 36$\n\nLos dos dan 36, entonces **sí son equivalentes**.\n\n**Ejemplo 2:** ¿son equivalentes $\\frac{2}{5}$ y $\\frac{3}{7}$?\n\n- $2 \\times 7 = 14$\n- $5 \\times 3 = 15$\n\n14 y 15 son diferentes, entonces **no son equivalentes**.\n\n## Cuidado con estos errores\n\n- **Sumar el mismo número arriba y abajo.** $\\frac{1}{2}$ no es igual a $\\frac{1+1}{2+1} = \\frac{2}{3}$. Solo se vale **multiplicar o dividir**.\n- **Cambiar solo una parte.** Si multiplicas el numerador por 3, también tienes que multiplicar el denominador por 3.\n\n## Comprueba lo aprendido\n\n1. Escribe dos fracciones equivalentes a $\\frac{3}{5}$.\n2. Simplifica $\\frac{15}{25}$ hasta que sea irreducible.\n3. ¿Son equivalentes $\\frac{4}{6}$ y $\\frac{10}{15}$?\n\nIntenta resolverlas antes de ver las respuestas.\n\n---\n\n### Respuestas\n\n1. Por ejemplo $\\frac{6}{10}$ (multiplicando por 2) y $\\frac{9}{15}$ (multiplicando por 3).\n2. $\\frac{15}{25} = \\frac{15 \\div 5}{25 \\div 5} = \\frac{3}{5}$\n3. Sí: $4 \\times 15 = 60$ y $6 \\times 10 = 60$.\n', 10, @tema_id);

SELECT @plan_id AS Plan_Id, @tema_id AS Tema_Id, LAST_INSERT_ID() AS Leccion_Id;
