import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTrasacao1648747013266 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "transacoes",
        columns: [
          { name: "id", type: "uuid", isPrimary: true },
          { name: "user_sender_id", type: "uuid" },
          { name: "user_reciever_id", type: "uuid" },
          { name: "valor", type: "float" },
        ],
        foreignKeys: [
          {
            name: "FKUserSender",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["user_sender_id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
          {
            name: "FKUserReciever",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["user_reciever_id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("transacoes");
  }
}
