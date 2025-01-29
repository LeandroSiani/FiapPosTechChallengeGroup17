using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TechChallenge5.Data.Interfaces;
using TechChallenge5.Domain.Enum;
using TechChallenge5.Domain.Models.Identity;
using TechChallenge5.Domain.ViewModels.Identity;

namespace TechChallenge5.Services.InternalServices
{
    public class IdentityService : IIdentityService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IConfiguration _configuration;
        private readonly IProfessorRepository _professorRepository;
        private readonly IAlunoService _alunoService;
        private readonly IResponsavelService _responsavelService;

        public IdentityService(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, 
            IConfiguration configuration, IAlunoService alunoService, IResponsavelService responsavelService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _alunoService = alunoService;
            _responsavelService = responsavelService;
        }

        public async Task<LoginResponseModel> Login(LoginViewModel payload)
        {
            var result = await _signInManager.PasswordSignInAsync(payload.Email, payload.Senha, false, false);
            if (result.Succeeded)
            {
                var user = await _userManager.FindByEmailAsync(payload.Email);
                var token = GenerateJwtToken(user, out DateTime expiration);
                var perfis = user.Perfis.Select(p => p.ToString()).ToList();
                return new LoginResponseModel { Token = token, Expiration = expiration, Perfis = perfis };
            }
            throw new Exception("Login e senha inválido.");
        }

        public async Task<ApplicationUser> RegisterAsync(RegisterViewModel payload)
        {
            var user = new ApplicationUser { UserName = payload.Email, Email = payload.Email, Cpf = payload.Cpf };
            var result = await _userManager.CreateAsync(user, payload.Senha);

            if (result.Succeeded)
            {
                await AtribuirPerfisAsync(user);
                await _userManager.UpdateAsync(user);
                return user;
            }

            throw new Exception(string.Join(", ", result.Errors.Select(e => e.Description)));
        }

        private async Task AtribuirPerfisAsync(ApplicationUser user)
        {
            // Atribuir perfis automaticamente com base no CPF
            if (await IsAlunoAsync(user.Cpf))
                user.Perfis.Add(PerfilType.Aluno);

            if (await IsResponsavel(user.Cpf))
                user.Perfis.Add(PerfilType.Responsavel);

            if (IsProfessor(user.Cpf))
                user.Perfis.Add(PerfilType.Professor);
        }

        private bool IsProfessor(string cpf)
        {
            //var professor = _professorRepository.get(cpf).Result;
            return false;
        }

        private async Task<bool> IsAlunoAsync(string cpf) 
            => await _alunoService.ObterAlunoPorCpfAsync(cpf) is not null;

        private async Task<bool> IsResponsavel(string cpf) => 
            await _responsavelService.ObterResponsavelPorCpfAsync(cpf) is not null;

        private string GenerateJwtToken(ApplicationUser user, out DateTime expiration)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim("CPF", user.Cpf)
            };

            claims.AddRange(user.Perfis.Select(perfil => new Claim("Perfil", perfil.ToString())));

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            expiration = DateTime.Now.AddMinutes(30);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: expiration,
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
