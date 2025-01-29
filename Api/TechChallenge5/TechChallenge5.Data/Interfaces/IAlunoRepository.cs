using TechChallenge5.Domain.Models;

namespace TechChallenge5.Data.Interfaces
{
    public interface IAlunoRepository : IRepository<Aluno>
    {
        Task<Aluno?> GetByCpfAsync(string cpf);
        Task<Aluno?> GetByPessoaIdAsync(int id);
        Task<IEnumerable<Aluno>> GetAlunosByHorarioIdAsync(int horarioId);
    }
}
