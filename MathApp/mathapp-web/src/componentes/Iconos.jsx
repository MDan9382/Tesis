// Íconos SVG sencillos usados en varias páginas.
export function Chevron({ tamano = 18 }) {
  return (
    <svg width={tamano} height={tamano} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export function Check({ tamano = 14 }) {
  return (
    <svg width={tamano} height={tamano} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
