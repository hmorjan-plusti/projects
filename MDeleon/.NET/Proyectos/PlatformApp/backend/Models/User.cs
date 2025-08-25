namespace PlatformApp.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;

        // Se inicializa para evitar advertencia de nullabilidad (CS8618)
        public byte[] PasswordHash { get; set; } = Array.Empty<byte>();
        public byte[] PasswordSalt { get; set; } = Array.Empty<byte>();

        public List<Dataset> Datasets { get; set; } = new();
    }
}
