import { useCallback, useEffect, useState } from "react";

/**
 * Ejecuta una función asíncrona al montar el componente (y cuando cambian las
 * dependencias) y devuelve { datos, error, cargando, recargar }.
 *   const { datos: planes, error, recargar } = useCarga(() => api("/api/planes"), []);
 */
export function useCarga(funcion, dependencias) {
  const [estado, setEstado] = useState({ datos: null, error: null, cargando: true });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const ejecutar = useCallback(funcion, dependencias);

  const recargar = useCallback(async () => {
    setEstado((e) => ({ ...e, error: null, cargando: true }));
    try {
      const datos = await ejecutar();
      setEstado({ datos, error: null, cargando: false });
    } catch (error) {
      setEstado({ datos: null, error, cargando: false });
    }
  }, [ejecutar]);

  useEffect(() => {
    let vigente = true;
    setEstado({ datos: null, error: null, cargando: true });
    ejecutar().then(
      (datos) => vigente && setEstado({ datos, error: null, cargando: false }),
      (error) => vigente && setEstado({ datos: null, error, cargando: false }),
    );
    return () => { vigente = false; }; // evita mostrar datos de una petición vieja
  }, [ejecutar]);

  return { ...estado, recargar };
}
