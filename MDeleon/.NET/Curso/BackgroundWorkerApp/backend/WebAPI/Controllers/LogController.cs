using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackgroundWorkerApp.Data;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LogController : ControllerBase
    {
        private readonly AppDbContext _context;

        public LogController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetLogs()
        {
            try
            {
                var logs = await _context.LogEntries
                    .OrderByDescending(x => x.Timestamp)
                    .ToListAsync();

                return Ok(logs);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al obtener los logs: {ex.Message}");
                return StatusCode(500, "Error interno del servidor");
            }
        }
    }
}