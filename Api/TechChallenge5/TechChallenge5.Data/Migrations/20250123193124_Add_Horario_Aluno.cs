using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TechChallenge5.Data.Migrations
{
    /// <inheritdoc />
    public partial class Add_Horario_Aluno : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HorarioEntrada",
                table: "Alunos");

            migrationBuilder.DropColumn(
                name: "HorarioSaida",
                table: "Alunos");
        }
    }
}
