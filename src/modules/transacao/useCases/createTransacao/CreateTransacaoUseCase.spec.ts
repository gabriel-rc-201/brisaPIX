import { ChavesRepositoryInMemory } from "../../../../modules/chave/repositories/in-memory/ChavesRepositoryInMemory";
import { UsersRepositoryInMemory } from "../../../user/repositories/in-memory/UsersRepositoryInMemory";
import { TransacoesRepositoryInMemory } from "../../repositories/in-memory/TransacoesRepositoryInMemory";
import { CreateUserUseCase } from "../../../user/useCases/createUser/CreateUserUseCase";
import { CreateChaveUseCase } from "../../../chave/useCases/createChave/CreateChaveUseCase";
import { CreateTransacaoUseCase } from "./CreateTransacaoUseCase";
import { AppError } from "../../../../errors/AppError";

let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

let createChaveUseCase: CreateChaveUseCase;
let chavesRepositoryInMemory: ChavesRepositoryInMemory;

let createTransacaoUseCase: CreateTransacaoUseCase;
let transacoesRepositoryInMemory: TransacoesRepositoryInMemory;

describe("Criar Transações entre usuários", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);

    chavesRepositoryInMemory = new ChavesRepositoryInMemory();
    createChaveUseCase = new CreateChaveUseCase(chavesRepositoryInMemory);

    transacoesRepositoryInMemory = new TransacoesRepositoryInMemory();
    createTransacaoUseCase = new CreateTransacaoUseCase(
      transacoesRepositoryInMemory,
      chavesRepositoryInMemory,
      usersRepositoryInMemory
    );
  });

  it("deve ser capaz de realizar transações entre dois usuários existentes a partir de suas chaves PIX", async () => {
    const user1 = {
      nome: "User Test 1",
      email: "test1@email.test.com",
      telefone: "123456",
    };

    await createUserUseCase.execute({
      nome: user1.nome,
      email: user1.email,
      telefone: user1.telefone,
    });

    const userCreated1 = await usersRepositoryInMemory.findByEmail(user1.email);

    const chave1 = {
      key: "chave de teste",
      user_id: userCreated1.id,
    };

    await createChaveUseCase.execute({
      key: chave1.key,
      user_id: chave1.user_id,
    });

    const chaveCreated1 = await chavesRepositoryInMemory.findChaveByKey(
      chave1.key
    );

    const user2 = {
      nome: "User Test 2",
      email: "test2@email.test.com",
      telefone: "123456",
    };

    await createUserUseCase.execute({
      nome: user2.nome,
      email: user2.email,
      telefone: user2.telefone,
    });

    const userCreated2 = await usersRepositoryInMemory.findByEmail(user2.email);

    const chave2 = {
      key: "chave de teste 2",
      user_id: userCreated2.id,
    };

    await createChaveUseCase.execute({
      key: chave2.key,
      user_id: chave2.user_id,
    });

    const chaveCreated2 = await chavesRepositoryInMemory.findChaveByKey(
      chave2.key
    );

    const transacao = {
      user_sender_chave: chaveCreated1.key,
      user_reciever_chave: chaveCreated2.key,
      valor: 50.25,
    };

    await createTransacaoUseCase.execute(transacao);
    const transacoesCreated =
      await transacoesRepositoryInMemory.listByUserSenderId(userCreated1.id);

    const transacaoCreated = transacoesCreated[0];

    expect(transacaoCreated).toHaveProperty("id");
  });

  it("não deve ser capar de realizar uma transação com a chave de user_sender errada", async () => {
    expect(async () => {
      const user1 = {
        nome: "User Test 1",
        email: "test1@email.test.com",
        telefone: "123456",
      };

      await createUserUseCase.execute({
        nome: user1.nome,
        email: user1.email,
        telefone: user1.telefone,
      });

      const userCreated1 = await usersRepositoryInMemory.findByEmail(
        user1.email
      );

      const chave1 = {
        key: "chave de teste",
        user_id: userCreated1.id,
      };

      await createChaveUseCase.execute({
        key: chave1.key,
        user_id: chave1.user_id,
      });

      const chaveCreated1 = await chavesRepositoryInMemory.findChaveByKey(
        chave1.key
      );

      const user2 = {
        nome: "User Test 2",
        email: "test2@email.test.com",
        telefone: "123456",
      };

      await createUserUseCase.execute({
        nome: user2.nome,
        email: user2.email,
        telefone: user2.telefone,
      });

      const userCreated2 = await usersRepositoryInMemory.findByEmail(
        user2.email
      );

      const chave2 = {
        key: "chave de teste 2",
        user_id: userCreated2.id,
      };

      await createChaveUseCase.execute({
        key: chave2.key,
        user_id: chave2.user_id,
      });

      const chaveCreated2 = await chavesRepositoryInMemory.findChaveByKey(
        chave2.key
      );

      const transacao = {
        user_sender_chave: "chave errada",
        user_reciever_chave: chaveCreated2.key,
        valor: 50.25,
      };

      await createTransacaoUseCase.execute(transacao);
    }).rejects.toBeInstanceOf(AppError);
  });

  it("não deve ser capar de realizar uma transação com a chave de user_reciever errada", async () => {
    expect(async () => {
      const user1 = {
        nome: "User Test 1",
        email: "test1@email.test.com",
        telefone: "123456",
      };

      await createUserUseCase.execute({
        nome: user1.nome,
        email: user1.email,
        telefone: user1.telefone,
      });

      const userCreated1 = await usersRepositoryInMemory.findByEmail(
        user1.email
      );

      const chave1 = {
        key: "chave de teste",
        user_id: userCreated1.id,
      };

      await createChaveUseCase.execute({
        key: chave1.key,
        user_id: chave1.user_id,
      });

      const chaveCreated1 = await chavesRepositoryInMemory.findChaveByKey(
        chave1.key
      );

      const user2 = {
        nome: "User Test 2",
        email: "test2@email.test.com",
        telefone: "123456",
      };

      await createUserUseCase.execute({
        nome: user2.nome,
        email: user2.email,
        telefone: user2.telefone,
      });

      const userCreated2 = await usersRepositoryInMemory.findByEmail(
        user2.email
      );

      const chave2 = {
        key: "chave de teste 2",
        user_id: userCreated2.id,
      };

      await createChaveUseCase.execute({
        key: chave2.key,
        user_id: chave2.user_id,
      });

      const chaveCreated2 = await chavesRepositoryInMemory.findChaveByKey(
        chave2.key
      );

      const transacao = {
        user_sender_chave: chaveCreated1.key,
        user_reciever_chave: "chave errada",
        valor: 50.25,
      };

      await createTransacaoUseCase.execute(transacao);
    }).rejects.toBeInstanceOf(AppError);
  });
});
