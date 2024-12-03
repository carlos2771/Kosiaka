import Mesa, { IMesa } from "../models/mesa";


export const getMesas = async(req: any, res: any) => {

   try {
     const mesas: IMesa[] = await Mesa.find()

     if(mesas.length === 0){
         return res.status(400).json({msg: "no existen mesas aun"})
        }

        return res.status(200).json(mesas)
    } catch (error) {
        return res.status(400).json({msg: error})
    
   }
}

export const createMesas = async(req: any, res: any ) => {
   
    try {
     const mesa:IMesa[] = req.body  

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

export const updateMesa = async (req: any, res: any) => {

   try {
      if (!req.params.id) {
         return res.status(400).json({ error: 'ID is required' });
      }
   
      
      if(!req.body.numero){
         return res.status(400).json({ msg: "Debe ingresar el numero de la mesa" });
      }
      
      const mesa = await Mesa.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!mesa) {
         return res.status(400).json({ msg: "No hay alguna mesa que actualizar" });
      }
      
      await mesa.save();
      return res.status(200).json(mesa);
   } catch (error) {
      return res.status(400).json({msg: error})
   }
};

export const deleteMesa = async(req:any, res: any) =>{

   try {
      console.log(req.params.id);
      
      const mesa = await Mesa.findByIdAndDelete(req.params.id)
      if(!mesa) {
         return res.status(400).json({msg: "debe ingresar una mesa"})
      }
      console.log("eliminada");
      
      return res.status(200).json(mesa)
   } catch (error) {
      return res.status(400).json({msg: error})
   }

}