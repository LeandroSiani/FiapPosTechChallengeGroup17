using TechChallenge5.Domain.Models.Identity;
using TechChallenge5.Domain.ViewModels.Identity;

namespace TechChallenge5.Services.InternalServices
{
    public interface IIdentityService
    {
        Task<ApplicationUser> RegisterAsync(RegisterViewModel payload);
        Task<LoginResponseModel> Login(LoginViewModel payload);
    }
}
