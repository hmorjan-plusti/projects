namespace NoteApp.backend.Dtos
{
    public class UserDto
    {
        public int Id { get; set; } // <-- Agregado para listar usuarios
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty; // Opcional: solo para registro/creación
    }
}