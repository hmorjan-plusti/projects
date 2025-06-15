using Microsoft.EntityFrameworkCore;
using SecureNotesApp.Data;
using SecureNotesApp.Services;
using Serilog;
using Microsoft.AspNetCore.DataProtection;

var builder = WebApplication.CreateBuilder(args);

// Serilog
Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .WriteTo.File("Logs/log.txt", rollingInterval: RollingInterval.Day)
    .CreateLogger();

builder.Host.UseSerilog();

// Data Protection
builder.Services.AddDataProtection()
    .SetApplicationName("SecureNotesApp");

// DB
builder.Services.AddDbContext<NotesDbContext>(opt =>
    opt.UseSqlite("Data Source=notes.db"));

builder.Services.AddScoped<EncryptionService>();

builder.Services.AddControllers();
var app = builder.Build();

app.UseSerilogRequestLogging();

app.UseExceptionHandler(a => a.Run(async context =>
{
    var error = context.Features.Get<Microsoft.AspNetCore.Diagnostics.IExceptionHandlerPathFeature>()?.Error;
    Log.Error(error, "Unhandled error");
    context.Response.StatusCode = 500;
    await context.Response.WriteAsync("Internal Server Error");
}));

app.MapControllers();

using var scope = app.Services.CreateScope();
var db = scope.ServiceProvider.GetRequiredService<NotesDbContext>();
db.Database.EnsureCreated();

app.Run();