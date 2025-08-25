using Microsoft.EntityFrameworkCore;
using ReservaApp.backend.Models;

namespace ReservaApp.backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<User> Users => Set<User>();
        public DbSet<Reserva> Reservas => Set<Reserva>();
    }
}
