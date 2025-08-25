using ProductApp.API.Models;

namespace ProductApp.API.Services
{
    public class ProductService : IProductService
    {
        private readonly List<Product> _products = new()
        {
            new Product { Id = 1, Name = "Mouse", Price = 150 },
            new Product { Id = 2, Name = "Teclado", Price = 250 }
        };

        public IEnumerable<Product> GetAll() => _products;

        public Product? GetById(int id) => _products.FirstOrDefault(p => p.Id == id);
    }
}
