using Microsoft.AspNetCore.Mvc;
using ApiRest.Models;

namespace ApiRest.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductosController : ControllerBase
    {
        private static List<Producto> productos = new()
        {
            new Producto { Id = 1, Nombre = "Laptop", Precio = 999.99M },
            new Producto { Id = 2, Nombre = "Mouse", Precio = 49.99M }
        };

        [HttpGet]
        public ActionResult<IEnumerable<Producto>> Get() => Ok(productos);

        [HttpGet("{id}")]
        public ActionResult<Producto> GetById(int id)
        {
            var producto = productos.FirstOrDefault(p => p.Id == id);
            if (producto == null) return NotFound();
            return Ok(producto);
        }

        [HttpPost]
        public ActionResult<Producto> Post([FromBody] Producto nuevo)
        {
            productos.Add(nuevo);
            return CreatedAtAction(nameof(GetById), new { id = nuevo.Id }, nuevo);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Producto actualizado)
        {
            var index = productos.FindIndex(p => p.Id == id);
            if (index == -1) return NotFound();
            productos[index] = actualizado;
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var producto = productos.FirstOrDefault(p => p.Id == id);
            if (producto == null) return NotFound();
            productos.Remove(producto);
            return NoContent();
        }
    }
}
