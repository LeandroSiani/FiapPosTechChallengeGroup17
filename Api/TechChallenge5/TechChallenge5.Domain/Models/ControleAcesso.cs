using TechChallenge5.Domain.Enum;

namespace TechChallenge5.Domain.Models
{
    public class ControleAcesso
    {
        public int Id { get; set; }
        public Aluno Aluno { get; set; }
        public int AlunoId { get; set; }
        public ControleEntradaType ControleEntradaType { get; set; }
        public DateTime DataHora { get; set; }        
    }
}
