using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Plataforma.Domain.Entities;
using System;

namespace Plataforma.Infrastructure.Persistence;

public class AppDbContext : IdentityDbContext<AppUser, IdentityRole<Guid>, Guid>
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Customer> Customers => Set<Customer>();
    public DbSet<EventRecord> EventStore => Set<EventRecord>();

    protected override void OnModelCreating(ModelBuilder b)
    {
        base.OnModelCreating(b);
        b.Entity<Customer>(cfg =>
        {
            cfg.HasKey(x => x.Id);
            cfg.Property(x => x.Name).HasMaxLength(200).IsRequired();
            cfg.Property(x => x.Email).HasMaxLength(200).IsRequired();
        });
        b.Entity<EventRecord>(cfg =>
        {
            cfg.HasKey(x => x.Id);
            cfg.HasIndex(x => x.AggregateId);
        });
    }
}
