import { Router } from "express";
import { createPedido, getPedido, updatePedido } from "../controllers/pedido.controller";
import { special } from "../controllers/special.controller";
import passport from "passport";
import { hasRoles } from "../middlewares/verifyRole";
const router = Router()

// router.get("/pedidos",[passport.authenticate("jwt", { session: false }),hasRoles(["admin", "user", "moderador"]),],getPedido);

router.get("/pedidos",getPedido);
router.post("/pedidos",createPedido);
router.put("/pedidos/:id",updatePedido);

export default router;