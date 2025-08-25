using System;

namespace Plataforma.Domain.Entities;

public class Customer
{
    public Guid Id { get; private set; } = Guid.NewGuid();
    public string Name { get; private set; } = string.Empty;
    public string Email { get; private set; } = string.Empty;
    public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;

    private Customer() { }
    public Customer(string name, string email) { Name = name; Email = email; }
    public void Rename(string newName) => Name = newName;
}
