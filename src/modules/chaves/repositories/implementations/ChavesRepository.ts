import { getRepository, Repository } from "typeorm";

import { Chave } from "modules/chaves/entities/Chaves";
import { IChavesRepository, ICreateChaveDTO } from "../IChavesRepository";

class ChavesRepository implements IChavesRepository {
  private repository: Repository<Chave>;

  constructor() {
    this.repository = getRepository(Chave);
  }

  async create({ id, key, user_id }: ICreateChaveDTO): Promise<void> {
    const chave = this.repository.create({ id, key, user_id });
    await this.repository.save(chave);
  }

  async findChaveByUser(user_id: string): Promise<[Chave[], number]> {
    const chaves = await this.repository.findAndCount({ user_id });
    return chaves;
  }

  async findChaveByKey(key: string): Promise<Chave> {
    const chave = await this.repository.findOne({ key });
    return chave;
  }

  async list(): Promise<Chave[]> {
    const chaves = await this.repository.find();
    return chaves;
  }
}

export { ChavesRepository };
