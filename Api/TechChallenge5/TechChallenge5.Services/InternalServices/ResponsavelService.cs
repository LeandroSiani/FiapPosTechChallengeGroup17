using AutoMapper;
using FluentValidation;
using TechChallenge5.Data.Interfaces;
using TechChallenge5.Domain.Models;
using TechChallenge5.Domain.ViewModels;

namespace TechChallenge5.Services.InternalServices
{
    public class ResponsavelService : IResponsavelService
    {
        private readonly IResponsavelRepository _responsavelRepository;
        private readonly IPessoaRepository _pessoaRepository;
        private readonly IMapper _mapper;
        private readonly IValidator<ResponsavelViewModel> _validator;

        public ResponsavelService(IResponsavelRepository responsavelRepository, IPessoaRepository pessoaRepository,
            IMapper mapper, IValidator<ResponsavelViewModel> validator)
        {
            _responsavelRepository = responsavelRepository;
            _pessoaRepository = pessoaRepository;
            _mapper = mapper;
            _validator = validator;
        }

        public async Task<Responsavel> AdicionarResponsavelAsync(ResponsavelViewModel payload)
        {
            var validationResult = _validator.Validate(payload);
            if (!validationResult.IsValid)
            {
                throw new ValidationException(validationResult.Errors);
            };
            var pessoa = _pessoaRepository.GetByCpf(payload.Cpf);
            if (pessoa is not null)
            {
                var alunoExistente = await _responsavelRepository.GetByPessoaIdAsync(pessoa.Id);
                if (alunoExistente is not null)
                {
                    throw new InvalidOperationException("Aluno já cadastrado");
                }
            }
            var responsavel = _mapper.Map<Responsavel>(payload);
            responsavel.Pessoa = pessoa is null ? _mapper.Map<Pessoa>(payload) : pessoa;
            await _responsavelRepository.AddAsync(responsavel);
            return responsavel;

        }

        public async Task<Responsavel?> ObterResponsavelPorCpfAsync(string cpf)
        {
            return await _responsavelRepository.GetByCpfAsync(cpf);
        }

        public async Task<Responsavel> ObterResponsavelPorIdAsync(int id)
        {
            return await _responsavelRepository.GetByIdAsync(id);
        }

        public async Task<List<Responsavel>> ObterTodosResponsaveisPorAlunoIdAsync(int alunoId)
        {
            return await _responsavelRepository.GetAllByAlunoIdAsync(alunoId);
        }
    }
}
