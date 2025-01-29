using TechChallenge5.Domain.Models;
using TechChallenge5.Domain.ViewModels;

namespace TechChallenge5.Services.InternalServices
{
    public interface IAlunoService
    {
        Task<Aluno> AdicionarAlunoAsync(AlunoViewModel payload);
        Task<Aluno> ObterAlunoPorIdAsync(int id);
        Task<Aluno?> ObterAlunoPorCpfAsync(string cpf);
        Task<IEnumerable<Aluno>> ObterAlunosAsync();
        Task<Responsavel> AdicionarResponsavel(int id, ResponsavelViewModel payload);

    }
}
