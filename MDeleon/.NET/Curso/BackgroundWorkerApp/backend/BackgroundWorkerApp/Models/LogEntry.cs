namespace BackgroundWorkerApp.Models
{
    public class LogEntry
    {
        public int Id { get; set; }
        public string Message { get; set; } = string.Empty; // Inicialización para evitar valores nulos
        public DateTime Timestamp { get; set; }
    }
}