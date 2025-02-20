﻿namespace TechChallenge5.Domain.DTO
{
    public class AlunoDTO
    {
        public int Id { get; set; }
        public string? Nome { get; set; }
        public string? Sobrenome { get; set; }
        public string? Cpf { get; set; }
        public string? Email { get; set; }
        public string? Telefone { get; set; }
        public DateTime DataNascimento { get; set; }
        public bool Ativo { get; set; }
        public List<ResponsavelDTO>? Responsaveis { get; set; }
    }
}
