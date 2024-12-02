import Mesa from "../models/mesa";


export const getMesas = async(req: any, res: any) => {

   try {
     const mesas = await Mesa.find()
     console.log(typeof mesas);
     
     if(mesas.length === 0){
         return res.status(400).json({msg: "no existen mesas aun"})
        }
        return res.status(200).json({mesas})
    } catch (error) {
        console.log("error en las mesas", error);
        return res.status(400).json({msg: error})
    
   }
}

export const createMesas = async(req: any, res: any ) => {
   
    try {
     const mesa: string = req.body  

     const findNumero = await Mesa.findOne({numero:  req.body.numero})

     if(findNumero){
        return res.status(400).json({msg: "Ya hay una mesa con ese numero"})
     }

     const newMesa = new Mesa(mesa)
     await newMesa.save()
     return res.status(200).json(newMesa)
   } catch (error) {
    return res.status(400).json(error)
   }
}