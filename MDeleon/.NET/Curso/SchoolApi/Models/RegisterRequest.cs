namespace SchoolApi.Models
{
    public class RegisterRequest
    {
        public required string Username { get; set; } // Agregado 'required'
        public required string Password { get; set; } // Agregado 'required'
    }
}