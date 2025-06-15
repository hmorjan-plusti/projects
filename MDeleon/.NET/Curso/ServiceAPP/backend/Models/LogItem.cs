namespace ServiceAPP.backend.Models
{
    public class LogItem
    {
        public int Id { get; set; }
        public string Tipo { get; set; } = "INFO"; // Inicializado
        public string Mensaje { get; set; } = string.Empty; // Inicializado
        public DateTime Fecha { get; set; }
    }
}