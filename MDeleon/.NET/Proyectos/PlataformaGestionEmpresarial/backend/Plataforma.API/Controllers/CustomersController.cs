using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Plataforma.Application;

namespace Plataforma.API.Controllers;

[ApiController, Route("api/[controller]"), Authorize]
public class CustomersController : ControllerBase
{
    private readonly IMediator _mediator;
    public CustomersController(IMediator mediator) => _mediator = mediator;

    [HttpPost]
    public async Task<ActionResult<Guid>> Create([FromBody] CreateCustomerRequest req)
        => Ok(await _mediator.Send(new CreateCustomerCommand(req)));

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<CustomerResponse>>> Get()
        => Ok(await _mediator.Send(new GetCustomersQuery()));
}
