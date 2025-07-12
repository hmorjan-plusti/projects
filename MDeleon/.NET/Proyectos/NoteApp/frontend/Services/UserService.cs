using System.Net.Http.Json;
using frontend.Models;

public class UserService
{
    private readonly HttpClient _http;

    public UserService(HttpClient http)
    {
        _http = http;
    }

    public async Task<List<UserDto>> GetAllUsers()
        => await _http.GetFromJsonAsync<List<UserDto>>("api/users") ?? new();

    public async Task CreateUser(UserDto user)
        => await _http.PostAsJsonAsync("api/users", user);

    public async Task UpdateUser(int id, UserDto user)
        => await _http.PutAsJsonAsync($"api/users/{id}", user);

    public async Task DeleteUser(int id)
        => await _http.DeleteAsync($"api/users/{id}");
}