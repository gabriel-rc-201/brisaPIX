import { Request, Response, Router } from "express";
import { CreateChaveController } from "modules/chave/useCases/createChave/CreateChaveController";

const chaveRoutes = Router();

const createChaveController = new CreateChaveController();

chaveRoutes.post("/", createChaveController.handle);
chaveRoutes.get("/hello", (req: Request, res: Response) => {
  return res.status(200).json({ message: "hello from chave" });
});

export { chaveRoutes };
