namespace SchoolApi.Models
{
    public class Course
    {
        public int CourseId { get; set; } // Identificador único
        public required string Name { get; set; }
        public string? Description { get; set; }
        public ICollection<Student>? Students { get; set; }
        public ICollection<Professor>? Professors { get; set; } // Relación con Professor
    }
}