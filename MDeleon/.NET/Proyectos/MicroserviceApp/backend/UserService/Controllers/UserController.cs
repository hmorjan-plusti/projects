using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using UserService.Models;

namespace UserService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    [HttpGet("me")]
    [Authorize]
    public ActionResult<UserInfo> GetInfo()
    {
        var username = User.FindFirstValue(ClaimTypes.Name) ?? "Unknown";

        return new UserInfo
        {
            Username = username
        };
    }

    [HttpGet("debug")]
    public ActionResult<object> Debug()
    {
        var authHeader = Request.Headers["Authorization"].FirstOrDefault();
        var token = authHeader?.Split(" ").LastOrDefault();

        return new
        {
            HasAuthHeader = !string.IsNullOrEmpty(authHeader),
            AuthHeaderValue = authHeader,
            TokenLength = token?.Length ?? 0,
            TokenPreview = token != null ? token.Substring(0, Math.Min(50, token.Length)) + "..." : "null"
        };
    }
}
