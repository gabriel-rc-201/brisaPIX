import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateTransacaoUseCase } from "./CreateTransacaoUseCase";

class CreateTransacaoController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { valor, user_sender_chave, user_reciever_chave } = req.body;
    const createTransacaoUseCase = container.resolve(CreateTransacaoUseCase);

    await createTransacaoUseCase.execute({
      valor,
      user_sender_chave,
      user_reciever_chave,
    });

    return res.status(201);
  }
}

export { CreateTransacaoController };
