import { Router } from "express";

import { chaveRoutes } from "./chave.routes";
import { transacaoRoutes } from "./transacao.routes";
import { userRoutes } from "./user.routes";

const router = Router();

router.use("/user", userRoutes);
router.use("/chave", chaveRoutes);
router.use("/transacao", transacaoRoutes);

export { router };
