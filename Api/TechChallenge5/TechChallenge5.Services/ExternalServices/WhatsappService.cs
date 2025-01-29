namespace TechChallenge5.Services.ExternalServices
{
    public class WhatsappService : IWhatsappService
    {
        public Task EnviarMensagemAsync(string mensagem, string nome, string telefone)
        {
            return Task.CompletedTask;
        }
    }
}
