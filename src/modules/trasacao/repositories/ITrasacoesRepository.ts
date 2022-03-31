import { Transacao } from "../entities/Transacao";

interface ICreateTrasacaoDTO {
  id?: string;
  user_sender_id: string;
  user_reciever_id: string;
  valor: number;
  user_sender_chave: string;
  user_reciever_chave: string;
}

interface ITrasacoesRepository {
  create(data: ICreateTrasacaoDTO): Promise<void>;
  listByUserSenderId(user_sender_id: string): Promise<Transacao[]>;
}

export { ITrasacoesRepository, ICreateTrasacaoDTO };
