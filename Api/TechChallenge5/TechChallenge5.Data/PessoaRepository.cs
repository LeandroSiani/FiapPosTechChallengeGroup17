using Microsoft.EntityFrameworkCore;
using TechChallenge5.Data.Interfaces;
using TechChallenge5.Domain.Models;

namespace TechChallenge5.Data
{
    public class PessoaRepository : Repository<Pessoa>, IPessoaRepository
    {
        private readonly TechChallengeDbContext _context;
        public PessoaRepository(TechChallengeDbContext context) : base(context)
        {
            _context = context;
        }

        public Pessoa GetByCpf(string cpf)
        {
            return _context.Pessoas.FirstOrDefault(p => p.Cpf == cpf);

        }
    }
}
