using System.ComponentModel.DataAnnotations;
using TechChallenge5.Data.Interfaces;
using TechChallenge5.Domain.DTO;
using TechChallenge5.Domain.Models;
using TechChallenge5.Domain.ViewModels;

namespace TechChallenge5.Services.InternalServices
{
    public class ControleAcessoService : IControleAcessoService
    {
        private readonly IControleAcessoRepository _controleAcessoRepository;
        private readonly IHorarioRepository _horarioRepository;        
        private readonly IAlunoRepository _alunoRepository;
        private readonly IResponsavelRepository _responsavelRepository;

        public ControleAcessoService(IControleAcessoRepository controleAcessoRepository, IAlunoRepository alunoRepository,
            IHorarioRepository horarioRepository, IResponsavelRepository responsavelRepository)
        {
            _controleAcessoRepository = controleAcessoRepository;
            _alunoRepository = alunoRepository;
            _horarioRepository = horarioRepository;
            _responsavelRepository = responsavelRepository;
        }

        public async Task<ControleAcesso> AdicionarControleAcesso(ControleAcessoViewModel payload)
        {
            var controleAcesso = new ControleAcesso
            {
                DataHora = payload.DataHora,
                ControleEntradaType = payload.Tipo,
                AlunoId = payload.AlunoId
            };
            var aluno = await _alunoRepository.GetByIdAsync(payload.AlunoId);
            var controleAcessos = await _controleAcessoRepository.GetByDataAlunoIdAsync(payload.AlunoId, payload.DataHora);
            if (aluno is null)
            {
                throw new InvalidOperationException("Aluno não encontrado");
            }
            if (payload.Tipo == Domain.Enum.ControleEntradaType.Entrada && controleAcessos.Where(c => c.ControleEntradaType == Domain.Enum.ControleEntradaType.Entrada).Count() > 0)
            {
                throw new InvalidOperationException("Entrada já registrada");
            }
            if (payload.Tipo == Domain.Enum.ControleEntradaType.Saida && controleAcessos.Where(c => c.ControleEntradaType == Domain.Enum.ControleEntradaType.Saida).Count() > 0)
            {
                throw new InvalidOperationException("Saída já registrada");
            }
            controleAcesso.AlunoId = payload.AlunoId;
            controleAcesso.DataHora = payload.DataHora;
            controleAcesso.ControleEntradaType = payload.Tipo;
            await _controleAcessoRepository.AddAsync(controleAcesso);
            return controleAcesso;
        }

        public async Task<IEnumerable<ControleAcessoDiarioDTO>> ObterEntradasSaidasRecentesAsync(DateTime data)
        {
            var horarios = await _horarioRepository.GetAllAsync();
            var controleAcessosDiario = new List<ControleAcessoDiarioDTO>();
            foreach (var horario in horarios)
            {
                var alunos = await _alunoRepository.GetAlunosByHorarioIdAsync(horario.Id);

                foreach (var aluno in alunos)
                {
                    var resposaveis = await _responsavelRepository.GetAllByAlunoIdAsync(aluno.Id);
                    var controleAcessoDiario = new ControleAcessoDiarioDTO()
                    {
                        AlunoId = aluno.Id,
                        Nome = aluno.Pessoa?.Nome!,
                        Data = data,
                        Horario = horario,
                        Responsaveis = resposaveis
                    };
                    var controleAcessos = await _controleAcessoRepository.GetByDataAlunoIdAsync(aluno.Id,data);
                    foreach (var controleAcesso in controleAcessos)
                    {
                        switch (controleAcesso.ControleEntradaType)
                        {
                            case Domain.Enum.ControleEntradaType.Entrada:
                                controleAcessoDiario.HorarioEntrada = TimeOnly.FromDateTime(controleAcesso.DataHora);
                                break;
                            case Domain.Enum.ControleEntradaType.Saida:
                                controleAcessoDiario.HorarioSaida = TimeOnly.FromDateTime(controleAcesso.DataHora);
                                break;
                            default:
                                break;
                        }                        
                    }

                    controleAcessosDiario.Add(controleAcessoDiario);
                }                
            }
            return controleAcessosDiario;

        }
    }
}
