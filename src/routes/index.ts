import { Router } from "express";

import { chaveRoutes } from "./chave.routes";
import { userRoutes } from "./user.routes";

const router = Router();

router.use("/user", userRoutes);
router.use("/chave", chaveRoutes);

export { router };
