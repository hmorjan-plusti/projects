using PlatformApp.Data;
using PlatformApp.Models;

namespace PlatformApp.Services
{
    public class DatasetService
    {
        private readonly AppDbContext _context;

        public DatasetService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Dataset> SaveDatasetAsync(string name, string filePath, int userId)
        {
            var dataset = new Dataset
            {
                Name = name,
                FilePath = filePath,
                UserId = userId,
                UploadedAt = DateTime.UtcNow
            };

            _context.Datasets.Add(dataset);
            await _context.SaveChangesAsync();
            return dataset;
        }

        public IEnumerable<Dataset> GetByUser(int userId) =>
            _context.Datasets.Where(d => d.UserId == userId);
    }
}
