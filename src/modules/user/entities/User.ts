import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("users")
class User {
  @PrimaryColumn()
  id?: string;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  telefone: string;

  constructor() {
    if (!this.id) this.id = uuidV4();
  }
}

export { User };
