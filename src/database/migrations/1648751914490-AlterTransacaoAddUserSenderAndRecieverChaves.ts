import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterTransacaoAddUserSenderAndRecieverChaves1648751914490
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns("transacoes", [
      new TableColumn({ name: "user_sender_chave", type: "varchar" }),
      new TableColumn({ name: "user_reciever_chave", type: "varchar" }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns("transacoes", [
      "user_sender_chave",
      "user_reciever_chave",
    ]);
  }
}
