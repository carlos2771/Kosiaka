import Router from "express"
import { createMesas, deleteMesa, getMesa, getMesas, updateMesa } from "../controllers/mesa.controller"

const router = Router()

router.get("/mesas", getMesas )
router.get("/mesa/:id", getMesa )
router.post("/mesas", createMesas )
router.put("/mesa/:id", updateMesa )
router.delete("/mesa/:id", deleteMesa)


export default router;