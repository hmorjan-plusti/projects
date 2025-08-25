using DashboardApp.Backend.Models;
using DashboardApp.Backend.Data;
using DashboardApp.Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace DashboardApp.Backend.Controllers;

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
    public async Task<IActionResult> Register([FromBody] RegisterModel model)
    {
        var success = await _authService.RegisterAsync(model);
        if (!success)
            return BadRequest("No se pudo registrar el usuario");

        return Ok("Usuario registrado correctamente");
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginModel model)
    {
        var token = await _authService.LoginAsync(model);
        if (token == null)
            return Unauthorized("Credenciales inválidas");

        return Ok(new { Token = token });
    }
}
