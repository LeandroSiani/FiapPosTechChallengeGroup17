using FluentValidation;
using TechChallenge5.Domain.ViewModels;

namespace TechChallenge5.BLL.Validators
{
    public class AlunoViewModelValidator : AbstractValidator<AlunoViewModel>
    {
        public AlunoViewModelValidator()
        {
            RuleFor(x => x.Nome).NotEmpty().WithMessage("Nome é obrigatório");
            RuleFor(x => x.Sobrenome).NotEmpty().WithMessage("Sobrenome é obrigatório");
            RuleFor(x => x.Cpf).NotEmpty().WithMessage("CPF é obrigatório")
                .Must(IsValidCpf).WithMessage("CPF inválido");             
            RuleFor(x => x.DataNascimento).NotEmpty().WithMessage("Data de Nascimento é obrigatória");
            RuleFor(x => x.Email).NotEmpty().WithMessage("Email é obrigatório");
            /*RuleFor(x => x.HorarioEntrada).NotEmpty().WithMessage("Horário de Entrada é obrigatório");
            RuleFor(x => x.HorarioSaida).NotEmpty().WithMessage("Horário de Saída é obrigatório");
            RuleFor(x => x).Must(x => x.HorarioEntrada <= x.HorarioSaida)
                .WithMessage("Horário de Entrada deve ser menor que o Horário de Saída");*/

        }

        private bool IsValidCpf(string cpf)
        {
            // Remove non-numeric characters
            cpf = new string(cpf.Where(char.IsDigit).ToArray());

            if (cpf.Length != 11)
                return false;

            // Check for invalid CPF numbers
            var invalidCpfs = new HashSet<string>
            {
                "00000000000", "11111111111", "22222222222", "33333333333",
                "44444444444", "55555555555", "66666666666", "77777777777",
                "88888888888", "99999999999"
            };

            if (invalidCpfs.Contains(cpf))
                return false;

            // Validate first digit
            int[] multipliers1 = { 10, 9, 8, 7, 6, 5, 4, 3, 2 };
            int sum = 0;
            for (int i = 0; i < 9; i++)
                sum += (cpf[i] - '0') * multipliers1[i];

            int remainder = sum % 11;
            int firstDigit = remainder < 2 ? 0 : 11 - remainder;

            if (cpf[9] - '0' != firstDigit)
                return false;

            // Validate second digit
            int[] multipliers2 = { 11, 10, 9, 8, 7, 6, 5, 4, 3, 2 };
            sum = 0;
            for (int i = 0; i < 10; i++)
                sum += (cpf[i] - '0') * multipliers2[i];

            remainder = sum % 11;
            int secondDigit = remainder < 2 ? 0 : 11 - remainder;

            return cpf[10] - '0' == secondDigit;
        }
    }
}
