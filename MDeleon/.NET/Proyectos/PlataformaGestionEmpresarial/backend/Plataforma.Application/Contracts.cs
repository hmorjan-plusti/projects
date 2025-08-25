using System;

namespace Plataforma.Application;

public record RegisterRequest(string FullName, string Email, string Password);
public record LoginRequest(string Email, string Password);
public record AuthResponse(string AccessToken, string FullName, string Email);

public record CreateCustomerRequest(string Name, string Email);
public record CustomerResponse(Guid Id, string Name, string Email, string CreatedAt);
