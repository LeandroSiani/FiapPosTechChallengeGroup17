using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TechChallenge5.Data.Interfaces;
using TechChallenge5.Domain.Models;

namespace TechChallenge5.Services.InternalServices
{
    public class HorarioService : IHorarioService
    {
        private readonly IHorarioRepository _horarioRepository;

        public HorarioService(IHorarioRepository horarioRepository)
        {
            _horarioRepository = horarioRepository;
        }

        public async Task<Horario> AdicionarHorarioAsync(Horario horario)
        {
            await _horarioRepository.AddAsync(horario);
            return horario;
        }

        public Task<Horario> ObterHorarioPorIdAsync(int id)
        {
            return _horarioRepository.GetByIdAsync(id);
        }

        public Task<IEnumerable<Horario>> ObterHorariosAsync()
        {
            return _horarioRepository.GetAllAsync();
        }
    }
}
