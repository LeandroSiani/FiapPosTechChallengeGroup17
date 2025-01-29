using Microsoft.EntityFrameworkCore;
using TechChallenge5.Data.Interfaces;
using TechChallenge5.Domain.Models;

namespace TechChallenge5.Data
{
    public class ResponsavelRepository : Repository<Responsavel>, IResponsavelRepository
    {
        private readonly TechChallengeDbContext _context;
        public ResponsavelRepository(TechChallengeDbContext context) : base(context)
        {
            _context = context;
        }

        public Task<List<Responsavel>> GetAllByAlunoIdAsync(int alunoId)
        {
            return _context.Responsaveis
                .Include(a => a.Pessoa)
                .Where(a => a.ResponsavelAlunos.Any(ra => ra.AlunoId == alunoId))
                .ToListAsync();
        }

        public Task<Responsavel?> GetByCpfAsync(string cpf)
        {
            return _context.Responsaveis
                .Include(a => a.Pessoa)
                .FirstOrDefaultAsync(
                    a => a.Pessoa!.Cpf == cpf
                );
        }

        public async Task<Responsavel?> GetByPessoaIdAsync(int id)
        {
            return await _context.Responsaveis
                .Include(a => a.Pessoa)
                .FirstOrDefaultAsync(
                    a => a.PessoaId == id
                );
        }
    }
}
