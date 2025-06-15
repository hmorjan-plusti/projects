using BackgroundWorkerApp.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Configurar DbContext con SQL Server
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Configurar CORS para permitir solicitudes desde el frontend
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:3000") // Cambia esto si el frontend está en otro dominio
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Agregar controladores
builder.Services.AddControllers();

var app = builder.Build();

// Configurar el pipeline de la aplicación
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseCors(); // Habilitar CORS
app.UseHttpsRedirection();
app.MapControllers(); // Mapear controladores

app.Run();