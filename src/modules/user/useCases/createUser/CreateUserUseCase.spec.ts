import { AppError } from "../../../../errors/AppError";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "./CreateUserUseCase";

let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe("Criate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("Deve ser capaz de criar um novo usuário", async () => {
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

    expect(userCreated).toHaveProperty("id");
  });

  it("Não deve ser capaz de criar dois usuários com mesmo email", async () => {
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

      await createUserUseCase.execute({
        nome: user.nome,
        email: user.email,
        telefone: user.telefone,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
