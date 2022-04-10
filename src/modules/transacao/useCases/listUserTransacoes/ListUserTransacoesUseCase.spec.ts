import { ChavesRepositoryInMemory } from "../../../chave/repositories/in-memory/ChavesRepositoryInMemory";
import { UsersRepositoryInMemory } from "../../../user/repositories/in-memory/UsersRepositoryInMemory";
import { TransacoesRepositoryInMemory } from "../../repositories/in-memory/TransacoesRepositoryInMemory";
import { CreateUserUseCase } from "../../../user/useCases/createUser/CreateUserUseCase";
import { CreateChaveUseCase } from "../../../chave/useCases/createChave/CreateChaveUseCase";
import { CreateTransacaoUseCase } from "../createTransacao/CreateTransacaoUseCase";
import { ListUserTransacoesUseCase } from "./ListUserTransacoesUseCase";

let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

let createChaveUseCase: CreateChaveUseCase;
let chavesRepositoryInMemory: ChavesRepositoryInMemory;

let createTransacaoUseCase: CreateTransacaoUseCase;
let listUserTransacoesUseCase: ListUserTransacoesUseCase;
let transacoesRepositoryInMemory: TransacoesRepositoryInMemory;

describe("Listar as transações do usuário q enviou o PIX", () => {
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

    listUserTransacoesUseCase = new ListUserTransacoesUseCase(
      transacoesRepositoryInMemory
    );
  });

  it("deve ser capaz de listar as transações do usuário a partir de seu id", async () => {
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

    const userTransacoes = await listUserTransacoesUseCase.execute(
      userCreated1.id
    );

    expect(userTransacoes).toBeInstanceOf(Array);
  });

  it("se o id de usuário estiver errado deve ser uma lista vazia", async () => {
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

    const userTransacoes = await listUserTransacoesUseCase.execute(
      "ca5b2a6c-c4cd-4e23-8838-deff6faf1124" // um uuid aleatório
    );

    expect(userTransacoes.length).toBe(0);
  });
});
