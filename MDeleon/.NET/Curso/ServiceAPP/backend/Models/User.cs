namespace ServiceAPP.backend.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty; // Inicializado
        public string Password { get; set; } = string.Empty; // Inicializado
    }
}