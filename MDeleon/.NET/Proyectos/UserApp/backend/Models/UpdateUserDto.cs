using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class UpdateUserDto
    {
        [Required]
        public string Username { get; set; } = string.Empty;

        public string? Password { get; set; } // Opcional
    }
}
