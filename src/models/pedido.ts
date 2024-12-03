import mongoose, { Schema } from "mongoose";


const pedidoSchema = new mongoose.Schema({

    codigo:{
        type: String,
        unique: true
    },
    mesa: {
        type: Schema.Types.ObjectId,
        ref : "mesas",
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref : "User",
        required: true
    },
    descripcion:{
        type: String,
        requeried: true
    },
    estado:{
        type:String,
        default: "En proceso"
    }
})

export default mongoose.model("Pedido", pedidoSchema);




