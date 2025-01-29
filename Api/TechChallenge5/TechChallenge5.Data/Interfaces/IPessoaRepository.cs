using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TechChallenge5.Domain.Models;

namespace TechChallenge5.Data.Interfaces
{
    public interface IPessoaRepository : IRepository<Pessoa>
    {
        Pessoa GetByCpf(string cpf);
    }
}
