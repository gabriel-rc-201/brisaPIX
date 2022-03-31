import { Trasacao } from "../entities/Trasacao";

interface ICreateTrasacaoDTO {
  id?: string;
  user_sender_id: string;
  user_reciever_id: string;
  valor: number;
}

interface ITrasacoesRepository {
  create(data: ICreateTrasacaoDTO): Promise<void>;
  listByUserSenderId({ user_sender_id: string }): Promise<Trasacao[]>;
}
