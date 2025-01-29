using Microsoft.AspNetCore.Identity;
using TechChallenge5.Domain.Enum;

namespace TechChallenge5.Domain.Models.Identity
{
    public class ApplicationUser : IdentityUser<int>
    {
        public string Cpf { get; set; }
        public ICollection<PerfilType> Perfis { get; set; } = new List<PerfilType>();
    }
}
