import { Router, Request, Response } from "express";

import { CreateTransacaoController } from "modules/transacao/useCases/createTransacao/CreateTransacaoController";
import { ListUserTransacoesController } from "modules/transacao/useCases/listUserTransacoes/ListUserTransacoesController";

const transacaoRoutes = Router();

const createTransacaoController = new CreateTransacaoController();
const listUserTransacoesController = new ListUserTransacoesController();

transacaoRoutes.post("/", createTransacaoController.handle);
transacaoRoutes.get("/hello", (req: Request, res: Response) => {
  return res.status(200).json({ message: "hello from transação" });
});
transacaoRoutes.get("/:uuid", listUserTransacoesController.handle);

export { transacaoRoutes };
