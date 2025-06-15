using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using ServiceAPP.backend.Shared; // Para ApplicationDbContext
using ServiceAPP.backend.Models; // Para LogItem

public class Worker : BackgroundService
{
    private readonly IServiceProvider _services;

    public Worker(IServiceProvider services)
    {
        _services = services;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            using var scope = _services.CreateScope();
            var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
            db.LogItems.Add(new LogItem // Cambiado de "Logs" a "LogItems"
            {
                Tipo = "INFO",
                Mensaje = "Servicio en ejecución",
                Fecha = DateTime.Now
            });
            await db.SaveChangesAsync();
            await Task.Delay(60000, stoppingToken); // cada minuto
        }
    }
}