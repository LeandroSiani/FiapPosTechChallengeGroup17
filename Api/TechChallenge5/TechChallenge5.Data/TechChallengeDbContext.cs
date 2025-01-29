using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TechChallenge5.Domain.Models;
using TechChallenge5.Domain.Models.Identity;

namespace TechChallenge5.Data
{
    public class TechChallengeDbContext : IdentityDbContext<ApplicationUser, IdentityRole<int>, int>
    {
        public TechChallengeDbContext(DbContextOptions<TechChallengeDbContext> options) : base(options)
        {
        }
        public DbSet<Aluno> Alunos { get; set; }
        public DbSet<Professor> Professores { get; set; }
        public DbSet<ControleAcesso> ControleAcessos { get; set; }
        public DbSet<Responsavel> Responsaveis { get; set; }
        public DbSet<ResponsavelAluno> ResponsavelAlunos { get; set; }
        public DbSet<Pessoa> Pessoas { get; set; }
        public DbSet<Horario> Horarios { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Pessoa>();

            ConfigureAlunoEntity(modelBuilder);
            ConfigureProfessorEntity(modelBuilder);
            ConfigureResponsavelEntity(modelBuilder);
            ConfigureResponsavelAlunoEntity(modelBuilder);
            ConfigureControleAcessoEntity(modelBuilder);
            ConfigurePessoaEntity(modelBuilder);
            ConfigureHorarioEntity(modelBuilder);
        }

        private static void ConfigureControleAcessoEntity(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ControleAcesso>()
                            .HasOne(ca => ca.Aluno)
                            .WithMany()
                            .HasForeignKey(ca => ca.AlunoId);
        }

        private static void ConfigureProfessorEntity(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Professor>()
                            .HasOne(p => p.Pessoa)
                            .WithMany()
                            .HasForeignKey(p => p.PessoaId);
        }

        private static void ConfigureResponsavelAlunoEntity(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ResponsavelAluno>()
                            .HasKey(ra => new { ra.AlunoId, ra.ResponsavelId });

            modelBuilder.Entity<ResponsavelAluno>()
                .HasOne(ra => ra.Aluno)
                .WithMany(a => a.ResponsavelAlunos)
                .HasForeignKey(ra => ra.AlunoId);

            modelBuilder.Entity<ResponsavelAluno>()
                .HasOne(ra => ra.Responsavel)
                .WithMany(r => r.ResponsavelAlunos)
                .HasForeignKey(ra => ra.ResponsavelId);
        }

        private static void ConfigureHorarioEntity(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Horario>()
                            .Property(h => h.HorarioEntrada)
                            .HasColumnType("time")
                            .IsRequired();
            modelBuilder.Entity<Horario>()
                .Property(h => h.HorarioSaida)
                .HasColumnType("time")
                .IsRequired();
            modelBuilder.Entity<Horario>()
                .Property(h => h.Descricao)
                .HasMaxLength(100)
                .IsRequired();
        }

        private static void ConfigureResponsavelEntity(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Responsavel>()
                            .HasOne(r => r.Pessoa)
                            .WithMany()
                            .HasForeignKey(r => r.PessoaId);            
        }

        private static void ConfigurePessoaEntity(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Pessoa>(entity =>
            {
                entity.Property(p => p.Nome)
                    .HasMaxLength(50)
                    .IsRequired();

                entity.Property(p => p.Sobrenome)
                    .HasMaxLength(200)
                    .IsRequired();

                entity.HasIndex(p => p.Cpf)
                    .IsUnique();
                entity.Property(p => p.Cpf)
                    .HasMaxLength(11)
                    .IsRequired();                

                entity.Property(p => p.DataNascimento)
                    .HasColumnType("date")
                    .IsRequired();

                entity.Property(p => p.Telefone)
                    .HasMaxLength(20);

                entity.Property(p => p.Email)
                    .HasMaxLength(100);
            });
        }

        private static void ConfigureAlunoEntity(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Aluno>(entity =>
            {
                entity.HasOne(a => a.Pessoa)
                    .WithMany()
                    .HasForeignKey(a => a.PessoaId);                
                entity.Property(a => a.Ativo)
                    .IsRequired();
                entity.HasOne(a => a.Horario)
                    .WithMany()
                    .HasForeignKey(a => a.HorarioId);
            });
        }
    }
}
