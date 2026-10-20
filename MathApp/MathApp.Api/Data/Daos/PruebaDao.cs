using System.Data.Common;
using MathApp.Api.Models;

namespace MathApp.Api.Data.Daos;

public interface IPruebaDao
{
    Task<Prueba?> ObtenerPorIdAsync(int id, CancellationToken ct = default);
    Task<List<Prueba>> ObtenerPorTemaAsync(int temaId, CancellationToken ct = default);
    Task<int> InsertarAsync(Prueba prueba, CancellationToken ct = default);
    Task<bool> ActualizarAsync(Prueba prueba, CancellationToken ct = default);
    Task<bool> EliminarAsync(int id, CancellationToken ct = default);
}

public class PruebaDao : DaoBase, IPruebaDao
{
    private const string Columnas = "Prueba_Id, Prueba_Contenido, Tema_Id";

    public PruebaDao(IDbConnectionFactory fabrica) : base(fabrica) { }

    public Task<Prueba?> ObtenerPorIdAsync(int id, CancellationToken ct = default) =>
        ConsultarUnoAsync($"SELECT {Columnas} FROM Pruebas WHERE Prueba_Id = @id",
            Mapear, [("@id", id)], ct);

    public Task<List<Prueba>> ObtenerPorTemaAsync(int temaId, CancellationToken ct = default) =>
        ConsultarAsync(
            $"SELECT {Columnas} FROM Pruebas WHERE Tema_Id = @temaId ORDER BY Prueba_Id",
            Mapear, [("@temaId", temaId)], ct);

    public async Task<int> InsertarAsync(Prueba prueba, CancellationToken ct = default)
    {
        prueba.Id = await InsertarYObtenerIdAsync(
            "INSERT INTO Pruebas (Prueba_Contenido, Tema_Id) VALUES (@contenido, @temaId)",
            [("@contenido", prueba.Contenido), ("@temaId", prueba.TemaId)], ct);
        return prueba.Id;
    }

    public async Task<bool> ActualizarAsync(Prueba prueba, CancellationToken ct = default) =>
        await EjecutarAsync(
            """
            UPDATE Pruebas
            SET Prueba_Contenido = @contenido, Tema_Id = @temaId
            WHERE Prueba_Id = @id
            """,
            [("@contenido", prueba.Contenido), ("@temaId", prueba.TemaId), ("@id", prueba.Id)], ct) > 0;

    /// <remarks>Falla (error MySQL 1451) si la prueba tiene resultados registrados.</remarks>
    public async Task<bool> EliminarAsync(int id, CancellationToken ct = default) =>
        await EjecutarAsync("DELETE FROM Pruebas WHERE Prueba_Id = @id", [("@id", id)], ct) > 0;

    private static Prueba Mapear(DbDataReader r) => new()
    {
        Id = r.GetInt32("Prueba_Id"),
        Contenido = r.GetNullableString("Prueba_Contenido"),
        TemaId = r.GetInt32("Tema_Id"),
    };
}
