using Microsoft.AspNetCore.Mvc;
using SchoolApi.Data;
using SchoolApi.Models;

namespace SchoolApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProfessorController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProfessorController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult AddProfessor([FromBody] Professor professor)
        {
            if (professor == null || string.IsNullOrEmpty(professor.Name))
            {
                return BadRequest("Datos inválidos.");
            }

            _context.Professors.Add(professor);
            _context.SaveChanges();

            return Ok("Profesor agregado con éxito.");
        }
    }
}