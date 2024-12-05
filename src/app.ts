import  express  from "express";
import morgan from "morgan";
import cors from "cors"
import authRoutes from "./routes/auth.routes";
import passport from "passport";
import passportMiddlaware from "./middlewares/passpot"
import specialRoutes from "./routes/special.routes"
import { createRoles } from "./libs/initialSetup";
import pedidoRoutes from "./routes/pedido.routes"
import mesaRoutes from "./routes/mesas.routes"
import comidasRoutes from "./routes/comida.routes"

const app = express()
createRoles()


app.set("port", process.env.PORT || 3000)
app.use(morgan("dev"))
app.use(express.urlencoded({extended:false})) // leer datos enviados por un formulario
app.use(express.json())
app.use(passport.initialize())
passport.use(passportMiddlaware)

app.get("/", (req, res) => {
    res.send(`http://localhost:${app.get("port")}`)
})



app.use(mesaRoutes)
app.use(authRoutes)
app.use(specialRoutes)
app.use(pedidoRoutes)
app.use(comidasRoutes)

export default app