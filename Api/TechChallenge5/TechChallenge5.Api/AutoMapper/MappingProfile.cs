using AutoMapper;
using TechChallenge5.Domain.Models;
using TechChallenge5.Domain.ViewModels;

namespace TechChallenge5.Api.AutoMapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Pessoa, AlunoViewModel>().ReverseMap();
            CreateMap<Aluno, AlunoViewModel>().ReverseMap();
            CreateMap<Pessoa, ResponsavelViewModel>().ReverseMap();
            CreateMap<Responsavel, ResponsavelViewModel>().ReverseMap();
            CreateMap<Pessoa, ProfessorViewModel>().ReverseMap();
            CreateMap<Professor, ResponsavelViewModel>().ReverseMap();
        }
    }
}
