using Microsoft.EntityFrameworkCore;
using NoteApp.backend.Models;

namespace NoteApp.backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users => Set<User>();
        public DbSet<Note> Notes => Set<Note>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configurar relación 1:N entre User y Notes
            modelBuilder.Entity<User>()
                .HasMany(u => u.Notes)
                .WithOne(n => n.User)
                .HasForeignKey(n => n.UserId)
                .OnDelete(DeleteBehavior.Cascade); // Eliminar notas si se borra el usuario

            base.OnModelCreating(modelBuilder);
        }
    }
}
