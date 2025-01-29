using System.Text.Json.Serialization;

namespace TechChallenge5.Domain.Models
{
    public class Aluno
    {
        public Aluno( )
        {
            ResponsavelAlunos = new List<ResponsavelAluno>();
        }

        public int Id { get; set; }
        public Pessoa? Pessoa { get; set; }
        public int PessoaId { get; set; }
        public bool Ativo { get; set; }
        public int HorarioId { get; set; }
        public Horario Horario { get; set; }
        [JsonIgnore]
        public List<ResponsavelAluno> ResponsavelAlunos { get; set; }
    }
}
