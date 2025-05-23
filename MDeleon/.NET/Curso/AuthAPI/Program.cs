using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using AuthAPI.Data;
using AuthAPI.Models;

var builder = WebApplication.CreateBuilder(args);

// 1. Conexión a SQL Server
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// 2. Configuración de Identity
builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

// 3. Configuración de JWT
var jwtKey = builder.Configuration["Jwt:Key"]; // Clave secreta desde appsettings.json
var keyBytes = Encoding.UTF8.GetBytes(jwtKey);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = false, // No se valida el emisor
        ValidateAudience = false, // No se valida la audiencia
        ValidateIssuerSigningKey = true, // Validar la clave de firma
        IssuerSigningKey = new SymmetricSecurityKey(keyBytes) // Clave secreta
    };
});

// 4. Configuración de CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin", policy =>
    {
        policy.WithOrigins("http://localhost:3000") // Origen del frontend
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

// 5. Agregar controladores y Swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// 6. Configuración de Swagger
app.UseSwagger();
app.UseSwaggerUI();

// 7. Middleware de redirección HTTPS
app.UseHttpsRedirection();

// 8. Aplicar la política de CORS
app.UseCors("AllowSpecificOrigin");

// 9. Middleware de autenticación y autorización
app.UseAuthentication();
app.UseAuthorization();

// 10. Mapear controladores
app.MapControllers();

// 11. Ejecutar la aplicación
app.Run();