using Microsoft.EntityFrameworkCore;

var builder = Host.CreateApplicationBuilder(args);

// 🌐 Cliente HTTP para consumir APIs externas
builder.Services.AddHttpClient();

// ✅ CORREGIDO: usar base de datos compartida
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=../SharedDb/workerdata.db"));  // Ruta relativa al .db compartido

// 🔁 Agregar servicio en segundo plano (el Worker)
builder.Services.AddHostedService<Worker>();

var host = builder.Build();
host.Run();
