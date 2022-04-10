import { inject, injectable } from "tsyringe";
import sendEmaiService from "../../../../services/sendEmaiService";
import { resolve } from "path";

import { ITransacoesRepository } from "../../repositories/ITransacoesRepository";
import { IChavesRepository } from "modules/chave/repositories/IChavesRepository";
import { AppError } from "../../../../errors/AppError";
import { IUserRepository } from "modules/user/repositories/IUsersRepository";

interface IData {
  valor: number;
  user_sender_chave: string;
  user_reciever_chave: string;
}

@injectable()
class CreateTransacaoUseCase {
  constructor(
    @inject("TransacoesRepository")
    private transacoesRepository: ITransacoesRepository,

    @inject("ChavesRepository")
    private chavesRepository: IChavesRepository,

    @inject("UsersRepository")
    private usersRepository: IUserRepository
  ) {}

  async execute({
    valor,
    user_sender_chave,
    user_reciever_chave,
  }: IData): Promise<void> {
    const user_sender_key = await this.chavesRepository.findChaveByKey(
      user_sender_chave
    );

    if (!user_sender_key)
      throw new AppError(
        "transação não autorizada, chave não encontrada!!!",
        401
      );

    const user_reciever_key = await this.chavesRepository.findChaveByKey(
      user_reciever_chave
    );

    if (!user_reciever_key)
      throw new AppError(
        "transação não autorizada, chave não encontrada!!!",
        401
      );

    await this.transacoesRepository.create({
      valor,
      user_reciever_chave,
      user_reciever_id: user_reciever_key.user_id,
      user_sender_chave,
      user_sender_id: user_sender_key.user_id,
    });

    // envio de email
    // na hora de rodar os testes tem q comentar essa parte pq o constructor
    // do sendEmailService roda uma função assincrona que  não da para ser
    // executada durante os testes, visto que não podemos colocar async no
    // constructor de uma classe.

    const sender = await this.usersRepository.findById(user_sender_key.user_id);

    const reciever = await this.usersRepository.findById(
      user_reciever_key.user_id
    );

    const mailSender = resolve(
      __dirname,
      "..",
      "..",
      "..",
      "..",
      "views",
      "emails",
      "mailSender.hbs"
    );

    const mailReciever = resolve(
      __dirname,
      "..",
      "..",
      "..",
      "..",
      "views",
      "emails",
      "mailReciever.hbs"
    );

    // email to sender
    await sendEmaiService.execute(
      sender.email,
      "você enviou um pix usando BrisaPIX!!!",
      {
        name: sender.nome,
        valor,
        reciever: reciever.nome,
        date: Date(),
      },
      mailSender
    );

    // email to reciever
    await sendEmaiService.execute(
      reciever.email,
      "você recebeu um pix!!!",
      {
        name: reciever.nome,
        valor,
        sender: sender.nome,
        date: Date(),
      },
      mailReciever
    );

    // comentar até aqui
  }
}

export { CreateTransacaoUseCase };
