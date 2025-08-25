using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DashboardApp.Backend.Services;

[ApiController]
[Route("api/[controller]")]
public class ReportsController : ControllerBase
{
    private readonly PowerBIService _pbi;

    public ReportsController(PowerBIService pbi)
    {
        _pbi = pbi;
    }

    [Authorize]
    [HttpGet("embed")]
    public async Task<IActionResult> GetEmbedInfo()
    {
        var (embedToken, embedUrl) = await _pbi.GetReportEmbedAsync();
        return Ok(new { embedUrl, embedToken });
    }
}
