using AutoMapper;
using TechChallenge5.Api.AutoMapper;
using TechChallenge5.Data;
using TechChallenge5.Data.Interfaces;
using TechChallenge5.Services.ExternalServices;
using TechChallenge5.Services.InternalServices;

namespace TechChallenge5.Api.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddRepositories(this IServiceCollection services)
        {
            services.AddTransient<IPessoaRepository, PessoaRepository>();
            services.AddTransient<IAlunoRepository, AlunoRepository>();
            services.AddTransient<IProfessorRepository, ProfessorRepository>();
            services.AddTransient<IResponsavelRepository, ResponsavelRepository>();
            services.AddTransient<IResponsavelAlunoRepository, ResponsavelAlunoRepository>();
            services.AddTransient<IControleAcessoRepository, ControleAcessoRepository>();
            services.AddTransient<IHorarioRepository, HorarioRepository>();
            return services;
        }   
        public static void AddAutoMapper(this IServiceCollection services)
        {
            var mapperConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new MappingProfile());
            });
            IMapper mapper = mapperConfig.CreateMapper();
            services.AddSingleton(mapper);
        }

        public static IServiceCollection AddInternalServices(this IServiceCollection services)
        {
            services.AddScoped<IAlunoService, AlunoService>();
            services.AddScoped<IResponsavelService, ResponsavelService>();
            services.AddScoped<IControleAcessoService, ControleAcessoService>();
            services.AddScoped<IHorarioService, HorarioService>();
            services.AddScoped<IIdentityService, IdentityService>();
            return services;
        }

        public static IServiceCollection AddExternalServices(this IServiceCollection services)
        {

            services.AddScoped<IEmailService, EmailService>();
            services.AddScoped<IWhatsappService, WhatsappService>();            
            return services;
        }


    }
}
