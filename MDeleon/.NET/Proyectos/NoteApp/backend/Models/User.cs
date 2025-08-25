using System.Collections.Generic;

namespace NoteApp.backend.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;

        public List<Note> Notes { get; set; } = new();
    }
}