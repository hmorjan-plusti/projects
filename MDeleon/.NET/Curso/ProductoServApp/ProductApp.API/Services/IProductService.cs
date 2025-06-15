using ProductApp.API.Models;

namespace ProductApp.API.Services
{
    public interface IProductService
    {
        IEnumerable<Product> GetAll();
        Product? GetById(int id);
    }
}