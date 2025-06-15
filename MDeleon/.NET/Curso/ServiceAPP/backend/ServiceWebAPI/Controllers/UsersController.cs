using Microsoft.AspNetCore.Mvc;
using ServiceAPP.backend.Shared;
using ServiceAPP.backend.Models;

[ApiController]
[Route("api/users")]
public class UsersController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public UsersController(ApplicationDbContext context)
    {
        _context = context;
    }

    // Endpoint para registrar un nuevo usuario
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] User user)
    {
        if (string.IsNullOrEmpty(user.Username) || string.IsNullOrEmpty(user.Password))
        {
            return BadRequest("El nombre de usuario y la contraseña son obligatorios.");
        }

        // Verificar si el usuario ya existe
        if (_context.Users.Any(u => u.Username == user.Username))
        {
            return BadRequest("El nombre de usuario ya está en uso.");
        }

        // Agregar el usuario a la base de datos
        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return Ok("Usuario registrado exitosamente.");
    }
}