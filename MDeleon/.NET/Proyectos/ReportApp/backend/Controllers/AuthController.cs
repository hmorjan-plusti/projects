using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using backend.Data;
using backend.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _config;

    public AuthController(AppDbContext context, IConfiguration config)
    {
        _context = context;
        _config = config;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(Usuario user)
    {
        _context.Usuarios.Add(user);
        await _context.SaveChangesAsync();
        return Ok(new { message = "Usuario registrado" });
    }

    [HttpPost("login")]
    public IActionResult Login(Usuario user)
    {
        var dbUser = _context.Usuarios.FirstOrDefault(u => u.Username == user.Username && u.Password == user.Password);
        if (dbUser == null) return Unauthorized();

        var claims = new[] { new Claim(ClaimTypes.Name, user.Username) };
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            claims: claims,
            expires: DateTime.Now.AddHours(2),
            signingCredentials: creds
        );

        return Ok(new { token = new JwtSecurityTokenHandler().WriteToken(token) });
    }
}
