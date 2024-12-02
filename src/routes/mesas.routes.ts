import Router from "express"
import { createMesas, getMesas } from "../controllers/mesa.controller"

const router = Router()

router.get("/mesas", getMesas )
router.post("/mesas", createMesas )


export default router;