import { inject, injectable } from "tsyringe";
import sendEmaiService from "services/sendEmaiService";
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
    const user_sender = await this.chavesRepository.findChaveByKey(
      user_reciever_chave
    );

    if (!user_sender)
      throw new AppError(
        "transação não autorizada, usuário não encontrado!!!",
        401
      );

    const user_reciever = await this.chavesRepository.findChaveByKey(
      user_sender_chave
    );

    if (!user_reciever)
      throw new AppError(
        "transação não autorizada, usuário não encontrado!!!",
        401
      );

    await this.transacoesRepository.create({
      valor,
      user_reciever_chave,
      user_reciever_id: user_reciever.user_id,
      user_sender_chave,
      user_sender_id: user_sender.user_id,
    });

    const sender = await this.usersRepository.findById(user_sender.user_id);

    const reciever = await this.usersRepository.findById(user_reciever.user_id);

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
  }
}

export { CreateTransacaoUseCase };
