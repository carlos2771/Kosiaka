import mongoose, { Schema } from "mongoose";

interface IPedido {
    codigo: string;
    mesa: object;
    user: object;
    comida: object[];
    descripcion: string;
    estado: string;
    metodoPago: string;
    imagen: string;
    totalPedido: number;

}


const pedidoSchema = new mongoose.Schema<IPedido>({

    codigo:{
        type: String,
        unique: true
    },
    mesa: {
        type: Schema.Types.ObjectId,
        ref : "Mesa",
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref : "User",
        required: true
    },
    comida: [{
        type: Schema.Types.ObjectId,
        ref : "Comida",
        required: true
    }],
    descripcion:{
        type: String,
        requeried: true
    },
    estado:{
        type:String,
        default: "En proceso"
    },
    metodoPago:{
        type: String,
        required: true
    },
    imagen:{
        type: String
    },
    totalPedido:{
        type: Number,
        // required: true
    }
},{
    timestamps: true
})

export default mongoose.model<IPedido>("Pedido", pedidoSchema);




