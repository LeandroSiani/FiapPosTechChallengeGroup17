using Microsoft.EntityFrameworkCore;
using TechChallenge5.Data.Interfaces;
using TechChallenge5.Domain.Models;

namespace TechChallenge5.Data
{
    public class ProfessorRepository : Repository<Professor>, IProfessorRepository
    {
        public ProfessorRepository(TechChallengeDbContext context) : base(context)
        {
        }
    }
}
