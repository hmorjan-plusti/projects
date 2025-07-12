using System.Net.Http.Headers;
using System.Net.Http.Json;
using Microsoft.JSInterop;
using frontend.Models;

namespace frontend.Services
{
    public class NoteService
    {
        private readonly HttpClient _http;
        private readonly IJSRuntime _js;

        public NoteService(HttpClient http, IJSRuntime js)
        {
            _http = http;
            _js = js;
        }

        private async Task AddJwtTokenHeaderAsync()
        {
            var token = await _js.InvokeAsync<string>("localStorage.getItem", "authToken");
            _http.DefaultRequestHeaders.Authorization =
                !string.IsNullOrEmpty(token) ? new AuthenticationHeaderValue("Bearer", token) : null;
        }

        public async Task<List<Note>> GetNotes()
        {
            await AddJwtTokenHeaderAsync();
            var result = await _http.GetFromJsonAsync<List<Note>>("api/notes");
            return result ?? new List<Note>();
        }

        public async Task<bool> CreateNote(Note note)
        {
            await AddJwtTokenHeaderAsync();
            var response = await _http.PostAsJsonAsync("api/notes", note);
            return response.IsSuccessStatusCode;
        }

        public async Task<bool> UpdateNote(Note note)
        {
            await AddJwtTokenHeaderAsync();
            var response = await _http.PutAsJsonAsync($"api/notes/{note.Id}", note);
            return response.IsSuccessStatusCode;
        }

        public async Task<bool> DeleteNote(int id)
        {
            await AddJwtTokenHeaderAsync();
            var response = await _http.DeleteAsync($"api/notes/{id}");
            return response.IsSuccessStatusCode;
        }
    }
}
