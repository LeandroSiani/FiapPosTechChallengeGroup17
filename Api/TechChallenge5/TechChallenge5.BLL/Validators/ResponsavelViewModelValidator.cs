using FluentValidation;
using TechChallenge5.Domain.ViewModels;

namespace TechChallenge5.BLL.Validators
{
    public class ResponsavelViewModelValidator : AbstractValidator<ResponsavelViewModel>
    {
        public ResponsavelViewModelValidator()
        {
            RuleFor(x => x.Nome)
                .NotEmpty().WithMessage("Nome é obrigatório")
                .MaximumLength(50).WithMessage("Nome deve ter no máximo 50 caracteres");
            RuleFor(x => x.Sobrenome)
                .NotEmpty().WithMessage("Sobrenome é obrigatório")
                .MaximumLength(150).WithMessage("Sobrenome deve ter no máximo 150 caracteres");
            RuleFor(x => x.Cpf)
                .NotEmpty().WithMessage("CPF é obrigatório")
                .Length(11).WithMessage("CPF deve ter 11 caracteres");
            RuleFor(x => x.DataNascimento)
                .NotEmpty().WithMessage("Data de nascimento é obrigatória")
                .LessThan(DateTime.Now).WithMessage("Data de nascimento deve ser menor que a data atual");            
        }
    }
}
