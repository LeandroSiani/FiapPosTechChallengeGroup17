namespace TechChallenge5.Domain.ViewModels.Identity
{
    public class LoginResponseModel
    {
        public string Token { get; set; }
        public DateTime Expiration { get; set; }
        public List<string> Perfis { get; set; }
    }
}

