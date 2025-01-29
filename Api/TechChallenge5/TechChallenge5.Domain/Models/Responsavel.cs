using System.Text.Json.Serialization;

namespace TechChallenge5.Domain.Models
{
    public class Responsavel
    {
        public Responsavel()
        {
            ResponsavelAlunos = new List<ResponsavelAluno>();
        }

        public int Id { get; set; }
        public Pessoa? Pessoa { get; set; }
        public int PessoaId { get; set; }        
        public bool Ativo { get; set; }
        [JsonIgnore]
        public List<ResponsavelAluno> ResponsavelAlunos { get; set; }
    }
}
