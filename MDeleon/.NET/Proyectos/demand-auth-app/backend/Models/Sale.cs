namespace DemandAuth.Api.Models;

public class Sale
{
    public int Id { get; set; }
    public string Sku { get; set; } = string.Empty;
    public DateTime Timestamp { get; set; }
    public int Quantity { get; set; }
}