using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ReservaApp.backend.Data;
using ReservaApp.backend.Services;
using System.Text;

var builder = WebApplication.CreateBuilder(args);


// Leer clave JWT segura

var jwtKey = builder.Configuration["Jwt:Key"];
if (string.IsNullOrWhiteSpace(jwtKey))
{
    throw new InvalidOperationException("⚠ JWT Key is missing in appsettings.json or environment variables.");
}


//  Configurar CORS (React frontend en localhost:3000)

builder.Services.AddCors(options =>
{
    options.AddPolicy("FrontendPolicy", policy =>
    {
        policy.WithOrigins("http://localhost:3000") // Cambiar si usas otro origen en producción
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});


// Base de datos SQLite

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=reservas.db"));


//  Servicio JWT personalizado

builder.Services.AddScoped<TokenService>();


//  Autenticación con JWT

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
        };
    });


// Autorización y controladores

builder.Services.AddAuthorization();
builder.Services.AddControllers();

var app = builder.Build();


// Middleware

app.UseCors("FrontendPolicy");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
