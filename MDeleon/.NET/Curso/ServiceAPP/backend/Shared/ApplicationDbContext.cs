using Microsoft.EntityFrameworkCore;
using ServiceAPP.backend.Models;

namespace ServiceAPP.backend.Shared
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<LogItem> LogItems { get; set; } // Asegúrate de que esta línea esté presente
    }
}