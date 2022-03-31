import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterTransacaoAddData1648750953247 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "transacoes",
      new TableColumn({
        name: "created_at",
        type: "timestamp",
        default: "now()",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("transacoes", "created_at");
  }
}
