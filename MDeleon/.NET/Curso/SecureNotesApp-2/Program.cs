using Microsoft.EntityFrameworkCore;
using SecureNotesApp.Data;
using SecureNotesApp.Services;
using Serilog;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Http.Features;

var builder = WebApplication.CreateBuilder(args);

// 1. Configuración de Serilog (Logs en consola y archivo)
Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .WriteTo.File("Logs/log.txt", rollingInterval: RollingInterval.Day)
    .CreateLogger();

builder.Host.UseSerilog();

// 2. Protección de datos (útil para cookies, tokens, etc.)
builder.Services.AddDataProtection()
    .SetApplicationName("SecureNotesApp");

// 3. Configuración de la base de datos SQLite (simple)
builder.Services.AddDbContext<NotesDbContext>(options =>
    options.UseSqlite("Data Source=notes.db"));

// 4. Inyección de servicios personalizados
builder.Services.AddScoped<EncryptionService>();

// 5. Agrega controladores
builder.Services.AddControllers();

// 6. Política de CORS opcional (si usas cliente externo)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});

var app = builder.Build();

// 7. Middleware para entornos de producción
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/error");
    app.UseHsts(); // Fuerza HTTPS
}

// 8. Middleware de logging
app.UseSerilogRequestLogging();

// 9. Manejo global de errores personalizados
app.UseExceptionHandler(a => a.Run(async context =>
{
    var error = context.Features.Get<Microsoft.AspNetCore.Diagnostics.IExceptionHandlerPathFeature>()?.Error;
    Log.Error(error, "Unhandled error");
    context.Response.StatusCode = 500;
    await context.Response.WriteAsync("Internal Server Error");
}));

// 10. Redirección HTTPS y autorización
app.UseHttpsRedirection();
app.UseAuthorization();

// 11. (Opcional) Habilitar CORS
// app.UseCors("AllowAll");

// 12. Ruteo a controladores
app.MapControllers();

// 13. Asegura que la base de datos esté creada al iniciar
using var scope = app.Services.CreateScope();
var db = scope.ServiceProvider.GetRequiredService<NotesDbContext>();
db.Database.EnsureCreated(); // o usa db.Database.Migrate() si usas migraciones

// 14. Ejecuta la aplicación
app.Run();
