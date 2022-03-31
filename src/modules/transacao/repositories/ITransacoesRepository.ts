import { Transacao } from "../entities/Transacao";

interface ICreateTransacaoDTO {
  id?: string;
  user_sender_id: string;
  user_reciever_id: string;
  valor: number;
  user_sender_chave: string;
  user_reciever_chave: string;
}

interface ITransacoesRepository {
  create(data: ICreateTransacaoDTO): Promise<void>;
  listByUserSenderId(user_sender_id: string): Promise<Transacao[]>;
}

export { ITransacoesRepository, ICreateTransacaoDTO };
