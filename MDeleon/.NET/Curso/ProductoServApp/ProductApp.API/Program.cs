using ProductApp.API.Services;

var builder = WebApplication.CreateBuilder(args);

// Registrar los servicios
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Servicio personalizado
builder.Services.AddScoped<IProductService, ProductService>();

var app = builder.Build();

// Configuración del pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// ✅ Puedes comentar esta línea si no tienes HTTPS configurado
// app.UseHttpsRedirection();

app.UseAuthorization();

// Mapea los controladores automáticamente (como ProductController)
app.MapControllers();

// Ruta de prueba opcional
app.MapGet("/", () => "¡Bienvenido a ProductApp API!");

app.Run();
