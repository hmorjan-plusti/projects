public class Order
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string? ProductName { get; set; } // Permitir nulos
    public int Quantity { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}