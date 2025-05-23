using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;

    public AuthController(AuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] User request)
    {
        if (string.IsNullOrWhiteSpace(request.Username) || string.IsNullOrWhiteSpace(request.PasswordHash))
            return BadRequest("Usuario y contraseña requeridos.");

        var user = await _authService.RegisterAsync(request.Username, request.PasswordHash);
        return Ok(user);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] User request)
    {
        var token = await _authService.LoginAsync(request.Username, request.PasswordHash);
        if (token == null)
            return Unauthorized("Credenciales inválidas.");

        return Ok(new { token });
    }
}
