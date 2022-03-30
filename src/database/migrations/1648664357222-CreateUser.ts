import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUser1648664357222 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          { name: "id", type: "uuid", isPrimary: true },
          { name: "nome", type: "varchar" },
          { name: "email", type: "varchar" },
          { name: "telefone", type: "varchar" },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
