using Microsoft.EntityFrameworkCore;
using PlatformApp.Models;

namespace PlatformApp.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Dataset> Datasets { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configuración opcional adicional
            modelBuilder.Entity<User>().ToTable("Users");
            modelBuilder.Entity<Dataset>().ToTable("Datasets");
        }
    }
}
