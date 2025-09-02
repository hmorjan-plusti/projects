using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Plataforma.Api.Data;
using Plataforma.Api.Models;
using System.Security.Claims;

namespace PlataformaSegura.Controllers
{
    public class CreateOrderDto
    {
        public decimal Total { get; set; }
        public List<int> Products { get; set; } = new();
    }
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class OrdersController : ControllerBase
    {
        private readonly AppDbContext _context;
        public OrdersController(AppDbContext context) => _context = context;

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var orders = await _context.Orders
                .Include(o => o.Products)
                .Where(o => o.UserId == userId)
                .ToListAsync();
            return Ok(orders);
        }

        [HttpPost]
        [AllowAnonymous] // Permitir cualquier usuario
        public async Task<IActionResult> Create([FromBody] CreateOrderDto dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var products = await _context.Products.Where(p => dto.Products.Contains(p.Id)).ToListAsync();
            if (products.Count != dto.Products.Count)
                return BadRequest(new { message = "Uno o más productos no existen." });

            var order = new Order
            {
                UserId = userId,
                CreatedAt = DateTime.UtcNow,
                Total = dto.Total,
                Products = products
            };

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            // Recargar la orden con los productos incluidos
            var createdOrder = await _context.Orders
                .Include(o => o.Products)
                .FirstOrDefaultAsync(o => o.Id == order.Id);

            return Ok(createdOrder);
        }

        [HttpGet("my")]
        public async Task<IActionResult> MyOrders()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var orders = await _context.Orders
                .Include(o => o.Products)
                .Where(o => o.UserId == userId)
                .ToListAsync();

            return Ok(orders);
        }

        [HttpGet("all")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AllOrders() =>
            Ok(await _context.Orders.Include(o => o.Products).ToListAsync());
    }
}
