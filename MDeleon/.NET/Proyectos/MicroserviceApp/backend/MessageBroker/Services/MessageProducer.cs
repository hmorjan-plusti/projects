using MessageBroker.Models;
using Microsoft.Extensions.Options;
using RabbitMQ.Client;
using System.Text;
using System.Text.Json;

namespace MessageBroker.Services;

public class MessageProducer
{
    private readonly IConnection _connection;
    private readonly IModel _channel;
    private readonly RabbitMQSettings _settings;

    public MessageProducer(IOptions<RabbitMQSettings> options)
    {
        _settings = options.Value;

        var factory = new ConnectionFactory()
        {
            HostName = _settings.Host,       // Cambiado
            Port = _settings.Port,
            UserName = _settings.Username,
            Password = _settings.Password
        };

        _connection = factory.CreateConnection();
        _channel = _connection.CreateModel();

        _channel.QueueDeclare(
            queue: _settings.RoutingKey,
            durable: false,
            exclusive: false,
            autoDelete: false,
            arguments: null
        );
    }

    public void SendMessage<T>(T message)
    {
        var json = JsonSerializer.Serialize(message);
        var body = Encoding.UTF8.GetBytes(json);

        _channel.BasicPublish(
            exchange: "",                         // Si no usas exchange personalizado
            routingKey: _settings.RoutingKey,
            basicProperties: null,
            body: body
        );
    }
}
