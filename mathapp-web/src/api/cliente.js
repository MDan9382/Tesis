import { auth } from "../firebase";

const API = (import.meta.env.VITE_API_URL ?? "http://localhost:5225").replace(/\/$/, "");

/** Error devuelto por el backend, con el código HTTP y un mensaje para mostrar. */
export class ErrorApi extends Error {
  constructor(estado, mensaje) {
    super(mensaje);
    this.estado = estado;
  }
}

const MENSAJES = {
  0: "No se pudo conectar con el servidor. Revisa tu conexión a internet o inténtalo en unos minutos.",
  401: "Tu sesión expiró. Vuelve a iniciar sesión.",
  403: "No tienes permiso para hacer esto.",
  404: "No se encontró lo que buscabas.",
  500: "Ocurrió un error en el servidor. Inténtalo más tarde.",
};

/**
 * Llama al backend con el token de Firebase del usuario actual.
 *   api("/api/yo")
 *   api("/api/ejercicios/3/resultados", { metodo: "POST", cuerpo: { puntaje: 80 } })
 */
export async function api(ruta, { metodo = "GET", cuerpo } = {}) {
  const usuario = auth.currentUser;
  // getIdToken() devuelve el token guardado y lo renueva solo cuando está por vencer.
  const token = usuario ? await usuario.getIdToken() : null;

  let respuesta;
  try {
    respuesta = await fetch(`${API}${ruta}`, {
      method: metodo,
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
        ...(cuerpo !== undefined && { "Content-Type": "application/json" }),
      },
      body: cuerpo !== undefined ? JSON.stringify(cuerpo) : undefined,
    });
  } catch {
    // fetch solo falla así cuando la petición no llegó: backend apagado, URL
    // incorrecta o el backend no permite este origen (CORS).
    console.error(
      `No se pudo conectar con ${API}${ruta}.\n` +
      "Revisa: 1) que el backend esté encendido (abre " + API + "/health), " +
      "2) VITE_API_URL, 3) que Cors__Origenes del backend incluya " + window.location.origin,
    );
    throw new ErrorApi(0, import.meta.env.DEV ? `${MENSAJES[0]} (${API})` : MENSAJES[0]);
  }

  if (!respuesta.ok) {
    let detalle = null;
    try { detalle = await respuesta.json(); } catch { /* sin cuerpo */ }
    const mensaje =
      (respuesta.status === 400 && detalle?.title) ||
      MENSAJES[respuesta.status] ||
      detalle?.title ||
      MENSAJES[500];
    throw new ErrorApi(respuesta.status, mensaje);
  }

  return respuesta.status === 204 ? null : respuesta.json();
}
