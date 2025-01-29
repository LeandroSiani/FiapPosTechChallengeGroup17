namespace TechChallenge5.Services.ExternalServices
{
    public interface IWhatsappService
    {
        Task EnviarMensagemAsync(string mensagem, string nome, string telefone);
    }
}