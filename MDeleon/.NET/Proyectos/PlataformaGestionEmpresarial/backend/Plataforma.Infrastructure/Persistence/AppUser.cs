using Microsoft.AspNetCore.Identity;
using System;

namespace Plataforma.Infrastructure.Persistence
{
    public class AppUser : IdentityUser<Guid>
    {
        public string FullName { get; set; }
        // Puedes agregar más propiedades según tus necesidades
    }
}
