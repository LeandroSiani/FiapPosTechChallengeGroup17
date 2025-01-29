using TechChallenge5.Domain.Models;

namespace TechChallenge5.Services.InternalServices
{
    public interface IHorarioService
    {
        Task<IEnumerable<Horario>> ObterHorariosAsync();
        Task<Horario> ObterHorarioPorIdAsync(int id);
        Task<Horario> AdicionarHorarioAsync(Horario horario);        
    }
}
