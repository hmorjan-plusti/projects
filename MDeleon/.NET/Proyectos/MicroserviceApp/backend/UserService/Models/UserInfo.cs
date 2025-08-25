namespace UserService.Models;

public class UserInfo
{
    public string? Username { get; set; }
    public string Message => $"Hello {Username}, this is a protected resource.";
}
