import { getRepository, Repository } from "typeorm";

import { Chave } from "modules/chave/entities/Chave";
import { IChavesRepository, ICreateChaveDTO } from "../IChavesRepository";

class ChavesRepository implements IChavesRepository {
  private repository: Repository<Chave>;

  constructor() {
    console.log("entrei no constructor");
    this.repository = getRepository(Chave);
    console.log(this.repository);
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
