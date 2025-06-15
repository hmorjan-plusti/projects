using Microsoft.AspNetCore.Mvc;
using ProductApp.API.Models;
using ProductApp.API.Services;

namespace ProductApp.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _service;

        public ProductController(IProductService service)
        {
            _service = service;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Product>> GetAll() => Ok(_service.GetAll());

        [HttpGet("{id}")]
        public ActionResult<Product> GetById(int id)
        {
            var product = _service.GetById(id);
            if (product == null) return NotFound();
            return Ok(product);
        }
    }
}
