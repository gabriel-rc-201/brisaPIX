import { inject, injectable } from "tsyringe";

import { ITransacoesRepository } from "../../repositories/ITransacoesRepository";
import { IChavesRepository } from "modules/chave/repositories/IChavesRepository";

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

    const user_reciever_id = (
      await this.chavesRepository.findChaveByKey(user_sender_chave)
    ).user_id;

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
