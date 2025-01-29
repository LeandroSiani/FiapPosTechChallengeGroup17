using TechChallenge5.Domain.DTO;
using TechChallenge5.Domain.Models;
using TechChallenge5.Domain.ViewModels;

namespace TechChallenge5.Services.InternalServices
{
    public interface IControleAcessoService
    {
        Task<ControleAcesso> AdicionarControleAcesso(ControleAcessoViewModel payload);
        Task<IEnumerable<ControleAcessoDiarioDTO>> ObterEntradasSaidasRecentesAsync(DateTime data);
    }
}
