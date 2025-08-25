using System.Net.Http;
using System.Net.Http.Json;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.JSInterop;
using frontend.Models;

namespace frontend.Services
{
    public class AuthService
    {
        private readonly HttpClient _http;
        private readonly IJSRuntime _js;

        public string? Token { get; private set; }

        public AuthService(HttpClient http, IJSRuntime js)
        {
            _http = http;
            _js = js;
        }

        public async Task<bool> Register(UserDto user)
        {
            var response = await _http.PostAsJsonAsync("api/Auth/register", user);
            return response.IsSuccessStatusCode;
        }

        public async Task<bool> Login(UserLogin user)
        {
            var response = await _http.PostAsJsonAsync("api/Auth/login", user);
            if (!response.IsSuccessStatusCode) return false;

            var result = await response.Content.ReadFromJsonAsync<TokenResponse>();
            Token = result?.Token;

            if (!string.IsNullOrEmpty(Token))
            {
                _http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Token);
                await _js.InvokeVoidAsync("localStorage.setItem", "authToken", Token);
                return true;
            }

            return false;
        }

        public async Task LoadToken()
        {
            Token = await _js.InvokeAsync<string>("localStorage.getItem", "authToken");

            if (!string.IsNullOrEmpty(Token))
            {
                _http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Token);
            }
        }

        public async Task Logout()
        {
            Token = null;
            _http.DefaultRequestHeaders.Authorization = null;
            await _js.InvokeVoidAsync("localStorage.removeItem", "authToken");
        }
    }

    public class TokenResponse
    {
        public string Token { get; set; } = string.Empty;
    }
}
