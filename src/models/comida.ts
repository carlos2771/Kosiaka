import mongoose from "mongoose";

interface IComida {
    nombre: string;
    precio: number;
    categoria: String; // por el momento mientras creo la nueva coleccion para hacer referencia
    estado: boolean;

}

const comidaSchema = new mongoose.Schema<IComida>({
    nombre: {
        type: String,
        required: true
    },
    precio:{
        type: Number,
        required: true
    },
    categoria:{
        type: String,
        required: true
    },
    estado:{
      type: Boolean,
      default: true  
    }
})

export default mongoose.model<IComida>("Comida", comidaSchema)