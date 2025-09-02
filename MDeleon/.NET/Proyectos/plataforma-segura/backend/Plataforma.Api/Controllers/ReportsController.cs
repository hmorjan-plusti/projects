using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Plataforma.Api.Data;
using System.Text;

namespace PlataformaSegura.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    public class ReportsController : ControllerBase
    {
        private readonly AppDbContext _context;
        public ReportsController(AppDbContext context) => _context = context;

        [HttpGet("orders-csv")]
        public async Task<IActionResult> ExportOrdersCsv()
        {
            var orders = await _context.Orders.Include(o => o.Products).ToListAsync();

            var sb = new StringBuilder();
            sb.AppendLine("OrderId,UserId,CreatedAt,Products");

            foreach (var order in orders)
            {
                var products = string.Join(";", order.Products.Select(p => p.Name));
                sb.AppendLine($"{order.Id},{order.UserId},{order.CreatedAt},{products}");
            }

            var bytes = Encoding.UTF8.GetBytes(sb.ToString());
            return File(bytes, "text/csv", "orders.csv");
        }
    }
}
