import { User } from "modules/user/entities/User";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity("trasacoes")
class Trasacao {
  @PrimaryColumn()
  id?: string;

  @Column()
  user_sender_id: string;

  @JoinColumn({ name: "user_sender_id" })
  @ManyToOne(() => User)
  userSenderId: User;

  @Column()
  user_reciever_id: string;

  @JoinColumn({ name: "user_reciever_id" })
  @ManyToOne(() => User)
  userRecieverId: User;

  @Column()
  valor: number;
}

export { Trasacao };
