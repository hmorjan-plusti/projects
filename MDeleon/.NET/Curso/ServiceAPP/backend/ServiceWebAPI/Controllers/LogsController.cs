using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using ServiceAPP.backend.Shared; // Para ApplicationDbContext
using ServiceAPP.backend.Models; // Para LogItem

[ApiController]
[Route("api/logs")]
[Authorize]
public class LogsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public LogsController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult Get(string? tipo, DateTime? desde, DateTime? hasta)
    {
        var query = _context.LogItems.AsQueryable(); // Asegúrate de que "LogItems" esté definido en ApplicationDbContext
        if (!string.IsNullOrEmpty(tipo)) query = query.Where(l => l.Tipo == tipo);
        if (desde.HasValue) query = query.Where(l => l.Fecha >= desde);
        if (hasta.HasValue) query = query.Where(l => l.Fecha <= hasta);
        return Ok(query.OrderByDescending(x => x.Fecha).ToList());
    }
}