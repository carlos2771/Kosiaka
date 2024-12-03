import Router from "express"
import { createMesas, deleteMesa, getMesas, updateMesa } from "../controllers/mesa.controller"

const router = Router()

router.get("/mesas", getMesas )
router.post("/mesas", createMesas )
router.put("/mesa/:id", updateMesa )
router.delete("/mesa/:id", deleteMesa)


export default router;