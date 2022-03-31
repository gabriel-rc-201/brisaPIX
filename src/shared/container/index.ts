import { container } from "tsyringe";

import { IUserRepository } from "modules/user/repositories/IUsersRepository";
import { UsersRepository } from "modules/user/repositories/implementations/UsersRepository";

container.registerSingleton<IUserRepository>(
  "UsersRepository",
  UsersRepository
);
