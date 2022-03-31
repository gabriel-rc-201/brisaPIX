import { User } from "modules/user/entities/User";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("transacoes")
class Transacao {
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

  @CreateDateColumn()
  created_at: Date;

  @Column()
  user_sender_chave: string;

  @Column()
  user_reciever_chave: string;

  constructor() {
    if (!this.id) this.id = uuidV4();
  }
}

export { Transacao };
