import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateChaveUseCase } from "./CreateChaveUseCase";

class CreateChaveController {
  async handle(req: Request, res: Response) {
    const { key, user_id } = req.body;
    const createUserUseCase = container.resolve(CreateChaveUseCase);

    await createUserUseCase.execute({ key, user_id });

    return res.status(201).send();
  }
}

export { CreateChaveController };
