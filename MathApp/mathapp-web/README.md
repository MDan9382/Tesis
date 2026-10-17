# mathapp-web — frontend en React

React + Vite, con inicio de sesión de Firebase (Google y correo/contraseña).

## Ponerlo a funcionar

1. Instala las dependencias (necesitas Node.js 20 o superior):
   ```bash
   npm install
   ```
2. Copia `.env.example` como `.env.local` y llena los datos de Firebase:
   Consola de Firebase → ⚙ Configuración del proyecto → *Tus apps* → tu app web →
   `firebaseConfig`. Solo hacen falta `apiKey` y `appId`; el resto ya está puesto.
3. Pon en `VITE_API_URL` la dirección del backend (la que muestra Visual Studio al
   ejecutar la API, p. ej. `http://localhost:5225`).
4. Arranca:
   ```bash
   npm run dev
   ```
   y abre http://localhost:5173. El backend ya permite este origen (CORS) en desarrollo.

## Revisar en Firebase

- **Authentication → Sign-in method**: activa *Google* y *Correo electrónico/contraseña*.
- **Authentication → Settings → Authorized domains**: `localhost` ya viene. Cuando
  publiques el frontend agrega su dominio; si no, el botón de Google dará error.

## Publicar en Railway

El frontend se publica como un **segundo servicio** del mismo proyecto de Railway, desde
el mismo repositorio de GitHub. El `Dockerfile` compila la app y la sirve con Caddy.

1. En el proyecto: **+ New → GitHub Repo** y elige el mismo repositorio.
2. En el servicio nuevo, pestaña **Settings**:
   - **Root Directory**: `/mathapp-web`
   - **Config-as-code → Railway Config File**: `/mathapp-web/railway.json`
     (Railway no busca este archivo dentro de Root Directory; sin esto tomaría el
     `railway.json` del backend).
   - **Networking → Generate Domain**.
3. Pestaña **Variables**:

   | Variable | Valor |
   |---|---|
   | `VITE_FIREBASE_API_KEY` | el `apiKey` de Firebase |
   | `VITE_FIREBASE_APP_ID` | el `appId` de Firebase |
   | `VITE_FIREBASE_AUTH_DOMAIN` | `tesis-mate-app.firebaseapp.com` |
   | `VITE_FIREBASE_PROJECT_ID` | `tesis-mate-app` |
   | `VITE_API_URL` | `https://${{NOMBRE_DEL_BACKEND.RAILWAY_PUBLIC_DOMAIN}}` |

   Cambia `NOMBRE_DEL_BACKEND` por el nombre de tu servicio de la API en Railway.
   Estas variables se usan **al compilar**: si cambias alguna, Railway vuelve a
   compilar y publicar.
4. En el servicio del **backend**, agrega el dominio del frontend a `Cors__Origenes`:
   `https://<dominio-del-frontend>` (sin `/` al final). Para seguir probando en tu
   computadora: `https://<dominio-del-frontend>,http://localhost:5173`.
5. En **Firebase → Authentication → Settings → Authorized domains**, agrega el
   dominio del frontend (sin `https://`).

## Estructura

```
src/
├── firebase.js            Inicializa Firebase con las variables de .env.local
├── api/cliente.js         api("/ruta"): llama al backend con el token de Firebase
├── auth/
│   ├── AuthContext.jsx    Sesión: entrar, registrarse, recuperar contraseña, salir
│   ├── RutaProtegida.jsx  Manda a /entrar a quien no tiene sesión
│   └── erroresFirebase.js Mensajes de error en español
├── componentes/           Barra superior (Layout), interruptor, íconos, errores
├── paginas/
│   ├── Entrar.jsx         Inicio de sesión / crear cuenta / recuperar contraseña
│   ├── PlanEstudio.jsx    Activar planes y ver sus temas y lecciones
│   ├── Lecciones.jsx      Temas de los planes activos y buscador de lecciones
│   ├── LeccionVista.jsx   Lección en Markdown con fórmulas; se completa al terminarla
│   ├── Practicas.jsx      Ejercicios por lección y pruebas por tema, con mejor puntaje
│   ├── ResolverEjercicio.jsx  Resolver, calificar y guardar un ejercicio
│   └── ResolverPrueba.jsx     Prueba con tiempo límite (config.js) y entrega automática
├── practica/              Formato de preguntas, números al azar y calificación
│   └── Proximamente.jsx   Lugar temporal de los módulos que faltan
└── estilos/               Colores y componentes tomados de los prototipos
```

## Cómo usar la sesión en otras páginas

```jsx
import { useAuth } from "../auth/AuthContext";
import { api } from "../api/cliente";

const { usuario } = useAuth();                 // fila de la tabla Usuarios
const temas = await api("/api/planes/1/temas");
await api("/api/lecciones/3/completar", { metodo: "POST" });
```

`api()` agrega el token automáticamente y lanza un `ErrorApi` con un mensaje en
español si algo falla (`error.message`, `error.estado`).

## Cómo escribir el contenido de una lección

`Leccion_Contenido` se escribe en **Markdown**:

````markdown
## Subtítulo

Texto con **negritas** y fórmulas en línea: $\frac{1}{2} + \frac{1}{4} = \frac{3}{4}$

$$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$

| Fracción | Decimal |
|---|---|
| 1/2 | 0.5 |

> **Recuerda:** una nota destacada.

- Lista de puntos
1. Lista numerada

![Descripción de la imagen](https://ejemplo.com/imagen.png)
````

- Las fórmulas usan sintaxis LaTeX (KaTeX): `$...$` en línea, `$$...$$` centrada.
- El HTML escrito dentro del contenido se muestra como texto y nunca se ejecuta.
- La lección se marca como completada sola cuando el estudiante llega al final y
  lleva al menos 8 segundos en ella (`TIEMPO_MINIMO_MS` en `LeccionVista.jsx`).

## Ejercicios y pruebas

El formato para escribir preguntas está en [`docs/FORMATO_PREGUNTAS.md`](docs/FORMATO_PREGUNTAS.md).
Antes de guardar uno en la base de datos, revísalo con:

```bash
npm run validar -- ruta/al/ejercicio.md
```

`npm test` ejecuta las pruebas del motor de calificación. El tiempo de las pruebas se
cambia en `src/config.js` (`TIEMPO_PRUEBA_MINUTOS`).

## Nota sobre el botón de Google

El botón usa un ícono genérico. Si prefieres el botón oficial con el logotipo de
Google, descárgalo de la guía de marca de Google Identity ("Sign in with Google
branding guidelines") y reemplaza el `<svg>` en `Entrar.jsx`.
