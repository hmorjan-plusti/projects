using Microsoft.EntityFrameworkCore;
using backend.Models; // Ajusta si tu namespace es diferente

namespace backend.Data // Asegúrate que este namespace es correcto
{
    public class UsersDbContext : DbContext
    {
        public UsersDbContext(DbContextOptions<UsersDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
    }
}