using DemandAuth.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace DemandAuth.Api.Services;

public class DemandService(AppDbContext db)
{
    private readonly AppDbContext _db = db;

    public async Task<int> SeedAsync(string sku = "ABC123", int days = 120)
    {
        var start = DateTime.UtcNow.Date.AddDays(-days);
        var rnd = new Random(1);
        var rows = new List<Sale>();
        for (int i = 0; i < days; i++)
        {
            var d = start.AddDays(i);
            var qty = (int)Math.Round(10 + 4 * Math.Sin(i / 6.0) + rnd.Next(-2, 3));
            rows.Add(new Sale { Sku = sku, Timestamp = d, Quantity = qty });
        }
        _db.Sales.AddRange(rows);
        return await _db.SaveChangesAsync();
    }

    public async Task<object> GetSeriesAsync(string sku)
    {
        var list = await _db.Sales
            .Where(s => s.Sku == sku)
            .GroupBy(s => s.Timestamp.Date)
            .Select(g => new { date = g.Key, qty = g.Sum(x => x.Quantity) })
            .OrderBy(x => x.date)
            .ToListAsync();
        return list;
    }

    public async Task<List<Sale>> RecentSalesAsync(int take = 10)
    {
        return await _db.Sales.OrderByDescending(s => s.Timestamp).Take(take).ToListAsync();
    }
}