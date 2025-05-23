var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers(); // Agregar soporte para controladores
builder.Services.AddOpenApi();

builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenAnyIP(5000); // Puerto HTTP
    options.ListenAnyIP(5001, listenOptions => listenOptions.UseHttps()); // Puerto HTTPS
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseRouting(); // Habilitar el enrutamiento

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers(); // Mapear los controladores
});

app.Run();