using TechChallenge5.Domain.Models;
using TechChallenge5.Domain.ViewModels;

namespace TechChallenge5.Services.InternalServices
{
    public interface IResponsavelService
    {
        Task<Responsavel> AdicionarResponsavelAsync(ResponsavelViewModel payload);
        Task<Responsavel> ObterResponsavelPorIdAsync(int id);
        Task<Responsavel?> ObterResponsavelPorCpfAsync(string cpf);
        Task<List<Responsavel>> ObterTodosResponsaveisPorAlunoIdAsync(int alunoId); 
    }
}
