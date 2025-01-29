using Microsoft.EntityFrameworkCore;
using TechChallenge5.Data.Interfaces;
using TechChallenge5.Domain.Models;

namespace TechChallenge5.Data
{
    public class ResponsavelAlunoRepository : Repository<ResponsavelAluno>, IResponsavelAlunoRepository
    {
        public ResponsavelAlunoRepository(TechChallengeDbContext context) : base(context)
        {
        }
    }
}
