namespace TechChallenge5.Services.ExternalServices
{
    public class EmailService : IEmailService
    {
        public Task SendEmailAsync(string to, string subject, string body)
        {
            return Task.CompletedTask;
        }
    }
}
