import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../entities/User";

interface IUserRepository {
  create(data: ICreateUserDTO): Promise<void>;
  list(): Promise<User[]>;
}

export { IUserRepository };
