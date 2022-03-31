import { Transacao } from "modules/transacao/entities/Transacao";
import { getRepository, Repository } from "typeorm";
import {
  ICreateTransacaoDTO,
  ITransacoesRepository,
} from "../ITransacoesRepository";

class TransacoesRepository implements ITransacoesRepository {
  private repository: Repository<Transacao>;

  constructor() {
    this.repository = getRepository(Transacao);
  }

  async create({
    id,
    user_reciever_id,
    user_sender_id,
    valor,
    user_reciever_chave,
    user_sender_chave,
  }: ICreateTransacaoDTO): Promise<void> {
    const transacao = this.repository.create({
      id,
      user_sender_id,
      user_sender_chave,
      user_reciever_id,
      user_reciever_chave,
      valor,
    });

    await this.repository.save(transacao);
  }

  async listByUserSenderId(user_sender_id: string): Promise<Transacao[]> {
    const transacoes = await this.repository.find({ user_sender_id });
    return transacoes;
  }
}

export { TransacoesRepository };
