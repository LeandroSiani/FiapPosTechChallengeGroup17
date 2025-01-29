using TechChallenge5.Domain.Models;

namespace TechChallenge5.Domain.DTO
{
    public class ControleAcessoDiarioDTO
    {
        public int AlunoId { get; set; }
        public string? Nome { get; set; }        
        public DateTime Data { get; set; }
        public Horario? Horario { get; set; }
        public TimeOnly? HorarioEntrada { get; set; }
        public TimeOnly? HorarioSaida { get; set; }
        public List<Responsavel>? Responsaveis { get; set; }
    }
}
