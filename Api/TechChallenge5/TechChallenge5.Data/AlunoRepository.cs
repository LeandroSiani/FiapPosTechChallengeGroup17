using Microsoft.EntityFrameworkCore;
using TechChallenge5.Data.Interfaces;
using TechChallenge5.Domain.Models;

namespace TechChallenge5.Data
{
    public class AlunoRepository : Repository<Aluno>, IAlunoRepository
    {        
        private readonly TechChallengeDbContext _context;

        public AlunoRepository(TechChallengeDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Aluno>> GetAlunosByHorarioIdAsync(int horarioId)
        {
            return await _context.Alunos                
                .Where(a => a.HorarioId == horarioId)
                .ToListAsync();
        }

        public async Task<Aluno?> GetByCpfAsync(string cpf)
        {
            return await _context.Alunos
                .Include(a => a.Pessoa)
                .FirstOrDefaultAsync(
                    a => a.Pessoa!.Cpf == cpf
                );
        }

        public async Task<Aluno?> GetByPessoaIdAsync(int id)
        {
            return await _context.Alunos
                .Include(a => a.Pessoa)
                .FirstOrDefaultAsync(
                    a => a.PessoaId == id
                );
        }
    }
}
