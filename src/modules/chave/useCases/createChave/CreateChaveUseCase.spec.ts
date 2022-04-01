import { AppError } from "../../../../errors/AppError";
import { ChavesRepositoryInMemory } from "../../../../modules/chave/repositories/in-memory/ChavesRepositoryInMemory";
import { UsersRepositoryInMemory } from "../../../user/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../../../user/useCases/createUser/CreateUserUseCase";
import { CreateChaveUseCase } from "./CreateChaveUseCase";

let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

let createChaveUseCase: CreateChaveUseCase;
let chavesRepositoryInMemory: ChavesRepositoryInMemory;

describe("criar chave PIX", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);

    chavesRepositoryInMemory = new ChavesRepositoryInMemory();
    createChaveUseCase = new CreateChaveUseCase(chavesRepositoryInMemory);
  });

  it("deve ser capaz de criar uma chava para um usuário existente", async () => {
    const user = {
      nome: "User Test",
      email: "test@email.test.com",
      telefone: "123456",
    };

    await createUserUseCase.execute({
      nome: user.nome,
      email: user.email,
      telefone: user.telefone,
    });

    const userCreated = await usersRepositoryInMemory.findByEmail(user.email);

    const chave = {
      key: "chave de teste",
      user_id: userCreated.id,
    };

    await createChaveUseCase.execute({
      key: chave.key,
      user_id: chave.user_id,
    });

    const chaveCreated = await chavesRepositoryInMemory.findChaveByKey(
      chave.key
    );

    expect(chaveCreated).toHaveProperty("id");
  });

  it("não deve ser capaz de criar duas chaves com o mesmo valor de key", async () => {
    expect(async () => {
      const user = {
        nome: "User Test",
        email: "test@email.test.com",
        telefone: "123456",
      };

      await createUserUseCase.execute({
        nome: user.nome,
        email: user.email,
        telefone: user.telefone,
      });

      const userCreated = await usersRepositoryInMemory.findByEmail(user.email);

      const chave = {
        key: "chave de teste",
        user_id: userCreated.id,
      };

      await createChaveUseCase.execute({
        key: chave.key,
        user_id: chave.user_id,
      });
      await createChaveUseCase.execute({
        key: chave.key,
        user_id: chave.user_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("o usuário não pode ter mais do que três chaves", async () => {
    expect(async () => {
      const user = {
        nome: "User Test",
        email: "test@email.test.com",
        telefone: "123456",
      };

      await createUserUseCase.execute({
        nome: user.nome,
        email: user.email,
        telefone: user.telefone,
      });

      const userCreated = await usersRepositoryInMemory.findByEmail(user.email);

      const chave1 = {
        key: "chave de teste",
        user_id: userCreated.id,
      };
      await createChaveUseCase.execute({
        key: chave1.key,
        user_id: chave1.user_id,
      });

      const chave2 = {
        key: "chave de teste 2",
        user_id: userCreated.id,
      };
      await createChaveUseCase.execute({
        key: chave2.key,
        user_id: chave2.user_id,
      });

      const chave3 = {
        key: "chave de teste 3",
        user_id: userCreated.id,
      };
      await createChaveUseCase.execute({
        key: chave3.key,
        user_id: chave3.user_id,
      });

      const chave4 = {
        key: "chave de teste 4",
        user_id: userCreated.id,
      };
      await createChaveUseCase.execute({
        key: chave4.key,
        user_id: chave4.user_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
