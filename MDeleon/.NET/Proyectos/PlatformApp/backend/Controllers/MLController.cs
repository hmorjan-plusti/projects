using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PlatformApp.Models;
using PlatformApp.Services;

namespace PlatformApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] // ✅ Requiere autenticación
    public class MLController : ControllerBase
    {
        private readonly MLService _mlService;

        public MLController(MLService mlService)
        {
            _mlService = mlService;
        }

        // POST: api/ml/train
        [HttpPost("train")]
        public IActionResult Train([FromBody] List<InputData> data)
        {
            if (data == null || !data.Any())
            {
                return BadRequest(new { message = "⚠️ No input data provided for training." });
            }

            try
            {
                _mlService.Train(data);
                return Ok(new { message = "✅ Model trained successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "❌ Error training the model.", error = ex.Message });
            }
        }

        // POST: api/ml/predict
        [HttpPost("predict")]
        public IActionResult Predict([FromBody] InputData input)
        {
            if (input == null)
            {
                return BadRequest(new { message = "⚠️ No input data provided for prediction." });
            }

            try
            {
                float score = _mlService.Predict(input);
                return Ok(new { score });
            }
            catch (FileNotFoundException)
            {
                return NotFound(new { message = "❌ Model not found. Please train it first." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "❌ Error during prediction.", error = ex.Message });
            }
        }
    }
}
