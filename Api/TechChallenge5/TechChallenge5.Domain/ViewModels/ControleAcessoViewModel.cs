using TechChallenge5.Domain.Enum;

namespace TechChallenge5.Domain.ViewModels
{
    public class ControleAcessoViewModel
    {
        public int AlunoId { get; set; }
        public ControleEntradaType Tipo { get; set; }
        public DateTime DataHora { get; set; }
    }
}
