import Role from "../models/role"



export const createRoles = async(): Promise<any> =>{

    try {
        const count = await Role.estimatedDocumentCount() // si existen documentos
    
        if(count > 0) return;
        const values = await Promise.all([
        new Role({name: "user"}).save(),
        new Role({name: "moderador"}).save(),
        new Role({name: "admin"}).save()
        ])
       
        console.log(values);
    } catch (error) {
        console.log(error);
      
        
    }
    
}