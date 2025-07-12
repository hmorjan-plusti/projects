using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NoteApp.backend.Data;
using NoteApp.backend.Models;
using System.Security.Claims;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class NotesController : ControllerBase
{
    private readonly AppDbContext _context;

    public NotesController(AppDbContext context)
    {
        _context = context;
    }

    // Obtener todas las notas del usuario autenticado
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Note>>> GetNotes()
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        return await _context.Notes
            .Where(n => n.UserId == userId)
            .ToListAsync();
    }

    // Obtener una nota específica del usuario
    [HttpGet("{id}")]
    public async Task<ActionResult<Note>> GetNote(int id)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var note = await _context.Notes
            .FirstOrDefaultAsync(n => n.Id == id && n.UserId == userId);

        if (note == null) return NotFound();
        return note;
    }

    // Crear una nueva nota
    [HttpPost]
    public async Task<ActionResult<Note>> CreateNote(Note note)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        note.UserId = userId;
        note.User = null; // evitar validación redundante

        _context.Notes.Add(note);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetNote), new { id = note.Id }, note);
    }

    // Actualizar nota del usuario autenticado
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateNote(int id, Note updatedNote)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        var existingNote = await _context.Notes.FirstOrDefaultAsync(n => n.Id == id && n.UserId == userId);
        if (existingNote == null) return NotFound();

        existingNote.Title = updatedNote.Title;
        existingNote.Content = updatedNote.Content;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    // Eliminar nota
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteNote(int id)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var note = await _context.Notes.FirstOrDefaultAsync(n => n.Id == id && n.UserId == userId);
        if (note == null) return NotFound();

        _context.Notes.Remove(note);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}