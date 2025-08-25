using DemandAuth.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DemandAuth.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class DemandController(DemandService svc) : ControllerBase
{
    [HttpPost("seed")]
    public async Task<IActionResult> Seed([FromQuery] string sku = "ABC123", [FromQuery] int days = 120)
        => Ok(new { inserted = await svc.SeedAsync(sku, days), sku, days });

    [HttpGet("series/{sku}")]
    public async Task<IActionResult> Series(string sku)
        => Ok(await svc.GetSeriesAsync(sku));
}