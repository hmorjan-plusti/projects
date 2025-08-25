using MediatR;
using Microsoft.AspNetCore.Identity;
using Plataforma.Infrastructure.Persistence;
using System.Threading;
using System.Threading.Tasks;

namespace Plataforma.Application;

public record RegisterUserCommand(RegisterRequest Request) : IRequest<bool>;
public record LoginQuery(LoginRequest Request) : IRequest<AuthResponse>;

public interface IJwtTokenService
{
    Task<string> CreateTokenAsync(AppUser user);
}

