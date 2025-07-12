namespace backend.Models;

public class Reporte
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public DateTime FechaGeneracion { get; set; }
    public bool Activo { get; set; }
}
