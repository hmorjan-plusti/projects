using Microsoft.EntityFrameworkCore;
using SignalRApp.API.Models;

namespace SignalRApp.API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Message> Messages { get; set; }
    }
}
