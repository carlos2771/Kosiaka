import Router from "express"
import { createComida, getComidas } from "../controllers/comida.controller";

const router = Router();

router.get("/comidas",getComidas)
router.post("/comidas",createComida)


export default router