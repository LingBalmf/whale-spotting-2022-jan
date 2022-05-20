using Microsoft.EntityFrameworkCore.Migrations;

namespace WhaleSpotting.Migrations
{
    public partial class addSpeciesIdToWhales : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Whales_Species_SpeciesId",
                table: "Whales");

            migrationBuilder.AlterColumn<int>(
                name: "SpeciesId",
                table: "Whales",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Whales_Species_SpeciesId",
                table: "Whales",
                column: "SpeciesId",
                principalTable: "Species",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Whales_Species_SpeciesId",
                table: "Whales");

            migrationBuilder.AlterColumn<int>(
                name: "SpeciesId",
                table: "Whales",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddForeignKey(
                name: "FK_Whales_Species_SpeciesId",
                table: "Whales",
                column: "SpeciesId",
                principalTable: "Species",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
