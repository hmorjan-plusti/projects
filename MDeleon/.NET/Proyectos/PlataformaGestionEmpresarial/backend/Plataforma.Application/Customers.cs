using MediatR;
using Microsoft.EntityFrameworkCore;
using Plataforma.Domain.Entities;
using Plataforma.Infrastructure.Persistence;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace Plataforma.Application;

public record CreateCustomerCommand(CreateCustomerRequest Request) : IRequest<System.Guid>;
public record GetCustomersQuery() : IRequest<IReadOnlyList<CustomerResponse>>;

public class CreateCustomerHandler : IRequestHandler<CreateCustomerCommand, System.Guid>
{
    private readonly AppDbContext _db;
    private readonly IEventStore _es;
    public CreateCustomerHandler(AppDbContext db, IEventStore es) { _db = db; _es = es; }

    public async Task<System.Guid> Handle(CreateCustomerCommand req, CancellationToken ct)
    {
        var c = new Customer(req.Request.Name, req.Request.Email);
        _db.Customers.Add(c);
        await _db.SaveChangesAsync(ct);
        await _es.AppendAsync(c.Id, nameof(Customer), new { c.Id, c.Name, c.Email }, 1, ct);
        return c.Id;
    }
}

public class GetCustomersHandler : IRequestHandler<GetCustomersQuery, IReadOnlyList<CustomerResponse>>
{
    private readonly AppDbContext _db;
    public GetCustomersHandler(AppDbContext db) => _db = db;

    public async Task<IReadOnlyList<CustomerResponse>> Handle(GetCustomersQuery req, CancellationToken ct)
        => await _db.Customers.AsNoTracking()
            .Select(c => new CustomerResponse(c.Id, c.Name, c.Email, c.CreatedAt.ToString("O")))
            .ToListAsync(ct);
}
