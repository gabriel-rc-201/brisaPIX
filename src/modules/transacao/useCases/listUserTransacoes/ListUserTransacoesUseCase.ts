import { inject, injectable } from "tsyringe";

import { ITransacoesRepository } from "modules/transacao/repositories/ITransacoesRepository";
import { Transacao } from "modules/transacao/entities/Transacao";
import { AppError } from "errors/AppError";

@injectable()
class ListUserTransacoesUseCase {
  constructor(
    @inject("TransacoesRepository")
    private transacoesRepository: ITransacoesRepository
  ) {}

  async execute(user_sender_id: string): Promise<Transacao[]> {
    const transacoes = await this.transacoesRepository.listByUserSenderId(
      user_sender_id
    );

    return transacoes;
  }
}

export { ListUserTransacoesUseCase };
