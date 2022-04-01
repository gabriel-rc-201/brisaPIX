import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { User } from "../../user/entities/User";

@Entity("chaves")
class Chave {
  @PrimaryColumn()
  id?: string;

  @Column()
  key: string;

  @Column()
  user_id: string;

  @JoinColumn({ name: "user_id" })
  @ManyToOne(() => User)
  userId: User;

  constructor() {
    if (!this.id) this.id = uuidV4();
  }
}

export { Chave };
