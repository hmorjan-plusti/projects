using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using ReservaApp.backend.Models;
using ReservaApp.backend.Data;

namespace ReservaApp.backend.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/reservas")]
    public class ReservasController : ControllerBase
    {
        private readonly AppDbContext _db;

        public ReservasController(AppDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!int.TryParse(userIdClaim, out int userId))
                return Unauthorized("No se pudo identificar al usuario.");

            var reservas = await _db.Reservas
                .Where(r => r.UserId == userId)
                .ToListAsync();

            return Ok(reservas);
        }

        [HttpPost]
        public async Task<IActionResult> Create(Reserva r)
        {
            var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!int.TryParse(userIdClaim, out int userId))
                return Unauthorized("No se pudo identificar al usuario.");

            r.UserId = userId;
            _db.Reservas.Add(r);
            await _db.SaveChangesAsync();

            return Ok(r);
        }
    }
}
