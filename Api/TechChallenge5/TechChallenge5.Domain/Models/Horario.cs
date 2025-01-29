namespace TechChallenge5.Domain.Models
{
    public class Horario
    {
        public int Id { get; set; }
        public string? Descricao { get; set; }
        public TimeOnly HorarioEntrada { get; set; }
        public TimeOnly HorarioSaida { get; set; }
    }
}
