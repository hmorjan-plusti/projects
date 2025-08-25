using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks; // <-- Necesario para Task
using backend.Services;      // <-- Asegura que tengas este namespace para tu servicio

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ConverterController : ControllerBase
{
    private readonly ExchangeRateService _rateService;

    public ConverterController(ExchangeRateService rateService)
    {
        _rateService = rateService;
    }

    [HttpGet("convert")]
    public async Task<IActionResult> Convert(string from, string to, double amount)
    {
        var result = await _rateService.ConvertCurrency(from, to, amount);
        return Ok(new { result });
    }
}
