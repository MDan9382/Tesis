namespace MathApp.Api.Models;

/// <summary>Avance de un plan activo: lecciones completadas sobre el total del plan.</summary>
public class AvancePlan
{
    public int PlanId { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public int TotalLecciones { get; set; }
    public int LeccionesCompletadas { get; set; }

    /// <summary>Porcentaje entero 0–100 (0 si el plan no tiene lecciones).</summary>
    public int Porcentaje => TotalLecciones == 0 ? 0 : (int)Math.Round(100.0 * LeccionesCompletadas / TotalLecciones);
}

/// <summary>Un intento de ejercicio o de prueba, con los nombres necesarios para mostrarlo.</summary>
public class ResultadoHistorial
{
    /// <summary>"ejercicio" o "prueba".</summary>
    public string Tipo { get; set; } = string.Empty;
    public int ResultadoId { get; set; }
    /// <summary>Ejercicio_Id o Prueba_Id.</summary>
    public int ElementoId { get; set; }
    /// <summary>Título del contenido (línea "# ..."), si tiene.</summary>
    public string? Titulo { get; set; }
    /// <summary>Lección (ejercicios) o tema (pruebas) al que pertenece.</summary>
    public string Contexto { get; set; } = string.Empty;
    public int? Puntaje { get; set; }
    public DateTime? Fecha { get; set; }
}

/// <summary>Cifras generales del estudiante.</summary>
public class TotalesProgreso
{
    public int LeccionesCompletadas { get; set; }
    public int PracticasRealizadas { get; set; }
    /// <summary>Promedio de todos los intentos (ejercicios y pruebas); null si no hay.</summary>
    public int? PuntajePromedio { get; set; }
}
