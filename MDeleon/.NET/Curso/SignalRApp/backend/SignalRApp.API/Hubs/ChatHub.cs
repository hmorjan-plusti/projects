using Microsoft.AspNetCore.SignalR;
using SignalRApp.API.Data;
using SignalRApp.API.Models;

namespace SignalRApp.API.Hubs
{
    public class ChatHub : Hub
    {
        private readonly ApplicationDbContext _context;

        public ChatHub(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task SendMessage(string user, string message)
        {
            try
            {
                // Guardar el mensaje en la base de datos
                var msg = new Message { User = user, Text = message };
                _context.Messages.Add(msg);
                await _context.SaveChangesAsync();

                // Enviar el mensaje a todos los clientes conectados
                await Clients.All.SendAsync("ReceiveMessage", user, message);
            }
            catch (Exception ex)
            {
                // Manejo de errores (puedes registrar el error si es necesario)
                Console.WriteLine($"Error al enviar el mensaje: {ex.Message}");
                throw;
            }
        }

        public async Task SendNotification(string message)
        {
            try
            {
                // Enviar una notificación a todos los clientes conectados
                await Clients.All.SendAsync("ReceiveNotification", message);
            }
            catch (Exception ex)
            {
                // Manejo de errores
                Console.WriteLine($"Error al enviar la notificación: {ex.Message}");
                throw;
            }
        }
    }
}