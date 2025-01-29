using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace TechChallenge5.Data.Migrations
{
    /// <inheritdoc />
    public partial class Alter_Aluno_Adicionado_Horario : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HorarioEntrada",
                table: "Alunos");

            migrationBuilder.DropColumn(
                name: "HorarioSaida",
                table: "Alunos");

            migrationBuilder.AddColumn<int>(
                name: "HorarioId",
                table: "Alunos",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Horarios",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Descricao = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    HorarioEntrada = table.Column<TimeOnly>(type: "time", nullable: false),
                    HorarioSaida = table.Column<TimeOnly>(type: "time", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Horarios", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Alunos_HorarioId",
                table: "Alunos",
                column: "HorarioId");

            migrationBuilder.AddForeignKey(
                name: "FK_Alunos_Horarios_HorarioId",
                table: "Alunos",
                column: "HorarioId",
                principalTable: "Horarios",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Alunos_Horarios_HorarioId",
                table: "Alunos");

            migrationBuilder.DropTable(
                name: "Horarios");

            migrationBuilder.DropIndex(
                name: "IX_Alunos_HorarioId",
                table: "Alunos");

            migrationBuilder.DropColumn(
                name: "HorarioId",
                table: "Alunos");

            migrationBuilder.AddColumn<TimeOnly>(
                name: "HorarioEntrada",
                table: "Alunos",
                type: "time",
                nullable: false,
                defaultValue: new TimeOnly(0, 0, 0));

            migrationBuilder.AddColumn<TimeOnly>(
                name: "HorarioSaida",
                table: "Alunos",
                type: "time",
                nullable: false,
                defaultValue: new TimeOnly(0, 0, 0));
        }
    }
}
