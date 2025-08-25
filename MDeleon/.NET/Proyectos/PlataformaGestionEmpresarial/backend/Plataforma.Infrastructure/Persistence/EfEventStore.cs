using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;

namespace Plataforma.Infrastructure.Persistence;

public interface IEventStore
{
    Task AppendAsync(System.Guid aggregateId, string aggregateType, object @event, int version, CancellationToken ct);
}

public class EfEventStore : IEventStore
{
    private readonly AppDbContext _db;
    public EfEventStore(AppDbContext db) => _db = db;

    public async Task AppendAsync(System.Guid id, string aggType, object evt, int ver, CancellationToken ct)
    {
        _db.EventStore.Add(new EventRecord
        {
            AggregateId = id,
            AggregateType = aggType,
            Version = ver,
            EventType = evt.GetType().Name,
            Data = JsonSerializer.Serialize(evt)
        });
        await _db.SaveChangesAsync(ct);
    }
}
