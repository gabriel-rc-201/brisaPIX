import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "modules/user/dtos/ICreateUserDTO";
import { User } from "modules/user/entities/User";
import { IUserRepository } from "../IUsersRepository";

class UsersRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({ nome, email, telefone, id }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({ nome, email, telefone, id });

    await this.repository.save(user);
  }

  async list(): Promise<User[]> {
    const user = await this.repository.find();
    return user;
  }
}

export { UsersRepository };
