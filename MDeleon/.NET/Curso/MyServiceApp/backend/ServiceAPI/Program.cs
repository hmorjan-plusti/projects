var builder = WebApplication.CreateBuilder(args);

// ✅ Agrega Application Insights (si lo estás usando)
builder.Services.AddApplicationInsightsTelemetry("tu_instrumentation_key"); // Opcional

// ✅ Configura servicios para Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ✅ Configuración de CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000") // Cambia al puerto donde corre tu frontend
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// ✅ Agrega soporte para controladores
builder.Services.AddControllers();

var app = builder.Build();

// ✅ Configura Swagger en desarrollo
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// ✅ Usa la política de CORS configurada
app.UseCors("AllowFrontend");

app.UseHttpsRedirection();

// ✅ Mapea los controladores
app.MapControllers();

// ✅ Define el endpoint minimal API (opcional)
var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast = Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();

    return forecast;
})
.WithName("GetWeatherForecast")
.WithOpenApi(); // Esto permite generar documentación automática

app.Run();

// ✅ Record para el modelo WeatherForecast
record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}