using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class DatosController : ControllerBase
{
    private readonly AppDbContext _context;

    public DatosController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var datos = await _context.Datos.OrderByDescending(d => d.FechaConsulta).ToListAsync();
        return Ok(datos);
    }
}
