import { inject, injectable } from "tsyringe";

import { IUserRepository } from "modules/user/repositories/IUsersRepository";
import { ICreateUserDTO } from "modules/user/dtos/ICreateUserDTO";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUserRepository
  ) {}

  async execute({ nome, email, telefone }: ICreateUserDTO): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) throw new Error("O usuário já está registrado!!!");

    await this.usersRepository.create({ nome, email, telefone });
  }
}

export { CreateUserUseCase };
