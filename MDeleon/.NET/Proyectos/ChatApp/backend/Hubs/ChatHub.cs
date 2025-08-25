using ChatApp.backend.Data;
using ChatApp.backend.Models;
using Microsoft.AspNetCore.SignalR;

namespace ChatApp.backend.Hubs
{
    public class ChatHub : Hub
    {
        private readonly AppDbContext _context;

        public ChatHub(AppDbContext context)
        {
            _context = context;
        }

        public async Task SendMessage(string user, string message)
        {
            var msg = new Message
            {
                Sender = user,
                Content = message,
                Timestamp = DateTime.UtcNow
            };

            _context.Messages.Add(msg);
            await _context.SaveChangesAsync();
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
    }
}
