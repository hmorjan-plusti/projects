using Microsoft.AspNetCore.Mvc;
using MessageBroker.Services;

namespace MessageBroker.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MessageController : ControllerBase
{
    private readonly MessageProducer _producer;

    public MessageController(MessageProducer producer)
    {
        _producer = producer;
    }

    [HttpPost("send")]
    public IActionResult Send([FromBody] object message)
    {
        _producer.SendMessage(message);
        return Ok(new { message = "Mensaje enviado a RabbitMQ" });
    }
}
