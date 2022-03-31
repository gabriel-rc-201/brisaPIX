import { Chave } from "../entities/Chave";

interface ICreateChaveDTO {
  id?: string;
  key: string;
  user_id: string;
}

interface IChavesRepository {
  create(data: ICreateChaveDTO): Promise<void>;
  findChaveByUser(user_id: string): Promise<[Chave[], number]>;
  findChaveByKey(key: string): Promise<Chave>;
  list(): Promise<Chave[]>;
}

export { IChavesRepository, ICreateChaveDTO };
