import mongoose from "mongoose";

type proceso = {
    estado: "En proceso" |"Listo" | "Cancelado" | "Pagado"

}
const mesaSchema = new mongoose.Schema({
    numero:{
        type: String,
        unique: true,
        required: true
    },
    estado:{
        type:Boolean,
        default: true
    }
})


export default mongoose.model("Mesa",mesaSchema)


