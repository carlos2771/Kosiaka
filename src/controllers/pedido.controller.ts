import Pedido from "../models/pedido";
import random from "../libs/codeRandom"
import Mesa from "../models/mesa";
export const getPedido = async(req: any, res: any) => {
    try {
        const pedido = await Pedido.find(req.body)

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
        
        const disponivilityTable = await Mesa.findOne({ _id:  req.body.mesa })
        if(!disponivilityTable?.estado){
            return res.status(400).json({msg: "la mesa esta ocupada" })
        }
        const newPedido = new Pedido(req.body)
        if(newPedido){
           await Mesa.findOneAndUpdate({_id: disponivilityTable.id, estado: false })
        }
        newPedido.codigo = random()
        await newPedido.save()
        return res.status(200).json(newPedido)
    } catch (error) {
        console.log(error);
        
    }

}