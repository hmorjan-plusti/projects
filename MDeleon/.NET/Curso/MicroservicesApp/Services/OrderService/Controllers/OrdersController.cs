using Microsoft.AspNetCore.Mvc;
using MassTransit;
using OrderService.Contracts;
[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly IPublishEndpoint _publishEndpoint;

    public OrdersController(IPublishEndpoint publishEndpoint) => _publishEndpoint = publishEndpoint;

    [HttpPost]
    public async Task<IActionResult> Create(Order order)
    {
        // Enviar evento a la cola
        await _publishEndpoint.Publish<IOrderCreated>(new
        {
            OrderId = order.Id,
            ProductName = order.ProductName,
            Quantity = order.Quantity,
            CreatedAt = order.CreatedAt
        });

        return Ok(new { message = "Order created", order.Id });
    }
}