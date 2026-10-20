using System.Data.Common;
using MathApp.Api.Models;

namespace MathApp.Api.Data.Daos;

public interface IEjercicioDao
{
    Task<Ejercicio?> ObtenerPorIdAsync(int id, CancellationToken ct = default);
    Task<List<Ejercicio>> ObtenerPorLeccionAsync(int leccionId, CancellationToken ct = default);
    Task<int> InsertarAsync(Ejercicio ejercicio, CancellationToken ct = default);
    Task<bool> ActualizarAsync(Ejercicio ejercicio, CancellationToken ct = default);
    Task<bool> EliminarAsync(int id, CancellationToken ct = default);
}

public class EjercicioDao : DaoBase, IEjercicioDao
{
    private const string Columnas = "e.Ejercicio_Id, e.Ejercicio_Contenido, e.Leccion_Id";

    public EjercicioDao(IDbConnectionFactory fabrica) : base(fabrica) { }

    public Task<Ejercicio?> ObtenerPorIdAsync(int id, CancellationToken ct = default) =>
        ConsultarUnoAsync($"SELECT {Columnas} FROM Ejercicios e WHERE e.Ejercicio_Id = @id",
            Mapear, [("@id", id)], ct);

    public Task<List<Ejercicio>> ObtenerPorLeccionAsync(int leccionId, CancellationToken ct = default) =>
        ConsultarAsync(
            $"SELECT {Columnas} FROM Ejercicios e WHERE e.Leccion_Id = @leccionId ORDER BY e.Ejercicio_Id",
            Mapear, [("@leccionId", leccionId)], ct);

    public async Task<int> InsertarAsync(Ejercicio ejercicio, CancellationToken ct = default)
    {
        ejercicio.Id = await InsertarYObtenerIdAsync(
            "INSERT INTO Ejercicios (Ejercicio_Contenido, Leccion_Id) VALUES (@contenido, @leccionId)",
            [("@contenido", ejercicio.Contenido), ("@leccionId", ejercicio.LeccionId)], ct);
        return ejercicio.Id;
    }

    public async Task<bool> ActualizarAsync(Ejercicio ejercicio, CancellationToken ct = default) =>
        await EjecutarAsync(
            """
            UPDATE Ejercicios
            SET Ejercicio_Contenido = @contenido, Leccion_Id = @leccionId
            WHERE Ejercicio_Id = @id
            """,
            [("@contenido", ejercicio.Contenido), ("@leccionId", ejercicio.LeccionId), ("@id", ejercicio.Id)], ct) > 0;

    /// <remarks>Falla (error MySQL 1451) si el ejercicio tiene resultados registrados.</remarks>
    public async Task<bool> EliminarAsync(int id, CancellationToken ct = default) =>
        await EjecutarAsync("DELETE FROM Ejercicios WHERE Ejercicio_Id = @id", [("@id", id)], ct) > 0;

    private static Ejercicio Mapear(DbDataReader r) => new()
    {
        Id = r.GetInt32("Ejercicio_Id"),
        Contenido = r.GetNullableString("Ejercicio_Contenido"),
        LeccionId = r.GetInt32("Leccion_Id"),
    };
}
