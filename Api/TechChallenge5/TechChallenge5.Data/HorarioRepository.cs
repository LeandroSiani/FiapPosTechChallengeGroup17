using Microsoft.EntityFrameworkCore;
using TechChallenge5.Data.Interfaces;
using TechChallenge5.Domain.Models;

namespace TechChallenge5.Data
{
    public class HorarioRepository : Repository<Horario>, IHorarioRepository
    {

        public HorarioRepository(TechChallengeDbContext context) : base(context)
        {

        }
    }
}
