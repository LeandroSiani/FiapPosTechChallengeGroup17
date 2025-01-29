using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using TechChallenge5.Services.ExternalServices;
using TechChallenge5.Services.InternalServices;

namespace TechChallenge5.HostedService.Jobs
{
    public class VerificarEntradasSaidasJob : IHostedService, IDisposable
    {
        private readonly IServiceScopeFactory _serviceScopeFactory;        
        private readonly ILogger<VerificarEntradasSaidasJob> _logger;
        private Timer _timer;

        public VerificarEntradasSaidasJob(IServiceScopeFactory serviceScopeFactory, ILogger<VerificarEntradasSaidasJob> logger)
        {
            _serviceScopeFactory = serviceScopeFactory;
            _logger = logger;
        }

        public void Dispose()
        {
            _timer?.Dispose();
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation("VerificarEntradasSaidasJob is starting.");
            _timer = new Timer(VerificarEntradasSaidas, null, TimeSpan.Zero, TimeSpan.FromMinutes(15));
            return Task.CompletedTask;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation("VerificarEntradasSaidasJob is stopping.");
            _timer?.Change(Timeout.Infinite, 0);
            return Task.CompletedTask;
        }

        private async void VerificarEntradasSaidas(object state)
        {            
            _logger.LogInformation("Verificando entradas e saídas.");
            try
            {
                using var scope = _serviceScopeFactory.CreateScope();
                var _controleAcessoService = scope.ServiceProvider.GetRequiredService<IControleAcessoService>();
                var _whatsappService = scope.ServiceProvider.GetRequiredService<IWhatsappService>();
                var _emailService = scope.ServiceProvider.GetRequiredService<IEmailService>();
                var entradasSaidas = _controleAcessoService.ObterEntradasSaidasRecentesAsync(DateTime.Today).Result;
                var dataAtual = DateTime.Now;
                var horarioAtual = TimeOnly.FromDateTime(dataAtual);
                foreach (var entradaSaida in entradasSaidas)
                {
                    if (entradaSaida.HorarioEntrada is null && horarioAtual > entradaSaida.Horario?.HorarioEntrada.AddMinutes(15))
                    {
                        foreach (var responsavel in entradaSaida.Responsaveis!)
                        {
                            _logger.LogInformation($"Aluno {entradaSaida.AlunoId} não entrou na escola {dataAtual.ToString()}.");
                            await _whatsappService.EnviarMensagemAsync(
                                $"Seu filho {entradaSaida.Nome} ainda não entrou na escola.",
                                responsavel.Pessoa?.Nome!,
                                responsavel.Pessoa?.Telefone!);
                            await _emailService.SendEmailAsync(responsavel.Pessoa?.Email!, "Seu filho ainda não entrou na escola", $"Seu filho {entradaSaida.Nome} ainda não entrou na escola.");
                        }
                    }
                    if (entradaSaida.HorarioSaida is null && horarioAtual > entradaSaida.Horario?.HorarioSaida.AddMinutes(30))
                    {
                        foreach (var responsavel in entradaSaida.Responsaveis!)
                        {
                            _logger.LogInformation($"Aluno {entradaSaida.AlunoId} não saiu na escola {dataAtual.ToString()}.");
                            await _whatsappService.EnviarMensagemAsync(
                                $"Seu filho {entradaSaida.Nome} ainda não saiu da escola.",
                                responsavel.Pessoa?.Nome!,
                                responsavel.Pessoa?.Telefone!);
                            await _emailService.SendEmailAsync(responsavel.Pessoa?.Email!, "Seu filho ainda não saiu da escola", $"Seu filho {entradaSaida.Nome} ainda não saiu da escola.");
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao verificar entradas e saídas.");
            }                      
        }
    }
}
