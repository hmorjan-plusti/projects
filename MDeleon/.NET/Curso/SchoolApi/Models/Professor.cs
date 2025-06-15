namespace SchoolApi.Models
{
    public class Professor
    {
        public int ProfessorId { get; set; }
        public required string Name { get; set; }
        public string? Department { get; set; }
        public ICollection<Course>? Courses { get; set; } // Relación con Course
    }
}