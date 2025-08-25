using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Plataforma.Application;

namespace Plataforma.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IMediator _mediator;
    public AuthController(IMediator mediator) => _mediator = mediator;

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest req)
    {
        try
        {
            var ok = await _mediator.Send(new RegisterUserCommand(req));
            return Ok(new { ok = true });
        }
        catch (Exception ex)
        {
            return BadRequest(new { ok = false, error = ex.Message });
        }
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthResponse>> Login([FromBody] LoginRequest req)
        => Ok(await _mediator.Send(new LoginQuery(req)));

    [Authorize]
    [HttpGet("me")]
    public IActionResult Me() => Ok(new
    {
        Name = User.FindFirst("name")?.Value,
        Email = User.FindFirst("email")?.Value,
        Sub = User.FindFirst("sub")?.Value
    });
}
