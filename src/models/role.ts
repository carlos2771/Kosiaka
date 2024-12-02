import mongoose, { model } from "mongoose";

const roleSchema = new mongoose.Schema(
    {
    name: String
    }, 
    {
    versionKey: false
    })

export default model("Role",roleSchema)