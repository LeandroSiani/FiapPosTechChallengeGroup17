namespace TechChallenge5.Domain.ViewModels
{
    public class AlunoViewModel
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Sobrenome { get; set; }
        public string Cpf { get; set; }
        public string? Email { get; set; }
        public string? Telefone { get; set; }
        public DateTime DataNascimento { get; set; }
        public int HorarioId { get; set; }
        public bool Ativo { get; set; }
    }
}
