import mongoose from "mongoose";

export interface IMesa {
    numero: string,
    estado: boolean
}

const mesaSchema = new mongoose.Schema<IMesa>({
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


export default mongoose.model<IMesa>("Mesa",mesaSchema)


