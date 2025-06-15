using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Threading;
using System.Threading.Tasks;
using BackgroundWorkerApp.Data;
using BackgroundWorkerApp.Models;
using Microsoft.Extensions.DependencyInjection;

namespace BackgroundWorkerApp.Services
{
    public class BasicWorker : BackgroundService
    {
        private readonly ILogger<BasicWorker> _logger;
        private readonly IServiceProvider _serviceProvider;

        public BasicWorker(ILogger<BasicWorker> logger, IServiceProvider serviceProvider)
        {
            _logger = logger;
            _serviceProvider = serviceProvider;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                _logger.LogInformation("🟢 Tarea ejecutada a las: {time}", DateTimeOffset.Now);

                using (var scope = _serviceProvider.CreateScope())
                {
                    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

                    var logEntry = new LogEntry
                    {
                        Message = "Log generado por el worker",
                        Timestamp = DateTime.Now
                    };

                    context.LogEntries.Add(logEntry);
                    await context.SaveChangesAsync(stoppingToken);
                }

                await Task.Delay(10000, stoppingToken); // Ejecutar cada 10 segundos
            }
        }
    }
}