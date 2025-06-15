using Microsoft.EntityFrameworkCore;
using SecureNotesApp.Models;

namespace SecureNotesApp.Data;

public class NotesDbContext : DbContext
{
    public NotesDbContext(DbContextOptions<NotesDbContext> options) : base(options) { }

    public DbSet<Note> Notes => Set<Note>();
}
