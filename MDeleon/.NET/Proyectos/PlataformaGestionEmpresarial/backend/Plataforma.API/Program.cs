using System.Text;
using System;
using System.Linq;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using OpenTelemetry.Resources;
using OpenTelemetry.Trace;
using Plataforma.Application;
using Plataforma.Domain.Entities;
using Plataforma.Infrastructure.Persistence;

var builder = WebApplication.CreateBuilder(args);
var cfg = builder.Configuration;

// DB (SQLite)
builder.Services.AddDbContext<AppDbContext>(o => o.UseSqlite(cfg.GetConnectionString("Default")));

// Identity
builder.Services.AddIdentityCore<AppUser>(o => o.User.RequireUniqueEmail = true)
    .AddRoles<IdentityRole<Guid>>()
    .AddEntityFrameworkStores<AppDbContext>()
    .AddSignInManager<SignInManager<AppUser>>();

// JWT
var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(cfg["Jwt:Key"]!));
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
  .AddJwtBearer(o =>
  {
      o.TokenValidationParameters = new TokenValidationParameters
      {
          ValidIssuer = cfg["Jwt:Issuer"],
          ValidAudience = cfg["Jwt:Audience"],
          ValidateIssuer = true,
          ValidateAudience = true,
          ValidateIssuerSigningKey = true,
          IssuerSigningKey = key,
          ValidateLifetime = true
      };
  });

builder.Services.AddAuthorization();

// Token service
builder.Services.AddScoped<IJwtTokenService, JwtTokenService>();

// CQRS
builder.Services.AddMediatR(typeof(RegisterUserCommand).Assembly, typeof(Plataforma.API.Handlers.RegisterUserHandler).Assembly);

// Event store
builder.Services.AddScoped<IEventStore, EfEventStore>();

// CORS para React (nginx en 5173)
builder.Services.AddCors(p => p.AddDefaultPolicy(policy =>
    policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()));

// OpenTelemetry (OTLP → Jaeger por variable env OTEL_EXPORTER_OTLP_ENDPOINT)
builder.Services.AddOpenTelemetry().WithTracing(t => t
    .SetResourceBuilder(ResourceBuilder.CreateDefault().AddService("Plataforma.API"))
    .AddAspNetCoreInstrumentation()
    .AddHttpClientInstrumentation()
    .AddOtlpExporter());

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Crear DB si no existe (dev simple)
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();
}

app.UseSwagger();
app.UseSwaggerUI();

app.UseCors();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

// JwtTokenService
public class JwtTokenService : IJwtTokenService
{
    private readonly IConfiguration _cfg;
    public JwtTokenService(IConfiguration cfg) => _cfg = cfg;

    public Task<string> CreateTokenAsync(AppUser user)
    {
        var claims = new[]
        {
            new System.Security.Claims.Claim("sub", user.Id.ToString()),
            new System.Security.Claims.Claim("name", user.FullName ?? ""),
            new System.Security.Claims.Claim("email", user.Email ?? "")
        };
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_cfg["Jwt:Key"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var jwt = new System.IdentityModel.Tokens.Jwt.JwtSecurityToken(
            issuer: _cfg["Jwt:Issuer"],
            audience: _cfg["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddHours(4),
            signingCredentials: creds);
        return Task.FromResult(new System.IdentityModel.Tokens.Jwt.JwtSecurityTokenHandler().WriteToken(jwt));
    }
}
