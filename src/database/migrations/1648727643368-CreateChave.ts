import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateChave1648727643368 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "chaves",
        columns: [
          { name: "id", type: "uuid", isPrimary: true },
          { name: "key", type: "varchar" },
          { name: "user_id", type: "uuid" },
        ],
        foreignKeys: [
          {
            name: "FKUser",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["user_id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("chaves");
  }
}
