namespace ProductApp.API.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string? Name { get; set; } // Permitir valores nulos
        public decimal Price { get; set; }
    }
}