using TechChallenge5.Domain.Models;

namespace TechChallenge5.Data.Interfaces
{
    public interface IResponsavelRepository : IRepository<Responsavel>
    {
        Task<Responsavel?> GetByPessoaIdAsync(int id);
        Task<Responsavel?> GetByCpfAsync(string cpf);
        Task<List<Responsavel>> GetAllByAlunoIdAsync(int alunoId);
    }
}
