using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public DbSet<Dato> Datos { get; set; }

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Dato>().ToTable("Datos");
    }
}
