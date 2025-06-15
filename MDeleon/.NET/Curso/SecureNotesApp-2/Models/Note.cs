namespace SecureNotesApp.Models;

public class Note
{
    public int Id { get; set; }
    public string Title { get; set; } = "";
    public string EncryptedContent { get; set; } = "";
}
