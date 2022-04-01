import { Chave } from "../../entities/Chave";
import { IChavesRepository, ICreateChaveDTO } from "../IChavesRepository";

class ChavesRepositoryInMemory implements IChavesRepository {
  chaves: Chave[] = [];

  async create({ key, user_id }: ICreateChaveDTO): Promise<void> {
    const chave = new Chave();

    Object.assign(chave, { key, user_id });
    this.chaves.push(chave);
  }

  async findChaveByUser(user_id: string): Promise<[Chave[], number]> {
    const chaves = this.chaves.filter((chave) => chave.user_id === user_id);
    const chavesQtd = chaves.length;

    const chave: [Chave[], number] = [chaves, chavesQtd];
    return chave;
  }

  async findChaveByKey(key: string): Promise<Chave> {
    const chave = this.chaves.find((chave) => chave.key === key);
    return chave;
  }

  async list(): Promise<Chave[]> {
    const chaves = this.chaves;
    return chaves;
  }
}

export { ChavesRepositoryInMemory };
