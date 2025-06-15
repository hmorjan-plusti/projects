using Quartz;
using Hangfire;
using Hangfire.MemoryStorage;
using BackgroundWorkerApp.Data;
using BackgroundWorkerApp.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Configurar DbContext con SQL Server (leer desde appsettings.json)
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")));

// Registrar el BasicWorker como servicio hospedado
builder.Services.AddHostedService<BasicWorker>();

// Configurar Quartz.NET
builder.Services.AddQuartz(q =>
{
    q.UseMicrosoftDependencyInjectionJobFactory(); // Este método está obsoleto, pero aún funcional
});
builder.Services.AddQuartzHostedService(q => q.WaitForJobsToComplete = true);

// Configurar Hangfire con almacenamiento en memoria (ideal para pruebas)
builder.Services.AddHangfire(config =>
{
    config.UseMemoryStorage();
});
builder.Services.AddHangfireServer();

// Configurar CORS
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

// Bloque de prueba para verificar la conexión a la base de datos
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    try
    {
        context.Database.CanConnect();
        Console.WriteLine("Conexión exitosa a la base de datos.");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error al conectar a la base de datos: {ex.Message}");
        Console.WriteLine($"Detalles: {ex.InnerException?.Message}");
    }
}

// Configurar el pipeline de la aplicación
app.UseCors(); // Habilitar CORS
app.UseAuthorization();
app.MapControllers(); // Mapear controladores

app.Run();