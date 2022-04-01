import { inject, injectable } from "tsyringe";

import { ITransacoesRepository } from "../../repositories/ITransacoesRepository";
import { IChavesRepository } from "modules/chave/repositories/IChavesRepository";
import { AppError } from "../../../../errors/AppError";

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
    private chavesRepository: IChavesRepository
  ) {}

  async execute({
    valor,
    user_sender_chave,
    user_reciever_chave,
  }: IData): Promise<void> {
    const user_sender_id = (
      await this.chavesRepository.findChaveByKey(user_reciever_chave)
    ).user_id;

    if (!user_sender_id)
      throw new AppError(
        "transação não autorizada, usuário não encontrado!!!",
        401
      );

    const user_reciever_id = (
      await this.chavesRepository.findChaveByKey(user_sender_chave)
    ).user_id;

    if (!user_reciever_id)
      throw new AppError(
        "transação não autorizada, usuário não encontrado!!!",
        401
      );

    await this.transacoesRepository.create({
      valor,
      user_reciever_chave,
      user_reciever_id,
      user_sender_chave,
      user_sender_id,
    });
  }
}

export { CreateTransacaoUseCase };
