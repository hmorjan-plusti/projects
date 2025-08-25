using System;

namespace Plataforma.Infrastructure.Persistence;

public class EventRecord
{
    public long Id { get; set; }
    public Guid AggregateId { get; set; }
    public string AggregateType { get; set; } = string.Empty;
    public int Version { get; set; }
    public string EventType { get; set; } = string.Empty;
    public string Data { get; set; } = string.Empty; // JSON
    public DateTime OccurredOnUtc { get; set; } = DateTime.UtcNow;
}
