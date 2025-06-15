using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

[ApiController]
[Route("api/[controller]")]
public class LogController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        var logs = new List<object>
        {
            new { Time = DateTime.Now, Message = "Servicio activo" }
        };
        return Ok(logs);
    }
}