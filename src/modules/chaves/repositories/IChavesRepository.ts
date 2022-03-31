import { Chave } from "../entities/Chaves";

interface ICreateChaveDTO {
  id?: string;
  key: string;
  userId: string;
}

interface IChavesRepository {
  create(data: ICreateChaveDTO): Promise<void>;
  findChaveByUser(userId: string): Promise<Chave[]>;
  findChaveByKey(key: string): Promise<Chave>;
  list(): Promise<Chave>;
}

export { IChavesRepository };
