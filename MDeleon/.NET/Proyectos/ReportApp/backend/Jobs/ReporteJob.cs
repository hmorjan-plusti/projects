using Microsoft.EntityFrameworkCore;
using Quartz;
using backend.Data;
using backend.Models;

namespace backend.Jobs;

public class ReporteJob : IJob
{
    private readonly AppDbContext _context;
    private readonly ILogger<ReporteJob> _logger;

    public ReporteJob(AppDbContext context, ILogger<ReporteJob> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task Execute(IJobExecutionContext context)
    {
        var estaActivo = await _context.Reportes.AnyAsync(r => r.Activo);

        if (!estaActivo)
        {
            _logger.LogInformation("⏸ Reporte automático no ejecutado. Estado: Inactivo.");
            return;
        }

        var nuevoReporte = new Reporte
        {
            Nombre = $"Inicio de reportes automáticos",
            FechaGeneracion = DateTime.Now,
            Activo = true
        };

        await _context.Reportes.AddAsync(nuevoReporte);
        await _context.SaveChangesAsync();

        _logger.LogInformation("✅ Reporte generado automáticamente a las {Fecha}.", nuevoReporte.FechaGeneracion);
    }
}
