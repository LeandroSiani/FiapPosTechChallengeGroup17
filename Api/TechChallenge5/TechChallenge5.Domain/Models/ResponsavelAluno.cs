using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TechChallenge5.Domain.Models
{
    public class ResponsavelAluno
    {
        public Aluno Aluno { get; set; }
        public int AlunoId { get; set; }
        public Responsavel Responsavel { get; set; }
        public int ResponsavelId { get; set; }
    }
}
