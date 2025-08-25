namespace PlatformApp.Models
{
    // Modelo auxiliar para solicitudes de login y registro
    public class AuthRequest
    {
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}