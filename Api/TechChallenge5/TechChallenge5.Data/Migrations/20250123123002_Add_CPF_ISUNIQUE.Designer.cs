﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using TechChallenge5.Data;

#nullable disable

namespace TechChallenge5.Data.Migrations
{
    [DbContext(typeof(TechChallengeDbContext))]
    [Migration("20250123123002_Add_CPF_ISUNIQUE")]
    partial class Add_CPF_ISUNIQUE
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("TechChallenge5.Domain.Models.Aluno", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<bool>("Ativo")
                        .HasColumnType("boolean");

                    b.Property<int>("PessoaId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("PessoaId");

                    b.ToTable("Alunos");
                });

            modelBuilder.Entity("TechChallenge5.Domain.Models.ControleAcesso", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("AlunoId")
                        .HasColumnType("integer");

                    b.Property<int>("ControleEntradaType")
                        .HasColumnType("integer");

                    b.Property<DateTime>("DataHora")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.HasIndex("AlunoId");

                    b.ToTable("ControleAcessos");
                });

            modelBuilder.Entity("TechChallenge5.Domain.Models.Pessoa", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Cpf")
                        .IsRequired()
                        .HasMaxLength(11)
                        .HasColumnType("character varying(11)");

                    b.Property<DateTime>("DataNascimento")
                        .HasColumnType("date");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.Property<string>("Sobrenome")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("character varying(200)");

                    b.HasKey("Id");

                    b.HasIndex("Cpf")
                        .IsUnique();

                    b.ToTable("Pessoas");
                });

            modelBuilder.Entity("TechChallenge5.Domain.Models.Professor", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<bool>("Ativo")
                        .HasColumnType("boolean");

                    b.Property<int>("PessoaId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("PessoaId");

                    b.ToTable("Professores");
                });

            modelBuilder.Entity("TechChallenge5.Domain.Models.Responsavel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<bool>("Ativo")
                        .HasColumnType("boolean");

                    b.Property<int>("PessoaId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("PessoaId");

                    b.ToTable("Responsaveis");
                });

            modelBuilder.Entity("TechChallenge5.Domain.Models.ResponsavelAluno", b =>
                {
                    b.Property<int>("AlunoId")
                        .HasColumnType("integer");

                    b.Property<int>("ResponsavelId")
                        .HasColumnType("integer");

                    b.HasKey("AlunoId", "ResponsavelId");

                    b.HasIndex("ResponsavelId");

                    b.ToTable("ResponsavelAlunos");
                });

            modelBuilder.Entity("TechChallenge5.Domain.Models.Aluno", b =>
                {
                    b.HasOne("TechChallenge5.Domain.Models.Pessoa", "Pessoa")
                        .WithMany()
                        .HasForeignKey("PessoaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Pessoa");
                });

            modelBuilder.Entity("TechChallenge5.Domain.Models.ControleAcesso", b =>
                {
                    b.HasOne("TechChallenge5.Domain.Models.Aluno", "Aluno")
                        .WithMany()
                        .HasForeignKey("AlunoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Aluno");
                });

            modelBuilder.Entity("TechChallenge5.Domain.Models.Professor", b =>
                {
                    b.HasOne("TechChallenge5.Domain.Models.Pessoa", "Pessoa")
                        .WithMany()
                        .HasForeignKey("PessoaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Pessoa");
                });

            modelBuilder.Entity("TechChallenge5.Domain.Models.Responsavel", b =>
                {
                    b.HasOne("TechChallenge5.Domain.Models.Pessoa", "Pessoa")
                        .WithMany()
                        .HasForeignKey("PessoaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Pessoa");
                });

            modelBuilder.Entity("TechChallenge5.Domain.Models.ResponsavelAluno", b =>
                {
                    b.HasOne("TechChallenge5.Domain.Models.Aluno", "Aluno")
                        .WithMany("ResponsavelAlunos")
                        .HasForeignKey("AlunoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("TechChallenge5.Domain.Models.Responsavel", "Responsavel")
                        .WithMany("ResponsavelAlunos")
                        .HasForeignKey("ResponsavelId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Aluno");

                    b.Navigation("Responsavel");
                });

            modelBuilder.Entity("TechChallenge5.Domain.Models.Aluno", b =>
                {
                    b.Navigation("ResponsavelAlunos");
                });

            modelBuilder.Entity("TechChallenge5.Domain.Models.Responsavel", b =>
                {
                    b.Navigation("ResponsavelAlunos");
                });
#pragma warning restore 612, 618
        }
    }
}
