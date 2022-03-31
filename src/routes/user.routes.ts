import { Request, Response, Router } from "express";
import { CreateUserController } from "modules/user/useCases/createUser/CreateUserController";

const userRoutes = Router();

const createUserController = new CreateUserController();

userRoutes.post("/", createUserController.handle);

userRoutes.get("/hello", (req: Request, res: Response) => {
  return res.status(200).json({ mensage: "hello from user" });
});

export { userRoutes };
