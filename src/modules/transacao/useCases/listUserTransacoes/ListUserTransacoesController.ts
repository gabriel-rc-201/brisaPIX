import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListUserTransacoesUseCase } from "./ListUserTransacoesUseCase";

class ListUserTransacoesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { user_sender_id } = req.body;
    const listUserTransacoesUseCase = container.resolve(
      ListUserTransacoesUseCase
    );

    const transacoes = await listUserTransacoesUseCase.execute(user_sender_id);

    return res.status(200).json(transacoes);
  }
}

export { ListUserTransacoesController };
