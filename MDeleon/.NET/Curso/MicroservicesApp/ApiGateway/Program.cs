using Ocelot.DependencyInjection;
using Ocelot.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Agregar Ocelot al contenedor de servicios
builder.Services.AddOcelot();

var app = builder.Build();

// Configurar el middleware de Ocelot
app.UseOcelot().Wait();

app.MapGet("/", () => "Hello World!");

app.Run();