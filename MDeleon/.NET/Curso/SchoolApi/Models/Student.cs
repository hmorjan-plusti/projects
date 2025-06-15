namespace SchoolApi.Models
{
    public class Student
    {
        public int StudentId { get; set; }
        public required string Name { get; set; }
        public int CourseId { get; set; }
        public Course? Course { get; set; } // Relación con Course
    }
}