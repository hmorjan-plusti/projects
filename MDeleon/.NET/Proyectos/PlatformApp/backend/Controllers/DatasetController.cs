using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PlatformApp.Services;
using PlatformApp.Models;

namespace PlatformApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DatasetController : ControllerBase
    {
        private readonly DatasetService _datasetService;

        public DatasetController(DatasetService datasetService)
        {
            _datasetService = datasetService;
        }

        [HttpPost("upload")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Upload(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No se ha proporcionado ningún archivo.");

            // Ruta de guardado local (por ejemplo: ./Datasets)
            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "Datasets");
            if (!Directory.Exists(uploadsFolder))
                Directory.CreateDirectory(uploadsFolder);

            var filePath = Path.Combine(uploadsFolder, file.FileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            // Simular el ID de usuario autenticado
            int userId = 1;

            var dataset = await _datasetService.SaveDatasetAsync(file.FileName, filePath, userId);

            return Ok(new
            {
                message = "✅ Archivo subido y guardado correctamente.",
                dataset = dataset
            });
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            int userId = 1; // Simulación por ahora
            var datasets = _datasetService.GetByUser(userId)
                .Select(d => new { d.Id, d.Name });
            return Ok(datasets);
        }
    }
}
