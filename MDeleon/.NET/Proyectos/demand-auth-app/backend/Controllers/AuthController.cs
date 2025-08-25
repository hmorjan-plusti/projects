using DemandAuth.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace DemandAuth.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController(AuthService auth) : ControllerBase
{
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] LoginDto dto)
    {
        var (ok, msg) = await auth.RegisterAsync(dto.Email, dto.Password);
        return ok ? Ok(new { message = msg }) : BadRequest(new { error = msg });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto dto)
    {
        var (ok, token, msg) = await auth.LoginAsync(dto.Email, dto.Password);
        return ok ? Ok(new { token }) : Unauthorized(new { error = msg });
    }
}

public record LoginDto(string Email, string Password);