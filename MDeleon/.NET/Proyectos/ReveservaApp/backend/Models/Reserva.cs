namespace ReservaApp.backend.Models
{
    public class Reserva
    {
        public int Id { get; set; }
        public string Tipo { get; set; } = string.Empty; // Hotel, Restaurante, Médico
        public string Detalle { get; set; } = string.Empty;
        public DateTime Fecha { get; set; }
        public int UserId { get; set; }
    }
}