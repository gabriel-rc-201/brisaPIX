import { Transacao } from "../../entities/Transacao";
import {
  ICreateTransacaoDTO,
  ITransacoesRepository,
} from "../ITransacoesRepository";

class TransacoesRepositoryInMemory implements ITransacoesRepository {
  transacoes: Transacao[] = [];

  async create({
    user_reciever_id,
    user_sender_id,
    valor,
    user_reciever_chave,
    user_sender_chave,
  }: ICreateTransacaoDTO): Promise<void> {
    const transacao = new Transacao();

    Object.assign(transacao, {
      user_reciever_id,
      user_sender_id,
      valor,
      user_reciever_chave,
      user_sender_chave,
    });
    this.transacoes.push(transacao);
  }

  async listByUserSenderId(user_sender_id: string): Promise<Transacao[]> {
    const transacoes = this.transacoes.filter(
      (transacao) => transacao.user_sender_id === user_sender_id
    );
    return transacoes;
  }
}

export { TransacoesRepositoryInMemory };
