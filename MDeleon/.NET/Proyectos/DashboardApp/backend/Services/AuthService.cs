using DashboardApp.Backend.Models;
using DashboardApp.Backend.Data; // ✅ Este using es necesario para que reconozca DapperContext
using Dapper;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BCrypt.Net;

namespace DashboardApp.Backend.Services
{
    public class AuthService
    {
        private readonly DapperContext _context;
        private readonly IConfiguration _config;

        public AuthService(DapperContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        public async Task<bool> RegisterAsync(RegisterModel model)
        {
            try
            {
                var hash = BCrypt.Net.BCrypt.HashPassword(model.Password);
                var sql = "INSERT INTO Users (Username, PasswordHash) VALUES (@Username, @PasswordHash)";

                using var conn = _context.CreateConnection();
                var rows = await conn.ExecuteAsync(sql, new { model.Username, PasswordHash = hash });

                Console.WriteLine($"✅ Usuario '{model.Username}' registrado correctamente.");
                return rows > 0;
            }
            catch (Exception ex)
            {
                Console.WriteLine("⚠️ Error al registrar usuario:");
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        public async Task<string?> LoginAsync(LoginModel model)
        {
            try
            {
                var sql = "SELECT * FROM Users WHERE Username = @Username";
                using var conn = _context.CreateConnection();
                var user = await conn.QuerySingleOrDefaultAsync<User>(sql, new { model.Username });

                if (user is null)
                {
                    Console.WriteLine("❌ Usuario no encontrado.");
                    return null;
                }

                var isValid = BCrypt.Net.BCrypt.Verify(model.Password, user.PasswordHash);
                if (!isValid)
                {
                    Console.WriteLine("❌ Contraseña inválida.");
                    return null;
                }

                Console.WriteLine("✅ Usuario y contraseña válidos, generando token...");

                var claims = new[]
                {
                    new Claim(ClaimTypes.Name, user.Username)
                };

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var token = new JwtSecurityToken(
                    issuer: _config["Jwt:Issuer"],
                    claims: claims,
                    expires: DateTime.Now.AddHours(1),
                    signingCredentials: creds
                );

                return new JwtSecurityTokenHandler().WriteToken(token);
            }
            catch (Exception ex)
            {
                Console.WriteLine("⚠️ Error en login:");
                Console.WriteLine(ex.Message);
                return null;
            }
        }
    }
}
