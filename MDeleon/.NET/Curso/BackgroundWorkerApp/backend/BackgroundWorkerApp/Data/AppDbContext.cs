using Microsoft.EntityFrameworkCore;
using BackgroundWorkerApp.Models;

namespace BackgroundWorkerApp.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<LogEntry> LogEntries { get; set; } = null!;
    }
}