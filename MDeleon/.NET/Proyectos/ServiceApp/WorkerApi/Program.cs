using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

// 💡 Definir política de CORS para permitir conexión desde React
var corsPolicyName = "ReactAppPolicy";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: corsPolicyName,
        policy =>
        {
            policy.WithOrigins("http://localhost:3000") // Cambia si React corre en otro puerto
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

// ✅ CORREGIDO: usar base de datos en carpeta compartida
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=../SharedDb/workerdata.db"));  // Ruta relativa a nivel superior

// 🚀 Agregar Swagger para pruebas
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Worker API",
        Version = "v1",
        Description = "API que expone los datos almacenados por el Worker Service"
    });
});

// 🚦 Agregar controladores
builder.Services.AddControllers();

var app = builder.Build();

// 🧪 Mostrar Swagger solo en desarrollo
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Worker API V1");
    });
}

// 🔓 Activar CORS antes de usar controladores
app.UseCors(corsPolicyName);

app.UseAuthorization();

app.MapControllers();

app.Run();
