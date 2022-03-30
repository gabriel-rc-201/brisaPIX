import { Request, Response, Router } from "express";

const userRoutes = Router();

userRoutes.get("/", (req: Request, res: Response) => {
  return res.status(200).json("mensage: olá from user");
});

export { userRoutes };
