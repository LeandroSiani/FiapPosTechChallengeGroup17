using AutoMapper;
using FluentValidation;
using TechChallenge5.Data.Interfaces;
using TechChallenge5.Domain.Models;
using TechChallenge5.Domain.ViewModels;

namespace TechChallenge5.Services.InternalServices
{
    public class AlunoService : IAlunoService
    {
        private readonly IAlunoRepository _alunoRepository;
        private readonly IPessoaRepository _pessoaRepository;
        private readonly IResponsavelRepository _responsavelRepository;
        private readonly IMapper _mapper;
        private readonly IValidator<AlunoViewModel> _validator;
        private readonly IValidator<ResponsavelViewModel> _validatorResponsavel;

        public AlunoService(IAlunoRepository alunoRepository, IPessoaRepository pessoaRepository, IMapper mapper,
            IValidator<AlunoViewModel> validator, IValidator<ResponsavelViewModel> validatorResponsavel, 
            IResponsavelRepository responsavelRepository)
        {
            _alunoRepository = alunoRepository;
            _pessoaRepository = pessoaRepository;
            _mapper = mapper;
            _validator = validator;
            _validatorResponsavel = validatorResponsavel;
            _responsavelRepository = responsavelRepository;
        }

        public async Task<Aluno> AdicionarAlunoAsync(AlunoViewModel payload)
        {
            var validationResult = await _validator.ValidateAsync(payload);
            if (!validationResult.IsValid)
            {
                throw new ValidationException(validationResult.Errors);
            }

            var pessoa = _pessoaRepository.GetByCpf(payload.Cpf);
            if (pessoa is not null)
            {
                var alunoExistente = await _alunoRepository.GetByPessoaIdAsync(pessoa.Id);
                if (alunoExistente is not null)
                {
                    throw new InvalidOperationException("Aluno já cadastrado");
                }
            }

            var aluno = _mapper.Map<Aluno>(payload);
            aluno.Pessoa = pessoa is null ? _mapper.Map<Pessoa>(payload) : pessoa;
            await _alunoRepository.AddAsync(aluno);
            return aluno;
        }

        public async Task<Responsavel> AdicionarResponsavel(int id, ResponsavelViewModel payload)
        {
            var validationResult = _validatorResponsavel.Validate(payload);
            if (!validationResult.IsValid)
            {
                throw new ValidationException(validationResult.Errors);
            }
            var pessoa = _pessoaRepository.GetByCpf(payload.Cpf);
            var pessoaId = pessoa?.Id ?? 0;
            var responsavelExistente = await _responsavelRepository.GetByPessoaIdAsync(pessoaId);
            if (responsavelExistente is null)
            {
                var responsavel = _mapper.Map<Responsavel>(payload);
                responsavel.Pessoa = pessoa is null ? _mapper.Map<Pessoa>(payload) : pessoa;
                await _responsavelRepository.AddAsync(responsavel);
                responsavelExistente = responsavel;
            }

            var aluno = await _alunoRepository.GetByIdAsync(id);
            if (aluno is null)
            {
                throw new InvalidOperationException("Aluno não encontrado");
            }
            aluno.ResponsavelAlunos!.Add(new ResponsavelAluno
            {
                AlunoId = id,
                ResponsavelId = responsavelExistente.Id
            });
            await _alunoRepository.UpdateAsync(aluno);
            return responsavelExistente;

        }

        public Task<Aluno?> ObterAlunoPorCpfAsync(string cpf)
        {
            return _alunoRepository.GetByCpfAsync(cpf);
        }

        public Task<Aluno> ObterAlunoPorIdAsync(int id)
        {
            return _alunoRepository.GetByIdAsync(id);
        }

        public Task<IEnumerable<Aluno>> ObterAlunosAsync()
        {
            return _alunoRepository.GetAllAsync();
        }
    }
}
