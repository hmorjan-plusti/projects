using Microsoft.AspNetCore.Mvc;
using SecureNotesApp.Data;
using SecureNotesApp.Models;
using SecureNotesApp.Services;

namespace SecureNotesApp.Controllers;

[ApiController]
[Route("[controller]")]
public class NotesController : ControllerBase
{
    private readonly NotesDbContext _context;
    private readonly EncryptionService _encryptor;

    public NotesController(NotesDbContext context, EncryptionService encryptor)
    {
        _context = context;
        _encryptor = encryptor;
    }

    [HttpPost]
    public IActionResult Create([FromBody] Note note)
    {
        note.EncryptedContent = _encryptor.Encrypt(note.EncryptedContent);
        _context.Notes.Add(note);
        _context.SaveChanges();
        return Ok(note);
    }

    [HttpGet("{id}")]
    public IActionResult Get(int id)
    {
        var note = _context.Notes.Find(id);
        if (note == null) return NotFound();

        var content = _encryptor.Decrypt(note.EncryptedContent);
        return Ok(new { note.Id, note.Title, Content = content });
    }
}
