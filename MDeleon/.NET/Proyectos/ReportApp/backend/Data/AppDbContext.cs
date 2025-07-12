using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Reporte> Reportes => Set<Reporte>();
    public DbSet<Usuario> Usuarios => Set<Usuario>();
}
