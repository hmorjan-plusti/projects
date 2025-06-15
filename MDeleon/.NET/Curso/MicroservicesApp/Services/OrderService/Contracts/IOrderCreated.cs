namespace OrderService.Contracts;

public interface IOrderCreated
{
    Guid OrderId { get; }
    string ProductName { get; }
    int Quantity { get; }
    DateTime CreatedAt { get; }
}
