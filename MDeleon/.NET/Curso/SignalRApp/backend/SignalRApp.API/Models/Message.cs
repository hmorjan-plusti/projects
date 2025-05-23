namespace SignalRApp.API.Models
{
    public class Message
    {
        public int Id { get; set; }
        public string User { get; set; } = string.Empty; // Inicialización para evitar valores NULL
        public string Text { get; set; } = string.Empty; // Inicialización para evitar valores NULL
    }
}