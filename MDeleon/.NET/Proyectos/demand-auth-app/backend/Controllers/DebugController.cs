using DemandAuth.Api.Models;
using DemandAuth.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DemandAuth.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DebugController(DemandService svc, IConfiguration cfg) : ControllerBase
{
    // Libre: ver ubicación del DB file
    [HttpGet("db-info")]
    public IActionResult DbInfo([FromServices] IWebHostEnvironment env)
        => Ok(new { dbPath = Path.Combine(env.ContentRootPath, "app.db") });

    // Protegido: ver registros recientes para verificar escritura
    [Authorize]
    [HttpGet("recent-sales")]
    public async Task<IEnumerable<Sale>> RecentSales([FromQuery] int take = 10)
        => await svc.RecentSalesAsync(take);
}