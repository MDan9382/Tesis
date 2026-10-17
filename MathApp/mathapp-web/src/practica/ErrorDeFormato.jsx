/** Se muestra cuando el contenido de un ejercicio o prueba está mal escrito. */
export default function ErrorDeFormato({ mensaje }) {
  return (
    <div className="tarjeta vacio-tarjeta">
      <p className="vacio-titulo">Este contenido tiene un error de formato</p>
      <p className="texto-suave">{mensaje}</p>
      <p className="texto-suave">Revisa el contenido en la base de datos (ver FORMATO_PREGUNTAS.md).</p>
    </div>
  );
}
