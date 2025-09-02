using Microsoft.AspNetCore.Identity;

namespace Plataforma.Api.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string? DisplayName { get; set; }
    }
}
