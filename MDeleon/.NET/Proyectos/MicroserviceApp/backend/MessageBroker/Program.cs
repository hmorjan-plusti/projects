using MessageBroker;
using MessageBroker.Services;
using MessageBroker.Models;
using Microsoft.OpenApi.Models;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

// ✅ Configurar RabbitMQ desde appsettings.json
builder.Services.Configure<RabbitMQSettings>(
    builder.Configuration.GetSection("RabbitMQ"));

// ✅ Registrar el productor como Singleton
builder.Services.AddSingleton<MessageProducer>();

// ✅ Agregar Controllers y Swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "MessageBroker API",
        Version = "v1",
        Description = "API para enviar mensajes a RabbitMQ desde microservicio MessageBroker"
    });
});

var app = builder.Build();

// ✅ Mostrar Swagger SIEMPRE (incluyendo producción)
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "MessageBroker API v1");
    // c.RoutePrefix = string.Empty; // si quieres que Swagger esté en la raíz
});

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
