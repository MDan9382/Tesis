using System.Data.Common;
using MathApp.Api.Models;

namespace MathApp.Api.Data.Daos;

/// <summary>
/// Consultas de solo lectura para el módulo de Progreso. Calculan en MySQL lo que
/// de otra forma requeriría muchas llamadas desde el navegador.
/// </summary>
public interface IResumenProgresoDao
{
    Task<List<AvancePlan>> ObtenerAvancePlanesAsync(int usuarioId, CancellationToken ct = default);
    Task<List<ResultadoHistorial>> ObtenerHistorialAsync(int usuarioId, int limite = 200, CancellationToken ct = default);
    Task<TotalesProgreso> ObtenerTotalesAsync(int usuarioId, CancellationToken ct = default);
}

public class ResumenProgresoDao : DaoBase, IResumenProgresoDao
{
    public ResumenProgresoDao(IDbConnectionFactory fabrica) : base(fabrica) { }

    /// <summary>Planes activos con el total de lecciones y cuántas completó el usuario.</summary>
    public Task<List<AvancePlan>> ObtenerAvancePlanesAsync(int usuarioId, CancellationToken ct = default) =>
        ConsultarAsync(
            """
            SELECT p.Plan_Id, p.Plan_Nombre,
                   COUNT(DISTINCT l.Leccion_Id) AS Total,
                   COUNT(DISTINCT CASE WHEN pl.PL_Fecha_Completada IS NOT NULL THEN pl.Leccion_Id END) AS Completadas
            FROM Usuario_Planes up
            INNER JOIN Planes_Estudio p ON p.Plan_Id = up.Plan_Id
            LEFT JOIN Temas t ON t.Plan_Id = p.Plan_Id
            LEFT JOIN Lecciones l ON l.Tema_Id = t.Tema_Id
            LEFT JOIN Progreso_Lecciones pl ON pl.Leccion_Id = l.Leccion_Id AND pl.Usuario_Id = up.Usuario_Id
            WHERE up.Usuario_Id = @usuarioId AND up.UP_Activo = TRUE
            GROUP BY p.Plan_Id, p.Plan_Nombre
            ORDER BY p.Plan_Id
            """,
            r => new AvancePlan
            {
                PlanId = r.GetInt32("Plan_Id"),
                Nombre = r.GetString("Plan_Nombre"),
                TotalLecciones = Convert.ToInt32(r["Total"]),
                LeccionesCompletadas = Convert.ToInt32(r["Completadas"]),
            },
            [("@usuarioId", usuarioId)], ct);

    /// <summary>
    /// Intentos de ejercicios y pruebas, del más reciente al más antiguo. El título se
    /// toma de la primera línea del contenido ("# Título") sin traer todo el LONGTEXT.
    /// </summary>
    public Task<List<ResultadoHistorial>> ObtenerHistorialAsync(int usuarioId, int limite = 200, CancellationToken ct = default) =>
        ConsultarAsync(
            """
            SELECT * FROM (
                SELECT 'ejercicio' AS Tipo, r.RE_Id AS ResultadoId, r.Ejercicio_Id AS ElementoId,
                       r.RE_Puntaje AS Puntaje, r.RE_Fecha_Completado AS Fecha,
                       LEFT(e.Ejercicio_Contenido, 200) AS Inicio, l.Leccion_Nombre AS Contexto
                FROM Resultados_Ejercicios r
                INNER JOIN Ejercicios e ON e.Ejercicio_Id = r.Ejercicio_Id
                INNER JOIN Lecciones l ON l.Leccion_Id = e.Leccion_Id
                WHERE r.Usuario_Id = @usuarioId
                UNION ALL
                SELECT 'prueba', r.RP_Id, r.Prueba_Id, r.RP_Puntaje, r.RP_Fecha_Completado,
                       LEFT(p.Prueba_Contenido, 200), t.Tema_Nombre
                FROM Resultados_Pruebas r
                INNER JOIN Pruebas p ON p.Prueba_Id = r.Prueba_Id
                INNER JOIN Temas t ON t.Tema_Id = p.Tema_Id
                WHERE r.Usuario_Id = @usuarioId
            ) h
            ORDER BY Fecha DESC, ResultadoId DESC
            LIMIT @limite
            """,
            r => new ResultadoHistorial
            {
                Tipo = r.GetString("Tipo"),
                ResultadoId = r.GetInt32("ResultadoId"),
                ElementoId = r.GetInt32("ElementoId"),
                Titulo = ExtraerTitulo(r.GetNullableString("Inicio")),
                Contexto = r.GetString("Contexto"),
                Puntaje = r.GetNullableInt32("Puntaje"),
                Fecha = r.GetNullableDateTime("Fecha"),
            },
            [("@usuarioId", usuarioId), ("@limite", limite)], ct);

    public async Task<TotalesProgreso> ObtenerTotalesAsync(int usuarioId, CancellationToken ct = default) =>
        (await ConsultarUnoAsync(
            """
            SELECT
              (SELECT COUNT(DISTINCT Leccion_Id) FROM Progreso_Lecciones
                WHERE Usuario_Id = @usuarioId AND PL_Fecha_Completada IS NOT NULL) AS Lecciones,
              (SELECT COUNT(*) FROM Resultados_Ejercicios WHERE Usuario_Id = @usuarioId)
                + (SELECT COUNT(*) FROM Resultados_Pruebas WHERE Usuario_Id = @usuarioId) AS Practicas,
              (SELECT ROUND(AVG(x.p)) FROM (
                  SELECT RE_Puntaje AS p FROM Resultados_Ejercicios WHERE Usuario_Id = @usuarioId AND RE_Puntaje IS NOT NULL
                  UNION ALL
                  SELECT RP_Puntaje FROM Resultados_Pruebas WHERE Usuario_Id = @usuarioId AND RP_Puntaje IS NOT NULL
              ) x) AS Promedio
            """,
            r => new TotalesProgreso
            {
                LeccionesCompletadas = Convert.ToInt32(r["Lecciones"]),
                PracticasRealizadas = Convert.ToInt32(r["Practicas"]),
                PuntajePromedio = r.IsDBNull(r.GetOrdinal("Promedio")) ? null : Convert.ToInt32(r["Promedio"]),
            },
            [("@usuarioId", usuarioId)], ct))!;

    /// <summary>"# Mi título\n..." → "Mi título"; null si no empieza con un encabezado.</summary>
    internal static string? ExtraerTitulo(string? inicio)
    {
        if (string.IsNullOrWhiteSpace(inicio)) return null;
        var primera = inicio.TrimStart().Split('\n')[0].Trim();
        return primera.StartsWith("# ") ? primera[2..].Trim() : null;
    }
}
