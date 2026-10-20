using System.Data.Common;

namespace MathApp.Api.Data;

/// <summary>Lectura de columnas por nombre, manejando valores NULL.</summary>
internal static class DataReaderExtensions
{
    public static int GetInt32(this DbDataReader r, string columna) =>
        r.GetInt32(r.GetOrdinal(columna));

    public static int? GetNullableInt32(this DbDataReader r, string columna)
    {
        var i = r.GetOrdinal(columna);
        return r.IsDBNull(i) ? null : r.GetInt32(i);
    }

    public static string GetString(this DbDataReader r, string columna) =>
        r.GetString(r.GetOrdinal(columna));

    public static string? GetNullableString(this DbDataReader r, string columna)
    {
        var i = r.GetOrdinal(columna);
        return r.IsDBNull(i) ? null : r.GetString(i);
    }

    public static bool GetBoolean(this DbDataReader r, string columna) =>
        r.GetBoolean(r.GetOrdinal(columna));

    public static bool? GetNullableBoolean(this DbDataReader r, string columna)
    {
        var i = r.GetOrdinal(columna);
        return r.IsDBNull(i) ? null : r.GetBoolean(i);
    }

    // Las fechas se guardan en UTC (UTC_TIMESTAMP()). Se marcan como UTC al leerlas para
    // que el JSON lleve la "Z" y el navegador las convierta a la hora local del estudiante.
    public static DateTime GetDateTime(this DbDataReader r, string columna) =>
        DateTime.SpecifyKind(r.GetDateTime(r.GetOrdinal(columna)), DateTimeKind.Utc);

    public static DateTime? GetNullableDateTime(this DbDataReader r, string columna)
    {
        var i = r.GetOrdinal(columna);
        return r.IsDBNull(i) ? null : DateTime.SpecifyKind(r.GetDateTime(i), DateTimeKind.Utc);
    }
}
