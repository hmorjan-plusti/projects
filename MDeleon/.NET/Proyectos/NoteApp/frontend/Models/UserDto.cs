namespace frontend.Models
{
    public class UserDto
    {
        public int Id { get; set; } // <-- Agrega esta línea
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}