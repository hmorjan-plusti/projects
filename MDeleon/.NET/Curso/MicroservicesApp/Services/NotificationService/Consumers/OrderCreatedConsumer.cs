using MassTransit;
using System;

public class OrderCreatedConsumer : IConsumer<IOrderCreated>
{
    public Task Consume(ConsumeContext<IOrderCreated> context)
    {
        var order = context.Message;
        Console.WriteLine($"📦 New Order Received: {order.ProductName} x {order.Quantity}");
        return Task.CompletedTask;
    }
}