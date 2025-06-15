using ServiceApp;

var builder = Host.CreateApplicationBuilder(args);

// ✅ Agrega el Worker como servicio hospedado
builder.Services.AddHostedService<Worker>();

// ✅ (Opcional) Agrega Application Insights si deseas monitoreo en Azure
builder.Services.AddApplicationInsightsTelemetryWorkerService("tu_instrumentation_key");

// ✅ (Opcional) Agrega logging si deseas configurar más detalles
builder.Logging.AddConsole(); // También puedes usar Debug, EventLog, etc.

var host = builder.Build();
host.Run();
