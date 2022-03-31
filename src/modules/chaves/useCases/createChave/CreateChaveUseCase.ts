import { inject, injectable } from "tsyringe";

import {
  IChavesRepository,
  ICreateChaveDTO,
} from "modules/chaves/repositories/IChavesRepository";

@injectable()
class CreateChaveUseCase {
  constructor(
    @inject("ChavesRepository")
    private chavesRepository: IChavesRepository
  ) {}

  async execute({ key, user_id }: ICreateChaveDTO): Promise<void> {
    const chaveAlreadyExists = await this.chavesRepository.findChaveByKey(key);

    if (chaveAlreadyExists) throw new Error("chave ja está cadastrada!!!");

    const chavesNumbers = await this.chavesRepository.findChaveByUser(user_id);

    if (chavesNumbers[1] === 3)
      throw new Error(
        "número máximo de chaves alcançada, este usuário não pode mais cadastrar nem uma chave"
      );

    await this.chavesRepository.create({ key, user_id });
  }
}

export { CreateChaveUseCase };
