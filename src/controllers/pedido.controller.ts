import Pedido from "../models/pedido";
import random from "../libs/codeRandom"
import Mesa from "../models/mesa";
import User, { IUser } from "../models/user";
import Comida from "../models/comida";

export const getPedido = async(req: any, res: any) => {
    try {
        const pedido = await Pedido.find().populate({path:"user", select: "username"}).populate({path: "mesa", select : "numero"})
        if(!pedido){
            return res.status(400).json({msg: "No existen pedidos aun"})
        }
        return res.status(200).json(pedido)

    } catch (error) {
        console.log(error);
    }
}

export const createPedido = async(req: any, res: any) => {
    try {
        const status : string[] = ["En proceso" , "Revisado" , "Listo" , "Cancelado", "Pagado"]
        const pedidoStatus: string = req.body.estado

        if(pedidoStatus){
            const validateState: boolean = status.includes(req.body.estado)
            if(!validateState){
                return res.status(400).json({msg: "Estado no permitido, estados actuales: " + status.map((estado) => estado)})
            }
        }

        const disponivilityUser = await User.findById({_id: req.body.user})

        if(!disponivilityUser){
            return res.status(400).json({msg : "El usuario no existe"})
        }else if(disponivilityUser.estado === false){
            return res.status(400).json({msg: "El usuario no se encuentra disponible"})
        }


        const disponivilityTable = await Mesa.findOne({ _id:  req.body.mesa })

        if(!disponivilityTable?.estado){
            return res.status(400).json({msg: "la mesa esta ocupada" })
        }

        const total = await Comida.find({_id: req.body.comida})
        if(!total){
            return res.status(400).json({msg: "no hay total"})
        }
    
        
        const getTotals: number = total.map((t) => t.precio).reduce((acum,precio)=> { return acum + precio})
       console.log(getTotals);
        
        
        const newPedido = new Pedido(req.body)
        newPedido.totalPedido = getTotals
        if(newPedido){
            await Mesa.findByIdAndUpdate({ _id: disponivilityTable._id },{ $set: { estado: false } });
        }
        newPedido.codigo = random()
        await newPedido.save()
        return res.status(200).json(newPedido)

    } catch (error) {
        return res.status(400).json(error)
    }

}