import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

/**
 * Al compilar para producción, verifica que VITE_API_URL sea una URL válida.
 * Así un error en las variables de Railway detiene la compilación con un
 * mensaje claro, en lugar de publicar una app que no puede llamar al backend.
 */
function validarApiUrl(env) {
  const valor = env.VITE_API_URL ?? "";
  let host = "";
  try {
    host = new URL(valor).host;
  } catch { /* no es una URL */ }

  if (!host || /[{}$]/.test(valor)) {
    throw new Error(
      `\n\nVITE_API_URL no es una URL válida: "${valor}"\n` +
      "Debe ser la dirección pública del backend, por ejemplo:\n" +
      "  https://mathapp-api-production.up.railway.app\n" +
      "Si usas una variable de referencia de Railway (${{Servicio.RAILWAY_PUBLIC_DOMAIN}}),\n" +
      "revisa que el nombre del servicio sea exactamente el de tu backend.\n",
    );
  }
}

export default defineConfig(({ command, mode }) => {
  if (command === "build") validarApiUrl({ ...loadEnv(mode, process.cwd(), "VITE_"), ...process.env });
  return {
    plugins: [react()],
    server: { port: 5173 },
  };
});
