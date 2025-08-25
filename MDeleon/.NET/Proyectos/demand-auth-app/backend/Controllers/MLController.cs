using DemandAuth.Api.Models;
using DemandAuth.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DemandAuth.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize] // requiere JWT
public class MLController(MLService svc) : ControllerBase
{
    [HttpPost("train")]
    public async Task<IActionResult> Train([FromBody] TrainRequest req)
    {
        try
        {
            var result = await svc.TrainAsync(req.Sku, req.Horizon);
            return Ok(result);
        }
        catch (Exception ex) { return BadRequest(new { error = ex.Message }); }
    }

    [HttpGet("predict/{sku}")]
    public IActionResult Predict(string sku, [FromQuery] int horizon = 7)
    {
        try { return Ok(svc.Predict(sku, horizon)); }
        catch (FileNotFoundException ex) { return NotFound(new { error = ex.Message }); }
        catch (Exception ex) { return BadRequest(new { error = ex.Message }); }
    }

    [HttpGet("models")]
    public IActionResult Models() => Ok(svc.ListModels());
}
