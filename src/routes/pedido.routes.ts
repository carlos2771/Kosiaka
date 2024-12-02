import { Router } from "express";
import { createPedido, getPedido } from "../controllers/pedido.controller";
import { special } from "../controllers/special.controller";
import passport from "passport";
import { hasRoles } from "../middlewares/verifyRole";
const router = Router()

router.get("/pedidos",[passport.authenticate("jwt", { session: false }),hasRoles(["admin", "user", "moderador"]),],getPedido);

router.post("/pedidos",createPedido)
export default router;