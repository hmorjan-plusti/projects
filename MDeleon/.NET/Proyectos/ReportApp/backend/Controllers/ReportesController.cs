using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class ReportesController : ControllerBase
{
    private readonly AppDbContext _context;

    public ReportesController(AppDbContext context) => _context = context;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Reporte>>> Get() =>
        await _context.Reportes.OrderByDescending(r => r.FechaGeneracion).ToListAsync();

    [HttpPost("activar")]
    public async Task<IActionResult> Activar()
    {
        foreach (var r in _context.Reportes) r.Activo = false;
        _context.Reportes.Add(new Reporte
        {
            Nombre = "Inicio de reportes automáticos",
            FechaGeneracion = DateTime.Now,
            Activo = true
        });
        await _context.SaveChangesAsync();
        return Ok();
    }

    [HttpPost("desactivar")]
    public async Task<IActionResult> Desactivar()
    {
        foreach (var r in _context.Reportes) r.Activo = false;
        await _context.SaveChangesAsync();
        return Ok();
    }
}
