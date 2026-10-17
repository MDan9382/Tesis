import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import RutaProtegida from "./auth/RutaProtegida";
import Layout from "./componentes/Layout";
import Entrar from "./paginas/Entrar";
import PantallaCarga from "./componentes/PantallaCarga";
import Lecciones from "./paginas/Lecciones";
import PlanEstudio from "./paginas/PlanEstudio";
import Practicas from "./paginas/Practicas";
import Proximamente from "./paginas/Proximamente";

// El visor incluye Markdown y KaTeX (fórmulas): se descarga solo al abrir una lección.
const LeccionVista = lazy(() => import("./paginas/LeccionVista"));
const ResolverEjercicio = lazy(() => import("./paginas/ResolverEjercicio"));
const ResolverPrueba = lazy(() => import("./paginas/ResolverPrueba"));
const Diferido = ({ children, texto }) => <Suspense fallback={<PantallaCarga texto={texto} />}>{children}</Suspense>;

export default function App() {
  return (
    <Routes>
      <Route path="/entrar" element={<Entrar />} />

      <Route element={<RutaProtegida />}>
        <Route element={<Layout />}>
          <Route index element={<Navigate to="/lecciones" replace />} />
          <Route path="/lecciones" element={<Lecciones />} />
          <Route
            path="/lecciones/:id"
            element={<Suspense fallback={<PantallaCarga texto="Cargando lección…" />}><LeccionVista /></Suspense>}
          />
          <Route path="/practicas" element={<Practicas />} />
          <Route path="/practicas/ejercicios/:id" element={<Diferido texto="Cargando ejercicio…"><ResolverEjercicio /></Diferido>} />
          <Route path="/practicas/pruebas/:id" element={<Diferido texto="Cargando prueba…"><ResolverPrueba /></Diferido>} />
          <Route path="/plan" element={<PlanEstudio />} />
          <Route
            path="/progreso"
            element={<Proximamente titulo="Progreso y estadísticas" descripcion="Revisa tu avance en el plan de estudio y los ejercicios completados." />}
          />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
