import { Router, Request, Response } from "express";

import { CreateTransacaoController } from "modules/transacao/useCases/createTransacao/CreateTransacaoController";

const transacaoRoutes = Router();

const createTransacaoController = new CreateTransacaoController();

transacaoRoutes.post("/", createTransacaoController.handle);

transacaoRoutes.get("/hello", (req: Request, res: Response) => {
  return res.status(200).json({ message: "hello from transação" });
});

export { transacaoRoutes };
