using System.Text.Json;
using Microsoft.Extensions.DependencyInjection;

public class Worker : BackgroundService
{
    private readonly IServiceProvider _serviceProvider;
    private readonly IHttpClientFactory _httpClientFactory;

    public Worker(IServiceProvider serviceProvider, IHttpClientFactory httpClientFactory)
    {
        _serviceProvider = serviceProvider;
        _httpClientFactory = httpClientFactory;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        // Contenido aleatorio en español
        string[] titulos = new[]
        {
            "Estado del servidor: OK",
            "Archivo recibido correctamente",
            "Nuevo evento registrado",
            "Consulta completada",
            "Sincronización realizada con éxito"
        };

        string[] descripciones = new[]
        {
            "La operación finalizó sin errores.",
            "El archivo fue almacenado en la base de datos.",
            "Se detectó actividad programada en el sistema.",
            "No se encontraron inconsistencias.",
            "El sistema continúa operando normalmente."
        };

        var random = new Random();

        while (!stoppingToken.IsCancellationRequested)
        {
            using var scope = _serviceProvider.CreateScope();
            var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

            var dato = new Dato
            {
                Titulo = titulos[random.Next(titulos.Length)],
                Descripcion = descripciones[random.Next(descripciones.Length)],
                FechaConsulta = DateTime.Now
            };

            db.Datos.Add(dato);
            await db.SaveChangesAsync();

            await Task.Delay(TimeSpan.FromMinutes(1), stoppingToken);
        }
    }
}
