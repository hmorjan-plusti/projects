using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolApi.Data;
using SchoolApi.Models;

namespace SchoolApi.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class StudentController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public StudentController(ApplicationDbContext context) => _context = context;

    [HttpGet]
    public async Task<IActionResult> GetStudents()
    {
        var students = await _context.Students
            .Include(s => s.Course)
            .ToListAsync();
        return Ok(students);
    }

    [HttpPost]
    public async Task<IActionResult> CreateStudent([FromBody] Student student)
    {
        var course = await _context.Courses.FindAsync(student.CourseId);
        if (course == null)
            return BadRequest("Curso no encontrado.");

        _context.Students.Add(student);
        await _context.SaveChangesAsync();
        return Ok(student);
    }
}
