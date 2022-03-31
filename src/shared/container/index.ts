import { container } from "tsyringe";

import { IUserRepository } from "modules/user/repositories/IUsersRepository";
import { UsersRepository } from "modules/user/repositories/implementations/UsersRepository";
import { IChavesRepository } from "modules/chave/repositories/IChavesRepository";
import { ChavesRepository } from "modules/chave/repositories/implementations/ChavesRepository";

container.registerSingleton<IUserRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IChavesRepository>(
  "ChavesRepository",
  ChavesRepository
);
