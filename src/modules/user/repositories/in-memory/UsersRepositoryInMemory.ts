import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUserRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUserRepository {
  users: User[] = [];

  async create({ nome, email, telefone }: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, { nome, email, telefone });
    this.users.push(user);
  }

  async list(): Promise<User[]> {
    const users = this.users;
    return users;
  }

  async findById(id: string): Promise<User> {
    const user = this.users.find((user) => user.id === id);
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email);
    return user;
  }
}

export { UsersRepositoryInMemory };
