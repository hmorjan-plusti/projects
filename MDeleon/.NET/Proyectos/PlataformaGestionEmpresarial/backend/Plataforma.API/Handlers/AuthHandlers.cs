using MediatR;
using Microsoft.AspNetCore.Identity;
using Plataforma.Infrastructure.Persistence;
using System.Threading;
using System.Threading.Tasks;
using Plataforma.Application;

namespace Plataforma.API.Handlers;

public class RegisterUserHandler : IRequestHandler<RegisterUserCommand, bool>
{
    private readonly UserManager<AppUser> _um;
    public RegisterUserHandler(UserManager<AppUser> um) => _um = um;

    public async Task<bool> Handle(RegisterUserCommand req, CancellationToken ct)
    {
        var u = new AppUser { UserName = req.Request.Email, Email = req.Request.Email, FullName = req.Request.FullName };
        var result = await _um.CreateAsync(u, req.Request.Password);
        if (!result.Succeeded)
        {
            // Lanzar excepción con los errores para que el controlador los capture
            var errors = string.Join("; ", result.Errors.Select(e => e.Description));
            throw new System.Exception(errors);
        }
        return true;
    }
}

public class LoginHandler : IRequestHandler<LoginQuery, AuthResponse>
{
    private readonly SignInManager<AppUser> _sm;
    private readonly UserManager<AppUser> _um;
    private readonly IJwtTokenService _jwt;
    public LoginHandler(SignInManager<AppUser> sm, UserManager<AppUser> um, IJwtTokenService jwt)
    { _sm = sm; _um = um; _jwt = jwt; }

    public async Task<AuthResponse> Handle(LoginQuery req, CancellationToken ct)
    {
        var user = await _um.FindByEmailAsync(req.Request.Email) ?? throw new("User not found");
        var ok = await _sm.CheckPasswordSignInAsync(user, req.Request.Password, false);
        if (!ok.Succeeded) throw new("Invalid credentials");
        var token = await _jwt.CreateTokenAsync(user);
        return new AuthResponse(token, user.FullName, user.Email!);
    }
}
