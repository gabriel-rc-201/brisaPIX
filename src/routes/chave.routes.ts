import { Router } from "express";
import { CreateChaveController } from "modules/chaves/useCases/createChave/CreateChaveController";

const chaveRoutes = Router();

const createChaveController = new CreateChaveController();

chaveRoutes.post("/", createChaveController.handle);

export { chaveRoutes };
