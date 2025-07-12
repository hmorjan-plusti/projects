using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Quartz;
using backend.Data;
using backend.Jobs;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// 1. Configurar DbContext con SQLite
builder.Services.AddDbContext<AppDbContext>(opt =>
    opt.UseSqlite("Data Source=reportes.db"));

// 2. Configurar JWT
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(opt =>
    {
        var key = builder.Configuration["Jwt:Key"];
        opt.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key!))
        };
    });

// 3. Configurar Quartz.NET (tarea diaria a las 6:00 AM)
builder.Services.AddQuartz(q =>
{
    q.UseMicrosoftDependencyInjectionJobFactory();

    var jobKey = new JobKey("reporte-job");
    q.AddJob<ReporteJob>(opts => opts.WithIdentity(jobKey));
    q.AddTrigger(opts => opts
        .ForJob(jobKey)
        .WithIdentity("reporte-trigger")
        .WithSchedule(CronScheduleBuilder.DailyAtHourAndMinute(6, 0)));
});

builder.Services.AddQuartzHostedService(opt => opt.WaitForJobsToComplete = true);

// 4. Configurar Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "ReportApp API",
        Version = "v1"
    });
});

// 5. Habilitar CORS para el frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy => policy
            .WithOrigins("http://localhost:3000") // React frontend
            .AllowAnyHeader()
            .AllowAnyMethod()
    );
});

// 6. Agregar controladores
builder.Services.AddControllers();

var app = builder.Build();

// Middleware
app.UseCors("AllowFrontend");

app.UseSwagger();
app.UseSwaggerUI();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
