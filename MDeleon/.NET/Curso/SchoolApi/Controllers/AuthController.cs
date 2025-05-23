using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SchoolApi.Data;
using SchoolApi.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace SchoolApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AuthController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Endpoint para registrar usuarios
        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterRequest request)
        {
            // Verifica si el usuario ya existe
            if (_context.Users.Any(u => u.Username == request.Username))
            {
                return BadRequest("El usuario ya existe.");
            }

            // Crea un nuevo usuario
            var user = new User
            {
                Username = request.Username,
                Password = request.Password // Asegúrate de encriptar la contraseña en un entorno real
            };

            _context.Users.Add(user);
            _context.SaveChanges();

            return Ok("Usuario registrado con éxito.");
        }

        [HttpPost("login")]
public IActionResult Login([FromBody] LoginRequest request)
{
    // Busca el usuario en la base de datos
    var user = _context.Users.FirstOrDefault(u => u.Username == request.Username && u.Password == request.Password);
    if (user == null)
    {
        return Unauthorized("Usuario o contraseña incorrectos.");
    }

    // Genera el token JWT
    var tokenHandler = new JwtSecurityTokenHandler();
    var key = Encoding.ASCII.GetBytes("ClaveDePrueba12345678901234567890");

    var tokenDescriptor = new SecurityTokenDescriptor
    {
        Subject = new ClaimsIdentity(new[] { new Claim(ClaimTypes.Name, user.Username) }),
        Expires = DateTime.UtcNow.AddHours(1),
        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
    };

    var token = tokenHandler.CreateToken(tokenDescriptor);
    return Ok(new { token = tokenHandler.WriteToken(token) });
}
    }
}