using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TechChallenge5.Domain.Models
{
    public class Professor
    {
        public int Id { get; set; }
        public Pessoa Pessoa { get; set; }
        public int PessoaId { get; set; }
        public bool Ativo { get; set; }
    }
}
