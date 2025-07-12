using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using frontend;
using frontend.Services;

var builder = WebAssemblyHostBuilder.CreateDefault(args);

builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

// Configura HttpClient apuntando al backend
builder.Services.AddScoped(sp => new HttpClient
{
    BaseAddress = new Uri("http://localhost:5281/") // Asegúrate de incluir la barra al final
});

// Registra servicios personalizados
builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<NoteService>();
builder.Services.AddScoped<UserService>(); // <-- Registro necesario

await builder.Build().RunAsync();