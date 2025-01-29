using TechChallenge5.Domain.Models;

namespace TechChallenge5.Data.Interfaces
{
    public interface IControleAcessoRepository : IRepository<ControleAcesso>
    {
        Task<IEnumerable<ControleAcesso>> GetByDataAlunoIdAsync(int alunoId, DateTime data);
    }
}
