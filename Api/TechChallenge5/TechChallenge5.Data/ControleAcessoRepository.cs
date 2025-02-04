using Microsoft.EntityFrameworkCore;
using TechChallenge5.Data.Interfaces;
using TechChallenge5.Domain.Models;

namespace TechChallenge5.Data
{
    public class ControleAcessoRepository : Repository<ControleAcesso>, IControleAcessoRepository
    {
        private readonly TechChallengeDbContext _context;
        public ControleAcessoRepository(TechChallengeDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ControleAcesso>> GetByDataAlunoIdAsync(int alunoId, DateTime data)
        {
            return await _context.ControleAcessos
                .Include(a => a.Aluno)
                .Where(a => a.AlunoId == alunoId && a.DataHora.Date == data.Date)
                .ToListAsync();
        }
    }
}
