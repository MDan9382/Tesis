import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

/**
 * Muestra contenido escrito en Markdown: títulos, listas, tablas, imágenes y
 * fórmulas con $...$ (en línea) o $$...$$ (en bloque).
 * El HTML que venga dentro del texto NO se ejecuta (protección contra XSS).
 */
/**
 * Una fórmula escrita en una sola línea como $$ ... $$ se pasa a bloque
 * (centrada), igual que si se escribiera con $$ en líneas separadas.
 */
function prepararFormulas(texto) {
  return (texto ?? "").replace(/^[ \t]*\$\$(.+?)\$\$[ \t]*$/gm, "$$$$\n$1\n$$$$");
}

export default function ContenidoMarkdown({ texto, fraccionesGrandes = false }) {
  let fuente = prepararFormulas(texto);
  // En preguntas y opciones, \frac se muestra a tamaño completo (\dfrac) para leerse mejor.
  if (fraccionesGrandes) fuente = fuente.replace(/\\frac(?=\s*\{)/g, "\\dfrac");
  return (
    <div className="markdown">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          a: ({ node, ...props }) => <a {...props} target="_blank" rel="noopener noreferrer" />,
          img: ({ node, ...props }) => <img {...props} loading="lazy" alt={props.alt ?? ""} />,
          table: ({ node, ...props }) => (
            <div className="markdown-tabla"><table {...props} /></div>
          ),
        }}
      >
        {fuente}
      </ReactMarkdown>
    </div>
  );
}
