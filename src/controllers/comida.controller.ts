import Comida from "../models/comida";


export const getComidas = async(req: any, res:any) => {
    const comidas = await Comida.find()
    if(!comidas){
        res.status(400).json({msg: "No existen comidas aun"})
    }
    res.status(200).json(comidas)
}


export const createComida = async(req:any, res:any) =>{

   try {
     const comida = req.body
     if(!comida.nombre || !comida.precio || !comida.categoria){
         return res.status(400).json({msg: "debe ingresar todos los campos"})
     }
     const newComida = new Comida(comida)
     await newComida.save()
     return res.status(200).json(comida)
     
   } catch (error) {
    res.status(400).json(error)
   }


}