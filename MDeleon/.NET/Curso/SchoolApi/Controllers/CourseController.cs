using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolApi.Data;
using SchoolApi.Models;

namespace SchoolApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class CourseController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public CourseController(ApplicationDbContext context) => _context = context;

        [HttpGet]
        public IActionResult Get() => Ok(_context.Courses.ToList());

        [HttpPost]
        public IActionResult Post([FromBody] Course course)
        {
            _context.Courses.Add(course);
            _context.SaveChanges();
            return Ok(course);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Course updated)
        {
            var course = _context.Courses.Find(id);
            if (course == null) return NotFound();
            course.Name = updated.Name;
            _context.SaveChanges();
            return Ok(course);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var course = _context.Courses.Find(id);
            if (course == null) return NotFound();
            _context.Courses.Remove(course);
            _context.SaveChanges();
            return Ok();
        }
    }
}
