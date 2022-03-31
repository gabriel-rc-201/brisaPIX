import { inject, injectable } from "tsyringe";

import { ITransacoesRepository } from "modules/transacao/repositories/ITransacoesRepository";

@injectable()
class ListUserTransacoesUseCase {
  constructor(
    @inject("TransacoesRepository")
    private transacoesRepository: ITransacoesRepository
  ) {}

  async execute(user_sender_id: string) {
    await this.transacoesRepository.listByUserSenderId(user_sender_id);
  }
}

export { ListUserTransacoesUseCase };
