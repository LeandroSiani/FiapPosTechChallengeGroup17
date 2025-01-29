using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TechChallenge5.Data.Migrations
{
    /// <inheritdoc />
    public partial class Add_CPF_ISUNIQUE : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Pessoas_Cpf",
                table: "Pessoas",
                column: "Cpf",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Pessoas_Cpf",
                table: "Pessoas");
        }
    }
}
