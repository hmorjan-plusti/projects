using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using ServiceAPP.backend.Shared; // Asegúrate de usar el espacio de nombres correcto
using ServiceAPP.backend.Models; // Agregado para usar LogItem
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public AuthController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginRequest request)
    {
        var user = _context.Users.FirstOrDefault(u => u.Username == request.Username);

        if (user == null || user.Password != request.Password)
        {
            return Unauthorized("Credenciales incorrectas");
        }

        // Generar token JWT
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.UTF8.GetBytes("ClaveJWT_SuperSegura_1234567890123456"); // Clave más larga (32 caracteres)
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.Name, user.Username)
            }),
            Expires = DateTime.UtcNow.AddHours(1),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);

        // Registrar el log en la tabla LogItems
        var log = new LogItem
        {
            Tipo = "INFO",
            Mensaje = $"El usuario '{user.Username}' inició sesión.",
            Fecha = DateTime.UtcNow
        };
        _context.LogItems.Add(log);
        _context.SaveChanges(); // Guardar el log en la base de datos

        return Ok(new { token = tokenHandler.WriteToken(token) });
    }
}

public class LoginRequest
{
    public string Username { get; set; }
    public string Password { get; set; }
}