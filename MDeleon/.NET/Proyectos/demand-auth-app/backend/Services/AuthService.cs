using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BCrypt.Net;
using DemandAuth.Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace DemandAuth.Api.Services;

public class JwtOptions
{
    public string Key { get; set; } = string.Empty;
    public string Issuer { get; set; } = string.Empty;
    public string Audience { get; set; } = string.Empty;
    public int ExpiresMinutes { get; set; } = 120;
}

public class AuthService(AppDbContext db, IOptions<JwtOptions> jwt)
{
    private readonly AppDbContext _db = db;
    private readonly JwtOptions _jwt = jwt.Value;

    public async Task<(bool ok, string message)> RegisterAsync(string email, string password)
    {
        email = email.Trim().ToLowerInvariant();
        if (await _db.Users.AnyAsync(u => u.Email == email))
            return (false, "Email ya registrado");
        var hash = BCrypt.Net.BCrypt.HashPassword(password);
        _db.Users.Add(new User { Email = email, PasswordHash = hash });
        await _db.SaveChangesAsync();
        return (true, "Usuario creado");
    }

    public async Task<(bool ok, string token, string message)> LoginAsync(string email, string password)
    {
        email = email.Trim().ToLowerInvariant();
        var user = await _db.Users.SingleOrDefaultAsync(u => u.Email == email);
        if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
            return (false, "", "Credenciales inválidas");

        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new(JwtRegisteredClaimNames.Email, user.Email)
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwt.Key));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var token = new JwtSecurityToken(
            issuer: _jwt.Issuer,
            audience: _jwt.Audience,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(_jwt.ExpiresMinutes),
            signingCredentials: creds);
        var tokenStr = new JwtSecurityTokenHandler().WriteToken(token);
        return (true, tokenStr, "OK");
    }
}